import { StyleSheet } from "react-native";
import Colors from '../../../constants/Colors';

const style = StyleSheet.create({
    segment: {
        width: "89%",
        backgroundColor: Colors.white,
        borderRadius: 5,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 15,
    },
    button: {
        
        
    },
    buttonActive: {
        color: Colors.black,
        fontFamily: Colors.fontFamily,
        backgroundColor:Colors.green
    },
    text: {
        fontFamily: Colors.fontFamily,
        color:Colors.white
    },
    textActive: {
        color: Colors.gray,
        fontFamily: Colors.fontFamily,
    }
});

export default style;