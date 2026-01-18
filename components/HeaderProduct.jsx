import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const HeaderProduct = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({

    header: {
        
        padding: 15,
        paddingBottom: 15,
        backgroundColor: '#f8f9fa',
    },

    text: {
        color: 'black',
        fontSize: 23,
        textAlign: 'center',
        
    },

});

export default HeaderProduct;