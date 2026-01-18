import {Text, StyleSheet, View } from "react-native";


const HeaderNote = ({title}) => {
    return(
        <View style={styles.header}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};




const styles = StyleSheet.create({

    header: {
        height: 60,
        padding: 15,
        paddingBottom: 15, 
        backgroundColor: 'purple',
    },
    
    text: {
        color: 'green',
        fontSize: 23,
        textAlign: 'center',
    },
});

export default HeaderNote;