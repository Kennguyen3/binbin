import React, { memo, useCallback, useState, useEffect, useRef } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type SearchComponentProps = {
    onSearch: (keyword: string) => void;
    placeholder?: string;
};

const SearchComponent = memo(({
    onSearch,
    placeholder = 'Bạn tìm kiếm gì ?',
}: SearchComponentProps) => {
    const [localSearch, setLocalSearch] = useState('');
    //   const debounceTimer = useRef<NodeJS.Timeout>(null);

    // Cleanup timer khi unmount
    //   useEffect(() => {
    //     return () => {
    //       if (debounceTimer.current) {
    //         clearTimeout(debounceTimer.current);
    //       }
    //     };
    //   }, []);

    // Debounce: Auto search sau 500ms không typing
    //   useEffect(() => {
    //     if (debounceTimer.current) {
    //       clearTimeout(debounceTimer.current);
    //     }

    //     debounceTimer.current = setTimeout(() => {
    //       if (localSearch.trim()) {
    //         onSearch(localSearch);
    //       }
    //     }, 500);
    //   }, [localSearch, onSearch]);

    const handleSearchPress = useCallback(() => {
        // if (debounceTimer.current) {
        //   clearTimeout(debounceTimer.current);
        // }
        onSearch(localSearch);
    }, [localSearch, onSearch]);

    return (
        <View style={styles.searchData}>
            <Pressable onPress={handleSearchPress}>
                <Icon name="search" size={16} style={styles.iconSearch} />
            </Pressable>
            <TextInput
                placeholder={placeholder}
                style={styles.inputSearch}
                placeholderTextColor="#000"
                value={localSearch}
                onChangeText={setLocalSearch}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType='search'
                onSubmitEditing={handleSearchPress}
            />
        </View>
    );
});

SearchComponent.displayName = 'SearchComponent';

const styles = StyleSheet.create({
    searchData: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        // marginHorizontal: 16,
        // marginVertical: 8,
    },
    inputSearch: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        paddingLeft: 8,
    },
    iconSearch: {
        color: '#666',
    },
});

export default SearchComponent;