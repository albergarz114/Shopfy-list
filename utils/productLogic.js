export const addProductLogic = (currentProducts, text) => {

    if(!text || text.trim() === '') {
        return { error: true, data: currentProducts};
    }
    const newData = [{ id: Date.now(), text }, ...currentProducts];
    return { error: false, data: newData};
};


export const deleteProductLogic = (currentProducts, id) => {

    const newData = currentProducts.filter(product => product.id !== id);
    return { error: false, data: newData};
};


export const updateProductLogic = (currentProducts, id, newText) => {

    if(!newText || newText.trim() === ''){
        return { error: true, data: currentProducts};
    }
    const newData = currentProducts.map(product => product.id === id ? { ...product, text: newText} : product );
    return { error: false, data: newData};
    
};