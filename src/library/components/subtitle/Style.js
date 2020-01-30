import { StyleSheet } from "react-native";
import Colors from '../../../constants/Colors';

const style = StyleSheet.create({
    title: {
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
        width: '95%',
        fontFamily: Colors.fontFamily,
        color: Colors.gray,
        marginBottom: 5,
        fontSize: 14,
    },
    keyboardAvoidingView:{
        flex:1
    }
});

export default style;