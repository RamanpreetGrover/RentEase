// HelpScreen.js
// This screen displays landlord help resources from an API, and includes
// interactive buttons for Chat Support and Live Agent, matching the app's layout.

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  LayoutAnimation,
  StyleSheet,
  UIManager,
  Platform,
  FlatList,
  Modal,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native";
import styles, { COLORS } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

// Enable layout animations on Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HelpScreen() {
  // API and dropdown states
  const [helpSections, setHelpSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Chat modal states
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");

  const API_URL = "https://mockfast.io/backend/apitemplate/get/WY0FUFAFMZ";

  // Fetch resources on mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setHelpSections(json);
      } catch (error) {
        console.error("Failed to fetch help resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Toggle open/close state for dropdown
  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Render each link in a category
  const renderResources = (resources) =>
    resources.map((item, idx) => (
      <TouchableOpacity
        key={idx}
        style={dropdownStyles.linkCard}
        onPress={() => Linking.openURL(item.url)}
      >
        <Text style={dropdownStyles.linkText}>{item.title}</Text>
      </TouchableOpacity>
    ));

  // Handle chat submission
  const handleSend = () => {
    if (!chatMsg.trim()) {
      Alert.alert("Empty", "Please enter a message.");
      return;
    }
    Alert.alert("Sent", "Your message has been sent!");
    setChatMsg("");
    setChatOpen(false);
  };

  // Handle live agent popup
  const handleLiveAgent = () => {
    Alert.alert(
      "Live Agent",
      "Call us at 1-800-RENT-EZ or email help@rentease.com"
    );
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor: "transparent" }]}>
          {/* Page title */}
          <Text style={styles.title}>Helpful Landlord Resources</Text>

          {/* Loading spinner or dropdown content */}
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <FlatList
              data={helpSections}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={dropdownStyles.section}>
                  <TouchableOpacity
                    style={dropdownStyles.dropdownHeader}
                    onPress={() => toggleExpand(index)}
                  >
                    <Text style={dropdownStyles.dropdownTitle}>
                      {item.category}
                    </Text>
                    <Text style={{ color: COLORS.secondary }}>
                      {expandedIndex === index ? "▲" : "▼"}
                    </Text>
                  </TouchableOpacity>
                  {expandedIndex === index && renderResources(item.resources)}
                </View>
              )}
            />
          )}

          {/* Quick Action Buttons */}
          <View style={quickStyles.quickActions}>
            {/* Chat Button */}
            <TouchableOpacity
              style={quickStyles.actionBtn}
              onPress={() => setChatOpen(true)}
            >
              <Text style={quickStyles.actionIcon}>💬</Text>
              <Text style={quickStyles.actionLabel}>Chat Support</Text>
            </TouchableOpacity>

            {/* Live Agent Button */}
            <TouchableOpacity
              style={quickStyles.actionBtn}
              onPress={handleLiveAgent}
            >
              <Text style={quickStyles.actionIcon}>👤</Text>
              <Text style={quickStyles.actionLabel}>Live Agent</Text>
            </TouchableOpacity>
          </View>

          {/* Chat Modal */}
          <Modal visible={chatOpen} animationType="slide" transparent>
            <View style={quickStyles.modalOverlay}>
              <View style={quickStyles.modalContainer}>
                <Text style={styles.sectionTitle}>Chat with Support</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type your message..."
                  value={chatMsg}
                  onChangeText={setChatMsg}
                />
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity
                    style={quickStyles.modalButton}
                    onPress={handleSend}
                  >
                    <Text style={quickStyles.modalButtonText}>Send</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      quickStyles.modalButton,
                      { backgroundColor: "#aaa" },
                    ]}
                    onPress={() => setChatOpen(false)}
                  >
                    <Text style={quickStyles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Dropdown styles
const dropdownStyles = StyleSheet.create({
  section: {
    width: "90%",
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    alignSelf: "center",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  linkCard: {
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: COLORS.secondary,
  },
  linkText: {
    fontSize: 14,
    color: COLORS.secondary,
  },
});

// Button + modal styling
const quickStyles = StyleSheet.create({
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 24,
    width: "100%",
    gap: 16,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  actionIcon: {
    fontSize: 24,
    color: COLORS.secondary,
  },
  actionLabel: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  modalButtonText: {
    color: COLORS.background,
    fontWeight: "bold",
  },
});
