import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import ShopScreen from "../app/shops/shops";
import { SettingsProvider } from "../context/SettingsContext";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { replace } from "expo-router/build/global-state/routing";


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


const MockShopScreen = () => (
    <SettingsProvider>
        <ShopScreen/>
    </SettingsProvider>
);

describe('ShopScreen UI', () => {

    it('renders the initial list of shops', () => {
        const { getByText } = render(<MockShopScreen/>);

        expect(getByText('Soap')).toBeTruthy();
        expect(getByText('Sofa')).toBeTruthy();
        expect(getByText('Controller')).toBeTruthy();
    });


    it('adds a new shop to the list', () => {
        
        const { getByPlaceholderText, getByText, getByTestId } = render(<MockShopScreen/>);

        const input = getByPlaceholderText(/Add Shop Item/i);
        const addButton = getByTestId('add-shop-button');

        fireEvent.changeText(input, 'Shoes');
        fireEvent.press(addButton);

        expect(getByText('Shoes')).toBeTruthy();
    });


    it('deletes a shop from the list', () => {
        const { getByTestId, queryByText } = render(<MockShopScreen/>);

        expect(queryByText('Soap')).toBeTruthy();

        const deleteBtn = getByTestId('delete-btn-1');
        fireEvent.press(deleteBtn);

        expect(queryByText('Soap')).toBeNull();
    });


    it('updates a shop name via the edit', () => {
        const { getByTestId, getByDisplayValue, queryByText } = render(<MockShopScreen/>);

        const editBtn = getByTestId('edit-btn-2');
        fireEvent.press(editBtn);

        const input = getByDisplayValue('Sofa');
        fireEvent.changeText(input, 'Brush');
        const saveBtn = getByTestId('save-btn-2');
        fireEvent.press(saveBtn);

        expect(queryByText('Brush')).toBeTruthy();
        expect(queryByText('Sofa')).toBeNull();
    });

    
    it('shows an alert when trying to add an empty shop', () => {
        const alertSpy = jest.spyOn(Alert, 'alert');

        const { getByTestId } = render(<MockShopScreen/>)

        const addButton = getByTestId('add-shop-button');
        fireEvent.press(addButton);

        expect(alertSpy).toHaveBeenCalledWith(
            'Error',
            'Please enter a shop item',
            { text: 'Ok'}
        );

        alertSpy.mockRestore();
    });
});