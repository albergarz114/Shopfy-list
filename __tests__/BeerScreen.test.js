import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { SettingsProvider } from "../context/SettingsContext";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import BeerScreen from "../app/beers/beers";



jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');


jest.mock('@/components/GlobalToolbar', () => {
    const { Text } = require('react-native');
    return () => <Text>GlobalToolbar</Text>
});


const BeerScreenWrapper = () => (
    <SettingsProvider>
        <BeerScreen/>
    </SettingsProvider>
);


describe('BeerScreen UI', () => {

    it('renders the initial list of beers', () => {
        const { getByText } = render(<BeerScreenWrapper/>);

        expect(getByText('Northern Style Pilsner')).toBeTruthy();
        expect(getByText('Kellerbier')).toBeTruthy();
        expect(getByText('Kellerpils')).toBeTruthy();
    });


    it('adds a new beer to the list', () => {

        const { getByPlaceholderText, getByText, getByTestId } = render(<BeerScreenWrapper/>);

        const input = getByPlaceholderText(/Add Beer/i);
        const addButton = getByTestId('add-beer-button');

        fireEvent.changeText(input, 'Christmas Ale');
        fireEvent.press(addButton);

        expect(getByText('Christmas Ale')).toBeTruthy();
    });


    
    it('deletes a beer from the list', () => {
        const { getByTestId, queryByText } = render(<BeerScreenWrapper/>);

        expect(queryByText('Northern Style Pilsner')).toBeTruthy();

        const deleteBtn = getByTestId('delete-btn-1');
        fireEvent.press(deleteBtn);

        expect(queryByText('Northern Style Pilsner')).toBeNull();
    });



    it('shows an alert when trying to add an empty beer', () => {
        const alertSpy = jest.spyOn(Alert, 'alert');

        const { getByTestId } = render(<BeerScreenWrapper/>);

        const addButton = getByTestId('add-beer-button');
        fireEvent.press(addButton);

        expect(alertSpy).toHaveBeenCalledWith(
            'Error',
            'Please enter a beer item',
            {text: 'Ok'}
        );
        alertSpy.mockRestore();
    });
});