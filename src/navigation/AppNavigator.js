import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignIn from '../screens/login/LoginScreen';
import TermsAndConditions from '../screens/termsAndConditions/TermsAndConditions';
import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({SignIn: SignIn});
const TermsAndConditionsStack = createStackNavigator({TermsAndConditions: TermsAndConditions});

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthStack,
    TermsAndConditions: TermsAndConditionsStack,
  },
  {
    initialRouteName: 'AuthLoading',
  })
);
