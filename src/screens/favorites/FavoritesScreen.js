import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import FavoritesStyles from './FavoritesStyles';
import HeaderButton from '../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import { MEALS } from '../../../data/dummy-data';
import MealList from '../../components/MealList';

const Favorites = props => {
  const favMeals = useSelector(State => State.meals.favoriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={FavoritesStyles.noFav}>
        <Text>No Favorite Meals Found.Start adding some!</Text>
      </View>
    );
  }

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

Favorites.navigationOptions = navData => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default Favorites;
