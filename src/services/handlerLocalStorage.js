export const handlerLocalStorage = () => {
    const set = (key, value) => localStorage.setItem(key, value);

    const get = (key) => {
        if (key === 'language' && !(localStorage.getItem(key))) {
            set("language", "RU");
        }
        return localStorage.getItem(key);
    };

    return { get, set }
}