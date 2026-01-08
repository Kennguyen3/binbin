import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/constants';
interface HeaderTabProps {
  showBack: boolean;
  title: string;
}

const HeaderTab: React.FC<HeaderTabProps> = ({ showBack, title }) => {

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleNavigate = () => {
    navigation.goBack();
  };
  return (
    <View style={{
      flexDirection: 'row',
      height: insets.top + 50,
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
    }}>
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
  backHeaderView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    zIndex: 14,
    width: 40,
    height: 40,
    marginBottom: 8
  },
  iconBackHeader: {
    width: 12,
    height: 12
  },
  titleHeaderComponent: {
    marginBottom: 8,
    fontSize: 16,
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 40,
    fontWeight: '600',
    position: 'absolute',
  }

});

export default HeaderTab;
