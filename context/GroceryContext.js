import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroceryContext = createContext(null);
const STORAGE_KEY = '@grocery_check_assistant_items_v1';

export function GroceryProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then(raw => { if (mounted && raw) setItems(JSON.parse(raw)); })
      .catch(() => {})
      .finally(() => { if (mounted) setReady(true); });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() => {});
  }, [items, ready]);

  const addItem = (item) => setItems(current => {
    const barcode = item.barcode;
    if (barcode && current.some(existing => existing.barcode === barcode && !existing.checked)) return current;
    return [{ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name: item.name, barcode: barcode || null, brand: item.brand || '', checked: false, note: '' }, ...current];
  });
  const toggleItem = id => setItems(current => current.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  const removeItem = id => setItems(current => current.filter(item => item.id !== id));
  const updateNote = (id, note) => setItems(current => current.map(item => item.id === id ? { ...item, note } : item));
  const clearCompleted = () => setItems(current => current.filter(item => !item.checked));

  return <GroceryContext.Provider value={{ items, addItem, toggleItem, removeItem, updateNote, clearCompleted, ready }}>{children}</GroceryContext.Provider>;
}
export function useGrocery() {
  const value = useContext(GroceryContext);
  if (!value) throw new Error('useGrocery must be used inside GroceryProvider');
  return value;
}
