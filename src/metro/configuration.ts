import { getDefaultConfig, MetroConfig } from '@react-native/metro-config';
import {
  wrapWithReanimatedMetroConfig,
} from 'react-native-reanimated/metro-config';


export default function AskDesignMetro(configuration: MetroConfig) {
  return wrapWithReanimatedMetroConfig(
    {
      ...getDefaultConfig(__dirname),
      ...configuration,
    }
  );
}

