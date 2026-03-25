import { useEffect } from "react";

const useClickOutside = (ref, onOutsideClick, enabled = true) => {
  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleMouseDown = (event) => {
      const element = ref.current;
      if (!element) {
        return;
      }

      if (!element.contains(event.target)) {
        onOutsideClick?.(event);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [enabled, onOutsideClick, ref]);
};

export default useClickOutside;
