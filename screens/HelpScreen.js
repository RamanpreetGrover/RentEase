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
} from "react-native";
import styles, { COLORS } from "../styles/styles";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HelpScreen() {
  const [helpSections, setHelpSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const API_URL = "https://mockfast.io/backend/apitemplate/get/WY0FUFAFMZ";

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

  useEffect(() => {
    fetchResources();
  }, []);

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Helpful Landlord Resources</Text>

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

      {/* Horizontal Button Row */}
      <View style={quickStyles.quickActions}>
        <TouchableOpacity style={quickStyles.actionBtn}>
          <Text style={quickStyles.actionIcon}>💬</Text>
          <Text style={quickStyles.actionLabel}>Chat Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={quickStyles.actionBtn}>
          <Text style={quickStyles.actionIcon}>👤</Text>
          <Text style={quickStyles.actionLabel}>Live Agent</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
});
