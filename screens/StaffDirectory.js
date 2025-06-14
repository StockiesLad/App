// screens/StaffDirectoryScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Keyboard,
  Pressable,
} from 'react-native';
import {BLACK, BURGUNDY, getStaff, GREY, WHITE} from 'session/Runtime';
import {Footer, Header, STYLES} from 'screens/Screens'

export default function StaffDirectory({navigation}) {
  const [search, setSearch] = useState('');
  const filtered = getStaff().filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Pressable style={STYLES.flex} onPress={Keyboard.dismiss}>
      <SafeAreaView style={STYLES.background} pointerEvents="box-none">
        <StatusBar barStyle="dark-content" />
        {Header()}
        <View style={styles.card}>
          <Text style={styles.title}>Staff Directory</Text>
          <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={BLACK}
              value={search}
              onChangeText={setSearch}
          />
        </View>

        <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item: person }) => (
                <View style={styles.row}>
                  <Text style={styles.nameText}>{person.name}</Text>
                  <TouchableOpacity
                      style={styles.viewBtn}
                      onPress={() => navigation.replace('StaffMetadata', {employee: person})}
                  >
                    <Text style={styles.viewText}>View Data</Text>
                  </TouchableOpacity>
                </View>
            )}
        />
        {Footer()}
      </SafeAreaView>
    </Pressable>
  );
}

/*
 */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE, justifyContent: 'space-between' },
  header: {
    height: 40,
    backgroundColor: GREY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  logoutText: { color: WHITE, fontWeight: '600' },
  username: { color: BLACK, fontSize: 16, fontWeight: '500' },
  card: {
    backgroundColor: BURGUNDY,
    margin: 20,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  title: { color: WHITE, fontSize: 20, marginBottom: 12, fontWeight: '600' },
  searchInput: {
    width: '100%',
    backgroundColor: WHITE,
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 16,
    color: BLACK,
  },
  list: { paddingHorizontal: 20, paddingBottom: 72},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BURGUNDY,
    borderRadius: 20,
    marginVertical: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  nameText: { color: WHITE, fontSize: 16 },
  viewBtn: {
    backgroundColor: WHITE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  viewText: { color: BURGUNDY, fontWeight: '500' },
});
