import React from 'react';
import {
    SafeAreaView,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    View
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Footer, Header, STYLES} from "../util/ScreensUtils";

const BUTTONS = [
    {
        label: 'Staff Directory',
        icon: <Ionicons name="people-outline" size={32} color="white" />
    },
    {
        label: 'Company Intranet',
        icon: <Ionicons name="globe-outline" size={32} color="white" />
    },
    {
        label: 'Human Resources',
        icon: <Ionicons name="people-circle" size={32} color="white" />
    },
];

export default function HomeScreen({navigation}) {
    return (
        <SafeAreaView style={STYLES.background}>
            <StatusBar barStyle="dark-content" />
            <Header />

            <ScrollView contentContainerStyle={STYLES.basicButtonsContainer}>
                {BUTTONS.map(({label, icon}, i) => (
                    <TouchableOpacity
                        key={i}
                        style={STYLES.directoryButton}
                        onPress={() => navigation.navigate(label)}
                    >
                        <Text style={STYLES.directoryButtonText}>{label}</Text>
                        <View style={{ marginTop: 8 }}>{icon}</View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Footer />
        </SafeAreaView>
    );
}