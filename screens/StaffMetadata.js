import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  StatusBar,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import {
  BLACK,
  BURGUNDY,
  WHITE,
  initializeDepartments,
  DepToString,
  DepFromString,
  saveEmployee,
  removeEmployee,
} from 'session/Runtime';
import { Header, Footer, STYLES } from '../util/ScreensUtils';

export default function StaffMetadata({ navigation, route }) {
  const employee = route.params.employee || {};

  useEffect(() => {
    initializeDepartments().catch(console.error);
  }, []);

  const [depts, setDepts] = useState([]);
  useEffect(() => {
    const list = Object.entries(DepToString)
        .map(([id, name]) => ({ id: Number(id), name }));
    list.sort((a, b) => a.id - b.id);
    setDepts(list);
  }, [DepToString]);

  // form state
  const [fields, setFields] = useState({
    id:             employee.id || 0,
    name:           employee.name || '',
    departmentName: DepToString[employee.departmentId] || '',
    email:          employee.email || '',
    phone:          employee.phone || '',
    street:         employee.street || '',
    city:           employee.city || '',
    state:          employee.state || '',
    zip:            employee.zip || '',
    country:        employee.country || '',
  });
  const update = (key, val) => setFields(f => ({ ...f, [key]: val }));

  const [saving, setSaving]   = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...fields,
        departmentId: DepFromString[fields.departmentName],
      };
      delete payload.departmentName;
      await saveEmployee(fields.id, payload);
      Alert.alert('Success', 'Saved successfully!');
    } catch (err) {
      Alert.alert('Error', 'Could not update employee:\n' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = () => {
    Alert.alert(
        'Confirm Deletion',
        `Do you want to delete this employee?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              setRemoving(true);
              try {
                await removeEmployee(fields.id);
                navigation.goBack();
              } catch (err) {
                Alert.alert('Error', err.message);
              } finally {
                setRemoving(false);
              }
            },
          },
        ]
    );
  };

  return (
      <SafeAreaView style={STYLES.background}>
        <StatusBar barStyle="dark-content" />
        {Header()}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  ['Name', 'name', 'default'],
                  ['Department', 'departmentName', 'default'],
                  ['Email', 'email', 'email-address'],
                  ['Phone', 'phone', 'phone-pad'],
                  ['Street', 'street', 'default'],
                  ['City', 'city', 'default'],
                  ['State', 'state', 'default'],
                  ['Zip', 'zip', 'numeric'],
                  ['Country', 'country', 'default'],
                ].map(([label, key, keyboard]) => (
                    <View key={key} style={styles.field}>
                      <Text style={styles.label}>{label}</Text>

                      {key === 'departmentName' ? (
                          <View style={styles.pickerContainer}>
                            <Picker
                                mode="dropdown"
                                style={styles.picker}
                                selectedValue={fields.departmentName}
                                onValueChange={val => update('departmentName', val)}
                            >
                              {depts.map(d => (
                                  <Picker.Item key={d.id} label={d.name} value={d.name} />
                              ))}
                            </Picker>
                          </View>
                      ) : (
                          <TextInput
                              style={styles.input}
                              value={fields[key]}
                              onChangeText={val => update(key, val)}
                              placeholder={`Enter ${label}`}
                              placeholderTextColor={BLACK}
                              keyboardType={keyboard}
                              autoCapitalize={keyboard === 'email-address' ? 'none' : 'sentences'}
                          />
                      )}
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
                >
                  <Text style={styles.removeText}>
                    {removing ? 'Removing…' : 'Remove'}
                  </Text>
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
  flex: { flex: 1 },
  content: { flexGrow: 1, padding: 20, paddingBottom: 100 },
  card: { backgroundColor: BURGUNDY, borderRadius: 16, padding: 20 },
  field: { marginBottom: 16, width: '100%' },
  label: { color: WHITE, fontSize: 16, marginBottom: 6, fontWeight: '500' },
  input: {
    width: '100%',
    backgroundColor: WHITE,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    color: BLACK,
  },

  pickerContainer: {
    width: '100%',
    backgroundColor: WHITE,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    justifyContent: 'center',
    overflow: 'visible',
  },
  picker: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: WHITE,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: { color: BURGUNDY, fontSize: 16, fontWeight: '600' },
  removeBtn: {
    marginTop: 12,
    backgroundColor: WHITE,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeText: { color: BURGUNDY, fontSize: 16, fontWeight: '600' },
});