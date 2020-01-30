
import { StyleSheet} from "react-native";
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
    Container:{
        height: '100%',
        display:'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10
    },

    Card:{
        width: '90%', 
        height: 150,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        overflow: "hidden",

    },

    ColorText:{
        color:'#212121',
        fontFamily: 'Cabin',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute',
        fontSize: 25,
        bottom: 20
    },

    ColorIcon:{
        color:'#0D838B',
        fontFamily: 'Cabin',    
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        position: 'absolute'
    },

    Image:{
        backgroundColor: '#212121',
        opacity: .2,
        width: '100%', 
        height: '100%'

    }

    
})