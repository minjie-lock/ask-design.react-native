import type { ConfigurationProps } from '../components/configuration/types';
import { NAVY_BLUE, GREEN, GRAY, RED, GOLD } from './color';
const gloabl = {
  round: 6,
  Button: {

  },
};

type Color = Required<Omit<ConfigurationProps, 'children'>>['scheme']

export const light: Color = {
  components: {
    Button: {
      round: gloabl.round,
      color: {
        primary: {
          default: NAVY_BLUE.five,
          obvious: NAVY_BLUE.four,
        },
        success: {
          default: GREEN.four,
          obvious: GREEN.five,
        },
        default: {
          default: GRAY.ten,
          obvious: GRAY.nine,
        },
        danger: {
          default: RED.five,
          obvious: RED.four,
        },
        warning: {
          default: GOLD.five,
          obvious: GOLD.four,
        },
      },
    },
    SeparationLine: {
      background: GRAY.nine,
      color: GRAY.one,
    },
    Card: {
      round: gloabl.round,
      background: '#FFFFFF',
      text: {
        title: GRAY.one,
        content: GRAY.three,
        footer: GRAY.three,
      },
    },
    Details: {
      background: '#FFFFFF',
      text: {
        title: GRAY.two,
        content: GRAY.one,
      },
      border: {
        type: 'solid',
        color: GRAY.nine,
      },
    },
    List: {
      header: {
        background: 'transparent',
        color: GRAY.five,
      },
    },
    Dialog: {
      background: '#FFFFFF',
      color: '#000000',
      round: gloabl.round,
    },
    Avatar: {
      round: gloabl.round,
      background: GRAY.nine,
    },
    Drawer: {
      background: '#FFFFFF',
      round: gloabl.round,
    },
    Result: {
      description: GRAY.five,
      title: GRAY.one,
    },
    Selector: {
      background: {
        default: GRAY.ten,
        active: NAVY_BLUE.ten,
      },
      text: {
        label: {
          default: GRAY.one,
          active: NAVY_BLUE.four,
        },
        description: {
          default: GRAY.five,
          active: NAVY_BLUE.five,
        },
      },
      round: gloabl.round,
    },
    Segmented: {
      background: {
        default: GRAY.ten,
        active: '#FFFFFF',
      },
      text: {
        default: GRAY.five,
        active: NAVY_BLUE.four,
      },
      round: gloabl.round,
    },
    Picker: {
      background: '#FFFFFF',
      color: GRAY.one,
    },
    Stepper: {
      background: {
        default: GRAY.ten,
        active: GRAY.nine,
      },
      color: {
        active: NAVY_BLUE.five,
        inactive: GRAY.eight,
      },
    },
    Switch: {
      background: {
        default: GRAY.ten,
        active: NAVY_BLUE.five,
      },
      text: {
        default: GRAY.eight,
        active: 'white',
      },
      border: GRAY.ten,
    },
    Wait: {
      color: {
        one: NAVY_BLUE.eight,
        two: NAVY_BLUE.seven,
        three: NAVY_BLUE.three,
        four: NAVY_BLUE.two,
      },
    },
    SideBar: {
      background: {
        side: {
          default: GRAY.ten,
          active: 'white',
        },
        children: 'white',
      },
      color: {
        default: GRAY.two,
        active: NAVY_BLUE.five,
      },
    },
    Steps: {
      border: {
        active: NAVY_BLUE.five,
        default: GRAY.nine,
      },
      status: {
        error: RED.five,
      },
      color: {
        description: GRAY.seven,
        title: {
          default: GRAY.one,
          active: NAVY_BLUE.five,
        },
      },
    },
    Progress: {
      background: {
        default: GRAY.ten,
        active: NAVY_BLUE.five,
      },
      text: GRAY.eight,
    },
    Skeleton: {
      background: {
        default: GRAY.nine,
        active: GRAY.ten,
      },
    },
    Tabs: {
      line: {
        active: NAVY_BLUE.five,
        default: GRAY.ten,
      },
    },
  },
};

export const dark: Color = {
  components: {
    Button: {
      round: gloabl.round,
      color: {
        primary: {
          default: NAVY_BLUE.five,
          obvious: NAVY_BLUE.four,
        },
        success: {
          default: GREEN.four,
          obvious: GREEN.five,
        },
        default: {
          default: GRAY.ten,
          obvious: GRAY.nine,
        },
        danger: {
          default: RED.five,
          obvious: RED.four,
        },
        warning: {
          default: GOLD.five,
          obvious: GOLD.four,
        },
      },
    },
    SeparationLine: {
      background: GRAY.two,
      color: GRAY.one,
    },
    Card: {
      round: gloabl.round,
      background: GRAY.one,
      text: {
        title: GRAY.five,
        content: GRAY.four,
        footer: GRAY.four,
      },
    },
    Details: {
      background: GRAY.one,
      text: {
        title: GRAY.five,
        content: GRAY.six,
      },
      border: {
        type: 'solid',
        color: GRAY.two,
      },
    },
    List: {
      header: {
        background: 'transparent',
        color: GRAY.five,
      },
    },
    Dialog: {
      background: GRAY.one,
      color: GRAY.five,
      round: gloabl.round,
    },
    Avatar: {
      round: gloabl.round,
      background: GRAY.nine,
    },
    Drawer: {
      background: GRAY.one,
      round: gloabl.round,
    },
    Result: {
      description: GRAY.four,
      title: GRAY.five,
    },
    Selector: {
      background: {
        default: GRAY.three,
        active: NAVY_BLUE.nine,
      },
      text: {
        label: {
          default: GRAY.nine,
          active: NAVY_BLUE.four,
        },
        description: {
          default: GRAY.seven,
          active: GRAY.six,
        },
      },
      round: gloabl.round,
    },
    Segmented: {
      background: {
        default: GRAY.ten,
        active: GRAY.nine,
      },
      text: {
        default: GRAY.five,
        active: NAVY_BLUE.four,
      },
      round: gloabl.round,
    },
    Picker: {
      background: GRAY.one,
      color: GRAY.five,
    },
  },
};
