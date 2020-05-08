import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Route} from 'react-router-dom';
import Header from './component/header/header.js';
import Auth from './component/auth/auth.js';
import { Provider } from 'react-redux';
import store from './store/';

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
        <Header />
        {/* <Auth /> */}
    </View>
    </Provider>
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
