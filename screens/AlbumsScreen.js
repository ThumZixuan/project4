import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder, useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { loadVoiceNotes, saveVoiceNotes } from '../utils/VoiceNotes';

const GREEN = '#176B5B';
function VoiceNoteRow({ note, onDelete }) {
  const player = useAudioPlayer(note.uri);
  return <View style={s.noteCard}>
    <View style={s.noteIcon}><Text style={{fontSize:20}}>🎙️</Text></View>
    <View style={{flex:1}}><Text style={s.noteTitle}>{note.title || 'Shopping reminder'}</Text><Text style={s.noteDate}>{new Date(note.createdAt).toLocaleString()}</Text></View>
    <TouchableOpacity style={s.play} onPress={() => { try { player.seekTo(0); player.play(); } catch { Alert.alert('Playback unavailable', 'Try recording the reminder again.'); } }}><Text style={s.playText}>▶</Text></TouchableOpacity>
    <TouchableOpacity onPress={onDelete} style={s.delete}><Text style={s.deleteText}>×</Text></TouchableOpacity>
  </View>;
}

export default function AlbumsScreen() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [permission, setPermission] = useState(null);
  const [recording, setRecording] = useState(false);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => { loadVoiceNotes().then(setNotes).finally(() => setReady(true)); }, []);
  useEffect(() => { if (ready) saveVoiceNotes(notes).catch(() => {}); }, [notes, ready]);

  const startRecording = async () => {
    try {
      const result = await AudioModule.requestRecordingPermissionsAsync();
      setPermission(result.status);
      if (!result.granted) { Alert.alert('Microphone permission needed', 'Allow microphone access to record substitution reminders.'); return; }
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
      setRecording(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    } catch (error) { Alert.alert('Could not start recording', error.message || 'Please check microphone permission.'); }
  };
  const stopRecording = async () => {
    try {
      await recorder.stop();
      setRecording(false);
      const uri = recorder.uri;
      if (!uri) { Alert.alert('Recording not saved', 'No audio file was created. Please try again.'); return; }
      const note = { id: `${Date.now()}`, title: title.trim() || 'Shopping reminder', uri, createdAt: new Date().toISOString() };
      setNotes(current => [note, ...current]);
      setTitle('');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Alert.alert('Voice reminder saved', 'Your recording is saved on this device.');
    } catch (error) { setRecording(false); Alert.alert('Could not save recording', error.message || 'Please try again.'); }
  };
  const deleteNote = (id) => Alert.alert('Delete voice reminder?', 'This removes the reminder from your saved list.', [{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:()=>setNotes(current=>current.filter(n=>n.id!==id))}]);

  return <ScrollView style={s.page} contentContainerStyle={s.content}>
    <Text style={s.eyebrow}>PERSONAL REMINDERS</Text>
    <Text style={s.heading}>Voice notes</Text>
    <Text style={s.sub}>Record a quick reminder for substitutions, brands, or anything you don't want to forget.</Text>
    <View style={s.recorder}>
      <View style={[s.micCircle, recording && s.micActive]}><Text style={s.mic}>{recording ? '●' : '🎙️'}</Text></View>
      <Text style={s.recorderTitle}>{recording ? 'Recording in progress…' : 'Record a new reminder'}</Text>
      <Text style={s.recorderSub}>{recording ? 'Tap finish when you are done speaking.' : 'Example: “Get unsweetened oat milk instead.”'}</Text>
      <TextInput style={s.titleInput} placeholder="Reminder title (optional)" placeholderTextColor="#91A19A" value={title} onChangeText={setTitle} editable={!recording} />
      <TouchableOpacity style={[s.recordButton, recording && s.stopButton]} onPress={recording ? stopRecording : startRecording}><Text style={s.recordButtonText}>{recording ? '■  Finish recording' : '●  Start recording'}</Text></TouchableOpacity>
      <Text style={s.smallPrint}>Audio is stored locally on this device. Microphone permission is required.</Text>
    </View>
    <View style={s.listHeading}><Text style={s.section}>Saved reminders</Text><View style={s.count}><Text style={s.countText}>{notes.length}</Text></View></View>
    {notes.length === 0 ? <View style={s.empty}><Text style={{fontSize:28,marginBottom:8}}>🔊</Text><Text style={s.emptyTitle}>No voice notes yet</Text><Text style={s.emptySub}>Your saved recordings will appear here.</Text></View> : notes.map(note => <VoiceNoteRow key={note.id} note={note} onDelete={() => deleteNote(note.id)} />)}
    {permission === 'denied' && <Text style={s.smallPrint}>Microphone access was denied. Enable it in your device settings to record voice notes.</Text>}
  </ScrollView>;
}
const s=StyleSheet.create({
 page:{flex:1,backgroundColor:'#F6F8F5'},content:{padding:21,paddingBottom:36},eyebrow:{color:GREEN,fontSize:11,fontWeight:'800',letterSpacing:1.5,marginTop:8,marginBottom:10},heading:{fontSize:32,fontWeight:'900',color:'#18332D'},sub:{fontSize:14,lineHeight:21,color:'#6D8179',marginTop:8,marginBottom:22},recorder:{backgroundColor:'#FFF',borderRadius:20,padding:20,alignItems:'center',borderWidth:1,borderColor:'#E8EEEA'},micCircle:{width:70,height:70,borderRadius:35,backgroundColor:'#DCEDE5',alignItems:'center',justifyContent:'center',marginBottom:14},micActive:{backgroundColor:'#FBE5E2'},mic:{fontSize:27,color:GREEN},recorderTitle:{fontSize:18,fontWeight:'900',color:'#18332D'},recorderSub:{fontSize:12,lineHeight:18,color:'#7B8B84',textAlign:'center',marginTop:6,marginBottom:17},titleInput:{alignSelf:'stretch',height:46,borderWidth:1,borderColor:'#E0E8E3',borderRadius:12,paddingHorizontal:13,color:'#18332D'},recordButton:{backgroundColor:GREEN,borderRadius:13,height:49,alignSelf:'stretch',alignItems:'center',justifyContent:'center',marginTop:12},stopButton:{backgroundColor:'#B63D35'},recordButtonText:{color:'#FFF',fontWeight:'900',fontSize:14},smallPrint:{fontSize:11,color:'#91A19A',textAlign:'center',lineHeight:16,marginTop:12},listHeading:{flexDirection:'row',alignItems:'center',gap:10,marginTop:27,marginBottom:13},section:{fontSize:18,fontWeight:'900',color:'#18332D'},count:{backgroundColor:'#DCEDE5',borderRadius:10,minWidth:25,paddingHorizontal:7,paddingVertical:4,alignItems:'center'},countText:{fontSize:12,fontWeight:'900',color:GREEN},noteCard:{backgroundColor:'#FFF',borderRadius:15,padding:13,flexDirection:'row',alignItems:'center',gap:10,marginBottom:9,borderWidth:1,borderColor:'#E8EEEA'},noteIcon:{width:42,height:42,borderRadius:13,backgroundColor:'#F0F7F3',alignItems:'center',justifyContent:'center'},noteTitle:{fontSize:14,fontWeight:'800',color:'#18332D'},noteDate:{fontSize:10,color:'#8A9692',marginTop:4},play:{backgroundColor:'#DCEDE5',width:34,height:34,borderRadius:12,alignItems:'center',justifyContent:'center'},playText:{color:GREEN,fontWeight:'900'},delete:{paddingHorizontal:5},deleteText:{fontSize:23,color:'#8A9692'},empty:{backgroundColor:'#FFF',borderRadius:16,padding:22,alignItems:'center',borderWidth:1,borderColor:'#E8EEEA'},emptyTitle:{fontWeight:'900',color:'#18332D',fontSize:15},emptySub:{fontSize:12,color:'#7B8B84',marginTop:5}
});
