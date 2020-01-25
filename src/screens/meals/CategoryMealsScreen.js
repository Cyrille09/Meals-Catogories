import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Form } from 'native-base';
import CategoryMealsStyles from './CategoryMealsStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../../../data/dummy-data';
import CategoryGridTile from '../../components/CategoryGridTitle';
import MealList from '../../components/MealList';
import { State } from 'react-native-gesture-handler';

const CategoryMeal = props => {
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector(State => State.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length == 0) {
    return (
      <View style={CategoryMealsStyles.noCatMeal}>
        <Text>No meals found, maybe check your filters</Text>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMeal.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

export default CategoryMeal;
