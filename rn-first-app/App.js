import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import GoalItem from './components/goalItem';
import GoalInput from './components/goalInput';

export default function App() {


  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [...currentGoals, { id: Math.random().toString(), value: goalTitle }]);
    setIsAddMode(false);
  };

  const deleteGoalHandler = goalID => {
    setCourseGoals(currentGoals => {
      return (
        currentGoals.filter((goal) => goal.id !== goalID)
      );
    })
  };

  const cancleGoalHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="+ Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancle={cancleGoalHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            goalItems={itemData.item.value}
            onDelete={deleteGoalHandler}
            id={itemData.item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  listContainer: {
    marginTop: 20,
    height: '90%',
    backgroundColor: 'grey',
  },
});
