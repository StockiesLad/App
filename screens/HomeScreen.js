import React from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Footer, Header, STYLES} from "./Screens";

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={STYLES.background}>
      <StatusBar barStyle="dark-content" />
      <Header/>

      <ScrollView contentContainerStyle={STYLES.basicButtonsContainer}>
        {['Staff Directory', 'Human Resources', 'Company Intranet']
            .map((label, i) => (
                <TouchableOpacity
                    key={i}
                    style={STYLES.directoryButton}
                    onPress={() => navigation.navigate(label)
                }><Text style={STYLES.directoryButtonText}>{label}</Text>
                </TouchableOpacity>
        ))}
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}