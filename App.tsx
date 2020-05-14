import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from './component/header.js';
import Footer from './component/footer.js';
import Donor from './component/donor.js';
import Recipient from './component/recipient.js';
import logInContext from './component/contextAuth.js';
import SettingsProvider from './component/contextAuth.js';
import Auth from './component/auth.js';
import { Provider } from 'react-redux';
import store from './component/store.js';
import SingForm from './component/singForm.js';

export default function App() {
  return (
    <View >
          <Provider store={store}>
              <Header />
              <SingForm />
              <Auth />
          </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
