import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BLACK, BURGUNDY, getAnnouncements, getProfile, GREY, WHITE } from 'session/Runtime';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        <Text style={styles.username}>{getProfile()}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Announcements Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Announcements</Text>
          {getAnnouncements().map((item, i) => (
            <View key={i} style={styles.announceRow}>
              <Text style={styles.announceText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Buttons */}
        {['Human Resources', 'Company Intranet', 'Staff Directory'].map((label, i) => (
          <TouchableOpacity key={i} style={styles.button}>
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={32} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="home" size={32} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="arrow-forward" size={32} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const RED = '#8B0000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    backgroundColor: GREY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  logoutBtn: {
    backgroundColor: BLACK,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: WHITE,
    fontWeight: '600',
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
  },
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
    // shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // elevation for Android
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
    // shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    // elevation for Android
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    height: 56,
    backgroundColor: BLACK,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});