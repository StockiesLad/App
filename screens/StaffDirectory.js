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
import { getProfile, getStaff, logOut } from 'session/Runtime';

// Color palette
const WHITE    = '#fff';
const GREY     = '#D9D9D9';
const BURGUNDY = '#941A1D';
const BLACK    = '#262626';

export default function StaffDirectory({navigation}) {
  const [search, setSearch] = useState('');
  const filtered = getStaff().filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Pressable style={styles.flex} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container} pointerEvents="box-none">
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.logoutBtn} onPress={logOut()}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          <Text style={styles.username}>{getProfile()}</Text>
        </View>

        {/* Title + Search */}
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

        {/* List */}
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

        {/* Footer Nav placeholder */}
        <View style={styles.footer} />
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: WHITE, justifyContent: 'space-between' },
  header: {
    height: 40,
    backgroundColor: GREY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  logoutBtn: {
    backgroundColor: BLACK + '80',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
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
  list: { paddingHorizontal: 20, paddingBottom: 60 },
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
  footer: {
    height: 40,
    backgroundColor: BLACK,
  },
});
