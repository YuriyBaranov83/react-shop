import { useCallback, useEffect, useRef, useState } from "react";
import useBodyScrollLock from "./useBodyScrollLock";
import useClickOutside from "./useClickOutside";
import useEscapeKey from "./useEscapeKey";
import useMediaQuery from "./useMediaQuery";

const MOBILE_CATALOG_MEDIA = "(max-width: 900px)";
const DESKTOP_HOVER_MEDIA = "(hover: hover) and (pointer: fine)";

const useHeaderMainLogic = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileCatalog, setIsMobileCatalog] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    
    return window.matchMedia(MOBILE_CATALOG_MEDIA).matches;
  });
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authModalSession, setAuthModalSession] = useState(0);

  const isDesktopHover = useMediaQuery(DESKTOP_HOVER_MEDIA);

  const catalogWrapRef = useRef(null);
  const searchWrapRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const profileWrapRef = useRef(null);

  const closeCatalog = useCallback(() => setIsCatalogOpen(false), []);
  const closeMobileSearch = useCallback(() => setIsMobileSearchOpen(false), []);
  const closeProfile = useCallback(() => setIsProfileOpen(false), []);
  const closeAuth = useCallback(() => setIsAuthOpen(false), []);

  const openProfile = useCallback(() => setIsProfileOpen(true), []);

  const toggleCatalog = useCallback(() => {
    if (isMobileCatalog) {
      closeMobileSearch();
    }

    setIsCatalogOpen((value) => !value);
  }, [closeMobileSearch, isMobileCatalog]);

  const toggleProfile = useCallback(() => {
    setIsProfileOpen((value) => !value);
  }, []);

  const openAuth = useCallback(() => {
    setAuthModalSession((session) => session + 1);
    setIsAuthOpen(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_CATALOG_MEDIA);
    const handleChange = (event) => {
      setIsMobileCatalog(event.matches);
      setIsCatalogOpen(false);
      setIsMobileSearchOpen(false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isMobileCatalog || !isMobileSearchOpen) {
      return;
    }

    mobileSearchInputRef.current?.focus();
  }, [isMobileCatalog, isMobileSearchOpen]);

  useClickOutside(catalogWrapRef, closeCatalog, isCatalogOpen && !isMobileCatalog);
  useClickOutside(searchWrapRef, closeMobileSearch, isMobileCatalog && isMobileSearchOpen);
  useClickOutside(profileWrapRef, closeProfile, isProfileOpen);

  useBodyScrollLock(isCatalogOpen && isMobileCatalog);

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

  const handleProfileMouseEnter = useCallback(() => {
    if (!isDesktopHover) {
      return;
    }

    openProfile();
  }, [isDesktopHover, openProfile]);

  const handleProfileMouseLeave = useCallback(() => {
    if (!isDesktopHover) {
      return;
    }

    closeProfile();
  }, [closeProfile, isDesktopHover]);

  const handleProfileClick = useCallback(() => {
    if (isDesktopHover) {
      return;
    }

    toggleProfile();
  }, [isDesktopHover, toggleProfile]);

  const handleLoginClick = useCallback(() => {
    openAuth();
    closeProfile();
  }, [closeProfile, openAuth]);

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
    setIsCatalogOpen(false);
    setIsMobileSearchOpen(true);
  }, []);

  const handleSearchSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

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
