import { StyleSheet } from "react-native";
import Colors from '../../../constants/Colors';

const style = StyleSheet.create({
    Item: {
        width: "89%",
        borderWidth: 1,
        borderTopColor: Colors.white,
        borderRightColor: Colors.white,
        borderLeftColor: Colors.white,
        borderBottomColor: Colors.white,
        borderRadius: 5,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
    },

    Input: {
        color: Colors.white,
        fontFamily: Colors.fontFamily,
    },
});

export default style;