import { useCallback, useRef, useState } from "react";
import useClickOutside from "./useClickOutside";

const useHeaderCatalog = ({ isMobileCatalog }) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const catalogWrapRef = useRef(null);

  const closeCatalog = useCallback(() => setIsCatalogOpen(false), []);
  const toggleCatalogInternal = useCallback(() => {
    setIsCatalogOpen((value) => !value);
  }, []);

  useClickOutside(catalogWrapRef, closeCatalog, {
    enabled: isCatalogOpen && !isMobileCatalog,
  });

  return {
    catalogWrapRef,
    closeCatalog,
    isCatalogOpen,
    toggleCatalogInternal,
  };
};

export default useHeaderCatalog;
