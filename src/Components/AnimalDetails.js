import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function AnimalDetail({ route, navigation }) {
  const { animal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{animal.name}</Text>
      <Text>Type: {animal.type}</Text>
      <Text>Age: {animal.age}</Text>
      <Text>Description: {animal.description}</Text>
      <Button title="Voltar para Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
