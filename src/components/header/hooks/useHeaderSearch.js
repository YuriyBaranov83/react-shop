import { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "./useClickOutside";

const useHeaderSearch = ({ closeCatalog, isCatalogOpen, isMobileCatalog }) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchWrapRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  const closeMobileSearch = useCallback(() => {
    setIsMobileSearchOpen(false);
  }, []);

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
    setIsMobileSearchOpen(true);
  }, [closeCatalog]);

  const handleSearchSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    if (!isMobileCatalog || !isMobileSearchOpen) {
      return;
    }

    mobileSearchInputRef.current?.focus();
  }, [isMobileCatalog, isMobileSearchOpen]);

  useClickOutside(searchWrapRef, closeMobileSearch, {
    enabled: isMobileCatalog && isMobileSearchOpen,
  });

  return {
    closeMobileSearch,
    handleSearchSubmit,
    isMobileSearchOpen,
    mobileSearchInputRef,
    openMobileSearchFromDrawer,
    searchWrapRef,
    toggleMobileSearch,
  };
};

export default useHeaderSearch;
