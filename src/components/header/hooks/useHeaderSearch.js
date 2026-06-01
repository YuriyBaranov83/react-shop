import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCatalogPopularProducts,
  MIN_CATALOG_SEARCH_QUERY_LENGTH,
  searchCatalogCategories,
  searchCatalogProducts,
} from "@/data/catalogSearchData";
import { buildCatalogSectionHref } from "@/data/catalogRouting";
import { defaultCatalogSectionId } from "@/data/catalogSectionsData";
import useClickOutside from "./useClickOutside";

const useHeaderSearch = ({ closeCatalog, isCatalogOpen, isMobileCatalog }) => {
  const navigate = useNavigate();

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchWrapRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  const normalizedSearchQuery = searchQuery.trim();

  const popularProducts = useMemo(() => getCatalogPopularProducts(4), []);

  const searchProductResults = useMemo(
    () =>
      searchCatalogProducts({
        query: normalizedSearchQuery,
        limit: 6,
      }),
    [normalizedSearchQuery]
  );

  const searchCategoryResults = useMemo(
    () =>
      searchCatalogCategories({
        query: normalizedSearchQuery,
        limit: 4,
      }),
    [normalizedSearchQuery]
  );

  const closeDesktopSearch = useCallback(() => {
    setIsDesktopSearchOpen(false);
  }, []);

  const closeMobileSearch = useCallback(() => {
    setIsMobileSearchOpen(false);
  }, []);

  const closeSearchDropdown = useCallback(() => {
    closeMobileSearch();
    closeDesktopSearch();
  }, [closeDesktopSearch, closeMobileSearch]);

  const toggleMobileSearch = useCallback(() => {
    if (!isMobileCatalog) {
      return;
    }

    if (isCatalogOpen) {
      closeCatalog();
    }

    setIsMobileSearchOpen((value) => !value);
  }, [closeCatalog, isCatalogOpen, isMobileCatalog]);

  const openMobileSearchFromDrawer = useCallback(() => {
    closeCatalog();
    closeDesktopSearch();
    setIsMobileSearchOpen(true);
  }, [closeCatalog, closeDesktopSearch]);

  const navigateToSearchResults = useCallback(
    (queryValue, scope = "all") => {
      const nextQueryValue = queryValue.trim();

      if (!nextQueryValue) {
        return;
      }

      const nextSearchParams = new URLSearchParams();
      nextSearchParams.set("q", nextQueryValue);
      nextSearchParams.set("scope", scope);

      navigate(`${buildCatalogSectionHref(defaultCatalogSectionId)}?${nextSearchParams.toString()}`);
      closeCatalog();
      closeSearchDropdown();
    },
    [closeCatalog, closeSearchDropdown, navigate]
  );

  const handleSearchSubmit = useCallback((event) => {
    event.preventDefault();

    navigateToSearchResults(searchQuery, "all");
  }, [navigateToSearchResults, searchQuery]);

  const handleSearchInputChange = useCallback(
    (event) => {
      setSearchQuery(event.target.value);

      if (!isMobileCatalog) {
        setIsDesktopSearchOpen(true);
      }
    },
    [isMobileCatalog]
  );

  const handleSearchInputFocus = useCallback(() => {
    if (!isMobileCatalog) {
      setIsDesktopSearchOpen(true);
    }
  }, [isMobileCatalog]);

  const handleSearchProductSelect = useCallback(
    (productId) => {
      navigate(`/product/${productId}`);
      closeCatalog();
      closeSearchDropdown();
    },
    [closeCatalog, closeSearchDropdown, navigate]
  );

  const handleSearchCategorySelect = useCallback(
    (categoryHref) => {
      navigate(categoryHref);
      closeCatalog();
      closeSearchDropdown();
    },
    [closeCatalog, closeSearchDropdown, navigate]
  );

  const handleSearchShowAllResults = useCallback(() => {
    navigateToSearchResults(searchQuery, "all");
  }, [navigateToSearchResults, searchQuery]);

  const isSearchDropdownVisible = isMobileCatalog ? isMobileSearchOpen : isDesktopSearchOpen;

  useEffect(() => {
    if (!isMobileCatalog || !isMobileSearchOpen) {
      return;
    }

    mobileSearchInputRef.current?.focus();
  }, [isMobileCatalog, isMobileSearchOpen]);

  const handleClickOutsideSearch = useCallback(() => {
    if (isMobileCatalog && isMobileSearchOpen) {
      closeMobileSearch();
      return;
    }

    if (!isMobileCatalog && isDesktopSearchOpen) {
      closeDesktopSearch();
    }
  }, [closeDesktopSearch, closeMobileSearch, isDesktopSearchOpen, isMobileCatalog, isMobileSearchOpen]);

  useClickOutside(searchWrapRef, handleClickOutsideSearch, {
    enabled:
      (isMobileCatalog && isMobileSearchOpen) ||
      (!isMobileCatalog && isDesktopSearchOpen),
  });

  return {
    closeSearchDropdown,
    handleSearchCategorySelect,
    handleSearchInputChange,
    handleSearchInputFocus,
    handleSearchProductSelect,
    handleSearchShowAllResults,
    closeMobileSearch,
    handleSearchSubmit,
    isSearchDropdownVisible,
    isDesktopSearchOpen,
    isMobileSearchOpen,
    minSearchQueryLength: MIN_CATALOG_SEARCH_QUERY_LENGTH,
    mobileSearchInputRef,
    openMobileSearchFromDrawer,
    popularProducts,
    searchCategoryResults,
    searchProductResults,
    searchQuery,
    searchWrapRef,
    toggleMobileSearch,
  };
};

export default useHeaderSearch;
