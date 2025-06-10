import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  Pressable,
} from 'react-native';
import { ActivityIndicator } from 'react-native-web';
import { BLACK, BURGUNDY, createAccount, handleLogin, GREY, WHITE } from 'session/Runtime';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

   return (
    // 1) This Pressable catches taps *outside* your form
    <Pressable style={styles.flex} onPress={Keyboard.dismiss}>
      {/* 
        2) pointerEvents="box-none" tells RN:
           “Let this view and its children handle touches;
            only let the parent Pressable see taps on empty space.”
      */}
      <SafeAreaView style={styles.container} pointerEvents="box-none">
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Login / Create an Account
          </Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Red “card” */}
          <View style={styles.card}>
            <Text style={styles.label}>Username / Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username or email"
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() =>handleLogin(navigation, password, email, setLoading)} 
              disabled={loading}>
              {loading ? <ActivityIndicator color={WHITE} /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={createAccount} disabled={loading}>
              <Text style={styles.buttonText}>Create new account</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}></View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { 
    flex: 1, 
    backgroundColor: WHITE, 
    justifyContent: 'space-between'
  },
  header: {
    height: 40,
    backgroundColor: GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: { color: BLACK, fontSize: 18, fontWeight: '600' },
  body: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: BURGUNDY,
    width: '100%',
    borderRadius: 16,
    padding: 20,
    zIndex: 1,
  },
  label: { color: WHITE, fontSize: 16, marginBottom: 8, fontWeight: '500' },
  input: {
    backgroundColor: WHITE,
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 12,
    marginBottom: 20,
    color: BLACK,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 30,
    columnGap: 15, 
    justifyContent: 'space-between',
    zIndex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: BURGUNDY,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: { 
    color: WHITE, 
    fontSize: 14, 
    fontWeight: '500',
    textAlign: 'center'
  },
  footer: {
    height: 40,
    backgroundColor: BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
});