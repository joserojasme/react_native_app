import React, { Component } from 'react';
import { Container, Form, Text, ActionSheet, View, } from "native-base";
import { ScrollView, KeyboardAvoidingView } from "react-native";
// Components  UI
import Header from "../../library/components/headerGoBack/Index";
import Button from "../../library/components/button/Index";
import Input from "../../library/components/input/Index";
import Segment from "../../library/components/segment/Index";
import List from "../../library/components/list/Index";
import Title from '../../library/components/title/Index';
import SubTitle from '../../library/components/subtitle/Index';
// Styles
import styles from "./Style";
import Colors from '../../constants/Colors';
//Api
import { GetTypePayment, GetTypePaymentFreight, GetMoneyReceptionTypes } from '../../network/api/Generic';
import { Get as GetProvinces } from '../../network/api/Provinces';
import { Post as PostQuotes } from '../../network/api/Quotes';
import { ErrorSwitch, HTTP_STATUS_OK } from '../../network/api/Api';
import { ToastError, emptyFields, DecimalFormat, amountMinMax, originCity, destinationCity as destinationCityMessage,amountEmpty } from '../../constants/Utils';
//Redux
import { SetLoading, SetProvinces } from "../../reducers/actions/UtilsActions";
import { connect } from "react-redux";
import { SetQuotes, SetQuotesData } from "../../reducers/actions/QuotesActions";

const initialState = {
    paymentTypes: [],
    paymentFreightTypes: [],
    moneyReceptionTypes: [],
    amount: '',
    paymentType: "1",
    moneyReceptionType: "1",
    paymentFreightType: "1",
    provincesListReadOnly: [],
    provincesList: [],
    provincesListDestination: [],
    citiesListReadOnly: [],
    citiesList: [],
    citiesListReadOnlyDestination: [],
    citiesListDestination: [],
    provincesText: '',
    provincesTextDestination: '',
    cityText: '',
    cityTextDestination: '',
    province: '',
    provinceDestination: '',
    city: '',
    destinationCity: ''
}

class OrdersMoneyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
        this.HandleClickProviceList = this.HandleClickProviceList.bind(this);
        this.HandleClickProviceListDestination = this.HandleClickProviceListDestination.bind(this);
    }

    componentWillMount() {
        GetTypePayment(this.props.setLoading).then(response => {
            if (response.status === HTTP_STATUS_OK) {
                this.setState({ paymentTypes: response.data });
            } else {
                ErrorSwitch(response.status);
            }
        })

        GetTypePaymentFreight(this.props.setLoading).then(response => {
            if (response.status === HTTP_STATUS_OK) {
                this.setState({ paymentFreightTypes: response.data });
            } else {
                ErrorSwitch(response.status);
            }
        })

        GetMoneyReceptionTypes(this.props.setLoading).then(response => {
            if (response.status === HTTP_STATUS_OK) {
                this.setState({ moneyReceptionTypes: response.data });
            } else {
                ErrorSwitch(response.status);
            }
        })

        GetProvinces(this.props.setLoading).then(response => {
            if (response.status === HTTP_STATUS_OK) {
                this.props.setProvinces(response.data);
                this.setState({ provincesListReadOnly: response.data });
            } else {
                ErrorSwitch(response.status);
            }
        })
    }

    HandleChange = (text, idField) => {
        this.setState({ [idField]: text }, () => {
            if (idField === 'provincesText') {
                this.ProvincesFilter();
                this.setState({ citiesListReadOnly: new Array(), citiesList: new Array(), city: '', cityText: '' });
            }

            if (idField === 'cityText') {
                this.CitiesFilter();
            }

            if (idField === 'provincesTextDestination') {
                this.ProvincesDestinationFilter();
                this.setState({ citiesListReadOnlyDestination: new Array(), citiesListDestination: new Array(), destinationCity: '', cityTextDestination: '' });
            }

            if (idField === 'cityTextDestination') {
                this.CitiesDestinationFilter();
            }
        });
    }

    ProvincesFilter = () => {
        const { provincesText, provincesListReadOnly } = this.state;
        let provincesTextValue = provincesText;
        provincesTextValue = provincesTextValue.toLowerCase();
        let newProvincesList = provincesListReadOnly.filter(item => {
            return item.name.toLowerCase().includes(provincesText);
        })
        this.setState({ provincesList: newProvincesList })
    }

    ProvincesDestinationFilter = () => {
        const { provincesTextDestination, provincesListReadOnly } = this.state;
        let provincesTextValue = provincesTextDestination;
        provincesTextValue = provincesTextValue.toLowerCase();
        let newProvincesList = provincesListReadOnly.filter(item => {
            return item.name.toLowerCase().includes(provincesTextDestination);
        })
        this.setState({ provincesListDestination: newProvincesList })
    }

    CitiesFilter = () => {
        const { cityText, citiesListReadOnly } = this.state;
        let cityTextValue = cityText;
        cityTextValue = cityTextValue.toLowerCase();
        let newCitiesList = citiesListReadOnly.filter(item => {
            return item.name.toLowerCase().includes(cityText);
        })
        this.setState({ citiesList: newCitiesList })
    }

    CitiesDestinationFilter = () => {
        const { cityTextDestination, citiesListReadOnlyDestination } = this.state;
        let cityTextValue = cityTextDestination;
        cityTextValue = cityTextValue.toLowerCase();
        let newCitiesList = citiesListReadOnlyDestination.filter(item => {
            return item.name.toLowerCase().includes(cityTextDestination);
        })
        this.setState({ citiesListDestination: newCitiesList })
    }

    HandleChangePaymentType(value) {
        this.setState({ paymentType: value.id });
    }

    HandleChangeMoneyReceptionType(value) {
        this.setState({ moneyReceptionType: value.id });
    }

    HandleChangePaymentFreightType(value) {
        this.setState({ paymentFreightType: value.id });
    }

    HandleClickProviceList(value) {
        this.setState({ province: value.daneCode, provincesList: new Array(), provincesText: value.name, citiesListReadOnly: value.cities, citiesList: value.cities, city: '', cityText: '' });
    }

    HandleClickProviceListDestination(value) {
        this.setState({ provinceDestination: value.daneCode, provincesListDestination: new Array(), provincesTextDestination: value.name, citiesListReadOnlyDestination: value.cities, citiesListDestination: value.cities, destinationCity: '', cityTextDestination: '' });
    }

    HandleClickCitiesList = (value) => {
        this.setState({ city: value.id, citiesList: new Array(), cityText: value.name })
    }

    HandleClickCitiesListDestination = (value) => {
        this.setState({ destinationCity: value.id, citiesListDestination: new Array(), cityTextDestination: value.name })
    }

    HandleClickQuote = async () => {
        const { navigation } = this.props;
        const {paymentTypes, paymentFreightTypes, moneyReceptionTypes} = this.state;
        await this.ValidateRequiredFields().then(result => {
            if (result) {
                const quoteDTO = this.CreateQuoteObject();
                PostQuotes(JSON.stringify(quoteDTO), this.props.setLoading).then(response => {
                    if (response.status === HTTP_STATUS_OK) {
                        this.props.setQuotes(response.data);
                        navigation.navigate('QuotesResult',{paymentTypes:paymentTypes,paymentFreightTypes:paymentFreightTypes,moneyReceptionTypes:moneyReceptionTypes});
                    } else {
                        ErrorSwitch(response.status);
                    }
                })
            }
        })
    }

    ValidateRequiredFields = async () => {
        const { paymentType, paymentFreightType, amount, city, paymentTypes, destinationCity, moneyReceptionType, moneyReceptionTypes } = this.state;
        
        if(amount === '' || amount === 'NaN'){
            await ToastError(amountEmpty);
            return false;
        }

        let amountDouble = parseFloat(amount.replace(/,/g, ''));
        if (amountDouble < 20000 || amountDouble > 2000000) {
            await ToastError(amountMinMax);
            return false;
        }

        if (paymentType == paymentTypes[1].id) {
            if (paymentType.length === 0 || paymentFreightType.length === 0) {
                await ToastError(emptyFields);
                return false;
            }

            if (city.length === 0) {
                await ToastError(originCity);
                return false;
            }
        } else {
            if (paymentType.length === 0 || paymentFreightType.length === 0) {
                await ToastError(emptyFields);
                return false;
            }
        }

        if (moneyReceptionType == moneyReceptionTypes[1].id) {
            if (moneyReceptionType.length === 0 || paymentFreightType.length === 0) {
                await ToastError(emptyFields);
                return false;
            }

            if (destinationCity.length === 0) {
                await ToastError(destinationCityMessage);
                return false;
            }
        } else {
            if (moneyReceptionType.length === 0 || paymentFreightType.length === 0) {
                await ToastError(emptyFields);
                return false;
            }
        }

        return true;
    }

    CreateQuoteObject = () => {
        const { paymentType, paymentFreightType, amount, city, paymentTypes, moneyReceptionType, 
            destinationCity, moneyReceptionTypes, cityText, cityTextDestination } = this.state;
        let quoteDTO = new Object({
            amount: parseFloat(amount.replace(/,/g, '')),
            typePayment: paymentType,
            moneyReceptionType: moneyReceptionType,
            typePaymentFreight: paymentFreightType
        });

        if (paymentType == paymentTypes[1].id) {
            quoteDTO.originCityId = city;
        }

        if (moneyReceptionType == moneyReceptionTypes[1].id) {
            quoteDTO.destinationCityId = destinationCity;
        }

        this.props.setQuotesData({...quoteDTO,cityText,cityTextDestination});
        return quoteDTO;
    }

    render() {
        const { navigation } = this.props;
        const { paymentTypes, paymentFreightTypes, amount, paymentType, paymentFreightType, provincesText, cityText,
            provincesList, citiesList, moneyReceptionTypes, moneyReceptionType, provincesTextDestination, cityTextDestination,
            provincesListDestination, citiesListDestination } = this.state;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
                <Container style={styles.container}>
                    <Header
                        HandleClick={() => navigation.navigate('HomeStack')}
                        title='Cotizar Giro'
                    />
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}
                    >
                        <Form style={styles.Form}>
                            <Title text="Valor a girar *" />
                            <SubTitle text="monto permitido entre $20.000 y $2'000.000" />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'amount')}
                                secureTextEntry={false}
                                placeholder='0.00'
                                placeholderTextColor={Colors.gray}
                                autoCapitalize='none'
                                value={amount}
                                styleItem={styles.item}
                                styleInput={styles.input}
                                icon='md-cash'
                                keyboardType='numeric'
                                iconColor={Colors.gray}
                                onBlur={() => this.setState({ amount: amount !== '' ? DecimalFormat(amount.replace(/,/g, '')) : '' })}
                            />
                            <Title text="Información de origen del giro" />
                            <SubTitle text="Seleccione el tipo de pago" />
                            {paymentTypes !== undefined &&
                                paymentTypes.length > 0 &&
                                <Segment
                                    firstText={paymentTypes[0].name}
                                    lastText={paymentTypes[1].name}
                                    activeButton={paymentType}
                                    handlePressFirst={() => this.HandleChangePaymentType({ ...paymentTypes[0] })}
                                    handlePressLast={() => this.HandleChangePaymentType({ ...paymentTypes[1] })}
                                    data={paymentTypes} />
                            }

                            {paymentTypes !== undefined &&
                                paymentTypes.length > 0 &&
                                paymentType === paymentTypes[1].id &&
                                <View>
                                    <SubTitle text="Departamento recogida giro *" />
                                    <Input
                                        onChangeText={text => this.HandleChange(text, 'provincesText')}
                                        secureTextEntry={false}
                                        placeholder='Nombre del departamento'
                                        placeholderTextColor={Colors.gray}
                                        autoCapitalize='none'
                                        value={provincesText}
                                        styleItem={styles.item}
                                        styleInput={styles.input}
                                        icon='home'
                                        iconColor={Colors.gray}
                                    />

                                    {provincesList.length > 0 &&
                                        <List data={provincesList} type='province' onPress={this.HandleClickProviceList} />
                                    }

                                    {provincesText !== '' &&
                                        <View>
                                            <SubTitle text="Ciudad recogida giro *" />
                                            <Input
                                                onChangeText={text => this.HandleChange(text, 'cityText')}
                                                secureTextEntry={false}
                                                placeholder='Nombre de la ciudad'
                                                placeholderTextColor={Colors.gray}
                                                autoCapitalize='none'
                                                value={cityText}
                                                styleItem={styles.item}
                                                styleInput={styles.input}
                                                icon='home'
                                                iconColor={Colors.gray}
                                            />

                                            <List data={citiesList} onPress={this.HandleClickCitiesList} />
                                        </View>
                                    }
                                </View>
                            }

                            <Title text="Información de destino del giro" />
                            <SubTitle text="Seleccione el tipo de entrega" />
                            {moneyReceptionTypes !== undefined &&
                                moneyReceptionTypes.length > 0 &&
                                <Segment
                                    firstText={moneyReceptionTypes[0].name}
                                    lastText={moneyReceptionTypes[1].name}
                                    activeButton={moneyReceptionType}
                                    handlePressFirst={() => this.HandleChangeMoneyReceptionType({ ...moneyReceptionTypes[0] })}
                                    handlePressLast={() => this.HandleChangeMoneyReceptionType({ ...moneyReceptionTypes[1] })}
                                    data={moneyReceptionTypes} />
                            }

                            {moneyReceptionTypes !== undefined &&
                                moneyReceptionTypes.length > 0 &&
                                moneyReceptionType === moneyReceptionTypes[1].id &&
                                <View>
                                    <SubTitle text="Departamento entrega giro *" />
                                    <Input
                                        onChangeText={text => this.HandleChange(text, 'provincesTextDestination')}
                                        secureTextEntry={false}
                                        placeholder='Nombre del departamento'
                                        placeholderTextColor={Colors.gray}
                                        autoCapitalize='none'
                                        value={provincesTextDestination}
                                        styleItem={styles.item}
                                        styleInput={styles.input}
                                        icon='home'
                                        iconColor={Colors.gray}
                                    />

                                    {provincesListDestination.length > 0 &&
                                        <List data={provincesListDestination} type='province' onPress={this.HandleClickProviceListDestination} />
                                    }

                                    {provincesTextDestination !== '' &&
                                        <View>
                                            <SubTitle text="Ciudad entrega giro *" />
                                            <Input
                                                onChangeText={text => this.HandleChange(text, 'cityTextDestination')}
                                                secureTextEntry={false}
                                                placeholder='Nombre de la ciudad'
                                                placeholderTextColor={Colors.gray}
                                                autoCapitalize='none'
                                                value={cityTextDestination}
                                                styleItem={styles.item}
                                                styleInput={styles.input}
                                                icon='home'
                                                iconColor={Colors.gray}
                                            />

                                            <List data={citiesListDestination} onPress={this.HandleClickCitiesListDestination} />
                                        </View>
                                    }
                                </View>
                            }

                            <Title text="¿Quién paga el flete?" />
                            {paymentFreightTypes !== undefined &&
                                paymentFreightTypes.length > 0 &&
                                <Segment
                                    firstText={paymentFreightTypes[0].name.substring(6, 21)}
                                    lastText={paymentFreightTypes[1].name.substring(6, 22)}
                                    activeButton={paymentFreightType}
                                    handlePressFirst={() => this.HandleChangePaymentFreightType({ ...paymentFreightTypes[0] })}
                                    handlePressLast={() => this.HandleChangePaymentFreightType({ ...paymentFreightTypes[1] })}
                                    data={paymentFreightTypes} />
                            }
                            <Button
                                onPress={this.HandleClickQuote}
                                children={"Cotizar"}
                            />
                        </Form>
                    </ScrollView>
                </Container>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        userAttributes: state.Utils.userAttributes,
        quotes: state.QuotesStore.quotes
    };
}

const mapDispatchToProps = dispatch => ({
    setLoading: item => dispatch(SetLoading(item)),
    setQuotes: item => dispatch(SetQuotes(item)),
    setQuotesData: item => dispatch(SetQuotesData(item)),
    setProvinces: item => dispatch(SetProvinces(item))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrdersMoneyScreen);
