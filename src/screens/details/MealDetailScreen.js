import React, { Component, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Container } from 'native-base';
import MealDetailStyles from './MealDetailStyles';
import { MEALS } from '../../../data/dummy-data';
import HeaderButton from '../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../../../store/actions/meals';

const ListItem = props => {
  return (
    <View style={MealDetailStyles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetails = props => {
  const availableMeals = useSelector(State => State.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  const currentMealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image
        source={{ uri: selectedMeal.imageUrl }}
        style={MealDetailStyles.image}
      />
      <View style={MealDetailStyles.details}>
        <Text>{selectedMeal.duration}m</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={MealDetailStyles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={MealDetailStyles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetails.navigationOptions = navigationData => {
  //const toggleFavorite = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTile');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  //const selectedMeal = MEALS.find(meal => meal.id === mealId);
  const isFavorite = navigationData.navigation.getParam('isFav');
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    )
  };
};

export default MealDetails;
