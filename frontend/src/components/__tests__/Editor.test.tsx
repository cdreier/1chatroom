import React from 'react'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import Editor from '../Editor'

describe('testing the editor', () => {

  test('testing snapshot', () => {
    const component = renderer.create(
      <Editor />,
    ).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('that keystrokes are working', () => {
    const { getByTestId } = render(
      <Editor />,
    )
    const element = getByTestId('editorinput')
    expect(element).toBeInTheDocument()
  })

})
