import Toast, { ToastPosition } from 'react-native-toast-message';
import languages from '@cospired/i18n-iso-languages';
import moment from 'moment';
import { NativeModules } from 'react-native';
import * as RNLocalize from 'react-native-localize';
const { PlatformConstants } = NativeModules;
languages.registerLocale(require('@cospired/i18n-iso-languages/langs/en.json'));

export const localeMoment = (date: Date) => moment(date).local();
export const utcMoment = (date: Date) => moment(date).utc();

export const getRandomeCode = (length: number): string => {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
};

type PresentToastMessageProps = {
  type: string;
  position?: ToastPosition;
  title?: string;
  text?: string;
  [key: string]: any;
};

export const presentToastMessage = ({
  type,
  position,
  title,
  text,
  onPress,
  ...rest
}: PresentToastMessageProps): void => {
  Toast.show({
    type,
    position,
    text1: title,
    text2: text,
    ...rest,
    onPress: () => {
      Toast.hide();
      if (onPress) {
        onPress()
      }
    },
  });
};

export const generateQueryParams = (params: { [key: string]: any }): string => {
  const queryParams = Object.entries(params)
    .filter(([_, value]) => value != null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    );

  if (queryParams.length === 0) {
    return '';
  }

  return `?${queryParams.join('&')}`;
};
