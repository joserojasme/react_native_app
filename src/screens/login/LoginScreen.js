import { Container, Form, Title } from "native-base";
import React, { Component } from "react";
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView } from "react-native";
import { connect } from 'react-redux';
import { defaultMessage, emptyFieldsLogin, notAuthorizedException, passwordResetRequiredException, successSignIn, ToastError, userNotConfirmedException, UserNotFoundException } from '../../constants/Utils';
import Button from "../../library/components/button/Index";
import Input from "../../library/components/input/Index";
import { GetUserData, notAuthorizedExceptionCode, passwordResetRequiredExceptionCode, SignIn, userNotConfirmedExceptionCode, UserNotFoundExceptionCode } from "../../network/cognito/AmplifyMethods";
import { SetLoading, SetUserAttributes } from '../../reducers/actions/UtilsActions';
import style from './Style';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "prueba",
      password: "prueba123",
    };
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  HandleChange = async (text, idField) => {
    this.setState({ [idField]: text });
  }

  HandleSubmit = () => {
    const { username, password } = this.state;
    const { setLoading } = this.props;

    if (username === "" || password === "") {
      ToastError(emptyFieldsLogin);
      return;
    }

    this.setState({ username: username.toLowerCase() }, () => {
      SignIn(this.state, setLoading)
        .then(response => {
          this.SignInResponse(response);
        })
    })
  }

  SignInResponse = (response) => {
    const {navigation} = this.props;
    switch (response) {
      case successSignIn:
          GetUserData().then(response => {
            this.props.setUserAttributes(response);
            navigation.navigate('AuthLoading');
          });
        break;
      case UserNotFoundExceptionCode:
        ToastError(UserNotFoundException);
        break;
      case userNotConfirmedExceptionCode:
        ToastError(userNotConfirmedException);
        break;
      case notAuthorizedExceptionCode:
        ToastError(notAuthorizedException);
        break;
      case passwordResetRequiredExceptionCode:
        ToastError(passwordResetRequiredException);
        break;
      default:
        ToastError(defaultMessage);
        break;
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <Container>
          <ImageBackground
            source={require("../../assets/images/Background.png")}
            style={style.ViewLogin}
          >
            <Image style={style.image} source={require("../../assets/images/logo.png")} />
            <Title style={style.title}>BIENVENIDOS</Title>
            <ScrollView>
              <Form style={style.Form}>
              <Input
                styleItem={style.Item}
                styleInput={style.Input}
                onChangeText={text => this.HandleChange(text, 'username')}
                placeholder="Usuario ó correo electrónico"
                secureTextEntry={false}
                placeholderTextColor='#fff'
                autoCapitalize='none'
                value={username}
              />
              <Input
                styleItem={style.Item}
                styleInput={style.Input}
                onChangeText={text => this.HandleChange(text, 'password')}
                placeholder="Contraseña"
                secureTextEntry={true}
                placeholderTextColor='#fff'
                value={password}
              />
              <Button
                onPress={this.HandleSubmit}
                children={"!Ya!"}
              />
            </Form>
            </ScrollView>
          </ImageBackground>
        </Container>
        </KeyboardAvoidingView>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null,
};

function mapStateToProps(state, props) {
  return {
    loading: state.Utils.loading,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLoading: (item) => dispatch(SetLoading(item)),
  setUserAttributes: (item) => dispatch(SetUserAttributes(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);