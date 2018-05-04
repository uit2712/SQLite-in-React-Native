/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~sqliteexample.db'})

export default class App extends Component<{}> {
  constructor(props) {
    super(props)

    this.state = {
      petname: "",
    };

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM pet WHERE owner=?', ['Mary'], (tx, results) => {
          var len = results.rows.length;
          if(len > 0) {
            // exists owner name John
            var row = results.rows.item(0);
            this.setState({petname: row.petname});
          }
        });
    });

    ToastAndroid.show('Hello!!', ToastAndroid.SHORT);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SQLite Example</Text>
        <Text>{'Mary \'s pet is ' + this.state.petname}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
