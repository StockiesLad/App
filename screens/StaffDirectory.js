import React, {useEffect, useState} from 'react';
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
import {BLACK, BURGUNDY, createEmployee, getStaff, GREY, WHITE} from 'session/Runtime';
import {Footer, Header, STYLES} from '../util/ScreensUtils'

export default function StaffDirectory({navigation}) {
  const [search, setSearch] = useState('');
  const [staff, setStaff]   = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const list = await getStaff()
        setStaff(list)
      } catch (err) {
      }
    })()
  }, [])

  // Filter locally
  const filtered = staff.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    setCreating(true);
    try {
      // 2️⃣ Send a minimal default payload (your backend must allow defaults)
      const newEmp = await createEmployee({
        name: '',
        departmentId: 1,    // e.g. “General” by default
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      });
      // 3️⃣ Navigate into metadata with the real record (includes id)
      navigation.navigate('Staff Metadata', { employee: newEmp });
    } catch (err) {
      console.error('Error creating employee:', err);
      alert('Could not create employee: ' +  err.message);
    } finally {
      setCreating(false);
    }
  };

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
        <View style={styles.addContainer}>
          <TouchableOpacity
              style={styles.addBtn}
              onPress={handleAdd}
              disabled={creating}
          >
            <Text style={styles.addBtnText}>
              {creating ? 'Creating…' : '+ Add Employee'}
            </Text>
          </TouchableOpacity>
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
                      onPress={() => navigation.navigate('Staff Metadata', {employee: person})}
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
  addContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  addBtn: {
    backgroundColor: BURGUNDY,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
