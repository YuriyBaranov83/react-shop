import { useEffect } from "react";

const DEFAULT_KEYS = ["Escape"];

const useEscapeKey = (onEscape, options = {}) => {
  const { enabled = true, keys = DEFAULT_KEYS } = options;

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (!keys.includes(event.key)) {
        return;
      }

      onEscape?.(event);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, keys, onEscape]);
};

export default useEscapeKey;
