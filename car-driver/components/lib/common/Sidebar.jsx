import React, { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Sidebar = ({ visible, onClose, menuItems, onMenuItemPress }) => {
    const [submenuVisible, setSubmenuVisible] = useState(false);

    // Handle menu item press, including toggling submenu visibility
    const handleMenuItemPress = (item) => {
        if (item.isParent) {
            setSubmenuVisible((prevState) => !prevState);
        } else {
            onMenuItemPress(item);
            onClose();
        }
    };

    // Render individual menu items
    const renderMenuItem = ({ item }) => {
        const isSubMenu = item.parentId === '5';

        // Do not render submenu items if submenu is hidden
        if (isSubMenu && !submenuVisible) return null;

        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => handleMenuItemPress(item)}
                style={[styles.menuItem, isSubMenu && styles.subMenuItem]}
            >
                <Icon name={item.icon} size={24} color="gray" style={styles.menuIcon} />
                <Text style={[styles.menuText, isSubMenu && styles.subMenuText]}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.menuModalContent}>
                    {/* Logo Section */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../../assets/logo1.jpg')} // Replace with your logo
                            style={styles.logoImage}
                        />
                    </View>

                    {/* Menu List */}
                    <FlatList
                        data={menuItems}
                        renderItem={renderMenuItem}
                        keyExtractor={(item) => item.id}
                    />

                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
    logoContainer: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    logoImage: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
    menuIcon: { marginRight: 35 },
    menuText: { fontSize: 18, color: 'gray' },
    subMenuItem: {
        paddingLeft: 30,
        paddingVertical: 2,
    },
    subMenuText: {
        fontSize: 14,
        color: 'gray',
    },
    closeButton: {
        backgroundColor: '#FFB400',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 80,
        marginBottom: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Sidebar;
