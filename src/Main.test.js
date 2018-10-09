import React from 'react'
import { mount } from 'enzyme'
import Main from './Main'

test('empty', () => {
  expect(mount(<Main stations={stations()} />).text()).toBe('')
  expect(
    mount(<Main stations={stations()} station={[]} train={{}} />).text()
  ).toBe('')
  expect(
    mount(<Main stations={stations()} station={[{}]} train={{}} />).text()
  ).toBe('')
  expect(
    mount(<Main stations={stations()} station={[]} train={[{}]} />).text()
  ).toBe('')
})

test('one station announcement', () => {
  const wrapper = mount(
    <Main
      stations={stations()}
      station={{
        location: 'Tul',
        trains: [
          {
            advertised: '2018-05-04T17:30:00',
            estimated: '2018-05-04T17:31:00',
            actual: '2018-05-04T17:32:00',
            id: '1234',
            activity: 'Avgang',
            to: 'Sub',
          },
        ],
      }}
      train={{}}
    />
  )
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([
    'Tullinge',
    'Sundbyberg17:32',
  ])
})

test('one train announcement', () => {
  const wrapper = mount(
    <Main
      stations={stations()}
      station={[]}
      train={{
        id: '1234',
        to: 'Sub',
        locations: [
          {
            Avgang: {
              advertised: '2018-05-04T17:30:00',
              estimated: '2018-05-04T17:31:00',
              actual: '2018-05-04T17:32:00',
            },
            location: 'Tul',
            key: 'Tul',
          },
        ],
      }}
    />
  )
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([
    'Tåg 1234 mot Sundbyberg',
    'Tullinge17:3032',
  ])
})

test('announcement without ActivityType', () => {
  const wrapper = mount(
    <Main
      stations={stations()}
      station={[]}
      train={{
        id: '1234',
        to: 'Sub',
        locations: [
          {
            Avgang: {
              advertised: '2018-05-04T17:30:00',
              estimated: '2018-05-04T17:31:00',
              actual: '2018-05-04T17:32:00',
            },
            location: 'Tul',
            key: 'Tul',
          },
        ],
      }}
    />
  )
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([
    'Tåg 1234 mot Sundbyberg',
    'Tullinge17:3032',
  ])
})

test('does not crash if the train has no announcements', () => {
  const wrapper = mount(<Main stations={stations()} train={{}} />)
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([''])
})

function stations() {
  return {
    Tul: 'Tullinge',
    Sub: 'Sundbyberg',
  }
}
