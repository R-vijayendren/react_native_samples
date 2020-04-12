import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback
} from 'react-native';

const CategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp
        style={styles.touchableCont}
        activeOpacity={0.6}
        onPress={props.onSelect} >
        <View style={{ ...styles.container, ...{ backgroundColor: props.color } }} >
          <Text style={styles.title} numberOfLines={2} >{props.title}</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  touchableCont: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderTopEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    /* ios features */
    // shadowColor: 'black',
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 10,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right',
  },
});

export default CategoryGridTile;