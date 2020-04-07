import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import OverButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';
import Success from '../assets/success.png';

const GameOverScreen = props => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.screen}>
          <Text style={DefaultStyles.titleText}>The Game is Over!</Text>
          <View style={styles.imageContainer}>
            <Image
              source={Success}
              style={styles.image}
            // resizeMode="cover"
            />
          </View>
          <Text style={styles.resultText}>Your phone needed
                {' '}
            <Text style={styles.number}> {props.roundsNumber} </Text>
            {' '}
                rounds to guess the number
                <Text style={styles.number}> {props.userNumber} </Text>
            {' '}
                .
            </Text>
          <View style={styles.newButton}>
            <OverButton onPress={props.onRestart}>New Game</OverButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
    padding: 10,
    alignItems: 'center',
  },
  newButton: {
    marginTop: 30,
    width: '50%',
    height: 80,
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    // borderRadius: 150,
    borderBottomLeftRadius: 100,
    borderTopRightRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    marginVertical: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultText: {
    fontSize: 20,
    fontFamily: 'open-sans',
    padding: 20,
    textAlign: 'center',
  },
  number: {
    fontSize: 19,
    color: 'red',
  }
});

export default GameOverScreen;