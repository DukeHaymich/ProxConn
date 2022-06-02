import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  SectionList,
  TextInput,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from '@rneui/base';
import Toast, {BaseToast} from 'react-native-toast-message';

import {colors} from '../../scripts/color';

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
const data = [
  {
    title: 'Your contacts',
    data: [
      {ava: '', name: 'Mr Đụt'},
      {ava: '', name: 'Duke'},
    ],
  },
  {
    title: 'More people on the net',
    data: [
      {ava: '', name: 'Mr Đàm'},
      {ava: '', name: 'Mr Bean'},
    ],
  },
];

function Card(props) {
  const check = props.index === props.section.data.length - 1;
  const navigation = props.navigation;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Chat', {userName: props.name, ava: props.ava});
      }}
      style={[
        styles.item,
        check
          ? {borderBottomColor: colors.lightGray, borderBottomWidth: 1}
          : null,
      ]}>
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
        size="medium"
        source={props.ava == '' ? null : {uri: props.ava}}
        title={props.name[0]}
        //   titleStyle={{}}
      />
      <View style={check ? styles.itemTextLastChild : styles.itemText}>
        <Text style={styles.textHeader}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function AddNewMessage({navigation}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.screen}>
        <Header navigation={navigation} />
        <View style={styles.searchBar}>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              editable
              placeholder="Enter contact's name here..."
              // placeholderTextColor={}
              // value={username}
              // // returnKeyType='next'
              // // autoFocus={true}
              // // onSubmitEditing={() => {}}
              // onFocus={() => dispatch(setFlag(true))}
              // onBlur={() => dispatch(setFlag(false))}
              // onChangeText={(value) => setUsername(value)}
              // blurOnSubmit={false}
              // ref={refInputSearch}
              onChangeText={value => {}}
              style={styles.input}
            />
          </View>
          <Text style={styles.linkText}>or</Text>
          <View style={styles.row}>
            <Text style={styles.label}>ID:</Text>
            <TextInput
              editable
              placeholder="Enter contact's ID here..."
              // placeholderTextColor={}
              // value={username}
              // // returnKeyType='next'
              // // autoFocus={true}
              // // onSubmitEditing={() => {}}
              // onFocus={() => dispatch(setFlag(true))}
              // onBlur={() => dispatch(setFlag(false))}
              // onChangeText={(value) => setUsername(value)}
              // blurOnSubmit={false}
              // ref={refInputSearch}
              onChangeText={value => {}}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => {
                Toast.show({
                  type: 'info',
                  text1: 'How to get ID ?',
                  text2:
                    'The ID of a contact can be found in their Profile section, and so is yours.',
                  position: 'top',
                });
              }}>
              <FontAwesome5
                name="question-circle"
                color="#0C88FA"
                size={35}
                solid
                style={[styles.iconButton, {marginLeft: 10}]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <SectionList
          sections={data}
          renderItem={({item, index, section}) => (
            <Card
              {...item}
              index={index}
              section={section}
              navigation={navigation}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.heading}>{title}</Text>
          )}
          // renderSectionHeader={({ section: { title } }) => (
          //     <Text style={styles.heading}>{title}</Text>
          //   )}
          // onEndReachedThreshold={0.3}
          // onEndReached={()=>{
          //     setIsRefreshing(true);
          //     dbCtx.fetchDeviceLog(15,()=>setIsRefreshing(false))
          // }}
          // onRefresh={()=>{
          //     setIsRefreshing(true);
          // }}
          // refreshing={isRefreshing}
        />
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
  searchBar: {
    backgroundColor: colors.primary,
    height: 115,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
  },
  label: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    padding: 5,
    marginLeft: 10,
    paddingLeft: 15,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 35,
    height: 35,
  },
  linkText: {
    fontSize: 16,
    color: 'white',
    fontStyle: 'italic',
  },
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    // backgroundColor: 'green'
  },
  ava: {
    marginLeft: 15,
    // alignSelf: 'center',
    backgroundColor: 'grey',
    borderColor: colors.background,
    borderWidth: 1,
  },
  itemTextLastChild: {
    flex: 1,
    paddingVertical: 15,

    // backgroundColor: 'blue'
  },
  itemText: {
    flex: 1,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  heading: {
    fontWeight: '900',
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 20,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 15,
  },
});
