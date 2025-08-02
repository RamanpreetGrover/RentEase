// RentTrackerScreen.js
// This screen shows a summary of all tenant rent payments from Firestore,
// styled to match the rest of the app's background and layout.

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import styles, { COLORS } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RentTrackerScreen() {
  const [payments, setPayments] = useState([]); // store rent data
  const [loading, setLoading] = useState(true); // loading spinner

  // This function fetches rent documents from Firestore
  const fetchRentPayments = async () => {
    try {
      const rentCollection = collection(db, "rentPayments");
      const snapshot = await getDocs(rentCollection);
      const data = snapshot.docs.map((doc) => doc.data());
      setPayments(data);
    } catch (error) {
      console.error("Error fetching rent data:", error);
    } finally {
      setLoading(false); // hide spinner
    }
  };

  useEffect(() => {
    fetchRentPayments();
  }, []);

  // Renders each rent item in a horizontal card
  const renderItem = ({ item }) => (
    <View style={rentStyles.card}>
      {/* Left side of card: name + month */}
      <View style={rentStyles.cardLeft}>
        <Text style={rentStyles.tenant}>{item.tenantName}</Text>
        <Text style={rentStyles.month}>{item.month}</Text>
      </View>

      {/* Right side: amount + payment status */}
      <View style={rentStyles.cardRight}>
        <Text style={rentStyles.amount}>${item.amount}</Text>
        <View
          style={[
            rentStyles.statusChip,
            {
              backgroundColor:
                item.status === "Paid"
                  ? "#d4f8e8"
                  : item.status === "Overdue"
                  ? "#fdecea"
                  : "#fff4cc",
            },
          ]}
        >
          <Text
            style={{
              color:
                item.status === "Paid"
                  ? "green"
                  : item.status === "Overdue"
                  ? "#e53935"
                  : "#e6ac00",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    // Use same background and layout as all other screens
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor: "transparent" }]}>
          <Text style={styles.title}>Rent Payments</Text>

          {/* Spinner while loading data */}
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <FlatList
              data={payments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Custom styles for rent card layout
const rentStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardLeft: {
    flexDirection: "column",
  },
  cardRight: {
    alignItems: "flex-end",
  },
  tenant: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  month: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondary,
    marginBottom: 6,
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
