import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import logo1 from '../../assets/logo1.jpg';

const { width } = Dimensions.get('window'); // Get the screen width

const PenaltyScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false); // Track submenu visibility
  const router = useRouter();

  // Menu items with submenu under My Booking
  const menuItems = [
    { id: '0', title: 'Home', screen: 'HomeScreen', icon: 'home-outline' },
    { id: '1', title: 'Profile', screen: 'ProfileScreen', icon: 'person-outline' },
    { id: '2', title: 'Wallet', screen: 'WalletScreen', icon: 'wallet-outline' },
    { id: '3', title: 'Add Car', screen: 'AddCarScreen', icon: 'car-outline' },
    { id: '4', title: 'Legal Help', screen: 'LegalHelpScreen', icon: 'help-circle-outline' },
    { id: '5', title: 'My Booking', screen: null, icon: 'receipt-outline', isParent: true },
    { id: '5.1', title: 'Active Booking', screen: 'ActiveBookingScreen', icon: 'checkmark-circle-outline', parentId: '5' },
    { id: '5.2', title: 'Booking History', screen: 'BookingHistoryScreen', icon: 'time-outline', parentId: '5' },
    { id: '5.3', title: 'My Booking Details', screen: 'MyBookingDetailsScreen', icon: 'information-circle-outline', parentId: '5' },
    { id: '6', title: 'B2B Agents', screen: 'B2BAgentsScreen', icon: 'business-outline' },
    { id: '7', title: 'Penalty', screen: 'PenaltyScreen', icon: 'alert-circle-outline' },
    { id: '8', title: 'SLA Agreement', screen: 'SLAAgreementScreen', icon: 'document-text-outline' },
    { id: '9', title: 'Log Out', screen: 'LogOutScreen', icon: 'log-out-outline' },
  ];

  // Handle menu item clicks
  const handleMenuItemPress = (item) => {
    if (item.isParent) {
      setSubmenuVisible((prev) => !prev); // Toggle submenu visibility for parent item
    } else {
      router.navigate(item.screen);
      setModalVisible(false);
    }
  };

  // Render menu items with submenu functionality
  const renderMenuItem = ({ item }) => {
    const isSubMenu = item.parentId === '5'; // Identify submenu items

    if (isSubMenu && !submenuVisible) return null; // Hide submenu if not visible

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleMenuItemPress(item)}
        style={[styles.menuItem, isSubMenu && styles.subMenuItem]} // Conditional styling for submenu
      >
        <Icon name={item.icon} size={24} color="gray" style={styles.menuIcon} />
        <Text style={[styles.menuText, isSubMenu && styles.subMenuText]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Hamburger Menu and Phone Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.menuButton}>
          <Icon name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Penalty</Text>
        <TouchableOpacity style={styles.phoneIcon}>
          <Icon name="call" size={25} color="white" />
        </TouchableOpacity>
      </View>

      
      





      {/* Penalty Information Box */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {/* Hindi Content */}
            Penalty{"\n"}
            प्रिय साथियों,{"\n\n"}
            जैसा की आप जानते हैं। ग्राहक को दिए सर्विसेस से ही हमारे व्यापार की सफलता छुपी हुई है। हमारे सामने कुछ ऐसे मामले आए हैं । जहां हमारे साथियों के ओर से अनुप्रयुक्त सेवाएं प्रदान की है। इसलिए हमने विभिन्न अनुपयुक्त सेवाओं के लिए जुर्माने को परिभाषित करने के लिए Happiness Car Rental ने हमारे साथियों के लिए सर्विस लेबर एग्रीमेंट(SLA) सुनिश्चित किया है।
            {"\n\n"}
            कृपया नीचे दी गई सूचनाओं को सावधानी से पड़े और हमारे ग्राहकों को अच्छी सेवाएं प्रदान करने का दायित्व निभाए ताकि हमारे साथियों को किसी प्रकार के जुर्माने का सामना न करना पड़े।
            {"\n\n"}
            बुकिंग स्वीकार करने के बाद रद्द करना{"\n"}
            1.प्रस्थान से 12 घंटे पहले। ..........₹300 जुर्माना.{"\n"}
            2.प्ररररस्थान के 12 घंटे के भीतर।...... ₹300 जुर्माना.{"\n"}
            3.प्ररस्थान के 3 घंटे के भीतर।........ ₹500 जुर्माना.{"\n"}
            4.स्वीकार ने के 30 मिनट के भीतर। .....₹100 जुर्माना.{"\n"}
            5.जो कार app में चुनी है उससे अलग कार भेजना।..... ₹200 जुर्माना.{"\n"}
            6.जो ड्राइवर ऐप में चुना है उससे अलग ड्राइवर ग्राहक को भेजना ।.........₹200 जुर्माना.{"\n"}
            7.सेडान कारों में यदि सीएनजी कार है ।तो करियर होना आवश्यक है । कार के डिक्की में उचित बूट स्पेस हो इसे सुनिश्चित करें ।........₹200 जुर्माना.{"\n"}
            8.चालक ने app में कंप्लीट जर्नी नहीं किया या इससे ग्राहक के माध्यम से नहीं किया गया। ......₹100 जुर्माना.{"\n"}
            9.कार साफ नहीं है। .........₹200 जुर्माना.{"\n"}
            10.कार अच्छी कंडीशन में नहीं है। .......₹250 जुर्माना.{"\n"}
            11.ड्राइवर ने ग्राहक के साथ दुर्व्यवहार किया।....... ₹200 जुर्माना.{"\n\n"}
            Happiness Car Rental सुनिश्चित करेगा की घटनाओं की दरमियां कोई गलत तरीके से दंडित ना हो। हैप्पीनेस कार रेंटल अंतिम निर्णय के लिए अधिकार रखता है।
          </Text>

          {/* English Content */}
          <Text style={styles.infoText}>
            {"\n\n"}Penalty{"\n"}
            Dear Partners,{"\n\n"}
            As you know, the success of our business lies in the services provided to the customer. We have encountered some cases where improper services have been provided by our partners. Therefore, to define penalties for various improper services, Happiness Car Rental has ensured a Service Level Agreement (SLA) for our partners.
            {"\n\n"}
            Please carefully read the information below and fulfill the responsibility of providing good services to our customers to avoid any penalties.
            {"\n\n"}
            Cancellation after accepting the booking{"\n"}
            1. 12 hours before departure........ ₹300 penalty.{"\n"}
            2. Within 12 hours of departure...... ₹300 penalty.{"\n"}
            3. Within 3 hours of departure........ ₹500 penalty.{"\n"}
            4. Within 30 minutes of acceptance... ₹100 penalty.{"\n"}
            5. Sending a different car than selected in the app... ₹200 penalty.{"\n"}
            6. Sending a different driver than selected in the app... ₹200 penalty.{"\n"}
            7. For sedan cars with CNG, ensure a carrier is present and sufficient boot space in the trunk... ₹200 penalty.{"\n"}
            8. Journey not completed in the app or not completed via the customer... ₹100 penalty.{"\n"}
            9. Car is not clean... ₹200 penalty.{"\n"}
            10. Car is not in good condition... ₹250 penalty.{"\n"}
            11. Driver misbehaved with the customer... ₹200 penalty.{"\n\n"}
            Happiness Car Rental will ensure no one is penalized unfairly during incidents. Happiness Car Rental reserves the right for final decision.
          </Text>
        </View>
      </ScrollView>

      {/* Sidebar Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menuModalContent}>
            {/* Logo Section with Image */}
            <View style={styles.logoContainer}>
              <Image source={logo1} style={styles.logoImage} />
            </View>
            <FlatList
              data={menuItems}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.id}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f0f0' 
  },

  // Header section
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

  // Phone Icon Button
  phoneButton: {
    marginLeft: 10,
  },

  // Modal Overlay
  modalContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

  subMenuItem: {
    paddingLeft: 30,  // Indent submenu items
    paddingVertical: 2,
  },
  subMenuText: {
    fontSize: 10,  // Smaller font for submenu items
    color: 'gray',
  },

  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70, // to avoid overlap with the header
  },
  
scrollView: {
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
infoBox: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  width: '90%',
  elevation: 4,
},
infoText: {
  fontSize: 16,
  color: '#333',
  lineHeight: 24,
},

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
});




export default PenaltyScreen;