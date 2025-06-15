import React, { useState } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { BLACK, BURGUNDY, WHITE } from 'session/Runtime';
import { Header, Footer, STYLES } from './Screens';

export default function StaffMetadata({ route }) {
  const employee = route.params.employee || {};
  const [fields, setFields] = useState({
    name:           employee.name        || '',
    position:       employee.position    || '',
    sector:         employee.sector      || '',
    email:          employee.email       || '',
    homePhone:      employee.homePhone   || '',
    mobilePhone:    employee.mobilePhone || '',
  });

  const update = (key, value) =>
      setFields(f => ({ ...f, [key]: value }));

  return (
      <SafeAreaView style={STYLES.background}>
        <StatusBar barStyle="dark-content" />

        {Header()}

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
              style={styles.flex}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
                style={styles.flex}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
              <View style={styles.card}>
                {[
                  ['Name',          'name',       'default'],
                  ['Position',      'position',   'default'],
                  ['Sector',        'sector',     'default'],
                  ['Email',         'email',      'email-address'],
                  ['Home Phone',    'homePhone',  'phone-pad'],
                  ['Mobile Phone',  'mobilePhone','phone-pad'],
                ].map(([label, key, type]) => (
                    <View key={key} style={styles.field}>
                      <Text style={styles.label}>{label}</Text>
                      <TextInput
                          style={styles.input}
                          value={fields[key]}
                          onChangeText={val => update(key, val)}
                          placeholder={`Enter ${label}`}
                          placeholderTextColor={BLACK}
                          keyboardType={type}
                          autoCapitalize={type==='email-address' ? 'none' : 'sentences'}
                      />
                    </View>
                ))}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

        {Footer()}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex:    { flex: 1 },
  content: {
    flexGrow: 1,
    padding:  20,
    paddingBottom: 56 + 20
  },
  card:    {
    backgroundColor: BURGUNDY,
    borderRadius:    16,
    padding:         20,
  },
  field:   {
    marginBottom: 16,
  },
  label:   {
    color:        WHITE,
    fontSize:     16,
    marginBottom: 6,
    fontWeight:   '500',
  },
  input:   {
    backgroundColor:   WHITE,
    borderRadius:      8,
    height:            44,
    paddingHorizontal: 12,
    color:             BLACK,
  },
});