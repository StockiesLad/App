import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/LoginScreen";
import { isLoggedIn, retrieveProfile } from "session/Runtime";

const Stack = createNativeStackNavigator();

export default function App() {
    retrieveProfile();
    return (
        <NavigationContainer>
        <Stack.Navigator
            initialRouteName={isLoggedIn() ? "Home" : "Login"}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home"  component={HomeScreen}  />
        </Stack.Navigator>
        </NavigationContainer>
    );
}