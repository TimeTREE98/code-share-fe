import { css } from 'styled-components';

const Theme = {
  colors: {
    TXT_BLACK: '#CCCCCC',
  },
  typographies: {
    DEFAULT_TXT: css`
      font-size: 16px;
      font-weight: 500;
    `,
    BUTTON_TXT: css`
      font-size: 20px;
      font-weight: 700;
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
