// Parameters have to be in order the same as NoteScreen
export const addNoteLogic = (currentNotes, text) => {

    if(!text || text.trim() === '') {
        return { error: true, data: currentNotes};
    }
    const newData = [{ id: Date.now(), text }, ...currentNotes];
    return { error: false, data: newData};
};

// Parameters have to be in order the same as NoteScreen
export const deleteNoteLogic = (currentNotes, id) => {

    const newData = currentNotes.filter(note => note.id !== id);
    return { error: false, data: newData};
};

// Parameters have to be in order the same as NoteScreen
export const updateNoteLogic = (currentNotes, id, newText) => {

    if (!newText || newText.trim() === '') {
        return { error: true, data: currentNotes };
    }
    const newData = currentNotes.map(note => note.id === id ? { ...note, text: newText} : note );
    return { error: false, data: newData};
};