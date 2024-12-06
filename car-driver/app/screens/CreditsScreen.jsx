import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { menuItems } from '../../components/lib/common/MenuItems'
import Sidebar from '../../components/lib/common/Sidebar'
const CreditsScreen = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleMenuItemPress = (item) => {
    if (item.screen) {
      router.navigate(`/screens/${item.screen}`); // Navigate to the screen specified in the menu item
    }
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Welcome to the Credits Page!</Text>

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CreditsScreen;
