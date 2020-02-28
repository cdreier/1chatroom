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
      borders: string,
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
    big: '1.2em',
    lineHeightBig: '1.65em',
  },
  colors: {
    background: '#f1f1f1',
    background2: '#dfdfdf',
    background3: '#eaeaea',
    black: '#333',
    borders: '#eaeaea',
    secondary:'rgba(250,157,38, 0.0)',
    ownMessage: '#e8f9f2',
    otherMessage: '#fafafa',
  },
}

export default Theme
