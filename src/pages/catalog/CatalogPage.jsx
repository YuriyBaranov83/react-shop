import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";

import Container from "@/components/layout/Container";
import {
  MIN_CATALOG_SEARCH_QUERY_LENGTH,
  searchCatalogCategories,
  searchCatalogProducts,
} from "@/data/catalogSearchData";
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
import CatalogSearchBar from "./components/CatalogSearchBar/CatalogSearchBar";
import CatalogSearchCategories from "./components/CatalogSearchCategories/CatalogSearchCategories";
import CatalogSidebar from "./components/CatalogSidebar/CatalogSidebar";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { sectionId } = useParams();

  const currentSectionId = sectionId || defaultCatalogSectionId;
  const activeSection = getCatalogSectionById(currentSectionId);
  const fallbackSection = getCatalogSectionById(defaultCatalogSectionId);
  const resolvedSection = activeSection || fallbackSection;

  const requestedFilterId = searchParams.get("filter") || "all";
  const activeFilterId = hasCatalogFilter(requestedFilterId) ? requestedFilterId : "all";
  const activeCategoryId = searchParams.get("category") || "";
  const rawSearchQuery = searchParams.get("q") || "";
  const searchQuery = rawSearchQuery.trim();
  const selectedCategory =
    resolvedSection?.items.find((item) => item.id === activeCategoryId) || null;
  const requestedSearchScope = searchParams.get("scope") || "all";
  const searchScope =
    requestedSearchScope === "category" && selectedCategory ? "category" : "all";
  const hasSearchQuery = searchQuery.length >= MIN_CATALOG_SEARCH_QUERY_LENGTH;
  const isSearchPending = searchQuery.length > 0 && !hasSearchQuery;

  const [searchInputValue, setSearchInputValue] = useState(rawSearchQuery);

  useEffect(() => {
    setSearchInputValue(rawSearchQuery);
  }, [rawSearchQuery]);

  const visibleItems =
    activeFilterId === "all"
      ? resolvedSection?.items || []
      : (resolvedSection?.items || []).filter((item) => item.tags.includes(activeFilterId));

  const categoryProducts = selectedCategory
    ? getCatalogProductsByCategoryId(selectedCategory.id)
    : [];
  const visibleProducts =
    activeFilterId === "all"
      ? categoryProducts
      : categoryProducts.filter((item) => item.tags.includes(activeFilterId));

  const searchedProducts = useMemo(() => {
    if (!hasSearchQuery) {
      return [];
    }

    if (searchScope === "category" && selectedCategory) {
      return searchCatalogProducts({
        query: searchQuery,
        filterId: activeFilterId,
        categoryId: selectedCategory.id,
        limit: 48,
      });
    }

    return searchCatalogProducts({
      query: searchQuery,
      filterId: activeFilterId,
      limit: 48,
    });
  }, [activeFilterId, hasSearchQuery, searchQuery, searchScope, selectedCategory]);

  const searchedCategories = useMemo(() => {
    if (!hasSearchQuery || (searchScope === "category" && selectedCategory)) {
      return [];
    }

    return searchCatalogCategories({
      query: searchQuery,
      filterId: activeFilterId,
      limit: 8,
    });
  }, [activeFilterId, hasSearchQuery, searchQuery, searchScope, selectedCategory]);

  const isSearchMode = searchQuery.length > 0;

  const handleFilterChange = (nextFilterId) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextFilterId === "all") {
      nextSearchParams.delete("filter");
    } else {
      nextSearchParams.set("filter", nextFilterId);
    }

    setSearchParams(nextSearchParams, { replace: false });
  };

  const handleCatalogSearchSubmit = (event) => {
    event.preventDefault();

    const nextSearchQuery = searchInputValue.trim();
    const nextSearchParams = new URLSearchParams(searchParams);

    if (!nextSearchQuery) {
      nextSearchParams.delete("q");
      nextSearchParams.delete("scope");
    } else {
      nextSearchParams.set("q", nextSearchQuery);

      if (selectedCategory) {
        nextSearchParams.set("scope", searchScope === "category" ? "category" : "all");
      } else {
        nextSearchParams.set("scope", "all");
      }
    }

    setSearchParams(nextSearchParams, { replace: false });
  };

  const handleCatalogSearchClear = () => {
    setSearchInputValue("");

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("q");
    nextSearchParams.delete("scope");
    setSearchParams(nextSearchParams, { replace: false });
  };

  const handleSearchScopeChange = (nextScope) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextScope === "category" && selectedCategory) {
      nextSearchParams.set("scope", "category");
    } else {
      nextSearchParams.set("scope", "all");
    }

    if (!nextSearchParams.get("q") && searchInputValue.trim()) {
      nextSearchParams.set("q", searchInputValue.trim());
    }

    setSearchParams(nextSearchParams, { replace: false });
  };

  const getSectionHref = (targetSectionId) => {
    const nextSearchParams = new URLSearchParams();

    if (activeFilterId !== "all") {
      nextSearchParams.set("filter", activeFilterId);
    }

    if (searchQuery) {
      nextSearchParams.set("q", searchQuery);
      nextSearchParams.set("scope", "all");
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

    if (searchQuery) {
      nextSearchParams.set("q", searchQuery);
      nextSearchParams.set(
        "scope",
        searchScope === "category" && selectedCategory ? "category" : "all"
      );
    }

    return `${buildCatalogSectionHref(targetSectionId)}?${nextSearchParams.toString()}`;
  };

  if (!activeSection || !resolvedSection) {
    return <Navigate to={buildCatalogSectionHref(defaultCatalogSectionId)} replace />;
  }

  return (
    <section className={styles.section}>
      <Container>
        <nav className={styles.breadcrumbs} aria-label="Хлібні крихти">
          <Link to="/">Головна</Link>
          <span aria-hidden="true">/</span>
          <span>Каталог</span>
          <span aria-hidden="true">/</span>
          <span>{resolvedSection.sidebarLabel}</span>
        </nav>

        <header className={styles.header}>
          <h1>{resolvedSection.title}</h1>
          <p>Обирайте підкатегорію або перейдіть в інший розділ через ліве меню.</p>
        </header>

        <div className={styles["section-tabs"]} aria-label="Розділи каталогу">
          {catalogSectionsData.map((sectionItem) => (
            <Link
              key={sectionItem.id}
              to={getSectionHref(sectionItem.id)}
              className={`${styles["section-tab"]} ${
                sectionItem.id === resolvedSection.id ? styles["section-tab-active"] : ""
              }`.trim()}
            >
              {sectionItem.sidebarLabel}
            </Link>
          ))}
        </div>

        <div className={styles.layout}>
          <CatalogSidebar
            sections={catalogSectionsData}
            activeSectionId={resolvedSection.id}
            activeCategoryId={selectedCategory?.id || ""}
            getSectionHref={getSectionHref}
            getCategoryHref={getCategoryHref}
          />

          <div className={styles.content}>
            <CatalogSearchBar
              value={searchInputValue}
              onValueChange={setSearchInputValue}
              onSubmit={handleCatalogSearchSubmit}
              onClear={handleCatalogSearchClear}
              isCategoryScopeAvailable={Boolean(selectedCategory)}
              searchScope={searchScope}
              onScopeChange={handleSearchScopeChange}
            />

            <CatalogFilterBar
              filters={catalogFilterOptions}
              activeFilterId={activeFilterId}
              onFilterChange={handleFilterChange}
            />

            {isSearchPending ? (
              <div className={styles["search-hint"]}>
                <p>Введіть щонайменше 2 символи для пошуку.</p>
              </div>
            ) : null}

            {isSearchMode && hasSearchQuery ? (
              <>
                <CatalogProductsGrid
                  products={searchedProducts}
                  categoryTitle={
                    searchScope === "category" && selectedCategory
                      ? `Пошук у категорії: ${selectedCategory.title}`
                      : `Результати пошуку: “${searchQuery}”`
                  }
                />
                <CatalogSearchCategories categories={searchedCategories} />
              </>
            ) : null}

            {!isSearchMode && selectedCategory ? (
              <CatalogProductsGrid
                products={visibleProducts}
                categoryTitle={selectedCategory.title}
              />
            ) : null}

            {!isSearchMode && !selectedCategory ? (
              <CatalogCategoryGrid
                items={visibleItems}
                sectionTone={resolvedSection.backgroundTone}
                activeCategoryId=""
                getCategoryHref={(categoryId) => getCategoryHref(resolvedSection.id, categoryId)}
              />
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CatalogPage;
