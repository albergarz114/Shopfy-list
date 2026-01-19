import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { SettingsProvider } from "../context/SettingsContext";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import  NoteScreen  from "../app/notes/notes";

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


const NoteScreenWrapper = () => (
    <SettingsProvider>
        <NoteScreen/>
    </SettingsProvider>
);


describe('NoteScreen UI', () => {

    it('renders the initial list of notes', () => {
        const { getByText } = render(<NoteScreenWrapper/>);

        expect(getByText('Wash the car')).toBeTruthy();
        expect(getByText('Wash the dishes')).toBeTruthy();
        expect(getByText('Take out trash')).toBeTruthy();
    });

    it('adds a new note to the list', () => {

        const { getByPlaceholderText, getByText, getByTestId } = render(<NoteScreenWrapper/>);

        const input = getByPlaceholderText(/Add Note/i);
        const addButton = getByTestId('add-note-button');

        fireEvent.changeText(input, 'Clean the room');
        fireEvent.press(addButton);

        expect(getByText('Clean the room')).toBeTruthy();
    });

    it('deletes a note from the list', () => {
        const { getByTestId, queryByText } = render(<NoteScreenWrapper/>);

        expect(queryByText('Wash the car')).toBeTruthy();

        const deleteBtn = getByTestId('delete-btn-1');
        fireEvent.press(deleteBtn);

        expect(queryByText('Wash the car')).toBeNull();
    });

    
    it('updates a product name via the edit', () => {

        const { getByTestId, getByDisplayValue, queryByText } = render(<NoteScreenWrapper/>);

        const editBtn = getByTestId('edit-btn-2');
        fireEvent.press(editBtn);

        const input = getByDisplayValue('Wash the dishes');

        fireEvent.changeText(input, 'Wash all the dishes');
        const saveBtn = getByTestId('save-btn-2');
        fireEvent.press(saveBtn);

        expect(queryByText('Wash all the dishes')).toBeTruthy();
        expect(queryByText('Wash the dishes')).toBeNull();
    });

    
    it('shows an alert when trying to add an empty note', () => {
        const alertSpy = jest.spyOn(Alert, 'alert');

        const { getByTestId } = render(<NoteScreenWrapper/>);

        const addButton = getByTestId('add-note-button');
        fireEvent.press(addButton);

        expect(alertSpy).toHaveBeenCalledWith(
            'Error',
            'Please enter a note item',
            {text: 'OK'}
        );
        alertSpy.mockRestore();
    });
});