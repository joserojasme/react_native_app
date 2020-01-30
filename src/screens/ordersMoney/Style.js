import { StyleSheet } from "react-native";
import Colors from '../../constants/Colors';
const width = '95%';

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
  Form: {
    width: width,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '3%'
  },
  title: {
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto",
    width: width,
    fontFamily: Colors.fontFamilyBold,
    color: Colors.green,
  },
  item: {
    width: width,
    borderWidth: 1,
    borderTopColor: Colors.greenDark,
    borderRightColor: Colors.greenDark,
    borderLeftColor: Colors.greenDark,
    borderBottomColor: Colors.greenDark,
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
  },
  input: {
    color: Colors.gray,
    fontFamily: Colors.fontFamily,
  },
  columsQuotesValues: {
    backgroundColor:Colors.green, 
    color:Colors.white,
    marginLeft:10,
    marginRight:10
  },
  subTitleTable: {
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    width: '95%',
    fontFamily: Colors.fontFamily,
    color: Colors.white,
    marginBottom: 5,
    fontSize: 14,
}
});

export default style;