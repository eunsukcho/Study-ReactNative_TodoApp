import React from 'react';
import {View, StyleSheet} from 'react-native';
import TabBarItem from './TabBarItem';

const TabBar = ({_setType, type}) => (
  <View style={styles.container}>
    <TabBarItem type={type} title="All" _setType={() => _setType('All')} />
    <TabBarItem
      type={type}
      border
      title="Active"
      _setType={() => _setType('Active')}
    />
    <TabBarItem
      type={type}
      border
      title="Complete"
      _setType={() => _setType('Complete')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
});

export default TabBar;
