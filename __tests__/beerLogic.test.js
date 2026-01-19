import { addBeerLogic, deleteBeerLogic } from '../utils/beerLogic';

describe('Beer Logic Unit Tests', () => {
    
    const mockBeers = [
        { id: 1, text: 'Pilsner' },
        { id: 2, text: 'Lager' }
    ];

    it('should add a beer to the top of the list', () => {
        const result = addBeerLogic(mockBeers, 'IPA');
        
        expect(result.error).toBe(false);
        expect(result.data).toHaveLength(3);
        expect(result.data[0].text).toBe('IPA');
    });

    it('should return error:true if text is empty', () => {
        const result = addBeerLogic(mockBeers, '');
        
        expect(result.error).toBe(true);
        expect(result.data).toHaveLength(2); // List stayed the same
    });

    it('should delete the correct beer by ID', () => {
        const result = deleteBeerLogic(mockBeers, 1);
        
        expect(result.data).toHaveLength(1);
        expect(result.data[0].text).toBe('Lager');
    });
});