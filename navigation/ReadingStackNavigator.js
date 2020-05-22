import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import Test1 from '../screens/Test';
import Test2 from '../screens/Coucou';
import {BookContext} from '../Providers'

const Stack = createStackNavigator();
INITIAL_ROUTE_NAME="Test"


export default function ReadingStack() {
  return (
    <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Stack.Screen
        name="Test"
        component={Test1}
      />
      <Stack.Screen
        name="Coucou"
        component={Test2}
      />
    </Stack.Navigator>
  );
}
