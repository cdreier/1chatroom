import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import Theme from '../../theme/default'
import ChatMessage from '../ChatMessage'

describe('ChatMessage', () => {

  test('it renders own messages', () => {
    const sub = jest.fn()
    const component = renderer.create(
      <ThemeProvider theme={Theme}>
        <ChatMessage author={'christian'} self={'christian'} date={new Date(0)} dateFormatter={d => d.toUTCString()}  >
          this is my chat message
        </ChatMessage>
      </ThemeProvider>,
    ).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('it renders other messages', () => {
    const sub = jest.fn()
    const component = renderer.create(
      <ThemeProvider theme={Theme}>
        <ChatMessage author={'stefan'} self={'christian'} date={new Date(500)}  dateFormatter={d => d.toUTCString()}  >
          this is another chat message
        </ChatMessage>
      </ThemeProvider>,
    ).toJSON()
    expect(component).toMatchSnapshot()
  })

})
