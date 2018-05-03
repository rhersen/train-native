import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const rendered = ReactDOM.render(<App />, div)
  expect(rendered.state).toEqual({
    station: [],
    train: [],
  })
  ReactDOM.unmountComponentAtNode(div)
})
