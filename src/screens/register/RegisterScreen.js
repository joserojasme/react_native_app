import React, { Component } from 'react';
import { Container, Form, Picker, DatePicker, View } from "native-base";
import { ScrollView, Text, KeyboardAvoidingView } from "react-native";
import { ToastSuccess, registerSuccess, ToastError, invalidEmail, emptyFields, expeditionDate } from '../../constants/Utils';
// Styles
import style from './Style';
import Colors from '../../constants/Colors';
// Components UI
import Header from '../../library/components/headerGoBack/Index';
import Button from "../../library/components/button/Index";
import Input from "../../library/components/input/Index";
import Title from '../../library/components/title/Index';
import Segment from "../../library/components/segment/Index";
import List from "../../library/components/list/Index";
// Api Requests
import { GetIdentificationTypes } from '../../network/api/Generic';
import { Get as GetProvinces } from '../../network/api/Provinces';
import { ErrorSwitch, HTTP_STATUS_OK } from '../../network/api/Api';
import { Post as PostRegister, Get as GetRegister } from '../../network/api/Register';
//Redux
import { connect } from 'react-redux';
import { SetLoading } from '../../reducers/actions/UtilsActions';

class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            identificationData: [],
            citiesData: [],
            selected: "key12",
            selectedcity: "key12",
            identificationType: "",
            identificationNumber: "",
            expeditionDate: "",
            firstName: "",
            lastName: "",
            midleName: "",
            secondSurname: "",
            address: "",
            telephoneNumber: "",
            email: "",
            idCity: "",
            cognitoId: '',
            provincesListReadOnly: [],
            provincesList: [],
            citiesListReadOnly: [],
            citiesList: [],
            provincesText: '',
            cityText: '',
            province: '',
            city: '',
            showError: false
        };
        this.setDate = this.setDate.bind(this);
        this.HandleClickProviceList = this.HandleClickProviceList.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }


    getCurrentDate(separator = '') {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }

    onValueChange(value) {
        this.setState({
            selected: value,
            identificationType: value,
        });
    }

    OnValueChangeCity(value) {
        this.setState({
            selectedcity: value,
            idCity: value
        })
    }

    componentWillMount() {
        const { userAttributes, setLoading } = this.props;
        const cognitoId = userAttributes.signInUserSession.idToken.payload.sub;
        this.setState({ cognitoId: cognitoId })
        GetIdentificationTypes(setLoading).then(response => {
            if (response.status === HTTP_STATUS_OK) {
                this.setState({ identificationData: response.data })
            } else {
                ErrorSwitch(response.status);
            }
        })

        // GetRegister(cognitoId,setLoading).then(response => {
        //     if (response.status === HTTP_STATUS_OK) {
        //         this.setState({ ...response.data})
        //     } else {
        //         ErrorSwitch(response.status);
        //     }
        // })

        GetProvinces(setLoading).then(response => {
            if (response.status === HTTP_STATUS_OK) {
                this.setState({ provincesListReadOnly: response.data })
            } else {
                ErrorSwitch(response.status);
            }
        })

    }

    HandleChange = async (text, idField) => {
        this.setState({ [idField]: text }, () => {
            if (idField === 'provincesText') {
                this.ProvincesFilter();
                this.setState({ citiesListReadOnly: new Array(), citiesList: new Array(), city: '', cityText: '' });
            }

            if (idField === 'cityText') {
                this.CitiesFilter();
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

    CitiesFilter = () => {
        const { cityText, citiesListReadOnly } = this.state;
        let cityTextValue = cityText;
        cityTextValue = cityTextValue.toLowerCase();
        let newCitiesList = citiesListReadOnly.filter(item => {
            return item.name.toLowerCase().includes(cityText);
        })
        this.setState({ citiesList: newCitiesList })
    }


    HandleClickProviceList(value) {
        this.setState({ province: value.daneCode, provincesList: new Array(), provincesText: value.name, citiesListReadOnly: value.cities, citiesList: value.cities, city: '', cityText: '' });
    }

    HandleClickCitiesList = (value) => {
        this.setState({ city: value.id, citiesList: new Array(), cityText: value.name, idCity: value.id })
    }

    HandleSubmit = () => {
        const { identificationType,
            identificationNumber,
            expeditionDate,
            firstName,
            midleName,
            address,
            telephoneNumber,
            email,
            idCity,
            provincesList
        } = this.state
        const { userAttributes } = this.props;
        const cognitoId = userAttributes.signInUserSession.idToken.payload.sub;
        if (identificationType === "" || identificationNumber === "" || expeditionDate === "" || firstName === "" || midleName === "" || address === "" || telephoneNumber === "" || email === "" || idCity === "") {
            ToastError(emptyFields)
            this.setState({ showError: true })
            return;
        } else {
            this.setState({ showError: false })
        }

        let mailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!mailValidation.test(email)) {
            ToastError(invalidEmail);
            this.setState({ showError: true })
            return;
        } else {
            this.setState({ showError: false })
        }

        if (this.state.expeditionDate >= this.getCurrentDate) {
            ToastError(expeditionDate)
        }
    
        // const hasValue = provincesList.some((element)=> element === provincesText)

        // if(!hasValue){
        //     return;
        // }

        this.setState({ cognitoId: cognitoId }, () => {
            let estado = new Object(this.state);
            delete estado.provincesListReadOnly;
            PostRegister(JSON.stringify(estado), this.props.setLoading).then(response => {
                if (response.status === HTTP_STATUS_OK) {
                    ToastSuccess(registerSuccess);
                } else {
                    ErrorSwitch(response.status);
                }
            })
        })
    }

    render() {
        const { navigation } = this.props;
        const { provincesText, cityText, provincesList, citiesList, identificationNumber, expeditionDate, firstName, lastName, midleName, secondSurname, address, telephoneNumber, email, selected, selectedcity } = this.state;

        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
                <Container>
                    <Header
                        HandleClick={() => navigation.navigate('HomeStack')}
                        title='Registrarse'
                    >
                    </Header>
                    <ScrollView
                        style={style.container}
                        contentContainerStyle={style.contentContainer}
                    >
                        <Title text="Registro de información personal" />
                        <Text style={style.mainText}>Llena este formulario con la información que necesitamos para poder comenzar</Text>
                        <Form style={style.Form}>
                            <View style={style.Item}>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ paddingLeft: 10 }}
                                    selectedValue={selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="Seleccione el tipo de identificación*" value="key12" disabled />
                                    {this.state.identificationData.map(item => (
                                        <Picker.Item label={item.name} value={item.id} key={item.id} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={style.Item}>
                                <DatePicker
                                    defaultDate={this.getCurrentDate}
                                    minimumDate={this.getCurrentDate}
                                    maximumDate={this.getCurrentDate}
                                    locale={"es"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"slide"}
                                    androidMode={"calendar"}
                                    placeHolderText='Selección la fecha de expedición*'
                                    placeHolderTextStyle={{ color: "#999" }}
                                    disabled={false}
                                    onDateChange={text => this.HandleChange(text, 'expeditionDate')}
                                    value={expeditionDate}
                                    style={{
                                        width: "95%", height: 50, marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center'
                                    }}
                                />
                            </View>
                            <Input
                                onChangeText={text => this.HandleChange(text, 'identificationNumber')}
                                value={identificationNumber}
                                secureTextEntry={false}
                                placeholder='Número de identificación*'
                                placeholderTextColor={'#999'}
                                autoCapitalize='none'
                                styleItem={style.Item}
                                styleInput={style.Input}
                                icon='md-clipboard'
                                iconColor={Colors.gray}
                                error={this.state.showError}
                            />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'firstName')}
                                value={firstName}
                                secureTextEntry={false}
                                placeholder='Primer Nombre*'
                                placeholderTextColor={'#999'}
                                autoCapitalize='none'
                                styleItem={style.Item}
                                styleInput={style.Input}
                                icon='md-contact'
                                iconColor={Colors.gray}
                                error={this.state.showError}
                            />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'lastName')}
                                value={lastName}
                                secureTextEntry={false}
                                placeholder='Segundo Nombre'
                                placeholderTextColor={'#999'}
                                autoCapitalize='none'
                                styleItem={style.Item}
                                styleInput={style.Input}
                                icon='md-contact'
                                iconColor={Colors.gray}
                                error={false}
                            />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'midleName')}
                                value={midleName}
                                secureTextEntry={false}
                                placeholder='Primer Apellido*'
                                placeholderTextColor={'#999'}
                                autoCapitalize='none'
                                styleItem={style.Item}
                                styleInput={style.Input}
                                icon='md-contact'
                                iconColor={Colors.gray}
                                error={this.state.showError}
                            />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'secondSurname')}
                                value={secondSurname}
                                secureTextEntry={false}
                                placeholder='Segundo Apellido'
                                placeholderTextColor={'#999'}
                                autoCapitalize='none'
                                styleItem={style.Item}
                                styleInput={style.Input}
                                icon='md-contact'
                                iconColor={Colors.gray}
                                error={false}
                            />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'address')}
                                value={address}
                                secureTextEntry={false}
                                placeholder='Dirección*'
                                placeholderTextColor={'#999'}
                                autoCapitalize='none'
                                styleItem={style.Item}
                                styleInput={style.Input}
                                icon='md-home'
                                iconColor={Colors.gray}
                                error={this.state.showError}
                            />
                            <View>
                                <Input
                                    onChangeText={text => this.HandleChange(text, 'provincesText')}
                                    secureTextEntry={false}
                                    placeholder='Nombre del departamento*'
                                    placeholderTextColor={Colors.gray}
                                    autoCapitalize='none'
                                    value={provincesText}
                                    styleItem={style.Item}
                                    styleInput={style.Input}
                                    icon='md-home'
                                    iconColor={Colors.gray}
                                    error={this.state.showError}
                                />
                                {provincesList.length > 0 &&
                                    <List data={provincesList} type='province' onPress={this.HandleClickProviceList} />
                                }
                                {provincesText !== '' &&
                                    <View>
                                        <Input
                                            onChangeText={text => this.HandleChange(text, 'cityText')}
                                            secureTextEntry={false}
                                            placeholder='Nombre de la ciudad*'
                                            placeholderTextColor={Colors.gray}
                                            autoCapitalize='none'
                                            value={cityText}
                                            styleItem={style.Item}
                                            styleInput={style.Input}
                                            icon='md-home'
                                            iconColor={Colors.gray}
                                            error={this.state.showError}
                                        />

                                        <List data={citiesList} onPress={this.HandleClickCitiesList} />
                                    </View>
                                }
                            </View>
                            <Input
                                onChangeText={text => this.HandleChange(text, 'telephoneNumber')}
                                value={telephoneNumber}
                                secureTextEntry={false}
                                placeholder=' Celular*'
                                placeholderTextColor={'#999'}
                                autoCapitalize='none'
                                styleItem={style.Item}
                                styleInput={style.Input}
                                keyboardType='numeric'
                                icon='md-call'
                                iconColor={Colors.gray}
                                error={this.state.showError}
                            />
                            <Input
                                onChangeText={text => this.HandleChange(text, 'email')}
                                value={email}
                                secureTextEntry={false}
                                placeholder='Email*'
                                placeholderTextColor={'#999'}
                                autoCapitalize='none'
                                styleItem={style.Item}
                                styleInput={style.Input}
                                icon='md-at'
                                iconColor={Colors.gray}
                                error={this.state.showError}
                            />
                            <Button children={'Guardar Información'} style={style.Button} onPress={this.HandleSubmit}></Button>
                        </Form>
                    </ScrollView>
                </Container>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        userAttributes: state.Utils.userAttributes
    };
}

const mapDispatchToProps = dispatch => ({
    setLoading: item => dispatch(SetLoading(item))
});


export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)