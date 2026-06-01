import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";

import Container from "@/components/layout/Container";
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

  const visibleItems =
    activeFilterId === "all"
      ? activeSection.items
      : activeSection.items.filter((item) => item.tags.includes(activeFilterId));

  const visibleCategoryIdSet = new Set(visibleItems.map((item) => item.id));
  const displayedActiveCategoryId = visibleCategoryIdSet.has(activeCategoryId)
    ? activeCategoryId
    : "";

  const handleFilterChange = (nextFilterId) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextFilterId === "all") {
      nextSearchParams.delete("filter");
    } else {
      nextSearchParams.set("filter", nextFilterId);
    }

    if (activeCategoryId) {
      const categoryRemainsVisible = activeSection.items.some(
        (item) =>
          item.id === activeCategoryId &&
          (nextFilterId === "all" || item.tags.includes(nextFilterId))
      );

      if (!categoryRemainsVisible) {
        nextSearchParams.delete("category");
      }
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

        <div className={styles.sectionTabs} aria-label="Розділи каталогу">
          {catalogSectionsData.map((sectionItem) => (
            <Link
              key={sectionItem.id}
              to={getSectionHref(sectionItem.id)}
              className={`${styles.sectionTab} ${
                sectionItem.id === activeSection.id ? styles["sectionTab-active"] : ""
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
            activeCategoryId={displayedActiveCategoryId}
            getSectionHref={getSectionHref}
            getCategoryHref={getCategoryHref}
          />

          <div className={styles.content}>
            <CatalogFilterBar
              filters={catalogFilterOptions}
              activeFilterId={activeFilterId}
              onFilterChange={handleFilterChange}
            />

            <CatalogCategoryGrid
              items={visibleItems}
              sectionTone={activeSection.backgroundTone}
              activeCategoryId={displayedActiveCategoryId}
              getCategoryHref={(categoryId) => getCategoryHref(activeSection.id, categoryId)}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CatalogPage;
