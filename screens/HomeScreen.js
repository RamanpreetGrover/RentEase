import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles, { COLORS } from "../styles/styles";
import CustomButton from "../components/CustomButton";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { justifyContent: "flex-start" },
      ]}
    >
      <Text style={styles.title}>Welcome to RentEase</Text>

      <Text style={styles.sectionTitle}>Features</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Onboarding Checklist"
          onPress={() => navigation.navigate("Onboarding")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Rent Tracker"
          onPress={() => navigation.navigate("Rent Tracker")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Maintenance Request"
          onPress={() => navigation.navigate("Maintenance")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Help & Support"
          onPress={() => navigation.navigate("Help")}
        />
      </View>
    </ScrollView>
  );
}
