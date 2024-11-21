import { useCallback, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type SearchProps = {
    onSearch: (query: string) => void
}

export const SearchBar = ({ onSearch }: SearchProps) => {
    const [query, setQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const handleSearchChange = useCallback((query: string) => {
        setQuery(query);
        onSearch(query);
      }, [onSearch]);

      return (
        <View style={styles.headerContainer}>
          {isSearching ? (
            <TextInput
              style={styles.searchInput}
              placeholder="Search contacts"
              value={ query }
              onChangeText={handleSearchChange}
              autoFocus
            />
          ) : (
            <View style={{ flex: 1 }} />
          )}
          <TouchableOpacity onPress={() => setIsSearching(!isSearching)}>
            <Icon name={isSearching ? 'times' : 'search'} size={20} color="#000" />
          </TouchableOpacity>
        </View>
      );
};

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginRight: 10,
    },
  });
