import { useEffect } from "react";

const normalizeRefs = (refs) => {
  if (Array.isArray(refs)) {
    return refs;
  }

  return [refs];
};

const resolveElements = (refs) =>
  refs
    .map((ref) => ref?.current ?? ref)
    .filter(Boolean);

const useClickOutside = (
  refs,
  onOutsideClick,
  options = {}
) => {
  const { enabled = true, capture = false } = options;

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const refsList = normalizeRefs(refs);

    const handlePointerDown = (event) => {
      const elements = resolveElements(refsList);
      if (elements.length === 0) {
        return;
      }

      const isInside = elements.some((element) => element.contains(event.target));
      if (isInside) {
        return;
      }

      onOutsideClick?.(event);
    };

    document.addEventListener("pointerdown", handlePointerDown, capture);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, capture);
    };
  }, [capture, enabled, onOutsideClick, refs]);
};

export default useClickOutside;
