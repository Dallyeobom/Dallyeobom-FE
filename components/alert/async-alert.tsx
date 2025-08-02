import { Alert } from 'react-native';

interface AsyncAlertProps {
  title?: string;
  message: string;
}

function AsyncAlert({ title, message }: AsyncAlertProps): Promise<void> {
  return new Promise((resolve) => {
    Alert.alert(title ?? '', message, [
      {
        text: '확인',
        onPress: () => resolve(),
      },
    ]);
  });
}

export default AsyncAlert;
