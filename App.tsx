import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './component/header.js';
import Footer from './component/footer.js';
import Donor from './component/donor.js';
import Recipient from './component/recipient.js';

export default function App() {
  return (
    <View >
      <Header />
      <Donor />
      <Text>-----------------------------</Text>
      <Recipient />
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
