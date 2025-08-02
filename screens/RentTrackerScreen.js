// RentTrackerScreen.js
// This screen fetches rent payment history from Firestore and uses Redux to store the state

import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firebase DB
import styles, { COLORS } from "../styles/styles";

// Redux actions
import { setPayments, setLoading, setError } from "../redux/rentSlice";

import { SafeAreaView } from "react-native-safe-area-context";

export default function RentTrackerScreen() {
  const dispatch = useDispatch(); // used to update Redux store

  // select rent data from Redux store
  const { payments, loading } = useSelector((state) => state.rent);

  // fetch rent data from Firebase when screen loads
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true)); // show loader while fetching

      try {
        const rentCollection = collection(db, "rentPayments");
        const snapshot = await getDocs(rentCollection);
        const data = snapshot.docs.map((doc) => doc.data());

        dispatch(setPayments(data)); // save to Redux
      } catch (error) {
        dispatch(setError("Failed to load rent data"));
        console.error("Error fetching rent data:", error);
      } finally {
        dispatch(setLoading(false)); // hide loader
      }
    };

    fetchData();
  }, []);

  // UI for each rent payment card
  const renderItem = ({ item }) => (
    <View style={rentStyles.card}>
      <View style={rentStyles.cardLeft}>
        <Text style={rentStyles.tenant}>{item.tenantName}</Text>
        <Text style={rentStyles.month}>{item.month}</Text>
      </View>
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Rent Payments</Text>

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
  );
}

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
