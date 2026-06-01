import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";

import Container from "@/components/layout/Container";
import { getCatalogProductsByCategoryId } from "@/data/catalogProductsData";
import { buildCatalogSectionHref } from "@/data/catalogRouting";
import {
  catalogFilterOptions,
  catalogSectionsData,
  defaultCatalogSectionId,
  getCatalogSectionById,
  hasCatalogFilter,
} from "@/data/catalogSectionsData";
import CatalogCategoryGrid from "./components/CatalogCategoryGrid/CatalogCategoryGrid";
import CatalogFilterBar from "./components/CatalogFilterBar/CatalogFilterBar";
import CatalogProductsGrid from "./components/CatalogProductsGrid/CatalogProductsGrid";
import CatalogSidebar from "./components/CatalogSidebar/CatalogSidebar";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sectionId } = useParams();

  const currentSectionId = sectionId || defaultCatalogSectionId;
  const activeSection = getCatalogSectionById(currentSectionId);

  if (!activeSection) {
    return <Navigate to={buildCatalogSectionHref(defaultCatalogSectionId)} replace />;
  }

  const requestedFilterId = searchParams.get("filter") || "all";
  const activeFilterId = hasCatalogFilter(requestedFilterId) ? requestedFilterId : "all";
  const activeCategoryId = searchParams.get("category") || "";
  const selectedCategory =
    activeSection.items.find((item) => item.id === activeCategoryId) || null;

  const visibleItems =
    activeFilterId === "all"
      ? activeSection.items
      : activeSection.items.filter((item) => item.tags.includes(activeFilterId));

  const categoryProducts = selectedCategory
    ? getCatalogProductsByCategoryId(selectedCategory.id)
    : [];
  const visibleProducts =
    activeFilterId === "all"
      ? categoryProducts
      : categoryProducts.filter((item) => item.tags.includes(activeFilterId));

  const handleFilterChange = (nextFilterId) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextFilterId === "all") {
      nextSearchParams.delete("filter");
    } else {
      nextSearchParams.set("filter", nextFilterId);
    }

    setSearchParams(nextSearchParams, { replace: false });
  };

  const getSectionHref = (targetSectionId) => {
    const nextSearchParams = new URLSearchParams();

    if (activeFilterId !== "all") {
      nextSearchParams.set("filter", activeFilterId);
    }

    const search = nextSearchParams.toString();
    return `${buildCatalogSectionHref(targetSectionId)}${search ? `?${search}` : ""}`;
  };

  const getCategoryHref = (targetSectionId, targetCategoryId) => {
    const nextSearchParams = new URLSearchParams();

    if (activeFilterId !== "all") {
      nextSearchParams.set("filter", activeFilterId);
    }

    nextSearchParams.set("category", targetCategoryId);
    return `${buildCatalogSectionHref(targetSectionId)}?${nextSearchParams.toString()}`;
  };

  return (
    <section className={styles.section}>
      <Container>
        <nav className={styles.breadcrumbs} aria-label="Хлібні крихти">
          <Link to="/">Головна</Link>
          <span aria-hidden="true">/</span>
          <span>Каталог</span>
          <span aria-hidden="true">/</span>
          <span>{activeSection.sidebarLabel}</span>
        </nav>

        <header className={styles.header}>
          <h1>{activeSection.title}</h1>
          <p>Обирайте підкатегорію або перейдіть в інший розділ через ліве меню.</p>
        </header>

        <div className={styles["section-tabs"]} aria-label="Розділи каталогу">
          {catalogSectionsData.map((sectionItem) => (
            <Link
              key={sectionItem.id}
              to={getSectionHref(sectionItem.id)}
              className={`${styles["section-tab"]} ${
                sectionItem.id === activeSection.id ? styles["section-tab-active"] : ""
              }`.trim()}
            >
              {sectionItem.sidebarLabel}
            </Link>
          ))}
        </div>

        <div className={styles.layout}>
          <CatalogSidebar
            sections={catalogSectionsData}
            activeSectionId={activeSection.id}
            activeCategoryId={selectedCategory?.id || ""}
            getSectionHref={getSectionHref}
            getCategoryHref={getCategoryHref}
          />

          <div className={styles.content}>
            <CatalogFilterBar
              filters={catalogFilterOptions}
              activeFilterId={activeFilterId}
              onFilterChange={handleFilterChange}
            />

            {selectedCategory ? (
              <CatalogProductsGrid
                products={visibleProducts}
                categoryTitle={selectedCategory.title}
              />
            ) : (
              <CatalogCategoryGrid
                items={visibleItems}
                sectionTone={activeSection.backgroundTone}
                activeCategoryId=""
                getCategoryHref={(categoryId) => getCategoryHref(activeSection.id, categoryId)}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CatalogPage;
