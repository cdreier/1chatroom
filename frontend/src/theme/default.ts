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
      black: string,
      borders: string,
      secondary: string,
      ownMessage: string,
      otherMessage: string,
    },
    util: {
      breakpoint: string,
    }
  }
}

const Theme = {
  fonts: {
    primary: 'Merriweather',
    secondary: 'Roboto',
    normal: '1em',
    big: '1.2em',
    lineHeightBig: '1.65em',
  },
  colors: {
    black: '#333',
    borders: '#eaeaea',
    secondary:'rgba(250,157,38, 0.0)',
    ownMessage: 'rgba(23, 130, 255, 0.7)',
    otherMessage: 'rgba(87, 186, 255, 0.7)',
  },
  util: {
    breakpoint: '(min-width: 768px)',
  },
}

export default Theme
