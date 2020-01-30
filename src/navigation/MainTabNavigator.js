import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../library/components/tabBarIcon/TabBarIcon';
import HomeScreen from '../screens/home/HomeScreen';
import OrdersMoneyScreen from '../screens/ordersMoney/OrdersMoneyScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import QuotesResultScreen from '../screens/ordersMoney/QuotesResultScreen';
import IssueQuotesScreen from '../screens/ordersMoney/IssueQuotesScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {headerMode:'none'},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
      
    />
  ),
  tabBarOptions: {
    activeTintColor: '#ffff',
    inactiveTintColor: '#ffff',
    tabBarLabel: {
      tintColor: '#ffff',
    },
    labelStyle: {
      fontSize: 15,
    },
    style: {
      backgroundColor: '#0D838B'
    }
  },


};

HomeStack.path = '';

const OrdersMoneyScreenStack = createStackNavigator(
  {
    OrdersMoney: OrdersMoneyScreen,
    QuotesResult: QuotesResultScreen,
    IssueQuotes:IssueQuotesScreen
  },
  config
);

OrdersMoneyScreenStack.navigationOptions = {
  tabBarLabel: 'Cotizar giro',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'md-cash' : 'md-cash'} />
  ),
  tabBarOptions: {
    activeTintColor: '#ffff',
    inactiveTintColor: '#ffff',
    tabBarLabel: {
      tintColor: '#ffff',
    },
    labelStyle: {
      fontSize: 15,
    },
    style: {
      backgroundColor: '#0D838B'
    }
  },
};

OrdersMoneyScreenStack.path = '';

const RegisterScreenStack = createStackNavigator(
  {
    Register: RegisterScreen,
  },
  config
);

RegisterScreenStack.navigationOptions = {
  tabBarLabel: 'Registrarse',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'} />
  ),
  tabBarOptions: {
    activeTintColor: '#ffff',
    inactiveTintColor: '#ffff',
    tabBarLabel: {
      tintColor: '#ffff',
    },
    labelStyle: {
      fontSize: 15,
    },
    style: {
      backgroundColor: '#0D838B'
    }
  },
};

RegisterScreenStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  OrdersMoneyScreenStack,
  RegisterScreenStack,
});

tabNavigator.path = '';

export default tabNavigator;
