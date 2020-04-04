import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GameButton from '../components/MainButton';
import Card from '../components/Card';
import NumContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';

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
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
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
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNum.toString(), ...curPastGuesses])
    };
    useEffect(() => {
        if (currentGuess === props.userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);
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
            <View style={styles.listItem}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))
                    }
                </ScrollView> */}
                <FlatList
                    keyExtractor={(item) => item}
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
        // marginTop: 20,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%',
        height: 90
    },
    numContainer: {
        marginTop: 20,
        height: 60
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
        // flex: 1,
        width: 300,
        height: 500,
        // borderWidth: 1,
        // borderColor: 'black',
        marginTop: 20,
        // alignItems: 'center',
        // justifyContent: 'flex-end'
    },
    list: {
        flexGrow: 1,
        // flex: 1,
        // width: 300,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        width: '40%',
        alignItems: 'center'
    }
});

export default GameScreen;