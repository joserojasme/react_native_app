import { StyleSheet } from "react-native";
import Colors from '../../constants/Colors';

const style = StyleSheet.create({
    container: {
        flex: 1,
            backgroundColor: Colors.white,
                shadowColor: Colors.gray,
                    shadowColor: 'black',
                        shadowOpacity: 1,
                            elevation: 4
    },
    contentContainer: {
        paddingTop: 0,
      },

    firstText: { 
        textAlign: 'center', 
    fontSize: 20, 
    fontWeight: "bold", 
    marginTop: 10 
},
    mainText:{
        textAlign:'center',
        marginTop: 15,
        fontSize: 15,
        fontFamily: Colors.fontFamily
    },

    Form:{
        width: '95%',
        marginTop: 10,
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    Item: {
        width: "95%",
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 12,
    },
    
    Input: {
        color: Colors.black,
        fontFamily: Colors.fontFamily,
    },

    Button:{
        marginBottom: 20
    }


})

export default style;