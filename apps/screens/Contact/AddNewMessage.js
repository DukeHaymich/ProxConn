import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function Header({navigation}) {
  // function goBack() {
  //     navigation.pop();
  // }

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <FontAwesome5
          name="chevron-left"
          color="#6100FF"
          size={32}
          style={styles.iconButton}
        />
      </TouchableOpacity>
      <Text style={styles.headerLabel}>Send new message to</Text>
    </View>
  );
}

export default function AddNewMessage({navigation}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.screen}>
        <Header navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    backgroundColor: '#FFCC00',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLabel: {
    color: '#6100FF',
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  iconButton: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
