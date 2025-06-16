import React, {useEffect, useState} from 'react';
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
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  BLACK,
  BURGUNDY,
  DepFromString,
  DepToString,
  initializeDepartments,
  removeEmployee,
  WHITE
} from 'session/Runtime';
import { saveEmployee }                 from 'session/Runtime';   // ← import it
import { Header, Footer, STYLES }       from './Screens';

export default function StaffMetadata({navigation, route }) {
  const employee = route.params.employee || {};

  useEffect(() => {
    initializeDepartments().catch(console.error);
  }, []);

  const [fields, setFields]        = useState({
    name:           employee.name || '',
    departmentName:   DepToString[employee.departmentId] ?? '',
    email:          employee.email || '',
    phone:          employee.phone || '',
    street:         employee.street || '',
    city:           employee.city || '',
    state:          employee.state || '',
    zip:            employee.zip || '',
    country:         employee.country || '',
  });
  const [saving, setSaving]        = useState(false);
  const [removing, setRemoving]        = useState(false);

  console.info(DepToString)
  console.info(fields)

  const update = (key, val) => {
    setFields(f => ({...f, [key]: val}));
    console.info(fields)
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {...fields, departmentId: DepFromString[fields.departmentName]};
      delete payload.departmentName;
      await saveEmployee(employee.id, payload);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removeEmployee(employee.id);
    } catch (err) {
      console.error(err);
    } finally {
      setRemoving(false);
      navigation.navigate('Staff Directory', route.params);
    }
  };

  // noinspection JSValidateTypes
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
                  ['Name',          'name',         'default'],
                  ['Department',    'departmentName', 'default'],
                  ['Email',         'email',        'email-address'],
                  ['Phone',         'phone',        'phone-pad'],
                  ['Street',        'street',       'default'],
                  ['City',          'city',         'default '],
                  ['State',         'state',        'default '],
                  ['Zip',           'zip',          'numeric '],
                  ['Country',       'country',      'default '],
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
                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={handleSave}
                    disabled={saving}
                >
                  <Text style={styles.saveText}>
                    {saving ? 'Saving…' : 'Save'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={handleRemove}
                    disabled={removing}
                ><Text style={styles.removeText}>{removing ? 'Removing…' : 'Remove'}</Text>
                </TouchableOpacity>
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
    flexGrow:     1,
    padding:      20,
    paddingBottom: 100,  // ensure scroll past save button
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
    color:         WHITE,
    fontSize:      16,
    marginBottom:  6,
    fontWeight:    '500',
  },
  input:   {
    backgroundColor:   WHITE,
    borderRadius:      8,
    height:            44,
    paddingHorizontal: 12,
    color:             BLACK,
  },
  saveBtn: {
    marginTop:    24,
    backgroundColor: WHITE,
    paddingVertical: 12,
    borderRadius:    8,
    alignItems:      'center',
  },
  saveText: {
    color:    BURGUNDY,
    fontSize: 16,
    fontWeight: '600',
  },
  removeBtn: {
    marginTop:      12,
    backgroundColor: WHITE,
    paddingVertical: 12,
    borderRadius:    8,
    alignItems:      'center',
  },
  removeText: {
    color:      BURGUNDY,
    fontSize:   16,
    fontWeight: '600',
  },
});