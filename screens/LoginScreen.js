import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AbstractScreen from './AbstractScreen';

export default class LoginScreen extends AbstractScreen {
    constructor() {
        super(StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }));
    }

    render() {
        return (
            <View style={this.styles.container}>
            <Text>Login Screen</Text>
            <StatusBar style="auto" />
            </View>
        );
    }
}