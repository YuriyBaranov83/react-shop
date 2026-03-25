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
    closeMobileSearch,
    handleSearchSubmit,
    isMobileSearchOpen,
    mobileSearchInputRef,
    openMobileSearchFromDrawer,
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
      closeMobileSearch();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [closeCatalog, closeMobileSearch]);

  const closeOverlaysOnEscape = useCallback(() => {
    closeCatalog();
    closeProfile();
    closeAuth();
    closeMobileSearch();
  }, [closeAuth, closeCatalog, closeMobileSearch, closeProfile]);

  useEscapeKey(closeOverlaysOnEscape, {
    enabled: isCatalogOpen || isProfileOpen || isAuthOpen || isMobileSearchOpen,
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
    handleSearchSubmit,
    isMobileSearchOpen,
    mobileSearchInputRef,
    openMobileSearchFromDrawer,
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
