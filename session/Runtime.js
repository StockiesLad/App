import HomeScreen from "screens/HomeScreen";

export default class Runtime {
    screen;
    loginSession;
    constructor() {
        this.screen = new HomeScreen(this);
        this.loginSession = null
    }

    isLoggedIn() {
        return this.loginSession != null;
    }

    setScreen(/** @type {import("@types").AbstractScreen} */ screen) {
        this.screen = screen;
    }
}
