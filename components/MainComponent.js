import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import {View, Platform} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'; // createStackNavigator has been deleted from react-navigation v4.0 and moved into react-navigation-stack
import { createAppContainer } from 'react-navigation';


const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  Dishdetail: { screen: Dishdetail }
},
{
  initialRouteName: 'Menu',
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  }
}
);

// from react-navigation v3.0, createStackNavigator is never wrapped by a 'navigation container'
// MUST declare a container manually
const MN = createAppContainer(MenuNavigator);

class Main extends Component {

  render() {
 
    return (
      <View style={{flex: 1, paddingTop: Platform.OS==='android'?0:10 }}>

        {/* <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
        <Dishdetail dish={this.state.dishes.filter(dish => dish.id===this.state.selectedDish)[0]} /> */}
        {/* <MenuNavigator /> */}
        <MN />
      </View>
    );
  }
}
  
export default Main;