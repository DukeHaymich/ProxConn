import React from 'react';
import 'react-native-gesture-handler';
import {setCustomText} from 'react-native-global-props';
import {Provider} from 'react-redux';
import Toast, {BaseToast} from 'react-native-toast-message';

import Routes from './apps/routes/Routes';
import store from './apps/redux/store';

export default function App() {
  setCustomText({
    style: {
      fontSize: 16,
      fontFamily: 'Roboto',
      color: 'black',
    },
  });

  return (
    <Provider store={store}>
      <Routes />
      <Toast config={toastConfig} />
    </Provider>
  );
}

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#148F00'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: '700',
      }}
      text2Style={{
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '500',
        color: '#777777',
      }}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'lightblue'}}
      contentContainerStyle={{
        paddingHorizontal: 15,
        overflow: 'scroll',
      }}
      text1Style={{
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: '700',
      }}
      text2Style={{
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '500',
        color: '#777777',
      }}
    />
  ),
};
