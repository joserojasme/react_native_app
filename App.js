import { Ionicons } from '@expo/vector-icons';
import Amplify from 'aws-amplify';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Container, Root } from 'native-base';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import getEnvVars from './Environment.js';
import AppContainer from './src/navigation/AppContainer';
import reducer from './src/reducers/stores/Index';
import {ToastError, errorFirstLoadApp} from './src/constants/Utils';

const { cognito } = getEnvVars();

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: cognito.REGION,
    userPoolId: cognito.USER_POOL_ID,
    identityPoolId: cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: cognito.APP_CLIENT_ID,
  }
})

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <Root>
            <Container>
              <AppContainer />
            </Container>
          </Root>
        </Provider>
      </View>
    );
  }
}

const store = createStore(
  reducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([]),
    Font.loadAsync({
      ...Ionicons.font,
      'Cabin': require('./src/assets/fonts/Cabin-Regular.ttf'),
      'Cabin_bold': require('./src/assets/fonts/Cabin-Bold.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError() {
  ToastError(errorFirstLoadApp);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
