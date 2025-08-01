import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../styles/styles";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Image } from "react-native";

export default function MaintenanceScreen() {
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    console.log("Maintenance Request Submitted:", { issue, location });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maintenance Request</Text>

      {/* Image Upload Button */}
      <TouchableOpacity
        style={styles.imageUploadContainer}
        onPress={() => console.log("Open Image Picker")}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <Ionicons name="add-circle-outline" size={50} color="#ccc" />
        )}
      </TouchableOpacity>

      {/* Form Inputs */}
      <TextInput
        style={styles.textInput}
        placeholder="Issue Description"
        value={issue}
        onChangeText={setIssue}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Location (e.g., Kitchen, Bathroom)"
        value={location}
        onChangeText={setLocation}
      />

      <CustomButton title="Submit Request" onPress={handleSubmit} />
    </View>
  );
}
