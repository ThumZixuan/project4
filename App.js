import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity } from 'react-native';
import GalleryScreen from './screens/GalleryScreen';
import CameraScreen from './screens/CameraScreen';
import AlbumsScreen from './screens/AlbumsScreen';
import { GroceryProvider } from './context/GroceryContext';

const Tab = createBottomTabNavigator();
export default function App() {
  return <GroceryProvider>
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor:'#176B5B', tabBarInactiveTintColor:'#8A9692',
        tabBarLabelStyle:{fontWeight:'800',fontSize:12,marginBottom:2},
        tabBarStyle:{height:82,paddingBottom:9,paddingTop:7,backgroundColor:'#FFFFFF',borderTopColor:'#E8EEEA'},
        tabBarItemStyle:{marginHorizontal:7,marginVertical:5,borderRadius:16},
        tabBarButton:(props)=><TouchableOpacity {...props} activeOpacity={0.8}/>,
        headerStyle:{backgroundColor:'#F6F8F5'},headerTitleStyle:{color:'#18332D',fontWeight:'900'},
      }}>
        <Tab.Screen name="Today" component={GalleryScreen} options={{title:'My groceries',tabBarIcon:({color})=><Text style={{color,fontSize:23}}>⌂</Text>}} />
        <Tab.Screen name="Scan" component={CameraScreen} options={{title:'Scan product',tabBarIcon:({color})=><Text style={{color,fontSize:23}}>▦</Text>}} />
        <Tab.Screen name="Voice Notes" component={AlbumsScreen} options={{title:'Voice reminders',tabBarIcon:({color})=><Text style={{color,fontSize:23}}>♫</Text>}} />
      </Tab.Navigator>
    </NavigationContainer>
  </GroceryProvider>;
}
