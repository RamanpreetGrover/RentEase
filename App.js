import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from "./screens/HomeScreen"; // rename later to Dashboard.js
import OnboardingScreen from "./screens/OnboardingScreen";
import RentTrackerScreen from "./screens/RentTrackerScreen";
import MaintenanceScreen from "./screens/MaintenanceScreen";
import HelpScreen from "./screens/HelpScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
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
