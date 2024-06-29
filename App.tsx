import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './component/mainpage';
import AddTask from './component/addtask';
import EdiTask from './component/edittask'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: 'Main Page' }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTask}
          options={{ title: 'Add Task' }}
        />
         <Stack.Screen
          name="EditTask"
          component={EdiTask}
          options={{ title: 'Edit Task' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
