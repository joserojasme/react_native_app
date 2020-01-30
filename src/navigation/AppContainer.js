import React, { useEffect } from 'react';
import {Container} from 'native-base'
import { connect } from 'react-redux';
import { GetUserData } from "../network/cognito/AmplifyMethods";
import { SetUserAttributes } from '../reducers/actions/UtilsActions';
import AppNavigator from './AppNavigator';
import Loader from "../library/components/loader/Index";

function AppContainer({ setUserAttributes, loading }) {
  useEffect(() => {
    GetUserData().then(response => {
      setUserAttributes(response);
    });
  }, []);

 
    return (
      <Container>
      {loading && <Loader />}
      <AppNavigator />
      </Container>
    )
  
}

function mapStateToProps(state, props) {
  return {
    loading: state.Utils.loading,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserAttributes: (item) => dispatch(SetUserAttributes(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
