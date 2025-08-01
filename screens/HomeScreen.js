import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "../styles/styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={dashboardStyles.card}>
        <Text style={styles.text}>3 onboarding tasks pending</Text>
      </View>

      <View style={dashboardStyles.card}>
        <Text style={styles.text}>2 rent payments due</Text>
      </View>

      <View style={dashboardStyles.card}>
        <Text style={styles.text}>1 maintenance ticket open</Text>
      </View>
    </View>
  );
}

const dashboardStyles = StyleSheet.create({
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
