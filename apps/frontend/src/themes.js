import merge from 'deepmerge';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

const base = {
  palette: {
    primary: pink,
    secondary: indigo,
  },
  components: {
    tooltip: {
      backgroundColor: '#333',
      color: '#fff',
      fontSize: 12,
    },
  },
};

export default {
  light: base,
  dark: merge(base, {
    palette: {
      type: 'dark',
      background: {
        paper: '#333',
        default: '#030303',
      },
      text: {
        primary: 'rgba(255, 255, 255, 0.87)',
        secondary: 'rgba(255, 255, 255, 0.54)',
        disabled: 'rgba(255, 255, 255, 0.38)',
        hint: 'rgba(255, 255, 255, 0.38)',
      },
    },
  }),
};
