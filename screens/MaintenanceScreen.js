// MaintenanceScreen.js
// This screen lets tenants submit maintenance requests to Firestore.
// We've applied consistent layout and visuals to match other screens.

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import styles from '../styles/styles'; // shared styles (textInput, container, title)

export default function MaintenanceScreen() {
  // setting up local states for user input
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [unit, setUnit] = useState('');

  // when the user taps "Submit"
  const handleSubmit = async () => {
    if (!name || !issue) {
      Alert.alert('Please fill in your name and issue description.');
      return;
    }

    try {
      // send request to Firebase Firestore
      await addDoc(collection(db, 'maintenanceRequests'), {
        name,
        issue,
        unit,
        submittedAt: new Date().toISOString(),
      });

      Alert.alert('Request submitted successfully!');
      setName('');
      setIssue('');
      setUnit('');
    } catch (error) {
      console.error("Error submitting request:", error);
      Alert.alert('Failed to submit request.');
    }
  };

  return (
    // apply the same background image as other screens
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
          {/* Page title */}
          <Text style={styles.title}>Submit a Maintenance Request</Text>

          {/* Input fields with same styling */}
          <TextInput
            style={styles.textInput}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Unit Number (optional)"
            value={unit}
            onChangeText={setUnit}
          />

          <TextInput
            style={[styles.textInput, { height: 100 }]}
            placeholder="Describe the issue"
            value={issue}
            onChangeText={setIssue}
            multiline
          />

          {/* Submit button */}
          <Button title="Submit Request" onPress={handleSubmit} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
