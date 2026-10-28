import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getCatalogProductById } from "@/data/catalogProductDetailsData";
import { getCatalogSectionById } from "@/data/catalogSectionsData";

const titles = {
  "/": "Онлайн-супермаркет",
  "/cart": "Кошик",
  "/favorites": "Обране",
  "/contacts": "Контакти",
  "/vacancies": "Вакансії",
};

const RouteEffects = () => {
  const { pathname, search, hash } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    let title = titles[pathname] || "Сторінку не знайдено";
    if (pathname.startsWith("/product/")) title = getCatalogProductById(pathname.split("/")[2])?.title || title;
    if (pathname === "/catalog" || pathname.startsWith("/catalog/")) {
      const section = getCatalogSectionById(pathname.split("/")[2] || "supermarket");
      const category = new URLSearchParams(search).get("category");
      title = section?.items.find((item) => item.id === category)?.title || section?.sidebarLabel || title;
    }
    document.title = `${title} — Urbanfood`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", `${title}. Демонстраційний онлайн-супермаркет Urbanfood: каталог товарів, обране та кошик.`);

    if (hash) {
      const scrollToTarget = () => {
        let id;
        try { id = decodeURIComponent(hash.slice(1)); } catch { return true; }
        const target = document.getElementById(id);
        if (!target) return false;
        target.scrollIntoView();
        return true;
      };
      if (!scrollToTarget()) {
        const observer = new MutationObserver(() => { if (scrollToTarget()) observer.disconnect(); });
        observer.observe(document.getElementById("root"), { childList: true, subtree: true });
        const timeout = window.setTimeout(() => observer.disconnect(), 5000);
        return () => { observer.disconnect(); window.clearTimeout(timeout); };
      }
    } else if (pathChanged) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
    return undefined;
  }, [pathname, search, hash]);

  return null;
};
export default RouteEffects;
