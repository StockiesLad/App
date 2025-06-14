// screens/StaffMetadataScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  Pressable,
} from 'react-native';
import {BLACK, BURGUNDY, GREY, WHITE} from 'session/Runtime';

export default function StaffMetadata({/*navigation,*/ route}) {
  const employee = route.params.employee;
  const [email, setEmail]         = useState(employee.email || '');
  const [phoneHome, setPhoneHome] = useState(employee.phoneHome || '');
  const [phoneMobile, setPhoneMobile] = useState(employee.phoneMobile || '');

  return (
    <Pressable style={styles.flex} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.background} pointerEvents="box-none">
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.logoutBtn} onPress={logOut()}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          <Text style={styles.username}>{getProfile()}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          {/* Title Card */}
          <View style={styles.card}>
            <Text style={styles.title}>{employee.name || 'Employee Name'}</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              placeholderTextColor={BLACK}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Phone Number (Home)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter home number"
              placeholderTextColor={BLACK}
              value={phoneHome}
              onChangeText={setPhoneHome}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Phone Number (Mobile)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor={BLACK}
              value={phoneMobile}
              onChangeText={setPhoneMobile}
              keyboardType="phone-pad"
            />

            <Text style={styles.note}>
              {`{Insert extra fields if needed}\n{these fields are modifiable if a HR Member}`}
            </Text>
          </View>
        </ScrollView>

        {/* Footer Nav */}
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
  body: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: BURGUNDY,
    borderRadius: 16,
    padding: 20,
  },
  title: {
    color: WHITE,
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  label: {
    color: WHITE,
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: WHITE,
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
    color: BLACK,
  },
  note: {
    marginTop: 20,
    color: WHITE,
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    height: 40,
    backgroundColor: BLACK,
  },
});
