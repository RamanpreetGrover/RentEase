// This screen lets the tenant submit a maintenance request to Firestore

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods

const MaintenanceScreen = () => {
  // setting up states to hold form values
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [unit, setUnit] = useState('');

  // function to handle when user taps Submit
  const handleSubmit = async () => {
    // make sure required fields are not empty
    if (!name || !issue) {
      Alert.alert('Please fill in your name and issue description.');
      return;
    }

    try {
      // this sends the form data to Firebase Firestore
      await addDoc(collection(db, 'maintenanceRequests'), {
        name,              // tenant name
        issue,             // issue description
        unit,              // optional unit #
        submittedAt: new Date().toISOString(), // time of request
      });

      // show success message and reset form
      Alert.alert('Request submitted successfully!');
      setName('');
      setIssue('');
      setUnit('');
    } catch (error) {
      // show error alert if something goes wrong
      console.error("Error submitting request:", error);
      Alert.alert('Failed to submit request.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Submit a Maintenance Request</Text>

      {/* input for tenant name */}
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      {/* optional input for unit number */}
      <TextInput
        style={styles.input}
        placeholder="Unit Number (optional)"
        value={unit}
        onChangeText={setUnit}
      />

      {/* input box for describing the issue */}
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Describe the issue"
        value={issue}
        onChangeText={setIssue}
        multiline
      />

      {/* submit button */}
      <Button title="Submit Request" onPress={handleSubmit} />
    </View>
  );
};

// styling for layout and input fields
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default MaintenanceScreen;