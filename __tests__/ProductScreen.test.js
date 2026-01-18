import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import ProductScreen from "../app/products/products";
import { SettingsProvider } from "../context/SettingsContext";
import { useRouter } from "expo-router";
import { Alert } from "react-native";


jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

//jest.mock('expo-router', () => ({
//    useRouter: () => ({
//        push: jest.fn(),
//        replace: jest.fn(),
//    }),
//}));


jest.mock('@/components/GlobalToolbar', () => {
    const { Text } = require('react-native');
    return () => <Text>GlobalToolbar</Text>
});


const MockProductScreen = () => (
    <SettingsProvider>
        <ProductScreen/>
    </SettingsProvider>
);


describe('ProductScreen UI',() => {


    it('renders the initial list of products', () => {
        const { getByText } = render(<MockProductScreen/>);

        expect(getByText('Car')).toBeTruthy();
        expect(getByText('Sofa')).toBeTruthy();
        expect(getByText('Controller')).toBeTruthy();
    });



    it('adds a new product to the list', () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<MockProductScreen/>);

        const input = getByPlaceholderText(/Add Product/i);
        const addButton = getByTestId('add-product-button');

        fireEvent.changeText(input, 'Milk');
        fireEvent.press(addButton);

        expect(getByText('Milk')).toBeTruthy();
    });


    it('deletes a product from the list', () => {
        const { getByTestId, queryByText} = render(<MockProductScreen/>);

        expect(queryByText('Car')).toBeTruthy();

        const deleteBtn = getByTestId('delete-btn-1');
        fireEvent.press(deleteBtn);

        expect(queryByText('Car')).toBeNull();
    });


    it('updates a product name via the edit', () => {
        const { getByTestId, getByDisplayValue, queryByText} = render(<MockProductScreen/>);


        const editBtn = getByTestId('edit-btn-2');
        fireEvent.press(editBtn);

        const input = getByDisplayValue('Sofa');

        fireEvent.changeText(input, 'Couch');
        const saveBtn = getByTestId('save-btn-2');
        fireEvent.press(saveBtn);

        expect(queryByText('Couch')).toBeTruthy();
        expect(queryByText('Sofa')).toBeNull();
    });



    it('shows an alert when trying to add an empty product', () => {
        const alertSpy = jest.spyOn(Alert, 'alert');

        const { getByTestId } = render(<MockProductScreen/>);

        const addButton = getByTestId('add-product-button');
        fireEvent.press(addButton);

        expect(alertSpy).toHaveBeenCalledWith(
            'Error',
            'Please enter a product item',
            { text: 'Ok'}
        );

        alertSpy.mockRestore();
    });
});