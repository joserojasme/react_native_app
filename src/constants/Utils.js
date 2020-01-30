import { Toast } from "native-base";
import { Alert } from "react-native";
import Colors from './Colors';

const buttonText = "¡Ya!";
const buttonAskMeLaterText = "En otro momento";
const buttonOkText = "Continuar";
const buttonCancelText = "Cancelar";
const duration = 3000;

export function AlertMessage(text, onClick, onCancel, onAskMeLater) {
    if(onCancel === null){
        Alert.alert(
            titleAlert,
            text,
            [
                { text: buttonOkText, onPress: onClick },
            ],
            { cancelable: false },
        );
    }else{
        Alert.alert(
            titleAlert,
            text,
            [
                //{text: buttonAskMeLaterText, onPress: () => onAskMeLater},
                {
                    text: buttonCancelText,
                    onPress: onCancel,
                    style: 'cancel',
                },
                { text: buttonOkText, onPress: onClick },
            ],
            { cancelable: false },
        );
    }
}

export function ToastError(text) {
    Toast.show({
        text: text,
        buttonText,
        type: "warning",
        duration,
        style: {
            backgroundColor: Colors.red
        }
    })
}

export function ToastSuccess(text) {
    Toast.show({
        text: text,
        buttonText,
        type: "success",
        duration
    })
}

export function ToastWarning(text) {
    Toast.show({
        text: text,
        buttonText,
        type: "warning",
        duration
    })
}

export function DecimalFormat(num) {
    num = parseFloat(num);
    let value = `${num.toFixed(2)}`;
    return value.toString().replace(/(\d)(?:(?=\d+(?=[^\d.]))(?=(?:[0-9]{3})+\b)|(?=\d+(?=\.))(?=(?:[0-9]{3})+(?=\.)))/g, "$1,");
}

//Mensajes Toast y login
export const emptyFieldsLogin = 'Debe ingresar un usuario y una contraseña';
export const UserNotFoundException = 'El usuario no existe';
export const userNotConfirmedException = 'El usuario no se ha confirmado';
export const notAuthorizedException = 'Usuario o contraseña incorrectos';
export const passwordResetRequiredException = 'Debe cambiar la contraseña';
export const defaultMessage = "Error desconocido";
export const successSignIn = "Success";
export const emptyFields = 'Por favor complete los campos vacios';
export const errorFirstLoadApp = 'Error iniciando la aplicación';
export const registerSuccess = 'Información guardada correctamente';
export const invalidEmail = 'El correo electrónico ingresado es incorrecto';

//Alerts
export const titleAlert = 'Mensaje de FácilYa';

//Campos obligatorios cotización del giro
export const amountMinMax = "El monto permito es entre $20.000 y $2'000.000";
export const originCity = "Debe ingresar una ciudad de origen";
export const destinationCity = "Debe ingresar una ciudad de destino";
export const amountEmpty = "Ingrese un valor a girar";
export const receiverIdentifacation = "Debe ingresar la identificación";
export const receiverNames = "Complete los campos nombres y apellidos";
export const destinationAddress = "Debe ingresar una dirección";
export const receiverEmail = "Debe ingresar un email";
export const expeditionDate = "Debe ingresar una fecha anterior al dia actual.";


//Email
export const mailValidation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


