import { css } from 'styled-components';

const Theme = {
  colors: {
    WHITE: '#e5e5e5',
    GRAY: '#CCCCCC',
    DARK_GRAY: '#333333',
    RED: '#F84241',
    RED_2: '#ee7070',
    GREEN_1: '#98c379',
    GREEN_2: '#7cca61',
    MAIN_COLOR: '#687EFF',
  },
  typographies: {
    TITLE: css`
      font-size: 32px;
      font-weight: 700;
    `,
    DEFAULT_TXT: css`
      font-size: 16px;
      font-weight: 500;
    `,
    BUTTON_TXT: css`
      font-size: 20px;
      font-weight: 600;
    `,
    BIG_TXT: css`
      font-size: 20px;
      font-weight: 500;
    `,
    SMALL_TXT: css`
      font-size: 14px;
      font-weight: 300;
    `,
  },
};

export default Theme;
