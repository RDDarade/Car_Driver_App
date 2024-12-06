export const menuItems = [
  { id: '0', title: 'Home', screen: 'HomeScreen', icon: 'home-outline' },
  { id: '1', title: 'Profile', screen: 'ProfileScreen', icon: 'person-outline' },
  { id: '2', title: 'Wallet', screen: 'WalletScreen', icon: 'wallet-outline' },
  { id: '3', title: 'Add Car', screen: 'AddCarScreen', icon: 'car-outline' },
  { id: '4', title: 'Legal Help', screen: 'LegalHelpScreen', icon: 'help-circle-outline' },

  // My Booking (parent) and submenu items
  { id: '5', title: 'My Booking', screen: null, icon: 'ribbon-outline', isParent: true },
  { id: '5.1', title: 'Active Booking', screen: 'ActiveBookingScreen', icon: 'checkmark-circle-outline', parentId: '5' },
  { id: '5.2', title: 'Booking History', screen: 'BookingHistoryScreen', icon: 'time-outline', parentId: '5' },
  { id: '5.3', title: 'My Booking Details', screen: null, icon: 'information-circle-outline', parentId: '5' },

  { id: '6', title: 'B2B Agents', screen: 'B2BAgentsScreen', icon: 'business-outline' },
  { id: '7', title: 'Penalty', screen: 'PenaltyScreen', icon: 'alert-circle-outline' },
  { id: '8', title: 'SLA Agreement', screen: 'SLAAgreementScreen', icon: 'document-text-outline' },
  { id: '9', title: 'Log Out', screen: 'LogOutScreen', icon: 'log-out-outline' },
];