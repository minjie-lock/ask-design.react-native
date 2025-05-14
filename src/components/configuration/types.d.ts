import { ViewStyle } from "react-native";


type ButtonColor = {
  /**
   * 默认
  */
  default: string;
  /**
   * 明显
  */
  obvious: string;
};

export type ConfigurationProps = {
  children: React.ReactNode;
  scheme?: {
    components: {
      Button?: {
        round: number;
        color: {
          primary?: ButtonColor;
          default?: ButtonColor;
          success?: ButtonColor;
          danger?: ButtonColor;
          warning?: ButtonColor;
        }
      };
      SeparationLine: {
        background: string;
        color: string;
      };
      Card: {
        round?: number;
        background: string;
      };
      Details: {
        background: string;
        border: {
          type: ViewStyle['borderStyle'];
          color: string;
        }
      };
      List: {
        header: {
          background: string;
          color: string;
        },
      };
    };
    hooks: {
      toast: {
        background: string;
        color: string;
      };
    }
  }
}
