import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Keyboard,
  Pressable,
} from 'react-native';
import {BLACK, BURGUNDY, WHITE} from 'session/Runtime';
import {Footer, Header, STYLES} from "./Screens";

export default function StaffMetadata({/*navigation,*/ route}) {
  const employee = route.params.employee;
  const [name, setName] = useState(employee.name || '');
  const [position, setPosition] = useState(employee.position || '');
  const [sector, setSector] = useState(employee.sector || '');
  const [email, setEmail] = useState(employee.email || '');
  const [homePhone, setHomePhone] = useState(employee.homePhone || '');
  const [mobilePhone, setMobilePhone] = useState(employee.mobilePhone || '');

  // noinspection JSValidateTypes
  return (
    <Pressable style={STYLES.flex} onPress={Keyboard.dismiss}>
      <SafeAreaView style={STYLES.background} pointerEvents="box-none">
        <StatusBar barStyle="dark-content" />
        {Header()}
        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          <View style={styles.metadataBox}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="<Paul Johnson>"
                placeholderTextColor={BLACK}
                value={name}
                onChangeText={setName}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Company Position</Text>
            <TextInput
                style={styles.input}
                placeholder="<Employee>"
                placeholderTextColor={BLACK}
                value={position}
                onChangeText={setPosition}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Company Sector</Text>
            <TextInput
                style={styles.input}
                placeholder="<Finance>"
                placeholderTextColor={BLACK}
                value={sector}
                onChangeText={setSector}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={BLACK}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Phone Number (Home)</Text>
            <TextInput
              style={styles.input}
              placeholder="Home Phone Number"
              placeholderTextColor={BLACK}
              value={homePhone}
              onChangeText={setHomePhone}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Phone Number (Mobile)</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Phone Number"
              placeholderTextColor={BLACK}
              value={mobilePhone}
              onChangeText={setMobilePhone}
              keyboardType="phone-pad"
            />
          </View>
        </ScrollView>
        {Footer()}
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  metadataBox: {
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
});
