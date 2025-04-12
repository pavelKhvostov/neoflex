export const safeGet = (key, fallback = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Ошибка при получении "${key}" из localStorage:`, e);
    return fallback;
  }
};

export const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Ошибка при сохранении "${key}" в localStorage:`, e);
  }
};

export const safeRemove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Ошибка при удалении "${key}" из localStorage:`, e);
  }
};
