import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {colors} from '../../script/color';

export default function Message({time, isLeft, message}) {
  const isOnLeft = type => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 0,
      };
    } else if (isLeft && type === 'message') {
      return {
        color: '#000',
      };
    } else if (isLeft && type === 'time') {
      return {
        color: 'darkgray',
      };
    } else {
      return {
        borderTopRightRadius: 0,
      };
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.messageContainer, isOnLeft('messageContainer')]}>
        <View style={styles.messageView}>
          <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={[styles.time, isOnLeft('time')]}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: colors.primary,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    // alignItems: 'flex-end',
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  message: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  time: {
    color: 'lightgray',
    alignSelf: 'flex-end',
    fontSize: 10,
  },
});
