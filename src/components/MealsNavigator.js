import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import Categories from '../screens/categories/CategoriesScreen';
import CategoryMeals from '../screens/meals/CategoryMealsScreen';
import MealDetails from '../screens/details/MealDetailScreen';
import Favorites from '../screens/favorites/FavoritesScreen';
import Filters from '../screens/filters/FiltersScreen';
import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: Categories,
      navigationOptions: {
        headerTitle: 'List of Categories'
      }
    },
    CategoryMeals: { screen: CategoryMeals },
    MealDetails: MealDetails
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.whiteColor
      }
    }
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: Favorites,
    MealDetail: MealDetails
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.whiteColor
      }
    }
  }
);
const MealsNavigatorTabs = createBottomTabNavigator(
  {
    Home: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="md-apps" size={25} color={tabInfo.tintColor} />
          );
        }
      }
    },
    Favorites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="md-appstore" size={25} color={tabInfo.tintColor} />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.accentColor
    }
  }
);

const FiltersNavigator = createStackNavigator(
  {
    Filters: Filters
  },

  {
    navigationOptions: {
      drawerLabel: 'Filter Screen'
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.whiteColor
      }
    }
  }
);
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsNavigatorTabs,
      navigationOptions: {
        drawerLabel: 'Meals'
      }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {}
    }
  }
);

export default createAppContainer(MainNavigator);
