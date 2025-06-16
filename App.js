import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "screens/HomeScreen";
import StaffDirectory from "screens/StaffDirectory";
import StaffMetadata from "screens/StaffMetadata";
import {EmptyScreen} from "./screens/EmptyScreen";
import {NavProvider} from "./screens/Screens";
import {useEffect} from "react";
import {initializeDepartments} from "./session/Runtime";

const ScreenStack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        initializeDepartments()
            .catch(err => console.error("Dept init failed:", err))
    }, [])

    return (<NavProvider>
        <NavigationContainer>
            <ScreenStack.Navigator
                initialRouteName={"Home"}
                screenOptions={{ headerShown: false }}
                id="Navigator"
            >
                <ScreenStack.Screen name="Home"  component={HomeScreen}/>
                <ScreenStack.Screen name="Human Resources" component={EmptyScreen}/>
                <ScreenStack.Screen name="Company Intranet" component={EmptyScreen}/>
                <ScreenStack.Screen name="Staff Directory" component={StaffDirectory}/>
                <ScreenStack.Screen name="Staff Metadata" component={StaffMetadata}/>
            </ScreenStack.Navigator>
        </NavigationContainer>
    </NavProvider> );
}