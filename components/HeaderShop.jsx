import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const HeaderShop = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingBottom: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'white',
    },

});

export default HeaderShop;