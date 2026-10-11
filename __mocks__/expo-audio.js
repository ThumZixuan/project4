import React from 'react';
export const RecordingPresets = { HIGH_QUALITY: {} };
export const AudioModule = { requestRecordingPermissionsAsync: async () => ({ granted: true, status: 'granted' }) };
export const setAudioModeAsync = async () => {};
export function useAudioRecorder() {
  return { prepareToRecordAsync: async () => {}, record: () => {}, stop: async () => {}, uri: 'file:///mock-recording.m4a' };
}
export function useAudioPlayer() {
  return { play: () => {}, seekTo: () => {} };
}
