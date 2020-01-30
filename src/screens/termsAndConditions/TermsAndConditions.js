import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import styles from './Style';
import { connect } from 'react-redux';
import { SetLoading } from "../../reducers/actions/UtilsActions";
import { SignOut } from "../../network/cognito/AmplifyMethods";
import { Post as PostTermsConditions } from '../../network/api/TermsConditions';
import { ErrorSwitch, HTTP_STATUS_OK } from '../../network/api/Api';
import HTML from 'react-native-render-html';
import { Container } from 'native-base';
import Header from '../../library/components/header/Index';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  HandleClickAcceptTerms = () => {
    const { termsAndConditions, userAttributes, navigation } = this.props;
    let objectBody = new Object({ cognitoId: userAttributes.signInUserSession.idToken.payload.sub, id: termsAndConditions.id });
    PostTermsConditions(objectBody, this.props.setLoading).then(response => {
      if (response.status === HTTP_STATUS_OK) {
        navigation.navigate('Main');
      } else {
        ErrorSwitch(response.status);
      }
    })
  }

  render() {
    const { termsAndConditions,userAttributes } = this.props;
    return (
      <Container>
        <Header
          HandleClickSingOut={() => SignOut(this.props, 'Auth')}
          username={
            Object.keys(userAttributes).length !== 0
              ? userAttributes.signInUserSession.idToken.payload[
              "cognito:username"
              ]
              : null
          }
        />
        <View style={styles.container}>
          <Text style={styles.title}>Términos y condiciones de uso</Text>
          <ScrollView
            style={styles.tcContainer}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                this.setState({
                  accepted: true
                })
              }
            }}
          >
            <HTML html={termsAndConditions.description} imagesMaxWidth={Dimensions.get('window').width} />
          </ScrollView>
          <TouchableOpacity disabled={!this.state.accepted} onPress={this.HandleClickAcceptTerms} style={this.state.accepted ? styles.button : styles.buttonDisabled}><Text style={styles.buttonLabel}>Aceptar</Text></TouchableOpacity>
        </View>
      </Container>
    );
  }

}

TermsAndConditions.navigationOptions = {
  header: null
};

function mapStateToProps(state, props) {
  return {
    termsAndConditions: state.TermsAndConditionsStore.termsAndConditions,
    userAttributes: state.Utils.userAttributes
  };
}

const mapDispatchToProps = dispatch => ({
  setLoading: item => dispatch(SetLoading(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsAndConditions);
