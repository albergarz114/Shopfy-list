
// Pure logic functions - no React, no UI!
export const addBeerLogic = (currentBeers, text) => { // Changed 'newText' to 'text'
    if (!text || text.trim() === '') {
        return { error: true, data: currentBeers };
    }
    const newData = [{ id: Date.now(), text }, ...currentBeers];
    return { error: false, data: newData };
};



export const deleteBeerLogic = (currentBeers, id) => {
    const data = currentBeers.filter(beer => beer.id !== id);
    return { error: false, data: data }; // Keep it consistent with addBeerLogic return style
};