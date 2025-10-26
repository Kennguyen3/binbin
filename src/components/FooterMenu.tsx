import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
interface FooterMenuProps {
  active: string;
}

const FooterMenu: React.FC<FooterMenuProps> = ({ active }) => {

  const navigation = useNavigation();

  const { user } = useAuth();
  const handleNavigate = (screen: string) => {
    if (!user) {
      navigation.navigate("Login");
      return;
    }
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={[styles.button, active === 'home' && styles.activeButton]}
        onPress={() => handleNavigate('HomePage')}
        disabled={active === 'home'}
      >
        <Icon name="home" size={24} color={active === 'home' ? '#2079FF' : '#848484'} />
        <Text style={[styles.text, active === 'home' && styles.activeText]}>Trang chủ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, active === 'orders' && styles.activeButton]}
        onPress={() => handleNavigate('Shipping')}
        disabled={active === 'orders'}
      >
        <Icon name="shopping-cart" size={24} color={active === 'orders' ? '#2079FF' : '#848484'} />
        <Text style={[styles.text, active === 'orders' && styles.activeText]}>Đơn hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, active === 'wishlist' && styles.activeButton]}
        onPress={() => handleNavigate('Wishlist')}
        disabled={active === 'wishlist'}
      >
        <Icon name="heart" size={24} color={active === 'wishlist' ? '#2079FF' : '#848484'} />
        <Text style={[styles.text, active === 'wishlist' && styles.activeText]}>Yêu thích</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, active === 'Notify' && styles.activeButton]}
        onPress={() => handleNavigate('Notify')}
        disabled={active === 'Notify'}
      >
        <Icon name="bell" size={24} color={active === 'Notify' ? '#2079FF' : '#848484'} />
        <Text style={[styles.text, active === 'Notify' && styles.activeText]}>Thông báo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, active === 'profile' && styles.activeButton]}
        onPress={() => handleNavigate('ProfilePage')}
        disabled={active === 'profile'}
      >
        <Icon name="user" size={24} color={active === 'profile' ? '#2079FF' : '#848484'} />
        <Text style={[styles.text, active === 'profile' && styles.activeText]}>Tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E5EBE8',
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    color: '#2079FF',
  },
  text: {
    marginTop: 10,
    color: '#888',
    fontSize: 12
  },
  activeText: {
    color: '#2079FF',
  },
});

export default FooterMenu;
