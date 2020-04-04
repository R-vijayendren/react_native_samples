import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const GoalItem = props => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.listItems}>
        <Text>{props.goalItems}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItems: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'grey',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default GoalItem;