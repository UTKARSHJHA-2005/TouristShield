import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from "react";
import Home from './screens/Home';
import Login from './screens/Login';
import Alert from './screens/Alert';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ✅ Tabs
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "Matches") {
          iconName = "albums";
        // } else if (route.name === "Profile") {
        //   iconName = "person-outline";
        // } else if (route.name === "Explore") {
        //   iconName = "prism-outline";
        } else if (route.name === "Reels") {
          iconName = "add-circle-outline";
        } else {
          iconName = "help-circle-outline";
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#ee79b3ff", tabBarInactiveTintColor: "gray", headerShown: false,
    })}>
       <Tab.Screen name="Home" component={Home} />
      {/*<Tab.Screen name="Explore" component={Discover} /> */}
      <Tab.Screen name="Reels" component={Login} />
       <Tab.Screen name="Matches" component={Alert} />
      {/*<Tab.Screen name="Profile" component={Profile} /> */}
    </Tab.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          {/* <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="ChatBox" component={ChatScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Interest" component={Interest} /> */}
          {/* <Stack.Screen name="Register" component={Info} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;