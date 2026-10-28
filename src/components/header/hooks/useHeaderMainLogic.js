import { useCallback, useEffect, useState } from "react";
import useEscapeKey from "./useEscapeKey";
import useHeaderCatalog from "./useHeaderCatalog";
import useHeaderProfileAuth from "./useHeaderProfileAuth";
import useHeaderSearch from "./useHeaderSearch";
import useMediaQuery from "./useMediaQuery";

const MOBILE_CATALOG_MEDIA = "(max-width: 900px)";
const DESKTOP_HOVER_MEDIA = "(hover: hover) and (pointer: fine)";

const useHeaderMainLogic = () => {
  const [isMobileCatalog, setIsMobileCatalog] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(MOBILE_CATALOG_MEDIA).matches;
  });
  const isDesktopHover = useMediaQuery(DESKTOP_HOVER_MEDIA);

  const catalogState = useHeaderCatalog({
    isMobileCatalog,
  });
  const {
    catalogWrapRef,
    closeCatalog,
    isCatalogOpen,
    toggleCatalogInternal,
  } = catalogState;

  const searchState = useHeaderSearch({
    closeCatalog,
    isCatalogOpen,
    isMobileCatalog,
  });
  const {
    closeSearchDropdown,
    handleSearchCategorySelect,
    handleSearchInputChange,
    handleSearchInputFocus,
    handleSearchProductSelect,
    handleSearchShowAllResults,
    closeMobileSearch,
    handleSearchSubmit,
    isSearchDropdownVisible,
    isMobileSearchOpen,
    minSearchQueryLength,
    mobileSearchInputRef,
    openMobileSearchFromDrawer,
    popularProducts,
    searchCategoryResults,
    searchProductResults,
    searchQuery,
    searchSubmitFeedback,
    searchWrapRef,
    toggleMobileSearch,
  } = searchState;

  const profileAuthState = useHeaderProfileAuth({
    isDesktopHover,
  });
  const {
    authModalSession,
    closeAuth,
    closeProfile,
    handleLoginClick,
    handleProfileClick,
    handleProfileMouseEnter,
    handleProfileMouseLeave,
    isAuthOpen,
    isProfileOpen,
    profileWrapRef,
  } = profileAuthState;

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_CATALOG_MEDIA);
    const handleChange = (event) => {
      setIsMobileCatalog(event.matches);
      closeCatalog();
      closeSearchDropdown();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [closeCatalog, closeSearchDropdown]);

  const closeOverlaysOnEscape = useCallback(() => {
    closeCatalog();
    closeProfile();
    closeAuth();
    closeSearchDropdown();
  }, [closeAuth, closeCatalog, closeProfile, closeSearchDropdown]);

  useEscapeKey(closeOverlaysOnEscape, {
    enabled: isCatalogOpen || isProfileOpen || isAuthOpen || isSearchDropdownVisible,
  });

  const toggleCatalog = useCallback(() => {
    if (!isMobileCatalog) {
      toggleCatalogInternal();
      return;
    }

    closeMobileSearch();
    toggleCatalogInternal();
  }, [closeMobileSearch, isMobileCatalog, toggleCatalogInternal]);

  const catalog = {
    catalogWrapRef,
    closeCatalog,
    isCatalogOpen,
    isMobileCatalog,
    toggleCatalog,
  };

  const search = {
    handleSearchCategorySelect,
    handleSearchInputChange,
    handleSearchInputFocus,
    handleSearchProductSelect,
    handleSearchShowAllResults,
    handleSearchSubmit,
    isSearchDropdownVisible,
    isMobileSearchOpen,
    minSearchQueryLength,
    mobileSearchInputRef,
    openMobileSearchFromDrawer,
    popularProducts,
    searchCategoryResults,
    searchProductResults,
    searchQuery,
    searchSubmitFeedback,
    searchWrapRef,
    toggleMobileSearch,
  };

  const profileAuth = {
    authModalSession,
    closeAuth,
    closeProfile,
    handleLoginClick,
    handleProfileClick,
    handleProfileMouseEnter,
    handleProfileMouseLeave,
    isAuthOpen,
    isDesktopHover,
    isProfileOpen,
    profileWrapRef,
  };

  return { catalog, profileAuth, search };
};

export default useHeaderMainLogic;
