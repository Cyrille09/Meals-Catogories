import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigator from './src/components/MealsNavigator';
import mealsReducer from './store/reducers/meals';

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
