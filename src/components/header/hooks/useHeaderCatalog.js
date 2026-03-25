import { useCallback, useRef, useState } from "react";
import useBodyScrollLock from "./useBodyScrollLock";
import useClickOutside from "./useClickOutside";

const useHeaderCatalog = ({ isMobileCatalog }) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const catalogWrapRef = useRef(null);

  const closeCatalog = useCallback(() => setIsCatalogOpen(false), []);
  const toggleCatalogInternal = useCallback(() => {
    setIsCatalogOpen((value) => !value);
  }, []);

  useClickOutside(catalogWrapRef, closeCatalog, isCatalogOpen && !isMobileCatalog);
  useBodyScrollLock(isCatalogOpen && isMobileCatalog);

  return {
    catalogWrapRef,
    closeCatalog,
    isCatalogOpen,
    toggleCatalogInternal,
  };
};

export default useHeaderCatalog;
