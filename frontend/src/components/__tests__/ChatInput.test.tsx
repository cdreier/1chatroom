import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import ChatInput from '../ChatInput'
import { ThemeProvider } from 'styled-components'
import Theme from '../../theme/default'

describe('ChatInput', () => {

  test('it renders', () => {
    const sub = jest.fn()
    const component = renderer.create(
      <ThemeProvider theme={Theme}>
        <ChatInput onSubmit={sub}  />
      </ThemeProvider>,
    ).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('that button toggles upload popup', () => {
    const sub = jest.fn()
    const { getByTestId } = render(
      <ThemeProvider theme={Theme}>
        <ChatInput onSubmit={sub}  />
      </ThemeProvider>,
    )
    fireEvent.input(getByTestId('input'), { target: { value: 'yay' } })
    fireEvent.submit(getByTestId('input'))
    expect(sub).toBeCalledWith('yay')
  })

})
