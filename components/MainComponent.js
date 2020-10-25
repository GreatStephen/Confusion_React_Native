import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import {View, Platform} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'; // createStackNavigator has been deleted from react-navigation v4.0 and moved into react-navigation-stack
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';


const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  Dishdetail: { screen: Dishdetail }
},{
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
});

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
}, {
  navigationOptions: {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
  }
});

const MainNavigator = createDrawerNavigator({
  Home: 
    { screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home'
      }
    },
  Menu: 
    { screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu'
      }
    }
}, {
  drawerBackgroundColor: '#D1C4E9'
});

// from react-navigation v3.0, createStackNavigator is never wrapped by a 'navigation container'
// MUST declare a container manually
const MenuN = createAppContainer(MenuNavigator);
const HomeN = createAppContainer(HomeNavigator);
const MainN = createAppContainer(MainNavigator);

class Main extends Component {

  render() {
 
    return (
      <View style={{flex: 1, paddingTop: Platform.OS==='android'?0:10 }}>

        {/* <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
        <Dishdetail dish={this.state.dishes.filter(dish => dish.id===this.state.selectedDish)[0]} /> */}
        {/* <MenuNavigator /> */}
        {/* <MenuN /> */}
        <MainN />
      </View>
    );
  }
}
  
export default Main;