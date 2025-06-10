import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/LoginScreen";
import { isLoggedIn } from "session/Runtime";

export default function App() {
    return isLoggedIn() ? HomeScreen() : LoginScreen();
}