// OnboardingScreen.js
// This upgraded screen collects tenant onboarding data and saves it to Firestore.

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebaseConfig"; // import Firestore DB
import { collection, addDoc } from "firebase/firestore";
import styles from "../styles/styles"; // shared global styles

export default function OnboardingScreen() {
  const [fullName, setFullName] = useState("");
  const [idUploaded, setIdUploaded] = useState(false);
  const [tasks, setTasks] = useState({
    leaseSigned: false,
    rentDeposited: false,
    welcomeFormFilled: false,
  });

  // Toggle individual checklist tasks
  const toggleTask = (key) => {
    setTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Simulate an ID upload (just a UI toggle)
  const handleUploadID = () => {
    setIdUploaded(true);
    Alert.alert("ID Upload", "ID uploaded successfully!");
  };

  // Determine if onboarding is fully complete
  const allTasksCompleted =
    fullName.trim() !== "" &&
    idUploaded &&
    Object.values(tasks).every(Boolean);

  // Submit all data to Firebase Firestore
  const handleSubmit = async () => {
    if (!allTasksCompleted) {
      Alert.alert("Incomplete", "Please complete all onboarding steps first.");
      return;
    }

    try {
      await addDoc(collection(db, "onboardingSubmissions"), {
        name: fullName,
        idUploaded,
        ...tasks,
        submittedAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Your onboarding form has been submitted!");
      // Reset form
      setFullName("");
      setIdUploaded(false);
      setTasks({
        leaseSigned: false,
        rentDeposited: false,
        welcomeFormFilled: false,
      });
    } catch (error) {
      console.error("Error submitting onboarding:", error);
      Alert.alert("Error", "Failed to submit onboarding. Try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container, localStyles.wrapper]}>
          {/* Title */}
          <Text style={styles.title}>Complete Your Onboarding</Text>

          {/* Full Name */}
          <TextInput
            style={styles.textInput}
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* ID Upload Section */}
          <View style={styles.imageUploadContainer}>
            {idUploaded ? (
              <Ionicons name="checkmark-circle" size={40} color="green" />
            ) : (
              <Pressable onPress={handleUploadID}>
                <Ionicons name="cloud-upload-outline" size={40} color="#666" />
              </Pressable>
            )}
          </View>
          <Text style={styles.text}>Upload a government-issued ID</Text>

          {/* Task Checklist */}
          <Text style={styles.sectionTitle}>Checklist:</Text>

          {[
            { key: "leaseSigned", label: "Lease signed" },
            { key: "rentDeposited", label: "Rent deposited" },
            { key: "welcomeFormFilled", label: "Welcome form filled" },
          ].map((item) => (
            <Pressable
              key={item.key}
              onPress={() => toggleTask(item.key)}
              style={localStyles.taskItem}
            >
              <Ionicons
                name={
                  tasks[item.key] ? "checkbox-outline" : "square-outline"
                }
                size={24}
                color="#333"
              />
              <Text style={localStyles.taskLabel}>{item.label}</Text>
            </Pressable>
          ))}

          {/* Completion Status */}
          <Text style={{ marginTop: 20, fontSize: 16 }}>
            {allTasksCompleted
              ? "✅ All steps complete!"
              : "🟡 Please complete all onboarding steps"}
          </Text>

          {/* Submit Button */}
          <View style={{ marginTop: 20, width: "80%" }}>
            <Button title="Submit Onboarding" onPress={handleSubmit} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Local styles just for this screen
const localStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "80%",
  },
  taskLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});
