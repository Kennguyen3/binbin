import React from "react";
import { Animated, StyleSheet, View } from "react-native";

export const SkeletonHeader = () => {
    const pulseAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <View style={styles.skeletonContainer}>
            <Animated.View style={[styles.skeletonBar, { opacity }]} />
            <Animated.View style={[styles.skeletonBar, { opacity, width: '60%' }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonContainer: {
        padding: 16,
        gap: 12,
    },
    skeletonBar: {
        height: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
})
