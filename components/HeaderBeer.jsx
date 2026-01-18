import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons} from '@expo/vector-icons';

const HeaderBeer = ({title}) => {
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons name="beer" size={28} color="#5D4037" style={styles.icon}/>
      <Text style={styles.text}>{title}</Text>
      <MaterialCommunityIcons name="beer" size={28} color="#5D4037" style={styles.icon}/>
    </View>
  )
};

const styles = StyleSheet.create({
    header: {
        height: 90,
        paddingTop: 10,
        backgroundColor: '#FFB300',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 4,
        borderBottomColor: '#F5F5F5',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        
    },

    text: {
        color: '#3E2723',
        fontSize: 35,
        fontWeight: '900',
        letterSpacing: 2,
        marginHorizontal: 15,
        
    },

    icon: {
      opacity: 0.8,
    },

});


export default HeaderBeer;