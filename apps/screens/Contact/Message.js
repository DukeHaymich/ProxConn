import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from '@rneui/base';

import React from 'react';

import {colors} from '../../scripts/color';

export default function Message({time, isLeft, message, guestIcon, guestName}) {
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
    <View
      style={[
        styles.container,
        isLeft ? {flexDirection: 'row', alignItems: 'center'} : null,
      ]}>
      {isLeft ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'red',
            marginLeft: 10,
          }}>
          <Avatar
            //   activeOpacity={0.2}
            // avatarStyle={styles.userImg}
            containerStyle={styles.ava}
            //   icon={{}}
            //   iconStyle={styles.icon}
            //   imageProps={{}}
            //   onLongPress={() => alert("onLongPress")}
            //   onPress={() => alert("onPress")}
            //   overlayContainerStyle={{}}
            //   placeholderStyle={{}}
            rounded
            size="small"
            source={guestIcon == '' ? null : {uri: guestIcon}}
            title={guestName[0]}
            //   titleStyle={{}}
          />
          <Text style={{fontSize: 15, color: '#878484'}}>{guestName}</Text>
        </View>
      ) : null}
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
  ava: {
    // marginLeft: 10,
    // alignSelf: 'center',
    backgroundColor: 'grey',
    borderColor: colors.background,
    borderWidth: 1,
  },
});
