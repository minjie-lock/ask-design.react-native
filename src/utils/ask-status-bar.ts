import { Platform, NativeModules, StatusBar } from 'react-native';

export default class AskStatusBar {
  static init = async (): Promise<number> => {
    switch (Platform.OS) {
      case 'ios':
        return new Promise((resolve) => {
          NativeModules.StatusBarManager.getHeight(
            (status: { height: number }) => {
              resolve(status?.height);
            }
          );
        });
      case 'android':
        return StatusBar.currentHeight ?? 0;
      default:
        return 0;
    }
  };

  static height = this.init();
}
