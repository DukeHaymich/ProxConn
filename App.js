import React from 'react';
import {setCustomText} from 'react-native-global-props';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';

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
    </Provider>
    // <Toast
    //     // config={toastConfig}
    // />
  );
}
