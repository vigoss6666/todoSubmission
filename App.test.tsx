
import React from 'react'; 
import {Button,View,Text} from 'react-native'; 
import renderer from 'react-test-renderer';
import Todo, {renderItem} from './Todo'; 
import { render, fireEvent } from '@testing-library/react-native';


test('add todo', () => {
  
  const { getByTestId,queryAllByTestId } = render(
    <Todo/>
  )
  fireEvent.changeText(getByTestId('input'), 'zaid');  
  fireEvent.press(getByTestId('add'));
  expect(getByTestId('post-row-0'))
  });

  test('delete todo', () => {
  
    const { getByTestId,queryAllByTestId } = render(
      <Todo/>
    )
    fireEvent.changeText(getByTestId('input'), 'zaid');  
    fireEvent.press(getByTestId('add'));
    fireEvent.press(getByTestId('post-row-delete-0'));
    queryAllByTestId('post-row-0')
    });


    
    test('update todo', () => {
      const onPress = jest.fn();
  
      const { getByTestId,queryAllByTestId } = render(
        <Todo/>
      )
      fireEvent.changeText(getByTestId('input'), 'zaid');  
      fireEvent.press(getByTestId('add'));
      fireEvent.press(getByTestId('post-row-update10'))
      expect(onPress).toBeDefined() 
    });
    

  