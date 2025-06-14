import React from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {BLACK, BURGUNDY, WHITE} from 'session/Runtime';
import {Footer, Header, STYLES} from "./Screens";

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={STYLES.background}>
      <StatusBar barStyle="dark-content" />
      {Header()}

      <ScrollView contentContainerStyle={styles.body}>
        {['Human Resources', 'Company Intranet', 'Staff Directory'].map((label, i) => (
          <TouchableOpacity key={i} style={styles.button} onPress={() => navigation.navigate(label)}>
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {Footer()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  body: {
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: BURGUNDY,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: BLACK,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    color: WHITE,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  announceRow: {
    backgroundColor: BURGUNDY,
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  announceText: {
    color: '#fff',
  },
  button: {
    width: '80%',
    backgroundColor: BURGUNDY,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: BLACK,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});