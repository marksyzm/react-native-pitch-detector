import { Platform } from 'react-native';
import { PicthDetectorErrors } from '../../types';

const base =
  `The package 'react-native-pitch-detector' find a error. Make sure: \n\n` +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const linking =
  `The package 'react-native-pitch-detector' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({
    ios: "- You have run 'pod install'\n",
    android: '',
  }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const unavailable =
  `The package 'react-native-pitch-detector' doesn't find IOS implementation. Make sure: \n\n` +
  Platform.select({
    ios: "- You have run 'pod install'\n",
    android: '',
  }) +
  `- Check installed module version, if you are using latest version and got this error, that's mean we haven't IOS support yet. \n` +
  '- You are not using Expo Go\n';

const permission =
  `The package 'react-native-pitch-detector' need audio record permission. Make sure: \n\n` +
  Platform.select({
    ios: '',
    android: `- You have added '<uses-permission android:name="android.permission.RECORD_AUDIO" />' on AndroidManifest.xml and request permission before start record.\n`,
  });

export class PicthDetectorError {
  constructor(type: PicthDetectorErrors) {
    if (type === PicthDetectorErrors.LINKING_ERROR) {
      return new Error(linking);
    }

    if (type === PicthDetectorErrors.UNAVAILABLE_ERROR) {
      return new Error(unavailable);
    }

    if (type === PicthDetectorErrors.PERMISSIONS_ERROR) {
      return new Error(permission);
    }

    return new Error(base);
  }
}
