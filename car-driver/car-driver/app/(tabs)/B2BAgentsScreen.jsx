import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Import Dimensions
import Icon from 'react-native-vector-icons/Ionicons';

import logo1 from '../../assets/logo1.jpg';

const { width } = Dimensions.get('window'); // Get the screen width

const B2BAgentsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const [submenuVisible, setSubmenuVisible] = useState(false);
  

  // Menu items
  const menuItems = [
    { id: '0', title: 'Home', screen: 'HomeScreen', icon: 'home-outline' },
    { id: '1', title: 'Profile', screen: 'ProfileScreen', icon: 'person-outline' },
    { id: '2', title: 'Wallet', screen: 'WalletScreen', icon: 'wallet-outline' },
    { id: '3', title: 'Add Car', screen: 'AddCarScreen', icon: 'car-outline' },
    { id: '4', title: 'Legal Help', screen: 'LegalHelpScreen', icon: 'help-circle-outline' },
    { id: '5', title: 'My Booking', screen: null, icon: 'ribbon-outline', isParent: true },
    { id: '5.1', title: 'Active Booking', screen: 'ActiveBookingScreen', icon: 'checkmark-circle-outline', parentId: '5' },
    { id: '5.2', title: 'Booking History', screen: 'BookingHistoryScreen', icon: 'time-outline', parentId: '5' },
    { id: '5.3', title: 'My Booking Details', screen: 'MyBookingDetailsScreen', icon: 'information-circle-outline', parentId: '5' },
    { id: '6', title: 'B2B Agents', screen: 'B2BAgentsScreen', icon: 'business-outline' },
    { id: '7', title: 'Penalty', screen: 'PenaltyScreen', icon: 'alert-circle-outline' },
    { id: '8', title: 'SLA Agreement', screen: 'SLAAgreementScreen', icon: 'document-text-outline' },
    { id: '9', title: 'Log Out', screen: 'LogOutScreen', icon: 'log-out-outline' },
  ];

  // Handle menu item press
  const handleMenuItemPress = (item) => {
    if (item.isParent) {
      setSubmenuVisible(prevState => !prevState);  // Toggle submenu visibility for "My Booking"
    } else {
      router.navigate(item.screen);
      setModalVisible(false);
    }
  };

  // Render each menu item
  const renderMenuItem = ({ item }) => {
    const isSubMenu = item.parentId === '5';

    // Don't render submenu if hidden
    if (isSubMenu && !submenuVisible) return null;

    return (
      <TouchableOpacity
        onPress={() => handleMenuItemPress(item)}
        style={[styles.menuItem, isSubMenu && styles.subMenuItem]}  // Apply styles conditionally
      >
        <Icon name={item.icon} size={24} color="gray" style={styles.menuIcon} />
        <Text style={[styles.menuText, isSubMenu && styles.subMenuText]}>{item.title}</Text>  {/* Submenu item styling */}
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
        <Text style={styles.headerText}>B2B Agent</Text>
        <TouchableOpacity style={styles.phoneIcon}>
          <Icon name="call" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Scrolling Box for Lease Agreement */}
      <ScrollView style={styles.scrollBox}>
        <Text style={styles.agreementText}>
          Lease Agreement
          {'\n\n'}
          1) B2B Partner
          {'\n\n'}
          You may also register as a B2B Partner in various available modes like
          affiliate partner or travel agent partner or API partner; wherein you
          will be generating business for Happiness Car Rental through your
          channels and get a sales commission in return. These terms equally
          apply for B2B Partner and end users using services through B2B
          Partners.
          {'\n\n'}
          2) User Requirements and Conduct
          {'\n\n'}
          The Service is not available for use by persons under the age of 18.
          You may not authorize third parties to use your Account, and you may
          not allow persons under the age of 18 to receive transportation
          services from Third Party Providers unless they are accompanied by
          you. You may not assign or otherwise transfer your Account to any
          other person or entity. You agree to comply with all applicable laws
          when using the Services, and you may only use the Services for lawful
          purposes (e.g., no transport of unlawful or hazardous materials) and
          for the given destinations only. You cannot demand that the Services
          may be used for other destination point(s) even if the included Kms in
          your price package are not fully exhausted and you cannot be
          compensated either. For an outstation trip, the local destinations in
          pick-up city are not included unless they are specifically mentioned
          in the itinerary. You need to pay the full trip price if you end the
          trip in between and do not use Services for all destinations or for
          all days in your price package, for whatsoever reason. For a one-way
          trip, only one pickup and one drop is included; any additional stops
          or additional pickups or drops may incur additional charges. AC will
          remain switched off in hilly areas or wherever required. You will not,
          in your use of the Services, cause nuisance, annoyance, inconvenience,
          or property damage, whether to the Third Party Provider or any other
          party.
          {'\n\n'}
          You shall not have any right in determining or classifying the
          Services in accordance with the type of fuel and You shall be
          responsible for the forfeiture of the complete advance amount paid by
          you for the booking if the cancellation of the booking is happened on
          this ground. You shall not have any right in determining or
          classifying the Services in accordance with the specific car model /
          brand / manufacture / registration number. Any 4+1 seat car can be
          provided for Sedan and any 6+1 seat car can be provided for SUV
          category. Happiness Car Rental shall make sure that the Services
          provided to you shall adhere to all applicable laws and be gentle to
          the nature. You shall be allowed the luggage as per the safety
          standards applicable at that time. In certain instances, you may be
          asked to provide proof of identity to access or use the Services, and
          you agree that you may be denied access to or use of the Services if
          you refuse to provide proof of identity.
          {'\n\n'}
          3) Demand /cancellation
          {'\n\n'}
          Any demand of cancellation or refund or compensation shall not be
          entertained on the ground of the conduct of the third party unless it
          is grave in nature like sexual harassment, etc. Happiness Car Rental
          shall retain its sole right and discretion to evaluate the situation
          in an independent manner and on case-to-case basis. However, Happiness
          Car Rental shall always endeavor to make your ride dignified, hassle
          free and smooth.
          {'\n\n'}
          4) Text Messaging
          {'\n\n'}
          By creating or activating an Account, you agree that the Services may
          send you text (SMS) messages as part of the normal business operation
          of your use of the Services.
          {'\n\n'}
          10)Promotional Codes Happiness Car Rental sole discretion, create
          promotional codes that may be redeemed for Account credit, or other
          features or benefits related to the Services and/or a Third Party
          Provider’s services, subject to any additional terms that Happiness
          Car Rental establishes on a per promotional code basis (“Promo
          Codes”). You agree that Promo Codes must be used for the intended
          audience and purpose, and in a lawful manner may not be duplicated,
          sold or transferred in any manner, or made available to the general
          public (whether posted to a public form or otherwise), unless
          expressly permitted by Happiness Car Rental May be disabled by
          Happiness Car Rental at any time for any reason without liability to
          Happiness Car Rental may only be used pursuant to the specific terms
          that Happiness Car Rental establishes for such Promo Code are not
          valid for cash and ( may expire prior to your use. Happiness Car
          Rental reserves the right to withhold or deduct credits or other
          features or benefits obtained through the use of Promo Codes by you or
          any other user in the event that Happiness Car Rental determines or
          believes that the use or redemption of the Promo Code was in error,
          fraudulent, illegal, or in violation of the applicable Promo Code
          terms or these Terms.
          {'\n\n'}
          5) Content
          {'\n\n'}
          Happiness Car Rental may, in Happiness Car Rental sole discretion,
          permit you from time to time to submit, upload, publish or otherwise
          make available to Happiness Car Rental through the Services textual,
          audio, and/or visual content and information, including commentary and
          feedback related to the Services, initiation of support requests, and
          submission of entries for competitions and promotions (“User
          Content”). Any User Content provided by you remains your property.
          However, by providing User Content to Happiness Car Rental, you grant
          Happiness Car Rental a worldwide, perpetual, irrevocable,
          transferrable, royalty-free license, with the right to sublicense, to
          use, copy, modify, create derivative works of, distribute, publicly
          display, publicly perform, and otherwise exploit in any manner such
          User Content in all formats and distribution channels now known or
          hereafter devised (including in connection with the Services and
          Happiness Car Rental’s business and on third-party sites and
          services), without further notice to or consent from you, and without
          the requirement of payment to you or any other person or entity. you
          either are the sole and exclusive owner of all User Content or you
          have all rights, licenses, consents and releases necessary to grant
          Happiness Car Rental the license to the User Content as set forth
          above and neither the User Content nor your submission, uploading,
          publishing or otherwise making available of such User Content nor
          Happiness Car Rental use of the User Content as permitted herein will
          infringe, misappropriate or violate a third party’s intellectual
          property or proprietary rights, or rights of publicity or privacy, or
          result in the violation of any applicable law or regulation.
          {'\n\n'}
          You agree to not provide User Content that is defamatory, libelous,
          hateful, violent, obscene, pornographic, unlawful, or otherwise
          offensive, as determined by Happiness Car Rental in its sole
          discretion, whether or not such material may be protected by law.
          Happiness Car Rental may, but shall not be obligated to, review,
          monitor, or remove User Content, at Happiness Car Rental sole
          discretion and at any time and for any reason, without notice to you.
          {'\n\n'}
          6) Access / Devices
          {'\n\n'}
          You are responsible for obtaining the data network access necessary to
          use the Services. Your mobile network’s data and messaging rates and
          fees may apply if you access or use the Services from a
          wireless-enabled device and you shall be responsible for such rates
          and fees. You are responsible for acquiring and updating compatible
          hardware or devices necessary to access and use the Services and
          Applications and any updates Happiness Car Rental does not guarantee
          that the Services, or any portion thereof, will function on any
          particular hardware or devices. In addition, the Services may be
          subject to malfunctions and delays inherent in the use of the Internet
          and electronic communications.
          {'\n\n'}
          7) Payment/charges
          {'\n\n'}
          You understand that use of the Services may result in charges to you
          for the services or goods you receive from a Third Party Provider
          (“Charges”). After you have received services or goods obtained
          through your use of the Service, Happiness Car Rental will facilitate
          your payment of the applicable Charges on behalf of the Third Party
          Provider as such Third Party Provider’s limited payment collection
          agent. Payment of the Charges in such manner shall be considered the
          same as payment made directly by or Happiness Car Rental you to the
          Third Party Provider. Charges will be inclusive of applicable taxes
          where required by law. Charges paid by you are final and
          non-refundable, unless otherwise determined by Happiness Car Rental at
          its sole discretion. You retain the right to request lower Charges
          from a Third Party Provider for services or goods received by you from
          such Third Party Provider at the time you receive such services or
          goods. Happiness Car Rental will respond accordingly to any request
          from a Third Party Provider to modify the Charges for a particular
          service or good but Happiness Car Rental cannot be bound by that.{' '}
          {'\n\n'}
          All Charges are due immediately and payment will be facilitated by
          Happiness Car Rental, as the Third Party Provider’s limited payment
          collection agent, after which Happiness Car Rental will send you a
          receipt by email.{'\n\n'}
          8)As between you and Happiness Car Rental,{'\n\n'}
          Happiness Car Rental reserves the right to establish, remove and/or
          revise Charges for any or all services or goods obtained through the
          use of the Services at any time in Happiness Car Rental sole
          discretion. Further, you acknowledge and agree that Charges applicable
          in certain geographical areas may increase substantially during times
          of high demand. Happiness Car Rental will use reasonable efforts to
          inform you of Charges that may apply, provided that you will be
          responsible for Charges incurred under your Account regardless of your
          awareness of such Charges or the amounts thereof. Happiness Car Rental
          may from time to time provide certain users with promotional offers
          and discounts that may result in different amounts charged for the
          same or similar services or goods obtained through the use of the
          Services, and you agree that such promotional offers and discounts,
          unless also made available to you, shall have no bearing on your use
          of the Services or the Charges applied to you. The funds added in user
          wallet or any voucher provided by Cab Bazar, because of promotional
          offers / discounts / cashback / or any other means will be remitted
          against the advance booking amount only and not against the total trip
          price. Happiness Car Rental reserves the right to cancel these
          discounts at any point of time. You may elect to cancel your request
          for services from a Third Party Provider at any time prior to your
          order confirmation and/or advance payment, in which case the advance
          paid will not be refunded and you may be charged a cancellation fee.
          {'\n\n'}
          9) This payment structure is intended to fully compensate the Third
          Party Provider for the services or goods provided. Except with respect
          to taxicab /Hotel Booking/Air ticket,Holidays Package domestic,
          Internationl, services requested through the Application, Happiness
          Car Rental does not designate any portion of your payment as a tip or
          gratuity to the Third Party Provider. Any representation by Happiness
          Car Rental (on www.happinesscarrental.com website, in the Application,
          or in Happiness Car Rental marketing materials) to the effect that
          tipping is “voluntary,” “not required,” and/or “included” in the
          payments you make for services or goods provided is not intended to
          suggest that Happiness Car Rental provides any additional amounts,
          beyond those described above, to the Third Party Provider. You
          understand and agree that, while you are free to provide additional
          payment as a gratuity to any Third Party Provider who provides you
          with services or goods obtained through the Service, you are under no
          obligation to do so. Gratuities are voluntary. After you have received
          services or goods obtained through the Service, you will have the
          opportunity to rate your experience and leave additional feedback
          about your Third Party Provider.{'\n\n'}
          Happiness Car Rental does not have any role and it shall be
          indemnified where the driver or Third Party Provider demands the money
          in between the ride and does not adjust the same within the amount
          payable you.{'\n\n'}
          Happiness Car Rental and Third Party Provider shall not be liable for
          any inter-state tax levied on the vehicle during the ride like Toll
          Tax, for any Central and State Toll Tax, for any parking ticket, etc.
          You shall be responsible for collecting the all the receipts of Toll
          tax, State tax, Parking fee, etc. from the Third Party Provider.
          Happiness Car Rental shall not be responsible for providing the
          receipts or invoice for payments which are not included in trip
          package and expected to be paid directly by you as per actuals like
          Toll tax, State tax, Parking fee, etc. In case where the Fasttag is
          used by Third Party Provide to pay the Toll Tax, it shall be the duty
          of you to ask the debit amount message or information from the Third
          Party provider.{'\n\n'}
          You are liable to pay the full trip package price in case you decide
          to shorten your trip for whatsoever reason by any amount of time e.g.
          you returned back a day early in a round trip or Kms included in
          package are not fully exhausted. You can not demand any reduction in
          price or any cash back / voucher etc. or to use the Service for other
          destination point(s) or for local destination point(s) in pickup city
          which were not included in itinerary.{'\n\n'}
          10) Repair or Cleaning Fee{'\n\n'}
          You shall be responsible for the cost of repair for damage to, or
          necessary cleaning of, Third Party Provider vehicles and property
          resulting from use of the Services under your Account in excess of
          normal “wear and tear” damages and necessary cleaning (“Repair or
          Cleaning”). In the event that a Third Party Provider reports the need
          for Repair or Cleaning, and such Repair or Cleaning request is
          verified by Happiness Car Rental{'\n\n'}
        </Text>
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
              <Image
                source={logo1}
                style={styles.logoImage}
              />
            </View>
            <FlatList
              data={menuItems}
              renderItem={renderMenuItem}
              keyExtractor={item => item.id}
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
  // Submenu item styling (smaller size)
  subMenuItem: {
    paddingLeft: 30,  // Indent submenu items
    paddingVertical: 2,
  },
  subMenuText: {
    fontSize: 10,  // Smaller font for submenu items
    color: 'gray',
  },

  // Menu items
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  menuIcon: { marginRight: 35 },
  menuText: { fontSize: 18, color: 'gray' },

  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70, // to avoid overlap with the header
  },
  scrollBox: {
    width: '100%', // Adjust width for the scroll box
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    elevation: 2,
  },
  agreementText: {
    fontSize: 16,
    color: '#333',
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




export default B2BAgentsScreen;
