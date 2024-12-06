import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Sidebar from '../../components/lib/common/Sidebar'
import { menuItems } from '../../components/lib/common/MenuItems'


const WalletScreen = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleMenuItemPress = (item) => {
    if (item.screen) {
      router.navigate(`/screens/${item.screen}`); // Navigate to the screen specified in the menu item
    }
  };
  const [addMoneyModalVisible, setAddMoneyModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([
    { id: '1', date: '2024-10-20', preBalance: '731.85', amount: '-100', newBalance: '631.85', description: 'Cancellation of Booking Id 523281' },
    { id: '2', date: '2024-10-19', preBalance: '481.85', amount: '+250', newBalance: '731.85', description: 'Upgrade to Premium Account' },
  ]);
  const [balance, setBalance] = useState(631.85);
  const [amountToAdd, setAmountToAdd] = useState('');  // To store the entered amount for adding money
  const router = useRouter();

  const handleAddMoney = () => {
    setAddMoneyModalVisible(true);
  };

  const confirmAddMoney = () => {
    const addedAmount = parseFloat(amountToAdd);
    if (!isNaN(addedAmount) && addedAmount > 0) {
      const newBalance = balance + addedAmount;

      setBalance(newBalance);
      setTransactionHistory([
        ...transactionHistory,
        {
          id: String(transactionHistory.length + 1),
          date: new Date().toISOString().split('T')[0],
          preBalance: balance.toFixed(2),
          amount: `+${addedAmount}`,
          newBalance: newBalance.toFixed(2),
          description: 'Add Money',
        },
      ]);

      setAmountToAdd('')
      setAddMoneyModalVisible(false);
      setSuccessModalVisible(true);
      function autoHide() {
        setSuccessModalVisible(false);
      }

      // Auto-hide success modal after 2 seconds
      setTimeout(autoHide, 3000);
    } else {
      alert('Please enter a valid amount greater than 0');
    }
  };


  return (
    <View style={styles.container}>
      {/* Header with Hamburger Menu on Left */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}> Wallet</Text>
        <TouchableOpacity style={styles.phoneIcon}>
          <Icon name="call" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      {sidebarVisible ? <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        menuItems={menuItems}
        onMenuItemPress={handleMenuItemPress}
      /> : <></>}

      <Text style={styles.currentBalanceLabel}>Current Wallet Balance</Text>
      <Text style={styles.balanceText}>₹ {balance.toFixed(2)}</Text>
      <Text style={styles.noteText}>* Up to Rs. 800 is Registration and Verification charges and is non-refundable. Although it will remain in your wallet.</Text>

      <TouchableOpacity style={styles.addMoneyButton} onPress={handleAddMoney}>
        <Text style={styles.addMoneyButtonText}>ADD MONEY</Text>
      </TouchableOpacity>

      <FlatList
        data={transactionHistory}
        renderItem={({ item }) => (
          <View style={styles.transactionItem} key={item.id}>
            <Text style={styles.transactionDetails}>Pre Balance: {item.preBalance}</Text>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
            <Text style={styles.transactionDetails}>New Balance: {item.newBalance}</Text>
            <Text style={styles.transactionDescription}>{item.description}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.transactionList}
      />

      <TouchableOpacity style={styles.upgradeButton}>
        <Text style={styles.upgradeButtonText}>UPGRADE TO PREMIUM ACCOUNT</Text>
      </TouchableOpacity>

      {/* Modal for Add Money Confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addMoneyModalVisible}
        onRequestClose={() => setAddMoneyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Add Money</Text>
            <Text style={styles.modalMessage}>Enter the amount to add to your wallet</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amountToAdd}
              onChangeText={setAmountToAdd}
            />
            <TouchableOpacity onPress={confirmAddMoney} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAddMoneyModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal for Money Added */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.successModalContainer}>
          <View style={styles.successModalContent}>
            <Text style={styles.successText}>Money added successfully!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0a6c8c',
    paddingVertical: 20,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },

  // Modal Overlay
  modalContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    justifyContent: 'center', // Centers the modal vertically
    alignItems: 'center', // Centers the modal horizontally
    zIndex: 999,
  },
  menuModalContent: {
    width: 250,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10, // Optional: rounded corners for the modal
  },

  // Logo positioning
  logoContainer: {
    alignSelf: 'center', // Moves logo to the right side of the top
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 50,
    resizeMode: 'contain'
  },

  // Menu items
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  menuIcon: { marginRight: 35 },
  menuText: { fontSize: 18, color: 'gray' },

  // Close Button
  closeButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  },
  closeButtonText: {
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16
  },
  phoneIcon: {
    marginLeft: 15,
  },
  currentBalanceLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  balanceText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginVertical: 10,
  },
  noteText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  addMoneyButton: {
    backgroundColor: '#FFB400',
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  addMoneyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transactionList: {
    marginHorizontal: 20,
    marginTop: 10,
    maxHeight: 400
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  transactionDetails: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  upgradeButton: {
    backgroundColor: '#0a6c8c',
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  amountInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModalContent: {
    backgroundColor: '#4BB543',
    padding: 20,
    borderRadius: 10,
    width: 250,
  },
  successText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default WalletScreen;
