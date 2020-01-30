import { Container } from "native-base";
import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import Carrd from "../../library/components/cards/Index";
import Slide from "../../library/components/carousel/Index";
// Components  UI
import Header from "../../library/components/header/Index";
import { SignOut } from "../../network/cognito/AmplifyMethods";
import { SetLoading } from "../../reducers/actions/UtilsActions";
import Title from '../../library/components/title/Index';
// Styles
import styles from "./Style";
//Api
import { Get as GetAdverties} from '../../network/api/Adverties';
import {ErrorSwitch,HTTP_STATUS_OK} from '../../network/api/Api';


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAdverties:[]
    };
  }

  componentDidMount(){
    GetAdverties(this.props.setLoading).then(response=>{
      if(response.status === HTTP_STATUS_OK){
        this.setState({dataAdverties:response.data})
      }else{
        ErrorSwitch(response.status);
      }
    })
  }

  render() {
    const {dataAdverties} = this.state;
    const { userAttributes, navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header
          HandleClickSingOut={()=>SignOut(this.props, 'Auth')}
          username={
            Object.keys(userAttributes).length !== 0
              ? userAttributes.signInUserSession.idToken.payload[
              "cognito:username"
              ]
              : null
          }
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Slide data={dataAdverties}/>
          <Title text="Servicios" />
          <Carrd navigation={navigation}></Carrd>
        </ScrollView>
      </Container>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

function mapStateToProps(state, props) {
  return {
    userAttributes: state.Utils.userAttributes
  };
}

const mapDispatchToProps = dispatch => ({
  setLoading: item => dispatch(SetLoading(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
