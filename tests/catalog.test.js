import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";

test("catalog, home offers and legacy links use the same valid products", async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "silent" });
  try {
    const catalog = await server.ssrLoadModule("/src/data/catalogProductDetailsData.js");
    const { homeDealsData } = await server.ssrLoadModule("/src/data/homeDealsData.js");
    const { catalogSectionsData } = await server.ssrLoadModule("/src/data/catalogSectionsData.js");
    const products = catalog.catalogProductsDetailedList;
    assert.equal(new Set(products.map((product) => product.id)).size, products.length);
    assert.equal(products.length, 55);
    for (const product of products) {
      assert.ok(Number.isSafeInteger(product.price) && product.price > 0, product.id);
      assert.ok(Number.isSafeInteger(product.stock) && product.stock > 0, product.id);
      assert.ok(!product.oldPrice || product.oldPrice > product.price, product.id);
      assert.equal(new Set(product.gallery).size, product.gallery.length, product.id);
      assert.ok(product.image && product.categoryHref, product.id);
      assert.equal(catalog.getCatalogProductById(product.id), product);
    }
    for (const product of homeDealsData) assert.equal(catalog.getCatalogProductById(product.id), product);
    for (const id of ["cheesy-1", "cofe-1", "cola-1", "shampoo-1", "slipers-1", "vine-1", "bread-bakery-product-7"]) {
      assert.ok(catalog.getCatalogProductById(id), id);
    }
    for (const section of catalogSectionsData) {
      for (const category of section.items) {
        const expectedTags = [...new Set(products.filter((product) => product.categoryId === category.id).flatMap((product) => product.tags))].sort();
        assert.deepEqual([...category.tags].sort(), expectedTags, category.id);
      }
    }
  } finally {
    await server.close();
  }
});
