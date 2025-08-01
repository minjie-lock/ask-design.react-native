import type { ViewStyle } from 'react-native';
import type { ToastRef } from '../toast';
import { DialogRef } from '../dialog';


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
        text: {
          title: string;
          content: string;
          footer: string;
        };
      };
      Details: {
        background: string;
        text: {
          title: string,
          content: string,
        },
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
      Dialog: {
        background: string;
        color: string;
        round: number;
      };
      Avatar: {
        round: number;
        background: string;
      };
      Drawer: {
        background: string;
        round: number;
      };
      Result: {
        description: string;
        title: string;
      };
      Selector: {
        background: {
          default: string;
          active: string;
        };
        text: {
          label: {
            default: string;
            active: string;
          };
          description: {
            default: string;
            active: string;
          };
        };
        round: number;
      };
      Segmented: {
        background: {
          default: string;
          active: string;
        };
        text: {
          default: string;
          active: string;
        };
        round: number;
      };
      Picker: {
        background: string;
        color: string;
      },
      Stepper: {
        background: {
          default: string;
          active: string;
        };
        color: {
          active: string;
          inactive: string;
        };
      };
      Switch: {
        background: {
          default: string;
          active: string;
        };
        text: {
          default: string;
          active: string;
        };
        border: string;
      };
      Wait: {
        color: {
          one: string;
          two: string;
          three: string;
          four: string;
        };
      };
      SideBar: {
        background: {
          side: {
            default: string;
            active: string;
          };
          children: string
        };
        color: {
          active: string;
          default: string;
        }
      };
      /**
       * 步骤条
      */
      Steps: {
        border: {
          active: string;
          default: string;
        };
        status: {
          wait?: string;
          process?: string;
          finish?: finish;
          error?: string;
        },
        color: {
          description: string;
          title: {
            default?: string;
            active?: string;
          };
        };
      };
      /**
       * 进度器
       */
      Progress: {
        background: {
          active: string;
          default: string;
        };
        text: string;
      };
    };
  };
  hooks?: {
    toast?: React.RefObject<ToastRef>;
    dialog?: React.RefObject<DialogRef>;
  }
}
