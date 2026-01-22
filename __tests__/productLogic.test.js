import { addProductLogic, deleteProductLogic, updateProductLogic } from "../utils/productLogic";

// IMPORTANT NOTE: AVOID -> import { describe } from "yargs"; WHICH FAIL UNIT TESTS

describe('Product Logic Unit Test', () => {

    const mockProducts = [
        {id: 1, text: 'Old Product'},
        {id: 2, text: 'Delete Me'},
    ];


    test('addProductLogic adds a product', () => {
        const result = addProductLogic(mockProducts, 'New Product');
        expect(result.error).toBe(false);
        expect(result.data[0].text).toBe('New Product');
    });


    test('deleteProductLogic deletes a product', () => {
        const result = deleteProductLogic(mockProducts, 2);
        expect(result.data).toHaveLength(1);
        expect(result.data[0].id).toBe(1);
    });


    test('updateProductLogic updates a product', () => {

        const result = updateProductLogic(mockProducts, 1, 'Updated Product');
        expect(result.error).toBe(false);
        expect(result.data[0].text).toBe('Updated Product');
    });

});