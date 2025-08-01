import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const RentTrackerScreen = () => {
  const [payments, setPayments] = useState([]);

  // This function fetches rent data from the Firebase Firestore
  const fetchRentPayments = async () => {
    try {
      const rentCollection = collection(db, 'rentPayments');
      const snapshot = await getDocs(rentCollection);
      const data = snapshot.docs.map(doc => doc.data());
      setPayments(data); // Save data to state
    } catch (error) {
      console.error("Error fetching rent data:", error);
    }
  };

  // Fetch rent data when the screen loads
  useEffect(() => {
    fetchRentPayments();
  }, []);

  // Each item in the FlatList will display tenant name, amount, and status
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.tenantName}</Text>
      <Text>Month: {item.month}</Text>
      <Text>Amount: ${item.amount}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rent Payment History</Text>
      <FlatList
        data={payments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

// Styling for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemContainer: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RentTrackerScreen;
