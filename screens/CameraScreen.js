import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { findProduct } from '../utils/ProductApi';
import { useGrocery } from '../context/GroceryContext';

const GREEN = '#176B5B';
export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [product, setProduct] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const { addItem } = useGrocery();

  useEffect(() => { if (!permission?.granted && permission?.canAskAgain) requestPermission(); }, [permission?.granted, permission?.canAskAgain]);
  const search = async (value) => {
    const term = String(value || '').trim();
    if (!term) { Alert.alert('Enter a barcode', 'Scan a product or type its barcode below.'); return; }
    setLoading(true);
    try {
      const result = await findProduct(term);
      setProduct(result); setScanned(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    } catch (error) {
      Alert.alert('Product lookup failed', error.message || 'Please try again.');
      setScanned(false);
    } finally { setLoading(false); }
  };
  const handleScan = ({ data }) => {
    if (scanned || loading) return;
    setQuery(String(data)); search(data);
  };
  const addProduct = () => {
    addItem({ name: product.name, barcode: product.barcode, brand: product.brand });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    Alert.alert('Added to shopping list', `${product.name} is on your list.`, [{ text: 'Keep scanning', onPress: reset }]);
  };
  const reset = () => { setProduct(null); setScanned(false); setQuery(''); };

  if (product) return <ScrollView style={s.page} contentContainerStyle={s.resultContent}>
    <TouchableOpacity onPress={reset}><Text style={s.back}>‹ Scan another product</Text></TouchableOpacity>
    <View style={s.productHead}>
      {product.image ? <Image source={{uri:product.image}} style={s.productImage} resizeMode="contain" /> : <View style={s.productPlaceholder}><Text style={{fontSize:36}}>🛍️</Text></View>}
      <View style={{flex:1}}><Text style={s.productName}>{product.name}</Text><Text style={s.brand}>{product.brand}</Text><Text style={s.quantity}>{product.quantity}</Text></View>
    </View>
    <View style={s.barcodeBox}><Text style={s.label}>BARCODE</Text><Text style={s.barcode}>{product.barcode}</Text></View>
    <Text style={s.section}>Nutrition per 100 g / 100 ml</Text>
    <View style={s.nutrition}>{product.nutrition.map(n => <View key={n.label} style={s.nutrient}><Text style={s.nutrientValue}>{n.value}</Text><Text style={s.nutrientLabel}>{n.label}</Text></View>)}</View>
    <Text style={s.section}>Ingredients</Text><View style={s.card}><Text style={s.body}>{product.ingredients}</Text></View>
    <TouchableOpacity style={s.primary} onPress={addProduct}><Text style={s.primaryText}>＋ Add to shopping list</Text></TouchableOpacity>
    <Text style={s.source}>Product data provided by {product.source}. Nutrition and ingredients may be incomplete or user-submitted. Check the product packaging for the most accurate information.</Text>
  </ScrollView>;

  return <View style={s.page}>
    {permission?.granted ? <View style={s.cameraWrap}>
      <CameraView style={StyleSheet.absoluteFillObject} facing="back" onBarcodeScanned={scanned || loading ? undefined : handleScan} barcodeScannerSettings={{ barcodeTypes:['ean13','ean8','upc_a','upc_e','code128'] }} />
      <View pointerEvents="none" style={s.overlay}><View style={s.frame}/><Text style={s.cameraHint}>Place the barcode inside the frame</Text><Text style={s.cameraSub}>Hold steady for automatic scanning</Text></View>
      {loading && <View style={s.loading}><ActivityIndicator size="large" color="#FFF"/><Text style={s.loadingText}>Looking up product…</Text></View>}
    </View> : <View style={s.permission}><Text style={{fontSize:42}}>▦</Text><Text style={s.permissionTitle}>Scan your groceries</Text><Text style={s.permissionText}>Camera access is needed to read product barcodes. You can also enter a barcode manually.</Text>{permission?.canAskAgain !== false && <TouchableOpacity style={s.primary} onPress={requestPermission}><Text style={s.primaryText}>Allow camera access</Text></TouchableOpacity>}{permission?.canAskAgain === false && <TouchableOpacity onPress={() => Linking.openSettings()}><Text style={s.back}>Open settings</Text></TouchableOpacity>}</View>}
    <View style={s.searchPanel}><Text style={s.searchTitle}>Enter barcode manually</Text><View style={s.searchRow}><TextInput style={s.input} placeholder="e.g. 3017620422003" placeholderTextColor="#91A19A" value={query} onChangeText={setQuery} keyboardType="number-pad" returnKeyType="search" onSubmitEditing={() => search(query)} /><TouchableOpacity style={s.searchButton} onPress={() => search(query)} disabled={loading}><Text style={s.searchButtonText}>{loading ? '…' : 'Look up'}</Text></TouchableOpacity></View><Text style={s.hint}>Uses the free Open Food Facts product database.</Text></View>
  </View>;
}
const s=StyleSheet.create({
 page:{flex:1,backgroundColor:'#F6F8F5'},cameraWrap:{flex:1,minHeight:300,backgroundColor:'#1C302B',overflow:'hidden'},overlay:{...StyleSheet.absoluteFillObject,alignItems:'center',justifyContent:'center'},frame:{width:260,height:170,borderWidth:3,borderColor:'#DCEDE5',borderRadius:20,backgroundColor:'transparent'},cameraHint:{color:'#FFF',fontSize:14,fontWeight:'800',marginTop:19},cameraSub:{color:'#DCEDE5',fontSize:12,marginTop:5},loading:{...StyleSheet.absoluteFillObject,backgroundColor:'#10221ECC',alignItems:'center',justifyContent:'center'},loadingText:{color:'#FFF',fontWeight:'700',marginTop:12},searchPanel:{backgroundColor:'#F6F8F5',padding:18,paddingBottom:22},searchTitle:{fontSize:16,fontWeight:'900',color:'#18332D',marginBottom:10},searchRow:{flexDirection:'row',gap:8},input:{flex:1,backgroundColor:'#FFF',borderRadius:12,borderWidth:1,borderColor:'#DCE5E0',paddingHorizontal:13,height:47,color:'#18332D'},searchButton:{backgroundColor:GREEN,borderRadius:12,paddingHorizontal:17,justifyContent:'center'},searchButtonText:{color:'#FFF',fontWeight:'800'},hint:{fontSize:11,color:'#83928B',marginTop:9},permission:{flex:1,alignItems:'center',justifyContent:'center',padding:28},permissionTitle:{fontSize:23,fontWeight:'900',color:'#18332D',marginTop:12},permissionText:{fontSize:14,lineHeight:21,color:'#6D8179',textAlign:'center',marginTop:9,maxWidth:300},primary:{backgroundColor:GREEN,borderRadius:13,minHeight:50,alignItems:'center',justifyContent:'center',paddingHorizontal:20,marginTop:17},primaryText:{color:'#FFF',fontSize:15,fontWeight:'900'},resultContent:{padding:20,paddingBottom:35},back:{color:GREEN,fontSize:15,fontWeight:'800',marginBottom:20},productHead:{flexDirection:'row',gap:14,alignItems:'center',marginBottom:16},productImage:{width:100,height:120,backgroundColor:'#FFF',borderRadius:15},productPlaceholder:{width:100,height:120,backgroundColor:'#DCEDE5',borderRadius:15,alignItems:'center',justifyContent:'center'},productName:{fontSize:23,fontWeight:'900',color:'#18332D',lineHeight:28},brand:{fontSize:14,color:'#60766D',marginTop:6},quantity:{fontSize:12,color:'#84938C',marginTop:4},barcodeBox:{backgroundColor:'#FFF',padding:13,borderRadius:13,borderWidth:1,borderColor:'#E8EEEA',marginBottom:22},label:{fontSize:10,letterSpacing:1.2,color:'#7B8B84',fontWeight:'800'},barcode:{fontSize:16,fontWeight:'800',color:'#18332D',marginTop:5},section:{fontSize:18,fontWeight:'900',color:'#18332D',marginBottom:11,marginTop:3},nutrition:{flexDirection:'row',flexWrap:'wrap',gap:9,marginBottom:22},nutrient:{width:'31%',flexGrow:1,backgroundColor:'#FFF',borderRadius:13,padding:12,borderWidth:1,borderColor:'#E8EEEA'},nutrientValue:{fontSize:15,fontWeight:'900',color:GREEN},nutrientLabel:{fontSize:11,color:'#788981',marginTop:5},card:{backgroundColor:'#FFF',padding:15,borderRadius:14,borderWidth:1,borderColor:'#E8EEEA'},body:{fontSize:14,lineHeight:21,color:'#36534A'},source:{fontSize:11,lineHeight:16,color:'#8A9692',textAlign:'center',marginTop:16}
});
