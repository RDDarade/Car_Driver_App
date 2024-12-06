import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { menuItems } from '../../components/lib/common/MenuItems'
import Sidebar from '../../components/lib/common/Sidebar'


const SLAAgreementScreen = () => {
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
        <Text style={styles.headerText}>SLA Agreement</Text>
        <TouchableOpacity style={styles.phoneIcon}>
          <Icon name="call" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Scrolling Box for Agreement Text */}
      <View style={styles.scrollBox}>
        <ScrollView contentContainerStyle={styles.agreementContainer}>
          <Text style={styles.agreementText}>
            Service Level Agreement{'\n\n'}
            PLEASE ENSURE THAT YOU READ AND UNDERSTAND THIS SERVICE LEVEL AGREEMENT BEFORE YOU USE :Happiness Car Rental, If you continue to browse and use our website and mobile apps, you are agreeing to comply with and be bound by the following Service Level Agreement that govern the relationship between Happiness solutions India Private Limited, /H.S. ENTERPRISES hereinafter referred to as “Happiness Car Rental, and you, hereinafter referred to as “Vendor/Driver”.{'\n\n'}

            1) Agree as follows:{'\n\n'}

            Happiness Car Rental provides services for the purpose of providing lead generation to tour and travels service providers. receives requests from the users of Happiness Car Rental various applications such as the website, phone calls and other means. Happiness Car Rental transfers these requests to the authorized tour and travels provider/ “Vendor/Driver”. The “Vendor/Driver” seek, receive and fulfil the requests provided to them from Happiness car rental{'\n\n'}

            Acknowledges and agrees
            that Happiness Car Rental is only a technology platform to provide various transportation or logistics services through its Vendors who are independent third party contractors not employed by Happiness Car Rental and that Happiness Car Rental does not provide transportation services or function as a transportation carrier or operate as an agent for the transportation of passengers.{'\n\n'}

            Happiness Car Rental and the “Vendor/Driver” mutually agree to be bound by the following terms and conditions set forth (electronic or otherwise) in this Agreement.{'\n\n'}

            Definitions{'\n\n'}

            Driver” means a principal, agent, employee or contractor of the Vendor who fulfills the then-current Happiness Car Rental requirements to be an active driver using the Happiness Car Rental services is authorized by Happiness Car Rental to access the Happiness Car Rental services to provide transportation services on behalf of the Vendor or on own account, as the case may be; and (c) is verified by the Vendor (except when acting on own account) and whose names are forwarded to Happiness Car Rental by the Vendors for passing off the leads to them directly.{'\n\n'}



            Users:{'\n\n'}

            means a customer end user, not being a minor (under the age of 18 years), of the various applications of Happiness Car Rental like the website, the and call centre numbers, for the purpose of obtaining transport services offered by Happiness Car Rental transportation “Vendor/Driver”. If the User is below the age of 18 (eighteen) years, he/she shall read these terms with their parent or legal guardian, and in such a case these terms shall be deemed to be a contract between Happiness Car Rental and User’s legal guardian or parent and to the extent permissible under applicable laws, enforceable against the User. We reserve the right on a case by case basis to demand documented proof that User’s parent or legal guardian’s consent has been granted{'\n\n'}


            Relationship with Users;{'\n\n'}

            Vendor acknowledges and agrees that Vendor’s provision of transportation services to Users creates a legal and direct business relationship between Vendor and the User, to which Happiness Car Rental is not a party, Happiness Car Rental is not responsible or liable for the actions or inactions of User in relation to the activities of Vendor, its Driver or of any Vehicle. Vendor shall have the sole responsibility for any obligations or liabilities of Users or third parties that arise from its provision of transportation services on Happiness Car Rental platform. Vendor acknowledges and agrees that they and their Drivers are solely responsible for taking such precautions as may be reasonable and proper (including maintaining adequate insurance and necessary papers that fulfills the requirements of all applicable laws) regarding any acts or omissions of a user or third party. Vendor/Driver shall be solely responsible for not having the necessary papers and details of the vehicle and any outcome including fine, penalty, damages, etc. arising from such action. Vendor/Driver shall bear all the costs for not complying any law applicable at that time. Vendor acknowledges and agrees that Happens Car Rental may release / disclose the contact and/or insurance information of Vendor and/or a Driver to a User upon such User’s reasonable request. Vendor acknowledges and agrees that, unless specifically consented to by a User, neither Vendor nor Driver may transport or allow inside any Vehicle, individuals other than a User and any individuals authorized by such User during the performance of Transportation services for such User. Vendor acknowledges and agrees, and shall ensure that its Drivers agree, that all Users should be transported directly to their specified destination, as directed by the applicable User, without unauthorized interruption or unauthorized stops.{'\n\n'}

            Vendor/Driver is free to take any action against the User in case any dispute but not limited to misbehave, destroying or damaging the vehicle or non-payment of the agreed amount, etc. arises between them. Happiness Car Rental shall not be responsible in any manner whatsoever for any dispute arising between the Vendor/Driver and the User and Happiness Car Rental shall be indemnified by the parties. Happiness Car Rental at its sole discretion shall assist the Vendor/Driver in all reasonable manner at every level.{'\n\n'}



            Vendor’s Relationship :{'\n\n'}

            Vendor acknowledges and agrees that Happiness Car Rental provision to Vendor of the various applications (like website, calls etc.) of Happiness Car Rental the services creates a legal and direct business relationship between Happiness Car Rental and Vendors. Vendor shall be an independent contractor of Happiness Car Rental and this agreement shall not be deemed and understood to create any relationship of agency, partnership or joint venture between Happiness Car Rental and Vendor. The Vendor shall not represent the same to any third party for any reason whatsoever. Happiness Car Rental is not and shall not be deemed to be in direct control of the Vendors or its Drivers generally or in their performance under this agreement specifically. Happiness Car Rental has no concern to any of the operations of the Vendor’s business, the transportation services, the acts or omissions of the Driver of the operation and maintenance of any Vehicle. Vendors and its Drivers retain the sole right to determine when and for how long each of them will utilize the services of Happiness Car Rental. Vendors and its Drivers have the option to enter in to the contract with Happiness Car Rental or to leave it however once they choose to leave the agreement they surrender all their rights to use the name of Happiness Car Rental in any way or to use any such information or logo or the nameplate to indicate that they are still connected with Happiness Car Rental. The Vendors entering into this contract with Happiness Car Rental retains the complete right to provide transportation services to its existing customer Users, the conditions of this contract shall be valid only if the Vendor or the Driver of the Vendor uses the leads provided by various applications of Happiness Car Rental retains the right to, at any time in sole discretion, to deactivate or otherwise restrict customer Users or any Driver from accessing or using the services of Happiness Car Rental in the event of a violation of this agreement, or by any act of the Vendor or the Driver’s act or omission that causes harm to Happiness Car Rental brand, reputation or business as determined by Happiness Car Rental in its sole discretion. Happiness Car Rental also retains the right to deactivate or otherwise restrict Vendor or any Driver from accessing or using the services or the various applications of Happiness Car Rental for any other reason at the sole and reasonable discretion of Happiness Car Rental along with recovery of damages from the Vendor.{'\n\n'}

            Vendors shall have the sole responsibility for any obligation or liability to Drivers that arise from its relationship with its Drivers (in the capacity of agent, employee, contractor or otherwise) including but not limiting to (including provisions of transportation services). Vendors acknowledges and agrees that it exercises sole control over the Drivers and will comply with all applicable laws ( including tax, social security, insurance and employment laws, etc. ) governing or otherwise applicable to its relationship with the Drivers. Vendor acknowledges and agrees that it is at all times responsible and liable for the acts and omissions of its Drivers Users and Happiness Car Rental and Vendor shall ensure that the Driver is compliant with all applicable laws.{'\n\n'}

            A Vendor acknowledges and agrees that: after receiving transportation services, a User will be prompted by Happiness Car Rental various applications to provide a rating of such transportation services and Driver and, optionally, to provide comments or feedback about such transportation services and Driver; and after providing transportation services, the Driver may be prompted by Happiness Car Rental’s various applications, optionally, to provide rating, comments or feedback about the user. Happiness Car Rental shall instruct all Drivers to provide ratings and feedback in good faith.{'\n\n'}



            Drivers and Vehicles Requirements{'\n\n'}

            Driver Requirement{'\n\n'}

            Vendors acknowledges and agrees that each Driver shall at all times:{'\n\n'}

            hold and maintain a valid Driver’s license with the appropriate level of certification to operate the Vehicle assigned to such Driver, and all licenses, permits, approvals and authority applicable to customer and/or driver that are necessary to provide passenger transportation services to third parties in the territory A valid third party insurance and a valid pollution certificate.{'\n\n'}

            Possess the appropriate and current level of training, expertise and experience to provide transportation services in a professional manner with due skill, care and diligence, he should be in a neat and clean attire and maintain a good level of hygiene; and wear mask, maintain social distancing, keep sanitizer and regularly sanitize the vehicle, specially the parts like door handles, dashboard, gear shifter, key fob, steering wheel, external touch points; and all government guidelines regarding prevention of COVID-19 must be followed.{'\n\n'}

            Maintain high standards of professionalism, service and courtesy. Vendors acknowledges and agrees that each Driver may be subject to certain background and driving record checks from time to time in order for such driver to qualify to provide, and remain eligible to provide, and remain eligible to provide, transportation services. In addition, if Vendor and/or Driver are using the Happiness Car Rental various applications to provide transportation services in conjunction with operating a taxi (“taxi services”) such Vendor and/or Driver shall comply with all applicable laws with respect thereto. Vendor acknowledges and agrees

            Vehicle Requirements

            Vendors acknowledges and agrees that each Vehicle shall at all times be properly registered and licensed to operate as a passenger transportation vehicle in the territory owned or leased by Vendor, or otherwise in Vendor’s lawful possession suitable for performing the passenger transportation services contemplated by this agreement and maintained in good operating condition, consistent with industry safety and maintenance standards for a Vehicle of its kinds and any additional standards or requirements in the applicable territory, and in a clean and sanitary condition. The Vendor is solely responsible for any costs for mechanical failure due to usage of Vehicle for providing services on Happiness Car Rental platform. The Driver shall be responsible to inform the Vendor in case of such mechanical failure during normal usage and Happiness Car Rental shall have no onus for the same.{'\n\n'}



            Documentation:{'\n\n'}

            To ensure Vendor’s and each of its Driver’s compliance with all requirements in sections as above, Vendors must provide Happiness Car Rental with written copies of all such licenses, permits, approvals, authority, registrations and certifications prior to Vendor’s and the applicable Drivers’ provision of any transportations services. Thereafter, Vendors must submit to Happiness Car Rental written evidence of all such licenses, permits, approvals, authority, registrations and certifications as they are renewed. Happiness Car Rental shall, upon request, be entitled to review such licenses, permits, approvals, authority, registrations and certifications from time to time, and Vendor’s failure to provide or maintain any of the foregoing shall constitute a material breach of this agreement. H.C.R reserves the right to independently verify customer’s and/or any Driver’s documentation from time to time to time in any way deems appropriate in its reasonable discretion and the charges incurred on that shall not be refundable or be adjusted.{'\n\n'}



            Payment policy and Fare Adjustment By agreeing to this agreement, Vendor agrees to our pricing policy and payment policy as given below:{'\n\n'}

            Happiness Car Rental reserves the right to change its fare/pricing policy from time to time. In particular, may at its sole discretion introduce new services and modify some or all of the existing services offered on platform. In such an event reserves the right to introduce fees for the new services offered or amend/introduce fees for existing services, as the case may be. All payments for the same shall be compulsorily in Indian Rupees acceptable in the Republic of India.{'\n\n'}

            Vendors will get the prices for each individual instance of transport service request . Vendor reserves the right to accept the request or not. Vendor is responsible for getting the payment from customer at completion of the service request i.e. at end of the journey.{'\n\n'}

            Happiness Car Rental reserves the right to make adjustments in the Fare for certain cases of giving inappropriate transportation services which causes loss to the User or to the Happiness Car Renfor instance Drivers taking long routes, the Vehicle is not as per the standards, Driver not following proper instructions provided to him, inordinate delay in providing the services. cancel the Fare for a particular instance of transportation services (e.g., A User is charged for transportation services that were not provided or in the event of a User complaint, fraud, etc.) Happiness Car Rentadecision to reduce or cancel the fare in any such manner shall be exercised in a reasonable manner.{'\n\n'}

            9.2Vendors irrespective of they are the members of any category or not need to maintain non-refundable minimum balance, as defined by Happiness Car Rental, in their account to get business . Not having the minimum balance may attract penalty or any charges be imposed by Happiness Car Rental at its sole discretion.{'\n\n'}

            Happiness Car Rental reserves the right to charge a penalty of 0-25% of total fare amount to Vendor in case of cancellation or delay in providing the transportation services after accepting a booking.{'\n\n'}

            Happiness Car Rental reserves the right to define and charge penalties for inappropriate services provided by the Vendor and Happiness Car Rental decision in determining inappropriate services shall be final and binding on the Vendor, Driver and/or User. The set of inappropriate service actions and the corresponding penalties will be communicated to Vendors through email . Happiness Car Renwill do due diligence to ensure the occurrence of inappropriate service. Happiness Car reserved right to take the final decision on this and to update the inappropriate service actions and penalties from time to time.{'\n\n'}

            Happiness Car Rreserves the right to take proper and suitable action as per the laws applicable wherein the grave offences like sexual harassment is either reported or found. Happiness does not tertain any demand of compensation or else unless examine the situation in an independent manner and on case-to-case basis. However, Happiness Car Rental shall always endeavor to provide healthy and conducive environment{'\n\n'}

            Membership:{'\n\n'}

            Happiness car rental reserves the right to offer memberships to Vendor at any price. All fees for membership are payable in advance of the provision of the service and are non-refundable.{'\n\n'}

            Happiness Car Rental DOES NOT GUARANTEE any minimum number of taxi bookings, increase in leads or any sales as a result of your purchase of membership. It’s just provision for a better chance of accepting taxi bookings for a member Vendor compared to a non-member Vendor.{'\n\n'}

            Happiness Car Rental reserves the right to add, remove, update or modify features of memberships or define various types of memberships and to modify the website(s), without notification to you.{'\n\n'}

            You will receive the membership for the period of time identified at the time of purchase. Happiness Car Rental reserves the right to terminate the membership at any time and refund you for fees for the remaining period of membership.{'\n\n'}



            Taxes:{'\n\n'}

            The Vendor acknowledges and agrees that it is required to complete all tax registration obligations and calculate and remit all tax liabilities related to the provision of transportation services as required by applicable law and provide Happiness Car Rental with all relevant tax information (including a valid GST number belonging to Vendor and/or any Driver by applicable law). Vendor further acknowledges and agrees that Vendor and each of its Drivers are responsible for taxes on their own income arising from the performance of transportation services. Notwithstanding anything to the contrary in this agreement, Happiness Car Rental may in its reasonable discretion based on applicable tax and regulatory considerations, collect and premit taxes resulting from Vendor’s and/or any Driver’s provision of transportation services and/or provide any of the relevant tax information pertaining to the vendor directly to the applicable government tax authorities on Vendor’s and/or the applicable Driver’s behalf or otherwise.{'\n\n'}



            Intellectual Property:{'\n\n'}

            The Happiness Car Rental services, Happiness Car Rental logo, Happiness Car Rental website, Happiness Car Rental data, including all other intellectual property rights therein, and the Happiness Car Rental devices are and shall remain the property of Happiness Car Rental. Neither this agreement nor Vendors’ use of the Happiness Car Rental services, its Various applications or Data, conveys or grants to Vendor any rights in or related to the Happiness Car Rental services, its various applications or Data, except for the limited license granted as above or to use or reference in any manner Happiness Car Rental company names, logos, product and service names, trademarks, service marks or other indicia of ownership. Additionally, Vendor acknowledges Happiness Car Rental rights in its Happiness Car Rental family of trademarks and names, including Happiness Car Rental, alone and in combination with other letters, punctuation, words, symbols and/or designs. Vendor agrees it will not, and it will ensure that its Drivers do not, try to register or otherwise claim ownership in any of the Happiness Car Rental marks and names, alone or in combination with other letters, punctuation, words, symbols and/or designs, or in any confusingly similar mark or name. Vendor and/or Driver shall not reproduce, modify or prepare derivative works of applications of Happiness Car Rental decompile, reverse engineer or dissemble the services of Happiness Car Rental except as may be expressly permitted by Happiness Car Rental{'\n\n'}



            Term:{'\n\n'}

            This agreement shall commence of the date that the agreement in any format is execut{'\n\n'}
          </Text>
        </ScrollView>
      </View>

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
  scrollBox: {
    flex: 1,
    width: '100%', // Full width of the container
    padding: 10, // Padding around the box
    backgroundColor: '#fff', // Background color for the scrolling box
    borderRadius: 10, // Rounded corners
    marginTop: 20, // Space between header and scroll box
    elevation: 2, // Add shadow for Android
  },
  agreementContainer: {
    padding: 10, // Padding inside the ScrollView
  },
  agreementText: {
    fontSize: 16,
    lineHeight: 24,
  }
});

export default SLAAgreementScreen;
