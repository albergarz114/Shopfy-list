export const addShopLogic = (currentShops, text) => {

    if (!text || text.trim() === '') {
        return { error: true, data: currentShops };
    }
    const newData = [{ id: Date.now(), text }, ...currentShops];
    return { error: false, data: newData};
};


export const deleteShopLogic = (currentShops, id) => {

    const newData = currentShops.filter(shop => shop.id !== id);
    return { error: false, data: newData};
};


export const updateShopLogic = (currentShops, id, newText) => {

    if (!newText || newText.trim() === '') {
        return { error: true, data: currentShops};
    }
    const newData = currentShops.map(shop => shop.id === id ? { ...shop, text: newText} : shop );
    return { error: false, data: newData};
};