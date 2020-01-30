import React from 'react';
import { connect } from 'react-redux';
import Loader from "../library/components/loader/Index";
import { ErrorSwitch, HTTP_STATUS_OK } from '../network/api/Api';
import { Get as GetTermsConditions } from '../network/api/TermsConditions';
import { GetUserData, not_authenticated } from "../network/cognito/AmplifyMethods";
import { SetTermsAndConditions } from "../reducers/actions/TermsAndConditionsActions";
import { SetLoading } from "../reducers/actions/UtilsActions";

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._validateSignInAsync();
  }

  _validateSignInAsync = () => {
    const {setTermsAndConditions, navigation} = this.props;
    GetUserData().then(response => {
      if(response === not_authenticated){
        navigation.navigate('Auth');
      }else{
        GetTermsConditions(response.signInUserSession.idToken.payload.sub,this.props.setLoading).then(response=>{
          if(response.status === HTTP_STATUS_OK){
            if(response.data.acepted){
              navigation.navigate('Main');
            }else{
              setTermsAndConditions(response.data);
              navigation.navigate('TermsAndConditions');
            }
          }else{
            ErrorSwitch(response.status);
          }
        })
      }
    });
  };

  render() {
    return (
      <Loader/>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

const mapDispatchToProps = dispatch => ({
  setTermsAndConditions: item => dispatch(SetTermsAndConditions(item)),
  setLoading: item => dispatch(SetLoading(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
