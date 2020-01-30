import { StyleSheet } from "react-native";
import Colors from '../../constants/Colors';

const style = StyleSheet.create({

    ViewLogin: {
        width: "100%",
        height: "100%",
    },

    image: {
        height: 70,
        width: '50%',
        marginTop: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    
    Form: {
        width: '90%',
        height: 300,
        display: 'flex',
        flexDirection:'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '25%'
    },

    title: {
        fontFamily: Colors.fontFamily,
        fontSize:22,
        color: Colors.greenDark,
        marginTop: 40,
    },

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