import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { menuItems } from '../../components/lib/common/MenuItems'
import Sidebar from '../../components/lib/common/Sidebar'


const PenaltyScreen = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleMenuItemPress = (item) => {
    if (item.screen) {
      router.navigate(`/screens/${item.screen}`); // Navigate to the screen specified in the menu item
    }
  };
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuIcon}>
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

      {/* Modal for Dropdown Menu */}
      {sidebarVisible ? <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        menuItems={menuItems}
        onMenuItemPress={handleMenuItemPress}
      /> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0a6c8c',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  phoneIcon: {
    paddingHorizontal: 10,
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
});

export default PenaltyScreen;
