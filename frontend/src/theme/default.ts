declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      primary: string,
      secondary: string,
      normal: string,
      big: string,
      lineHeightBig: string,
    }
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
}

export default Theme
