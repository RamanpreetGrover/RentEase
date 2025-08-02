// HomeScreen.js
// This is the main dashboard screen that shows summary cards for onboarding,
// rent, and maintenance — now enhanced with a background, interactive cards,
// and a welcome popup message.

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles"; // your shared style sheet

export default function HomeScreen() {
  const navigation = useNavigation(); // used to navigate to other screens when cards are pressed

  // Show welcome popup only when the screen loads
  useEffect(() => {
    Alert.alert(
      "Welcome to RentEase!",
      "Your smart home, made simple.",
      [{ text: "Enter", style: "default" }],
      { cancelable: false }
    );
  }, []);

  return (
    // background image added for aesthetic layout
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={[
            styles.container,
            dashboardStyles.container,
            { backgroundColor: "transparent" }, // remove white overlay
          ]}
        >
          {/* Screen title */}
          <Text style={[styles.title, { marginBottom: 20 }]}>Dashboard</Text>

          {/* Short welcome message below the title */}
          <Text style={dashboardStyles.welcomeMessage}>
            Welcome back! Here's a quick look at your rental activity.
          </Text>

          {/* Card 1: Onboarding */}
          <Pressable onPress={() => navigation.navigate("Onboarding")}>
            <View style={dashboardStyles.card}>
              <Text style={dashboardStyles.cardText}>
                📝 3 onboarding tasks pending
              </Text>
            </View>
          </Pressable>

          {/* Card 2: Rent */}
          <Pressable onPress={() => navigation.navigate("Rent")}>
            <View style={dashboardStyles.card}>
              <Text style={dashboardStyles.cardText}>
                💸 2 rent payments due
              </Text>
            </View>
          </Pressable>

          {/* Card 3: Maintenance */}
          <Pressable onPress={() => navigation.navigate("Maintenance")}>
            <View style={dashboardStyles.card}>
              <Text style={dashboardStyles.cardText}>
                🛠️ 1 maintenance ticket open
              </Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Styling for the dashboard layout and cards
const dashboardStyles = StyleSheet.create({
  container: {
    alignItems: "center", // center all cards horizontally
    justifyContent: "flex-start", // top-aligned content
    paddingTop: 20,
  },
  welcomeMessage: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    fontStyle: "italic",
  },
  card: {
    width: "90%", // card width relative to screen
    padding: 20, // inner spacing
    borderRadius: 15, // rounded corners
    backgroundColor: "#fff", // white background for card
    marginBottom: 15, // spacing between cards
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600", // slightly bold text
  },
});
