declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      primary: string,
      secondary: string,
      normal: string,
      big: string,
      lineHeightBig: string,
    },
    colors: {
      background: string,
      background2: string,
      background3: string,
      black: string,
      secondary: string,
      ownMessage: string,
      otherMessage: string,
    },
  }
}

const Theme = {
  fonts: {
    primary: 'Playfair Display',
    secondary: 'Roboto',
    normal: '1em',
    big: '1.4em',
    lineHeightBig: '1.65em',
  },
  colors: {
    background: '#f1f1f1',
    background2: '#dfdfdf',
    background3: '#eaeaea',
    black: '#333',
    secondary: '#eaeaea',
    ownMessage: '#C7EAF9',
    otherMessage: '#C7F9F9',
  },
}

export default Theme
