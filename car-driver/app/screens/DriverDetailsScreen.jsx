import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



const DriverDetailsScreen = () => {
  const [inputModal, setInputModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [usersData, setUsersData] = useState([]); // To store fetched users data
  const [loadingUsers, setLoadingUsers] = useState(false); // Loading state for fetching users
  const [formData, setFormData] = useState({
    driver_name: '',
    driver_mobile: '',
    aadhar_card: '',
    pan_card: '',
    license_no: '',
    address: '',
    account_number: '',
    upi_id: '',
    aadhar_file: null,
    aadhar_back: null,
    pan_file: null,
    license_file: null,
    profile_path: null,
    reference_code: ''
  });

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes


  const handleFileSelect = async (field) => {
    try {
      // Pick the document
      console.log('Field:', field);
      const res = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      // Check if the user canceled the picker
      if (res.canceled) {
        console.log('User canceled the picker');
        return;
      }

      const file = res.assets && res.assets[0]; // Get the first file from the assets
      if (!file || !file.uri) {
        throw new Error('Invalid file URI');
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        alert('File size should be less than 2 MB');
        return;
      }

      // Fetch file content (returns a Blob)
      const fileContent = await fetch(file.uri);
      const blob = await fileContent.blob(); // Extract the Blob object
      console.log("blob: ", blob);

      // Update form data with the file object
      setFormData((prevData) => {
        const updatedData = { ...prevData, [field]: blob };
        console.log('Updated form data:', updatedData);
        return updatedData;
      });

    } catch (err) {
      console.error('Error selecting file:', err);
      alert('Error selecting the file. Please try again.');
    }
  };


  const handleSubmit = async () => {
    try {
      setUploading(true);
      if (!formData.driver_name || !formData.driver_mobile || formData.driver_name.length < 3 || formData.driver_mobile.length !== 10) {
        setUploading(false);
        alert('Invalid driver name or mobile number.');
        return;
      }
      if (!formData.aadhar_card || formData.aadhar_card.length !== 12) {
        alert('Please enter a valid Aadhar card number');
        setUploading(false);
        return;
      }
      if (!formData.pan_card || formData.pan_card.length !== 10) {
        alert('Please enter valid pan card number')
        setUploading(false);
        return;
      }
      if (!formData.license_no || formData.license_no.length !== 15) {
        alert('Please enter valid license number')
        setUploading(false);
        return;
      }
      if (!formData.address || formData.address.length < 3) {
        alert('Please enter valid address')
        setUploading(false);
        return;
      }
      if (!formData.account_number || formData.account_number.length < 4) {
        alert('Please enter valid account number')
        setUploading(false);
        return;
      }

      const data = new FormData();

      // Append text fields and files to FormData
      Object.keys(formData).forEach(async (key) => {
        const value = formData[key];

        // If the value is a file object (e.g., aadhar_back, pan_file)
        if (value && value._data) {
          const fileData = value._data;  // Access the file's data

          // Fetch the file content as a Blob
          const fileContent = await fetch(fileData.uri);
          const blob = await fileContent.blob();

          // Append the Blob (the full file) directly to FormData
          data.append(key, blob, fileData.name || `${key}.file`);
        } else {
          // Append the text fields (non-file values)
          data.append(key, value);
        }
      });

      // For debugging: log the FormData entries
      // for (let pair of data.entries()) {
      //   console.log(`${pair[0]}: ${pair[1]}`);
      // }

      // API request
      const response = await axios.post('https://happinesscarrental.com/admin/users/adddriver', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // console.log("resposne======================> ", JSON.stringify(response.data));

      // Handling response
      if (response.data.status == false) throw new Error(response.data.message);
      alert('Driver added successfully!');
      clearForm();
      setUploading(false);
      setInputModal(false);
    } catch (error) {
      console.error('Error uploading data:', error.message);
      alert('Error uploading data. Please try again.');
      clearForm();
      setUploading(false);
      setInputModal(false);
    }
  };


  const clearForm = () => {
    setFormData({
      driver_name: '',
      driver_mobile: '',
      aadhar_card: '',
      pan_card: '',
      license_no: '',
      address: '',
      account_number: '',
      upi_id: '',
      aadhar_file: null,
      aadhar_back: null,
      pan_file: null,
      license_file: null,
      profile_path: null,
      reference_code: ''
    });
  };



  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await axios.get('https://happinesscarrental.com/admin/users/get_users');
        if (response.data.status) {
          setUsersData(response.data.data); // Update state with user data
        }
        // else {
        //   alert('Failed to fetch users data');
        // }
      } catch (error) {
        console.error('Error fetching users:', error.message);
        alert('Error fetching users data');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton1} onPress={() => setInputModal(true)}>
        <Text style={styles.addButtonText1}>Add Driver</Text>
      </TouchableOpacity>


      {/* Displaying Users Data */}
      <ScrollView>
        <View style={styles.usersContainer}>
          <Text style={styles.sectionTitle}>Driver List</Text>
          {loadingUsers ? (
            <ActivityIndicator size="large" color="#0a6c8c" />
          ) : usersData.length > 0 ? (
            usersData.map((user, index) => (
              <View key={index} style={styles.userCard}>
                <Text style={styles.userName}>Name: {user?.driver_name || 'Unknown'}</Text>
                <Text style={styles.userContact}>Contact: {user.driver_mobile}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noUsers}>No users found.</Text>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={inputModal}
        onRequestClose={() => setInputModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer1}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent1}>
            <TouchableOpacity
              style={styles.closeButton1}
              onPress={() => {
                setInputModal(false);
                clearForm();
              }}
            >
              <Icon name="close" size={24} color="#0a6c8c" />
            </TouchableOpacity>

            <ScrollView>
              <Text style={styles.modalTitle}>Add Driver Details</Text>

              {/* Input Fields */}
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.formInput}
                  placeholder="Driver Name "
                  placeholderTextColor={'#777'}
                  value={formData.driver_name}
                  onChangeText={(text) => handleInputChange('driver_name', text)}
                />
                <TextInput
                  style={styles.formInput}
                  placeholder="Contact Number"
                  placeholderTextColor={'#777'}
                  value={formData.driver_mobile}
                  onChangeText={(text) => handleInputChange('driver_mobile', text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  style={styles.formInput}
                  placeholder="Aadhar Number"
                  placeholderTextColor={'#777'}
                  value={formData.aadhar_card}
                  onChangeText={(text) => handleInputChange('aadhar_card', text.replace(/\s/g, ''))}
                />
                <TextInput
                  style={styles.formInput}
                  placeholder="PAN Number"
                  placeholderTextColor={'#777'}
                  value={formData.pan_card}
                  onChangeText={(text) => handleInputChange('pan_card', text.replace(/\s/g, ''))}
                />
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.formInput}
                  placeholder="License Number"
                  placeholderTextColor={'#777'}
                  value={formData.license_no}
                  onChangeText={(text) => handleInputChange('license_no', text.replace(/\s/g, ''))}
                />
                <TextInput
                  style={styles.formInput}
                  placeholder="Address"
                  placeholderTextColor={'#777'}
                  value={formData.address}
                  onChangeText={(text) => handleInputChange('address', text)}
                />
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.formInput}
                  placeholder="Account Number"
                  placeholderTextColor={'#777'}
                  value={formData.account_number}
                  onChangeText={(text) => handleInputChange('account_number', text)}
                  keyboardType='numeric'
                />
                <TextInput
                  style={styles.formInput}
                  placeholder="UPI ID"
                  placeholderTextColor={'#777'}
                  value={formData.upi_id}
                  onChangeText={(text) => handleInputChange('upi_id', text)}
                />
              </View>

              {/* File Selectors */}
              <View style={styles.inputRow}>
                <TouchableOpacity style={styles.formInput} onPress={() => handleFileSelect('aadhar_file')}>
                  <Text style={{ color: '#777' }}>
                    {formData.aadhar_file ? 'Aadhar Front ✔' : 'Select AadharFront'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.formInput} onPress={() => handleFileSelect('aadhar_back')}>
                  <Text style={{ color: '#777' }}>
                    {formData.aadhar_back ? 'Aadhar Back ✔' : 'Select AadharBack'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputRow}>
                <TouchableOpacity style={styles.formInput} onPress={() => handleFileSelect('pan_file')}>
                  <Text style={{ color: '#777' }}>
                    {formData.pan_file ? 'PAN File ✔' : 'Select PAN'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.formInput} onPress={() => handleFileSelect('license_file')}>
                  <Text style={{ color: '#777' }}>
                    {formData.license_file ? 'License File ✔' : 'Select License'}
                  </Text>
                </TouchableOpacity>

              </View>
              <TouchableOpacity style={styles.formInput} onPress={() => handleFileSelect('profile_path')}>
                <Text style={{ color: '#777' }}>
                  {formData.profile_path ? 'Profile File ✔' : 'Select Profile Image'}
                </Text>
              </TouchableOpacity>

              <TextInput
                style={styles.formInput}
                placeholder="Reference code"
                placeholderTextColor={'#777'}
                value={formData.reference_code}
                onChangeText={(text) => handleInputChange('reference_code', text)}
              />

              <TouchableOpacity style={styles.submitButton} onPress={() => { handleSubmit() }} disabled={uploading}>
                {uploading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>





    </View>
  );
};

const styles = StyleSheet.create({
  usersContainer: { marginTop: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginStart: 10 },
  userCard: { padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 10, elevation: 2 },
  userName: { fontSize: 16, fontWeight: 'bold' },
  userContact: { fontSize: 14, color: '#555' },
  noUsers: { textAlign: 'center', color: '#999', marginTop: 20 },
  addButton1: { backgroundColor: '#0a6c8c', padding: 15, borderRadius: 10, alignItems: 'center', margin: 5 },
  addButtonText1: { color: 'white', fontSize: 18 },
  modalContainer1: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent1: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  closeButton1: { alignSelf: 'flex-end' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between' },
  formInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 5,
    height: 50,
  },
  fileButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 10,
    margin: 3,
    alignItems: 'center',
  },
  fileButtonText: {
    color: '#999',
    textAlign: 'center',
  },
  submitButton: { backgroundColor: '#0a6c8c', padding: 15, borderRadius: 10, alignItems: 'center' },
  submitButtonText: { color: 'white', fontSize: 18 },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0a6c8c',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  companyName: { color: 'white', fontSize: 20, fontWeight: 'bold' },

  tabContent: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#0a6c8c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  previewContainer: {
    marginTop: 20,
  },
  previewHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});


export default DriverDetailsScreen;