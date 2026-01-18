import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from "../app/index";
import { SettingsProvider } from "../context/SettingsContext";
import { useRouter } from "expo-router";

const mockReplace = jest.fn();

// 1. Mock expo-router: The test environment isn't a real phone, 
// so we 'fake' the router so it doesn't error ou
//jest.mock('expo-router', () => ({
//    useRouter: () => ({
//        replace: jest.fn()
//    }),
//}));

jest.mock('expo-router', () => ({
    useRouter: () => ({
        replace: mockReplace
    }),
}));

describe('Welcom Screen UI Tests', () => {
    it('should show the "Get Started" button text', () => {
        // 2. Wrap the component in SettingsProvider because it uses useSettings()
        const { getByText } = render(
            <SettingsProvider>
                <WelcomeScreen/>
            </SettingsProvider>
        );

        // 3. Search for the text. Using a Regex (/.../i) makes it case-insensitive

        const buttonText = getByText(/Get Started/i);

        // 4. Assert: If it finds the text, the test passes!
        expect(buttonText).toBeTruthy();
    });

    it('should render the shopping cart emoji', () => {
        const { getByText } = render(
            <SettingsProvider>
                <WelcomeScreen/>
            </SettingsProvider>
        );

        expect(getByText('✨')).toBeTruthy();
    });

    it('should navigate to /home when the button is pressed', () => {
        const { getByText } = render(
            <SettingsProvider>
                <WelcomeScreen/>
            </SettingsProvider>
        );

        const button = getByText(/Get Started/i);
        fireEvent.press(button);
        expect(mockReplace).toHaveBeenCalledWith('/home');
    });
});