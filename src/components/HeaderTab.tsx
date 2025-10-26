import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
interface HeaderTabProps {
  showBack: boolean;
  title: string;
}

const HeaderTab: React.FC<HeaderTabProps> = ({ showBack, title }) => {

  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.containerHeader}>
      {showBack ?
        <TouchableOpacity style={styles.backHeaderView} onPress={() => handleNavigate()}>
          <Image source={require('../media/icon/back_screen.png')} style={styles.iconBackHeader} />
        </TouchableOpacity>
        :
        ""
      }
      <Text style={styles.titleHeaderComponent}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 13,
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: 'white',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 }, // Only bottom shadow
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  backHeaderView: {
    position: 'absolute',
    left: 20,
    zIndex: 14,
    bottom: 14
  },
  iconBackHeader: {
    width: 12,
    height: 12
  },
  titleHeaderComponent: {
    fontSize: 16,
    color: '#000000'
  }

});

export default HeaderTab;
