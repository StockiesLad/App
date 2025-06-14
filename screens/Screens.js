import {BLACK, GREY, USER, WHITE} from "../session/Runtime";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {createContext, useContext, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";

export const STYLES = StyleSheet.create({
    empty: {},
    flex: { flex: 1 },
    faded: { opacity: 0.5 },
    background: {
        flex: 1,
        backgroundColor: WHITE,
    },
    header: {
        height: 56,
        backgroundColor: GREY,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 56,
        backgroundColor: BLACK,
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 10,
    },
    logoutText: {
        color: WHITE,
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: BLACK,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    username: {
        fontSize: 16,
        fontWeight: '500',
    },
})

const NavContext = createContext();
export const NavProvider = ({ children }) => {
    const [lastScreen, setLastScreen] = useState(null);
    return (
        <NavContext.Provider value={{ lastScreen, setLastScreen }}>
            {children}
        </NavContext.Provider>
    );
};
export const useNavHistory = () => useContext(NavContext);

export function Header() {
    return (<View style={STYLES.header}>
        <TouchableOpacity style={STYLES.logoutButton}>
            <Text style={STYLES.logoutText}>Log Out</Text>
        </TouchableOpacity>
        <Text style={STYLES.username}>{USER}</Text>
    </View>);
}

export function Footer() {
    const navigation = useNavigation();
    const route = useRoute();
    let {lastScreen, setLastScreen} = useNavHistory();
    return (<View style={STYLES.footer}>
        <TouchableOpacity disabled={route.name === "Home"} onPress={() => {
            setLastScreen(route.name);
            navigation.goBack();
        }}>
            <Ionicons name="arrow-back" size={32} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home" size={32} />
        </TouchableOpacity>
        <TouchableOpacity disabled={lastScreen == null} onPress={() => {
            navigation.navigate(lastScreen);
            setLastScreen(null);
        }}>
            <Ionicons name="arrow-forward" size={32}
                      style={lastScreen == null ? STYLES.faded : STYLES.empty} />
        </TouchableOpacity>
    </View>);
}