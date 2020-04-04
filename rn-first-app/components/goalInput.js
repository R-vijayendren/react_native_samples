import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Modal } from 'react-native';

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal('');
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter the goal"
          style={styles.inputField}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonBox}>
          <View style={{ width: 80 }}>
            <Button title="Cancle" color="red" onPress={props.onCancle} />
          </View>
          <View style={{ width: 80 }}>
            <Button title="Add" onPress={addGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputField: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 200,
    marginBottom: 20,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200
  },
});

export default GoalInput