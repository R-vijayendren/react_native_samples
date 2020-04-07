import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GameButton from '../components/MainButton';
import Card from '../components/Card';
import NumContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
// import { ScreenOrientation } from 'expo';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.guessedContainer}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <Text>{itemData.item}</Text>
    </View>
  );
};

const GameScreen = props => {
  // ScreenOrientation.lockAsycn(ScreenOrientation.OrientationLock.POTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
      Alert.alert('Dont\'t lie..!', 'You know that this is worng...', [{ text: 'sorry', style: 'cancel' }]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNum);
    setPastGuesses(curPastGuesses => [nextNum.toString(), ...curPastGuesses])
  };

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);
    return (() => {
      Dimensions.removeEventListener('change', updateLayout);
    });
  });

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  let listContainerStyle = styles.listItem;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={styles.numContainerLayout}>
          <View style={styles.button}>
            <GameButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </GameButton>
          </View>
          <NumContainer>{currentGuess}</NumContainer>
          <View style={styles.button}>
            <GameButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </GameButton>
          </View>
        </View>
        <View style={listContainerStyle}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      <View style={styles.numContainer}>
        <NumContainer>{currentGuess}</NumContainer>
      </View>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <GameButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </GameButton>
        </View>
        <View style={styles.button}>
          <GameButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </GameButton>
        </View>
      </Card>
      <View style={listContainerStyle}>
        <FlatList
          keyExtractor={(item) => item.toString()}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%',
    height: 90
  },
  numContainer: {
    marginTop: 20,
    height: 60
  },
  numContainerLayout: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    height: 70
  },
  guessedContainer: {
    alignItems: 'center',
    borderColor: '#ccc',
    padding: 15,
    width: 300,
    marginVertical: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    flex: 1,
    width: '80%',
    marginTop: 20,
  },
  listBig: {
    flex: 1,
    width: '60%',
    marginTop: 20,
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    width: '40%',
    alignItems: 'center'
  }
});

export default GameScreen;