
// Loads TED fonts and sets up tab-based navigation for RentEase

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

// Screens
import Dashboard from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import RentTrackerScreen from "./screens/RentTrackerScreen";
import MaintenanceScreen from "./screens/MaintenanceScreen";
import HelpScreen from "./screens/HelpScreen";

// Set up tab navigation
const Tab = createBottomTabNavigator();

export default function App() {
  // Load TED font files from assets/fonts
  const [fontsLoaded] = useFonts({
    "TedNext-Regular": require("./assets/fonts/TedNext-Regular.otf"),
    "TedNext-Bold": require("./assets/fonts/TedNext-Bold.otf"),
    "TedNext-Italic": require("./assets/fonts/TedNext-Italic.otf"), // optional
  });

  // Splash while fonts are loading
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          // Assign an icon for each tab
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case "Onboarding":
                iconName = "document-text-outline";
                break;
              case "Rent":
                iconName = "cash-outline";
                break;
              case "Dashboard":
                iconName = "home-outline";
                break;
              case "Maintenance":
                iconName = "construct-outline";
                break;
              case "Help":
                iconName = "help-circle-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#5AF480",
          tabBarInactiveTintColor: "#888",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#F8F7F9",
            height: 70,
            paddingBottom: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "TedNext-Regular", // apply font to tab labels
          },
        })}
      >
        <Tab.Screen name="Onboarding" component={OnboardingScreen} />
        <Tab.Screen name="Rent" component={RentTrackerScreen} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Maintenance" component={MaintenanceScreen} />
        <Tab.Screen name="Help" component={HelpScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
