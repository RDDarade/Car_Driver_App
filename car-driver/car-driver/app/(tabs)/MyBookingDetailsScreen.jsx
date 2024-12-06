import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For back arrow icon

const MyBookingDetailsScreen = () => {
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [driverDA, setDriverDA] = useState('');
  const [ratePerKm, setRatePerKm] = useState('');
  const [driverExtraRate, setDriverExtraRate] = useState('');
  const [distance, setDistance] = useState('');
  const [price, setPrice] = useState('');
  const [femaleDriverNeed, setFemaleDriverNeed] = useState(false);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [carType, setCarType] = useState(null);
  const [carName, setCarName] = useState(null);
  const [rideType, setRideType] = useState(null);
  
  // New state variables for date pickers
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);

  const navigation = useNavigation(); // Get navigation object

  const carTypes = [
    { label: 'Sedan', value: 'sedan' },
    { label: 'SUV', value: 'suv' },
    { label: 'Hatchback', value: 'hatchback' },
    { label: 'Truck', value: 'truck' },
  ];

  const carNames = [
    { label: 'Toyota Camry', value: 'toyota_camry' },
    { label: 'Honda CRV', value: 'honda_crv' },
    { label: 'Ford Explorer', value: 'ford_explorer' },
    { label: 'Chevrolet Silverado', value: 'chevrolet_silverado' },
  ];

  const rideTypes = [
    { label: 'Local', value: 'local' },
    { label: 'One Way', value: 'one_way' },
    { label: 'Two Way', value: 'two_way' },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const calculatePrice = (rate, dist) => {
    const rateValue = parseFloat(rate) || 0;
    const distanceValue = parseFloat(dist) || 0;
    const calculatedPrice = rateValue * distanceValue;
    setPrice(calculatedPrice.toFixed(2).toString());
  };

  const handleAddBooking = () => {
    const bookingData = {
      customerName,
      mobileNumber,
      pickupAddress,
      destinationAddress,
      carType,
      carName,
      rideType,
      driverDA,
      ratePerKm,
      driverExtraRate,
      distance,
      price,
      femaleDriverNeed,
      pickupDate,
      returnDate,
    };
  
     // Navigate to ActiveBookingScreen with bookingData
  navigation.navigate('ActiveBookingScreen', { bookingData });
  
    // Reset all form fields to their initial state
    setCustomerName('');
    setMobileNumber('');
    setPickupAddress('');
    setDestinationAddress('');
    setCarType(null);
    setCarName(null);
    setRideType(null);
    setDriverDA('');
    setRatePerKm('');
    setDriverExtraRate('');
    setDistance('');
    setPrice('');
    setFemaleDriverNeed(false);
    setPickupDate(new Date());
    setReturnDate(new Date());
  
    // Optionally display a confirmation message to the user
    alert('Booking has been added successfully and the form has been reset.');
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Go back using navigation
      >
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Add Booking</Text>

      {/* Customer Name & Mobile Number */}
      <View style={styles.row}>
        <TextInput
          label="Customer Name"
          value={customerName}
          onChangeText={setCustomerName}
          style={[styles.input, styles.flexHalf, { marginRight: 10 }]}
          mode="outlined"
        />
        <TextInput
          label="Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          style={[styles.input, styles.flexHalf]}
          mode="outlined"
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      {/* Pickup Address & Destination Address */}
      <View style={styles.row}>
        <TextInput
          label="Pickup Address"
          value={pickupAddress}
          onChangeText={setPickupAddress}
          style={[styles.input, styles.flexHalf, { marginRight: 10 }]}
          mode="outlined"
        />
        <TextInput
          label="Destination Address"
          value={destinationAddress}
          onChangeText={setDestinationAddress}
          style={[styles.input, styles.flexHalf]}
          mode="outlined"
        />
      </View>

      {/* Dropdown for Ride Type */}
      <Dropdown
        style={styles.dropdown}
        data={rideTypes}
        labelField="label"
        valueField="value"
        placeholder="Select Ride Type"
        value={rideType}
        onChange={(item) => setRideType(item.value)}
      />

      {/* Conditional Date Pickers */}
      {rideType && (
        <Button
          onPress={() => setShowPickupDatePicker(true)}
          mode="outlined"
          style={styles.dateButton}
          icon="calendar"
        >
          Pickup Date: {formatDate(pickupDate)}
        </Button>
      )}
      {showPickupDatePicker && (
        <DateTimePicker
          value={pickupDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPickupDatePicker(false);
            if (selectedDate) setPickupDate(selectedDate);
          }}
        />
      )}

      {/* Only show Return Date if "Two Way" is selected */}
      {rideType === 'two_way' && (
        <Button
          onPress={() => setShowReturnDatePicker(true)}
          mode="outlined"
          style={styles.dateButton}
          icon="calendar"
        >
          Return Date: {formatDate(returnDate)}
        </Button>
      )}
      {showReturnDatePicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowReturnDatePicker(false);
            if (selectedDate) setReturnDate(selectedDate);
          }}
        />
      )}

      {/* Dropdowns for Car Type and Car Name */}
      <Dropdown
        style={styles.dropdown}
        data={carTypes}
        labelField="label"
        valueField="value"
        placeholder="Select Car Type"
        value={carType}
        onChange={(item) => setCarType(item.value)}
      />
      <Dropdown
        style={styles.dropdown}
        data={carNames}
        labelField="label"
        valueField="value"
        placeholder="Select Car Name"
        value={carName}
        onChange={(item) => setCarName(item.value)}
      />

      <TextInput
        label="Driver DA"
        value={driverDA}
        onChangeText={setDriverDA}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInput
        label="Rate Per/Km"
        value={ratePerKm}
        onChangeText={(value) => {
          setRatePerKm(value);
          calculatePrice(value, distance);
        }}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInput
        label="Distance (in Km)"
        value={distance}
        onChangeText={(value) => {
          setDistance(value);
          calculatePrice(ratePerKm, value);
        }}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <TextInput
        label="Price"
        value={price}
        style={styles.input}
        mode="outlined"
        editable={false}
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={femaleDriverNeed ? 'checked' : 'unchecked'}
          onPress={() => setFemaleDriverNeed(!femaleDriverNeed)}
        />
        <Text style={styles.checkboxLabel}>Female Driver Needed</Text>
      </View>

      <Button
  mode="contained"
  onPress={handleAddBooking}
  style={styles.submitButton}
>
  Add Booking
</Button>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
  },
  flexHalf: {
    flex: 1,
  },
  dropdown: {
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  dateButton: {
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default MyBookingDetailsScreen;
