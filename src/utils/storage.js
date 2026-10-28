export const readStoredValue = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch {
    return null;
  }
};

export const writeStoredValue = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // The in-memory basket remains usable when storage is unavailable or full.
    return false;
  }
};
