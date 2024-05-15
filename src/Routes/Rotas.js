import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Components/Home';
import Busca from '../Components/Busca';
import { AuthContext } from '../Context/AuthContext';
import Login from '../Components/Login';
import { Ionicons } from '@expo/vector-icons';
import CadastrarUser from '../Components/CadastrarUser';
import Perfil from '../Components/Perfil';

const Tab = createBottomTabNavigator();

export default function Rotas() {

const {logado} = useContext( AuthContext );

if( !logado ) {
    return( <Login/> )
}

  return(
    <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: '#111123', height: 70},
          tabBarLabelStyle: {display: 'none'}
        }}>
              <Tab.Screen name='Home' component={Home}
              options={{
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name='home-outline'
                            size={36}
                            color={tabInfo.focused ? "red" : "white"}
                        />
                    )
                }
                  }}>
            </Tab.Screen>
            <Tab.Screen name='Busca' component={Busca} 
              options={{
                  tabBarIcon: (tabInfo) => {
                      return (
                          <Ionicons
                              name='search-outline'
                              size={36}
                              color={tabInfo.focused ? "red" : "white"}
                          />
                      )
                  }
                    }}>

            </Tab.Screen>
            <Tab.Screen name='CadastrarUser' component={CadastrarUser}
              options={{
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name='person-outline'
                            size={36}
                            color={tabInfo.focused ? "red" : "white"}
                        />
                    )
                }
                  }}
            ></Tab.Screen>
            <Tab.Screen name='Perfil' component={Perfil}
              options={{
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name='person-outline'
                            size={36}
                            color={tabInfo.focused ? "red" : "white"}
                        />
                    )
                }
                  }}
            ></Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>
  ) 
}