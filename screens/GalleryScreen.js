import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useGrocery } from '../context/GroceryContext';

const GREEN = '#176B5B';
export default function GalleryScreen({ navigation }) {
  const { items, addItem, toggleItem, removeItem, clearCompleted } = useGrocery();
  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');
  const pending = items.filter(item => !item.checked).length;
  const completed = items.length - pending;
  const visible = useMemo(() => items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())), [items, search]);

  const addManual = () => {
    const name = draft.trim();
    if (!name) return;
    addItem({ name });
    setDraft('');
    Haptics.selectionAsync().catch(() => {});
  };
  const check = (item) => {
    toggleItem(item.id);
    if (!item.checked) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  };

  return <ScrollView style={s.page} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
    <Text style={s.eyebrow}>GROCERY CHECK ASSISTANT</Text>
    <Text style={s.heading}>Your shopping,{"\n"}made simpler.</Text>
    <Text style={s.sub}>A little list goes a long way. Scan products, check them off, and keep moving.</Text>
    <View style={s.hero}>
      <View style={s.heroText}><Text style={s.heroLabel}>YOUR LIST</Text><Text style={s.heroCount}>{pending} {pending === 1 ? 'item' : 'items'} left</Text><Text style={s.heroSub}>{completed} completed · {items.length} total</Text></View>
      <Text style={s.basket}>🛒</Text>
    </View>
    <TouchableOpacity style={s.scanButton} onPress={() => navigation.navigate('Scan')} activeOpacity={0.85}><Text style={s.scanIcon}>▦</Text><View style={{flex:1}}><Text style={s.scanTitle}>Scan a product</Text><Text style={s.scanSub}>Get product details from its barcode</Text></View><Text style={s.arrow}>›</Text></TouchableOpacity>
    <Text style={s.section}>Add an item</Text>
    <View style={s.addRow}><TextInput style={s.input} placeholder="e.g. bananas, oat milk" placeholderTextColor="#91A19A" value={draft} onChangeText={setDraft} onSubmitEditing={addManual} returnKeyType="done" /><TouchableOpacity style={s.addBtn} onPress={addManual}><Text style={s.addBtnText}>Add</Text></TouchableOpacity></View>
    <View style={s.listHeading}><Text style={s.section}>Shopping list</Text>{completed > 0 && <TouchableOpacity onPress={clearCompleted}><Text style={s.clear}>Clear completed</Text></TouchableOpacity>}</View>
    {items.length > 0 && <TextInput style={s.search} placeholder="Search your list" placeholderTextColor="#91A19A" value={search} onChangeText={setSearch} />}
    {visible.length === 0 ? <View style={s.empty}><Text style={s.emptyIcon}>🥬</Text><Text style={s.emptyTitle}>{items.length ? 'No matching items' : 'Your list is fresh and empty'}</Text><Text style={s.emptySub}>{items.length ? 'Try a different search.' : 'Add your first grocery or scan a barcode to get started.'}</Text></View> :
      visible.map(item => <View key={item.id} style={[s.item, item.checked && s.itemDone]}>
        <TouchableOpacity style={[s.check, item.checked && s.checked]} onPress={() => check(item)} accessibilityRole="checkbox" accessibilityState={{ checked: item.checked }}><Text style={s.checkMark}>{item.checked ? '✓' : ''}</Text></TouchableOpacity>
        <View style={{flex:1}}><Text style={[s.itemName, item.checked && s.strike]}>{item.name}</Text>{!!item.brand && <Text style={s.itemMeta}>{item.brand}</Text>}{!!item.barcode && <Text style={s.itemMeta}>Barcode · {item.barcode}</Text>}</View>
        <TouchableOpacity onPress={() => removeItem(item.id)} style={s.remove} accessibilityLabel={`Remove ${item.name}`}><Text style={s.removeText}>×</Text></TouchableOpacity>
      </View>)}
    <Text style={s.footer}>Items are saved on this device.</Text>
  </ScrollView>;
}
const s = StyleSheet.create({
 page:{flex:1,backgroundColor:'#F6F8F5'},content:{padding:21,paddingBottom:36},eyebrow:{color:GREEN,fontSize:11,fontWeight:'800',letterSpacing:1.5,marginTop:8,marginBottom:10},heading:{fontSize:34,lineHeight:39,fontWeight:'900',color:'#18332D',letterSpacing:-.8},sub:{fontSize:14,lineHeight:21,color:'#6D8179',marginTop:10,marginBottom:22},hero:{backgroundColor:'#DCEDE5',borderRadius:22,padding:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:13},heroLabel:{color:'#557067',fontSize:11,fontWeight:'800',letterSpacing:1.2},heroCount:{color:'#18332D',fontSize:26,fontWeight:'900',marginTop:5},heroSub:{color:'#557067',fontSize:12,marginTop:5},basket:{fontSize:43},scanButton:{backgroundColor:GREEN,borderRadius:17,padding:16,flexDirection:'row',alignItems:'center',marginBottom:25},scanIcon:{fontSize:26,color:'#FFF',marginRight:13},scanTitle:{color:'#FFF',fontWeight:'800',fontSize:15},scanSub:{color:'#D5EAE2',fontSize:12,marginTop:3},arrow:{fontSize:28,color:'#FFF',marginLeft:8},section:{fontSize:18,fontWeight:'900',color:'#18332D',marginBottom:12},addRow:{flexDirection:'row',gap:9,marginBottom:25},input:{flex:1,backgroundColor:'#FFF',borderWidth:1,borderColor:'#E0E8E3',borderRadius:13,paddingHorizontal:14,height:49,color:'#18332D'},addBtn:{backgroundColor:GREEN,borderRadius:13,paddingHorizontal:21,alignItems:'center',justifyContent:'center'},addBtnText:{color:'#FFF',fontWeight:'800'},listHeading:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},clear:{color:GREEN,fontWeight:'700',fontSize:12,marginBottom:12},search:{height:44,backgroundColor:'#FFF',borderRadius:12,borderWidth:1,borderColor:'#E0E8E3',paddingHorizontal:13,marginBottom:10,color:'#18332D'},empty:{backgroundColor:'#FFF',borderRadius:17,padding:24,alignItems:'center',borderWidth:1,borderColor:'#E8EEEA'},emptyIcon:{fontSize:30,marginBottom:9},emptyTitle:{fontWeight:'800',fontSize:15,color:'#18332D'},emptySub:{color:'#7B8B84',fontSize:13,lineHeight:19,textAlign:'center',marginTop:6},item:{backgroundColor:'#FFF',borderRadius:15,padding:14,flexDirection:'row',alignItems:'center',marginBottom:9,borderWidth:1,borderColor:'#E8EEEA'},itemDone:{backgroundColor:'#F0F7F3',borderColor:'#CBE1D6'},check:{width:25,height:25,borderRadius:9,borderWidth:2,borderColor:'#BDCCC5',alignItems:'center',justifyContent:'center',marginRight:12},checked:{backgroundColor:GREEN,borderColor:GREEN},checkMark:{color:'#FFF',fontWeight:'900'},itemName:{fontSize:15,fontWeight:'750',color:'#18332D'},strike:{textDecorationLine:'line-through',color:'#7B8B84'},itemMeta:{fontSize:11,color:'#84938D',marginTop:3},remove:{paddingHorizontal:7,paddingVertical:2},removeText:{fontSize:24,color:'#8A9692'},footer:{textAlign:'center',fontSize:11,color:'#9AA69F',marginTop:22}
});
