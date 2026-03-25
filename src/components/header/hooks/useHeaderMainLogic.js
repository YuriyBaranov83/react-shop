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

  const {
    catalogWrapRef,
    closeCatalog,
    isCatalogOpen,
    toggleCatalogInternal,
  } = useHeaderCatalog({
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
  } = useHeaderSearch({
    closeCatalog,
    isCatalogOpen,
    isMobileCatalog,
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
  } = useHeaderProfileAuth({
    isDesktopHover,
  });

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

  useEscapeKey(
    closeOverlaysOnEscape,
    isCatalogOpen || isProfileOpen || isAuthOpen || isMobileSearchOpen
  );

  const toggleCatalog = useCallback(() => {
    if (!isMobileCatalog) {
      toggleCatalogInternal();
      return;
    }

    closeMobileSearch();
    toggleCatalogInternal();
  }, [closeMobileSearch, isMobileCatalog, toggleCatalogInternal]);

  return {
    authModalSession,
    catalogWrapRef,
    closeAuth,
    closeCatalog,
    closeProfile,
    handleLoginClick,
    handleProfileClick,
    handleProfileMouseEnter,
    handleProfileMouseLeave,
    handleSearchSubmit,
    isAuthOpen,
    isCatalogOpen,
    isDesktopHover,
    isMobileCatalog,
    isMobileSearchOpen,
    isProfileOpen,
    mobileSearchInputRef,
    openMobileSearchFromDrawer,
    profileWrapRef,
    searchWrapRef,
    toggleCatalog,
    toggleMobileSearch,
  };
};

export default useHeaderMainLogic;
