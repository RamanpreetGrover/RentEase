import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import styles, { COLORS } from "../styles/styles";

const tasks = [
  { id: "1", title: "Submit ID Proof" },
  { id: "2", title: "Pay Rent Deposit" },
  { id: "3", title: "Sign Lease Agreement" },
  { id: "4", title: "Setup Utilities" },
];

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding Checklist</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={[styles.text, { marginBottom: 10 }]}>
            • {item.title}
          </Text>
        )}
      />
    </View>
  );
}
