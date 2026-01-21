import { addShopLogic, deleteShopLogic, updateShopLogic } from "../utils/shopLogic";


describe('Shop Logic Unit Test', () => {

    const mockShops = [
        { id: 1, text: 'Old Shop' },
        { id: 2, text: 'Delete Me' },
    ];

    test('addShopLogic adds a shop', () => {

        const result = addShopLogic(mockShops, 'New Shop');
        expect(result.error).toBe(false);
        expect(result.data[0].text).toBe('New Shop');
    });


    test('deleteShopLogic deletes a shop', () => {

        const result = deleteShopLogic(mockShops, 2);
        expect(result.data).toHaveLength(1);
        expect(result.data[0].id).toBe(1);
    });


    test('updateShopLogic updates a shop', () => {

        const result = updateShopLogic(mockShops, 1, 'Updated Shop');
        expect(result.error).toBe(false);
        expect(result.data[0].text).toBe('Updated Shop');
    });
});