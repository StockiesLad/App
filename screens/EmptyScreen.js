import {Text, View} from "react-native";
import {Footer, Header, STYLES} from "./Screens";
import React from "react";

export function EmptyScreen(/*{navigation}*/) {
    return (<View style={STYLES.background}>
        <Header/>
        <Text>This has not been implemented</Text>
        <Footer/>
    </View>);
}