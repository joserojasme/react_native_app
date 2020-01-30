import { StyleSheet } from "react-native";
import Colors from '../../../constants/Colors';

const style = StyleSheet.create({
    title: {
        marginTop: 10,
        marginLeft: "auto",
        marginRight: "auto",
        width: '95%',
        fontFamily: Colors.fontFamilyBold,
        color: Colors.gray,
        marginBottom: 10,
        fontSize: 20,
    },
    keyboardAvoidingView:{
        flex:1
    }
});

export default style;