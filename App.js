import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "screens/HomeScreen";
import StaffDirectory from "screens/StaffDirectory";
import StaffMetadata from "screens/StaffMetadata";

const ScreenStack = createNativeStackNavigator();

export default function App() {
    return (<NavigationContainer>
        <ScreenStack.Navigator
            initialRouteName={"Home"}
            screenOptions={{ headerShown: false }}
            id="Navigator"
        >
            <ScreenStack.Screen name="Home"  component={HomeScreen}/>
            <ScreenStack.Screen name="StaffDirectory" component={StaffDirectory}/>
            <ScreenStack.Screen name="StaffMetadata" component={StaffMetadata}/>
        </ScreenStack.Navigator>
    </NavigationContainer>);
}