import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native';


import HomeScreen from '../views/HomePage/HomeScreen';
import { icHomeUnselected, icBellUnselected, icLoveUnselected, icOrderUnselected, icProfileUnselected } from '../../assets';
import ShippingScreen from '@/views/Shipping/ShippingScreen';
import WishlistScreen from '@/views/Wishlist/WishlistScreen';
import ProfilePage from '@/views/Profile/ProfilePage';
import NotifyScreen from '@/views/Notify/NotifyScreen';

const Tab = createBottomTabNavigator();

function CustomTabIcon({ icon, activeIcon, focused, label, badge }) {
    return (
        <View
            style={{
                flex: 0,                        // ❗Quan trọng: không cho nó giãn full width
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 60,                  // ❗Đảm bảo chứa đủ text
                paddingHorizontal: 4,
            }}
        >
            <View style={{ position: 'relative' }}>
                <Image
                    source={focused ? activeIcon : icon}
                    style={{
                        width: 14,
                        height: 14,
                        tintColor: focused ? '#2C6AF8' : '#999',
                        resizeMode: 'contain',
                    }}
                />

                {badge && (
                    <View
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'red',
                            position: 'absolute',
                            top: -2,
                            right: -4,
                        }}
                    />
                )}
            </View>

            <Text
                style={{
                    fontSize: 8,
                    marginTop: 2,
                    color: focused ? '#2C6AF8' : '#777',
                    fontWeight: focused ? '600' : '400',
                }}
            >
                {label}
            </Text>
        </View>
    );
}



export default function BottomTabs() {
    return (
        // @ts-ignore
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 64,
                    paddingBottom: 6,
                    paddingTop: 6,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            icon={icHomeUnselected}
                            activeIcon={icHomeUnselected}
                            focused={focused}
                            label="Trang chủ" badge={undefined} />
                    ),
                }}
            />

            <Tab.Screen
                name="Shipping"
                component={ShippingScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            icon={icOrderUnselected}
                            activeIcon={icOrderUnselected}
                            focused={focused}
                            label="Đơn hàng" badge={undefined} />
                    ),
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            icon={icLoveUnselected}
                            activeIcon={icLoveUnselected}
                            focused={focused}
                            label="Yêu thích" badge={undefined} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notify"
                component={NotifyScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            icon={icBellUnselected}
                            activeIcon={icBellUnselected}
                            focused={focused}
                            label="Thông báo" badge={undefined} />
                    ),
                }}
            />

            <Tab.Screen
                name="ProfilePage"
                component={ProfilePage}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <CustomTabIcon
                            icon={icProfileUnselected}
                            activeIcon={icProfileUnselected}
                            focused={focused}
                            label="Tài khoản" badge={undefined} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
