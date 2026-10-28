import fs from "node:fs";
import path from "node:path";

// Validate static CSS Module keys using ESLint's existing import/JSX AST.
export default {
  rules: {
    "known-class": {
      meta: {
        type: "problem",
        schema: [],
        messages: { missing: "CSS Module has no local class '{{name}}'." },
      },
      create(context) {
        const modules = new Map();
        return {
          ImportDeclaration(node) {
            const source = node.source.value;
            if (!source.endsWith(".module.css") || !source.startsWith(".")) return;
            const cssPath = path.resolve(path.dirname(context.filename), source);
            if (!fs.existsSync(cssPath)) return;
            const css = fs.readFileSync(cssPath, "utf8").replace(/:global\([^)]*\)/g, "");
            const classes = new Set([...css.matchAll(/\.([_a-zA-Z][\w-]*)/g)].map((match) => match[1]));
            for (const specifier of node.specifiers) {
              if (specifier.type === "ImportDefaultSpecifier") modules.set(specifier.local.name, classes);
            }
          },
          MemberExpression(node) {
            if (node.object.type !== "Identifier") return;
            const classes = modules.get(node.object.name);
            if (!classes) return;
            const name = node.computed ? node.property.value : node.property.name;
            if (typeof name === "string" && !classes.has(name)) context.report({ node, messageId: "missing", data: { name } });
          },
        };
      },
    },
  },
};
