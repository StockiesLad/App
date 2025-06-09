import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AbstractScreen from './AbstractScreen';
import LoginScreen from './LoginScreen';

export default class HomeScreen extends AbstractScreen {
    constructor(runtime) {
        super(StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            }),
            runtime
        );
    }

    fetchData() {
        return (
            <View style={this.styles.container}>
            <Text>Home Screen</Text>
            <StatusBar style="auto" />
            </View>
        );
    }

    upload() {
        if (this.runtime.isLoggedIn())
            this.runtime.setScreen(new LoginScreen(this.runtime));
    }
}