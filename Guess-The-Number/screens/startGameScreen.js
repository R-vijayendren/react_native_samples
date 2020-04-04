import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Button,
  TouchableWithoutFeedback, Keyboard, Alert, Dimensions
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import GameButton from '../components/MainButton';

const StartScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNum, setSelectedNum] = useState();
  const numberHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetHandler = () => {
    setEnteredValue('');
  };

  const confirmHandler = () => {
    const chosenNum = parseInt(enteredValue);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: resetHandler }]);
      return;
    }
    setConfirmed(true);
    setSelectedNum(parseInt(chosenNum));
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.selectedContainer}>
        <TitleText>You Have Selected</TitleText>
        <NumContainer>{selectedNum}</NumContainer>
        <GameButton onPress={() => props.onStartGame(selectedNum)}>
          Start Game
        </GameButton>
      </Card>
    );
  }

  return (
    // <TouchableWithoutFeedback 
    //   onPress={() => {
    //     Keyboard.dismiss();
    //   }}
    // >
    <View style={styles.startScreen}>
      <Text style={styles.title}>Start a New Game..!</Text>
      <Card style={styles.inputContainer}>
        <BodyText>Select a Number</BodyText>
        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='number-pad'
          maxLength={2}
          onChangeText={numberHandler}
          value={enteredValue}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Reset" color={Colors.secondary} onPress={resetHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Confrim" color={Colors.accent} onPress={confirmHandler} />
          </View>
        </View>
      </Card>
      {confirmedOutput}
    </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  startScreen: {
    flex: 1,
    padding: 10,
    marginTop: 50,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  inputContainer: {
    minWidth: 300,
    width: '80%',
    height: 150,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 8,
    padding: 20,
    marginTop: 10,
    borderRadius: 10
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    // marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    // width: 100,
    width: Dimensions.get('window').width / 4,
  },
  selectedContainer: {
    height: 200,
    marginTop: 10,
    alignItems: 'center',
  }
});

export default StartScreen;