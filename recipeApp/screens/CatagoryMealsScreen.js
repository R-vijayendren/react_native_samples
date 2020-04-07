import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CatagoryMealScreen = props => {
    return (
        < View style={styles.screen} >
            <Text>Catagory Meal Screen !!!</Text>
        </View >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default CatagoryMealScreen;