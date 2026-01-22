import { LayoutAnimation } from "react-native";

export const triggerLayoutAnimation = () => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
};