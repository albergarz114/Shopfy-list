
import { addNoteLogic, deleteNoteLogic, updateNoteLogic } from "../utils/noteLogic";

describe('Note Logic Unit Test', () => {

    const mockNotes = [
        { id: 1, text: 'Old Note' },
        { id: 2, text: 'Delete Me' },
    ];

    test('addNoteLogic adds a note', () => {
        const result = addNoteLogic(mockNotes, 'New Note');
        expect(result.error).toBe(false);
        expect(result.data[0].text).toBe('New Note');
    });

    test('deleteNoteLogic deletes a note', () => {
        const result = deleteNoteLogic(mockNotes, 2);
        expect(result.data).toHaveLength(1);
        expect(result.data[0].id).toBe(1);
    });

    test('updateNoteLogic updates a note', () => {
        const result = updateNoteLogic(mockNotes, 1, 'Updated Note');
        expect(result.error).toBe(false);
        expect(result.data[0].text).toBe('Updated Note');
    });
});