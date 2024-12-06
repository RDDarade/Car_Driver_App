import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ActiveBookingScreen = ({ route }) => {
  // Extract bookingData from route parameters
  const { bookingData } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Booking Details</Text>
      {bookingData ? (
        <View>
          <Text style={styles.detail}>Customer Name: {bookingData.customerName}</Text>
          <Text style={styles.detail}>Mobile Number: {bookingData.mobileNumber}</Text>
          <Text style={styles.detail}>Pickup Address: {bookingData.pickupAddress}</Text>
          <Text style={styles.detail}>Destination Address: {bookingData.destinationAddress}</Text>
          <Text style={styles.detail}>Car Type: {bookingData.carType}</Text>
          <Text style={styles.detail}>Car Name: {bookingData.carName}</Text>
          <Text style={styles.detail}>Ride Type: {bookingData.rideType}</Text>
          <Text style={styles.detail}>Driver DA: {bookingData.driverDA}</Text>
          <Text style={styles.detail}>Rate Per Km: {bookingData.ratePerKm}</Text>
          <Text style={styles.detail}>Distance: {bookingData.distance} km</Text>
          <Text style={styles.detail}>Price: ${bookingData.price}</Text>
          <Text style={styles.detail}>
            Female Driver Needed: {bookingData.femaleDriverNeed ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.detail}>Pickup Date: {bookingData.pickupDate.toDateString()}</Text>
          {bookingData.rideType === 'two_way' && (
            <Text style={styles.detail}>
              Return Date: {bookingData.returnDate.toDateString()}
            </Text>
          )}
        </View>
      ) : (
        <Text style={styles.noData}>No booking details available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  noData: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ActiveBookingScreen;
