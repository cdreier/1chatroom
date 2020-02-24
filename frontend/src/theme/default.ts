declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      primary: string,
      secondary: string,
    }
  }
}

const Theme = {
  fonts: {
    primary: 'Playfair Display',
    secondary: 'Roboto',
  },
}

export default Theme
