import {BLACK, BURGUNDY, GREY, USER, WHITE} from "../session/Runtime";
import {Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {createContext, useContext, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";

const NavContext = createContext();
export const NavProvider = ({ children }) => {
    const [last, setLast] = useState(null);
    return (
        <NavContext.Provider value={{ last, setLast }}>
            {children}
        </NavContext.Provider>
    );
};
export const useNavHistory = () => useContext(NavContext);

export function Header() {
    return (<SafeAreaView style={STYLES.headerPad}>
        <View style={STYLES.header}>
            <TouchableOpacity style={STYLES.logoutButton}>
                <Text style={STYLES.logoutText}>Log Out</Text>
            </TouchableOpacity>
            <Text style={STYLES.username}>{USER}</Text>
        </View>
    </SafeAreaView>);
}

export function Footer() {
    const navigation = useNavigation();
    const route = useRoute();
    let {last, setLast} = useNavHistory();
    return (<View style={STYLES.footer}>
        <TouchableOpacity disabled={route.name === "Home"} onPress={() => {
            setLast({name : route.name, params : route.params});
            navigation.goBack();
        }}>
            <Ionicons
                name="arrow-back" size={32}
                style={route.name === "Home" ? STYLES.faded : STYLES.empty}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            if (route.name !== "Home")
                setLast({name : route.name, params : route.params});
            navigation.replace("Home");
        }}>
            <Ionicons name="home" size={32} />
        </TouchableOpacity>
        <TouchableOpacity disabled={last == null} onPress={() => {
            navigation.navigate(last.name, last.params);
            setLast(null);
        }}>
            <Ionicons
                name="arrow-forward" size={32}
                style={last == null ? STYLES.faded : STYLES.empty}
            />
        </TouchableOpacity>
    </View>);
}

export const STYLES = StyleSheet.create({
    empty: {},
    flex: { flex: 1 },
    faded: { opacity: 0 },
    background: {
        flex: 1,
        backgroundColor: WHITE,
    },
    headerPad: {
        backgroundColor: GREY,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        height: 48,
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
    basicButtonsContainer: {
        padding: 16,
        alignItems: 'center',
    },
    directoryButton: {
        width: '85%',
        backgroundColor: BURGUNDY,
        paddingVertical: 24,
        borderRadius: 16,
        marginBottom: 24,
        alignItems: 'center',
        shadowColor: BLACK,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 4,
    },

    directoryButtonText: {
        color: WHITE,
        fontSize: 20,
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
})