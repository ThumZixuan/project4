import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = '@grocery_check_voice_notes_v1';
export async function loadVoiceNotes() {
  try { return JSON.parse((await AsyncStorage.getItem(KEY)) || '[]'); } catch { return []; }
}
export async function saveVoiceNotes(notes) {
  await AsyncStorage.setItem(KEY, JSON.stringify(notes));
}
