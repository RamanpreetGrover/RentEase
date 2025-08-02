// App.js
// Loads TED fonts, sets up Redux, tab navigation, and splash screen handling

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Screens
import Dashboard from "./screens/HomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import RentTrackerScreen from "./screens/RentTrackerScreen";
import MaintenanceScreen from "./screens/MaintenanceScreen";
import HelpScreen from "./screens/HelpScreen";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function App() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "TedNext-Regular": require("./assets/fonts/TedNext-Regular.otf"),
    "TedNext-Bold": require("./assets/fonts/TedNext-Bold.otf"),
    "TedNext-Italic": require("./assets/fonts/TedNext-Italic.otf"),
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Show nothing while fonts load
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
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
              fontFamily: "TedNext-Regular", // Use TED font in tab labels
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
    </Provider>
  );
}
