import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

const ReceipScreen = () => {
  const route = useRoute();
  const { receip } = route.params;
  console.log(receip);

  return (
    <ScrollView style={styles.parents}>
      <View style={styles.parents2}>
        <Text style={styles.title}>{receip?.title}</Text>
        <Text style={styles.difficulty}>{receip?.difficulty}</Text>
        <Text style={styles.description}>{receip?.description}</Text>
      </View>
    </ScrollView>
  )
}

export default ReceipScreen

const styles = StyleSheet.create({

  parents: {
    // flex: 1,
    // justifyContent: "center",
    backgroundColor: "#2E2B28",

  },
  title: {
    fontSize: 25,
    fontWeight: 700,
    color: "#F8E9D0",
    marginBottom: '2%'

  },
  description: {
    fontSize: 16,
    fontWeight: 500,
    color: "#F8E9D0",
    marginBottom: '8%'
  }
  , difficulty: {
    color: "#2E8B57",
    fontSize: 14,
    fontWeight: 800
  },
  parents2: {
    backgroundColor: "#2E2B28",
    marginHorizontal: "2%",
    marginVertical: "2%",
    paddingVertical: "2%",
    paddingHorizontal: "2%",
    flex: 0.9
  }
})