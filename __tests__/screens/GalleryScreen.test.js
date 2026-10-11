import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GalleryScreen from '../../screens/GalleryScreen';
import { GroceryProvider } from '../../context/GroceryContext';

describe('Grocery shopping list', () => {
  it('renders the grocery list screen', () => {
    const { getByText } = render(<GroceryProvider><GalleryScreen navigation={{ navigate: jest.fn() }} /></GroceryProvider>);
    expect(getByText('Your shopping,')).toBeTruthy();
    expect(getByText('Shopping list')).toBeTruthy();
  });

  it('adds a manually entered item', () => {
    const { getByPlaceholderText, getByText } = render(<GroceryProvider><GalleryScreen navigation={{ navigate: jest.fn() }} /></GroceryProvider>);
    fireEvent.changeText(getByPlaceholderText('e.g. bananas, oat milk'), 'Bananas');
    fireEvent.press(getByText('Add'));
    expect(getByText('Bananas')).toBeTruthy();
  });
});
