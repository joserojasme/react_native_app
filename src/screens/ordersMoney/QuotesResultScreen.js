import { Container, Form } from "native-base";
import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { connect } from "react-redux";
import Colors from '../../constants/Colors';
import Button from "../../library/components/button/Index";
import { DecimalFormat, AlertMessage } from '../../constants/Utils';
import { ErrorSwitch, HTTP_STATUS_OK } from '../../network/api/Api';
// Components  UI
import Header from "../../library/components/headerGoBack/Index";
import Input from "../../library/components/input/Index";
import Title from '../../library/components/title/Index';
//Redux
import { SetLoading } from "../../reducers/actions/UtilsActions";
// Styles
import styles from "./Style";
//Api
import { Get as GetRegister } from '../../network/api/Register';

const ALERT_TEXT_USER_NOREGISTER = 'Antes de continuar es necesario registrar su información personal';

class QuotesResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            additionalCharge: '',
            amount: '',
            freight: '',
            total: ''
        };
    }

    componentWillMount() {
        const { quotes } = this.props;
        this.setState({
            additionalCharge: DecimalFormat(quotes.additionalCharge).toString(),
            amount: DecimalFormat(quotes.amount).toString(),
            freight: DecimalFormat(quotes.freight).toString(),
            total: DecimalFormat(quotes.total).toString(),
        })
    }

    HandleClickSendQuote = () => {
        this.ValidateRegisterUser();
    }

    ValidateRegisterUser = () => {
        const { userAttributes, setLoading, navigation } = this.props;
        const cognitoId = userAttributes.signInUserSession.idToken.payload.sub;
        GetRegister(cognitoId, setLoading).then(response => {
            if (response.status === HTTP_STATUS_OK) {
                if (response.data.email === null) {
                    AlertMessage(ALERT_TEXT_USER_NOREGISTER, () => navigation.navigate('RegisterScreenStack'), null, null);
                }else{
                    navigation.navigate('IssueQuotes',{...navigation.state.params, person:response.data});
                }
            } else {
                ErrorSwitch(response.status);
            }
        })
    }

    render() {
        const { navigation } = this.props;
        const { additionalCharge, amount, freight, total } = this.state;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
                <Container style={styles.container}>
                    <Header
                        HandleClick={() => navigation.goBack()}
                        title='Su cotización'
                    />
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}
                    >
                        <Form style={styles.Form}>
                            <Title text="Valor a girar" />
                            <Input
                                secureTextEntry={false}
                                placeholderTextColor={Colors.gray}
                                autoCapitalize='none'
                                value={amount}
                                styleItem={styles.item}
                                styleInput={styles.input}
                                icon='md-cash'
                                keyboardType='numeric'
                                iconColor={Colors.gray}
                                editable={false}
                            />

                            <Title text="Valor flete" />
                            <Input
                                secureTextEntry={false}
                                placeholderTextColor={Colors.gray}
                                autoCapitalize='none'
                                value={freight}
                                styleItem={styles.item}
                                styleInput={styles.input}
                                icon='md-cash'
                                keyboardType='numeric'
                                iconColor={Colors.gray}
                                editable={false}
                            />

                            <Title text="Valor del domicilio" />
                            <Input
                                secureTextEntry={false}
                                placeholderTextColor={Colors.gray}
                                autoCapitalize='none'
                                value={additionalCharge}
                                styleItem={styles.item}
                                styleInput={styles.input}
                                icon='md-cash'
                                keyboardType='numeric'
                                iconColor={Colors.gray}
                                editable={false}
                            />

                            <Title text="Valor a pagar" />
                            <Input
                                secureTextEntry={false}
                                placeholderTextColor={Colors.gray}
                                autoCapitalize='none'
                                value={total}
                                styleItem={styles.item}
                                styleInput={styles.input}
                                icon='md-cash'
                                keyboardType='numeric'
                                iconColor={Colors.gray}
                                editable={false}
                            />

                            <Button
                                onPress={this.HandleClickSendQuote}
                                children={"Continuar enviando el giro"}
                            />
                        </Form>
                    </ScrollView>
                </Container>
            </KeyboardAvoidingView>
        )
    }

}

QuotesResultScreen.navigationOptions = {
    header: null
};

function mapStateToProps(state, props) {
    return {
        userAttributes: state.Utils.userAttributes,
        quotes: state.QuotesStore.quotes
    };
}

const mapDispatchToProps = dispatch => ({
    setLoading: item => dispatch(SetLoading(item))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuotesResultScreen);
