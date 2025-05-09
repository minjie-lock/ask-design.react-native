import type { ConfigurationProps } from '../configuration/types';
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
      round: 6,
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
          default : RED.four,
          obvious: RED.five,
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
      round: 6,
      background: '#FFFFFF',
    },
    Details: {
      background: '#FFFFFF',
      border: {
        type: 'solid',
        color: GRAY.nine,
      },
    },
  },
};

export const dark = {
  button: {
    round: gloabl.round,
  },
};
