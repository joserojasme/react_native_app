import { Container, Form, Text } from "native-base";
import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import Colors from '../../constants/Colors';
import Button from "../../library/components/button/Index";
import { ErrorSwitch, HTTP_STATUS_OK } from '../../network/api/Api';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
    ToastError, mailValidation, invalidEmail, receiverIdentifacation as receiverIdentifacationText,
    receiverNames as receiverNamesText, destinationAddress as destinationAddressText, receiverEmail as receiverEmailText,
    DecimalFormat, AlertMessage
} from '../../constants/Utils';
// Components  UI
import Header from "../../library/components/headerGoBack/Index";
import Input from "../../library/components/input/Index";
import Title from '../../library/components/title/Index';
import SubTitle from '../../library/components/subtitle/Index';
//Redux
import { SetLoading } from "../../reducers/actions/UtilsActions";
// Styles
import styles from "./Style";
//Api
import { Post as PostMoneyOrders } from '../../network/api/MoneyOrders';

const ALERT_TEXT_ORDERSMONEY_SEND_CONFIRM = '¿Seguro que desea enviar el giro?';
const ALERT_TEXT_ORDERMONEY_SENT = 'Se ha generado el giro con PIN: ';

class IssueQuotesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            additionalCharge: '',
            amount: '',
            freight: '',
            total: '',
            paymentFreightType: '',
            typePayment: '',
            moneyReceptionType: '',
            cityOriginName: '',
            cityDestinationName: '',
            originAddress: '',
            destinationAddress: '',
            receiverNames: '',
            firstName: '',
            lastName: '',
            receiverIdentifaction: '',
            receiverEmail: '',
            senderCognitoId:'',
            moneyOrderSent:false
        };
        this.HandleClickSendQuote = this.HandleClickSendQuote.bind(this);
    }

    componentWillMount() {
        const { navigation, quotesData, quotes, userAttributes } = this.props;

        let paymentFreightType = navigation.state.params.paymentFreightTypes.filter(item => {
            return item.id == quotesData.typePaymentFreight
        })

        let typePayment = navigation.state.params.paymentTypes.filter(item => {
            return item.id == quotesData.typePayment
        })

        let moneyReceptionType = navigation.state.params.moneyReceptionTypes.filter(item => {
            return item.id == quotesData.moneyReceptionType
        })

        this.setState({
            additionalCharge: DecimalFormat(quotes.additionalCharge).toString(),
            amount: DecimalFormat(quotes.amount).toString(),
            freight: DecimalFormat(quotes.freight).toString(),
            total: DecimalFormat(quotes.total).toString(),
            paymentFreightType: paymentFreightType[0].name,
            typePayment: typePayment[0].name,
            moneyReceptionType: moneyReceptionType[0].name,
            cityOriginName: quotesData.typePayment === "2" ? quotesData.cityText : '',
            cityDestinationName: quotesData.moneyReceptionType === "2" ? quotesData.cityTextDestination : '',
            originAddress: navigation.state.params.person.address,
            senderCognitoId: userAttributes.signInUserSession.idToken.payload.sub
        })
    }

    HandleClickSendQuote = () => {
        this.ValidateRequiredFields().then(result => {
            if (result) {
                AlertMessage(ALERT_TEXT_ORDERSMONEY_SEND_CONFIRM, () => this.SendMoneyOrder(), null, null);
            }
        })
    }

    SendMoneyOrder = () => {
        const orderMoneyObject = this.CreateOrderMoneyObject();
        PostMoneyOrders(JSON.stringify(orderMoneyObject), this.props.setLoading).then(response => {
            if (response.status === HTTP_STATUS_OK) {
                AlertMessage(`${ALERT_TEXT_ORDERMONEY_SENT}${response.data.pin}`, ()=>this.SendToHome(), null, null);
                this.setState({moneyOrderSent:true})

            } else {
                ErrorSwitch(response.status);
            }
        })
    }

    SendToHome = () => {
        const { navigation } = this.props;
        navigation.popToTop();
    }

    CreateOrderMoneyObject = () => {
        const {  quotesData } = this.props;
        const { amount, originAddress, destinationAddress, receiverNames, receiverIdentifaction, receiverEmail, senderCognitoId } = this.state;

        let orderMoneyObject = new Object({
            "amount": parseFloat(amount.replace(/,/g, '')),
            "typePayment": quotesData.typePayment,
            "originCityId": quotesData.originCityId,
            "originAddress": originAddress,
            "destinationCityId": quotesData.destinationCityId,
            "destinationAddress": destinationAddress,
            "typePaymentFreight": quotesData.typePaymentFreight,
            "moneyReceptionType": quotesData.moneyReceptionType,
            "senderCognitoId": senderCognitoId,
            "receiverNames": receiverNames,
            "receiverIdentifaction": receiverIdentifaction,
            "receiverEmail": receiverEmail
        })

        return orderMoneyObject;
    }

    ValidateRequiredFields = async () => {
        const { destinationAddress, firstName, lastName, receiverIdentifaction, receiverEmail } = this.state;

        if (!mailValidation.test(receiverEmail)) {
            ToastError(invalidEmail);
            return false;
        }

        if (receiverIdentifaction === '') {
            await ToastError(receiverIdentifacationText);
            return false;
        }

        if (firstName === '' || lastName === '') {
            await ToastError(receiverNamesText);
            return false;
        }

        if (destinationAddress === '') {
            await ToastError(destinationAddressText);
            return false;
        }

        if (receiverEmail === '') {
            await ToastError(receiverEmailText);
            return false;
        }

        return true;
    }

    HandleChange = (text, idField) => {
        this.setState({ [idField]: text }, () => {
            this.setState({ receiverNames: `${this.state.firstName} ${this.state.lastName}` })
        })
    }

    render() {
        const { navigation, quotesData } = this.props;
        const { additionalCharge, amount, freight, total, paymentFreightType, typePayment,
            moneyReceptionType, cityOriginName, cityDestinationName, originAddress, destinationAddress,
            firstName, lastName, receiverIdentifaction, receiverEmail,moneyOrderSent } = this.state;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
                <Container style={styles.container}>
                    <Header
                        HandleClick={() => navigation.goBack()}
                        title='Quién recibe el giro'
                    />
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}
                    >
                        <Form style={styles.Form}>
                            <Title text="Nombres *" />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'firstName')}
                                secureTextEntry={false}
                                placeholderTextColor={Colors.gray}
                                autoCapitalize='none'
                                value={firstName}
                                styleItem={styles.item}
                                styleInput={styles.input}
                                icon='md-contact'
                                iconColor={Colors.gray}
                            />

                            <Title text="Apellidos *" />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'lastName')}
                                secureTextEntry={false}
                                placeholderTextColor={Colors.gray}
                                autoCapitalize='none'
                                value={lastName}
                                styleItem={styles.item}
                                styleInput={styles.input}
                                icon='md-contact'
                                iconColor={Colors.gray}
                            />

                            <Title text="Número de documento *" />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'receiverIdentifaction')}
                                secureTextEntry={false}
                                placeholderTextColor={Colors.gray}
                                autoCapitalize='none'
                                value={receiverIdentifaction}
                                styleItem={styles.item}
                                styleInput={styles.input}
                                icon='md-clipboard'
                                iconColor={Colors.gray}
                            />

                            <Title text="Dirección *" />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'destinationAddress')}
                                secureTextEntry={false}
                                placeholderTextColor={Colors.gray}
                                autoCapitalize='none'
                                value={destinationAddress}
                                styleItem={styles.item}
                                styleInput={styles.input}
                                icon='md-home'
                                iconColor={Colors.gray}
                            />

                            <Title text="Correo electrónico *" />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'receiverEmail')}
                                secureTextEntry={false}
                                placeholderTextColor={Colors.gray}
                                autoCapitalize='none'
                                value={receiverEmail}
                                styleItem={styles.item}
                                styleInput={styles.input}
                                icon='md-at'
                                iconColor={Colors.gray}
                            />

                            <Title text="Confirma los datos del giro" />
                            <Grid>
                                <Row>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Valor a girar" /></Col>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Valor domicilio" /></Col>
                                </Row>
                                <Row>
                                    <Col size={12}><SubTitle text={`$${amount}`} /></Col>
                                    <Col size={12}><SubTitle text={`$${additionalCharge}`} /></Col>
                                </Row>
                                <Row>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Valor flete" /></Col>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Valor total" /></Col>
                                </Row>
                                <Row>
                                    <Col size={12}><SubTitle text={`$${freight}`} /></Col>
                                    <Col size={12}><SubTitle text={`$${total}`} /></Col>
                                </Row>
                                <Row>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Tipo recogida" /></Col>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Tipo entrega" /></Col>
                                </Row>
                                <Row>
                                    <Col size={12}><SubTitle text={`${typePayment}`} /></Col>
                                    <Col size={12}><SubTitle text={`${moneyReceptionType}`} /></Col>
                                </Row>
                                <Row>
                                    <Col size={12}style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Tipo flete" /></Col>
                                </Row>
                                    <Col size={12}><SubTitle text={`${paymentFreightType}`} /></Col>
                                <Row>

                                </Row>
                                {quotesData.typePayment === "2" &&
                                    <View>
                                        <Row><Title text="Lugar de recogida" /></Row>
                                        <Row>
                                            <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Ciudad" /></Col>
                                            <Col size={12}><SubTitle text={`${cityOriginName}`} /></Col>
                                        </Row>
                                        <Row>
                                            <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Dirección" /></Col>
                                            <Col size={12}><SubTitle text={`${originAddress}`} /></Col>
                                        </Row>
                                    </View>
                                }
                                {quotesData.moneyReceptionType === "2" &&
                                    <View>
                                        <Row><Title text="Lugar de entrega" /></Row>
                                        <Row>
                                            <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Ciudad" /></Col>
                                            <Col size={12}><SubTitle text={`${cityDestinationName}`} /></Col>
                                        </Row>
                                        <Row>
                                            <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Dirección" /></Col>
                                            <Col size={12}><SubTitle text={`${destinationAddress}`} /></Col>
                                        </Row>
                                    </View>
                                }
                                <Row><Title text="Datos de quién recibe el giro" /></Row>
                                <Row>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Nombres" /></Col>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Apellidos" /></Col>
                                </Row>
                                <Row>
                                    <Col size={12}><SubTitle text={`${firstName}`} /></Col>
                                    <Col size={12}><SubTitle text={`${lastName}`} /></Col>
                                </Row>
                                <Row>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Identificación" /></Col>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Email" /></Col>
                                </Row>
                                <Row>
                                    <Col size={12}><SubTitle text={`${receiverIdentifaction}`} /></Col>
                                    <Col size={12}><SubTitle text={`${receiverEmail}`} /></Col>
                                </Row>
                                <Row>
                                    <Col size={12} style={styles.columsQuotesValues}><SubTitle styles={styles.subTitleTable} text="Dirección" /></Col>
                                </Row>
                                <Row>
                                    <Col size={12} ><SubTitle text={`${destinationAddress}`} /></Col>
                                </Row>
                            </Grid>

                            <Button 
                                disable={moneyOrderSent}
                                onPress={this.HandleClickSendQuote}
                                children={"Enviar giro"}
                            />
                        </Form>
                    </ScrollView>
                </Container>
            </KeyboardAvoidingView>
        )
    }

}

IssueQuotesScreen.navigationOptions = {
    header: null
};

function mapStateToProps(state, props) {
    return {
        userAttributes: state.Utils.userAttributes,
        quotes: state.QuotesStore.quotes,
        quotesData: state.QuotesStore.quotesData,
        provincesStore: state.Utils.provincesStore
    };
}

const mapDispatchToProps = dispatch => ({
    setLoading: item => dispatch(SetLoading(item))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IssueQuotesScreen);
