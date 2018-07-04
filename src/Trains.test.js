import React from 'react'
import { mount } from 'enzyme'
import Main from './Main'

test('empty', () => {
  expect(mount(<Main stations={stations()} />).text()).toBe('')
  expect(
    mount(<Main stations={stations()} station={[]} train={[]} />).text()
  ).toBe('')
  expect(
    mount(<Main stations={stations()} station={[{}]} train={[]} />).text()
  ).toBe('')
  expect(
    mount(<Main stations={stations()} station={[]} train={[{}]} />).text()
  ).toBe('Tåg undefined mot undefined     ')
})

test('one station announcement', () => {
  const wrapper = mount(
    <Main
      stations={stations()}
      station={[
        {
          AdvertisedTimeAtLocation: '2018-05-04T17:30:00',
          EstimatedTimeAtLocation: '2018-05-04T17:31:00',
          TimeAtLocation: '2018-05-04T17:32:00',
          AdvertisedTrainIdent: '1234',
          LocationSignature: 'Tul',
          ActivityType: 'Avgang',
          ToLocation: [{ LocationName: 'Sub' }],
        },
      ]}
      train={[]}
    />
  )
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([
    'Tullinge',
    '1234 Sundbyberg 17:30:31:32',
  ])
})

test('one train announcement', () => {
  const wrapper = mount(
    <Main
      stations={stations()}
      station={[]}
      train={[
        {
          ActivityType: 'Avgang',
          AdvertisedTimeAtLocation: '2018-05-04T17:30:00',
          AdvertisedTrainIdent: '1234',
          EstimatedTimeAtLocation: '2018-05-04T17:31:00',
          LocationSignature: 'Tul',
          TimeAtLocation: '2018-05-04T17:32:00',
          ToLocation: 'Sub',
        },
      ]}
    />
  )
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([
    'Tåg 1234 mot Sundbyberg',
    'Avg Tullinge     17:30:31:32',
  ])
})

test('announcement without ActivityType', () => {
  const wrapper = mount(
    <Main
      stations={stations()}
      station={[]}
      train={[
        {
          ActivityType: undefined,
          AdvertisedTimeAtLocation: '2018-05-04T17:30:00',
          AdvertisedTrainIdent: '1234',
          EstimatedTimeAtLocation: '2018-05-04T17:31:00',
          LocationSignature: 'Tul',
          TimeAtLocation: '2018-05-04T17:32:00',
          ToLocation: 'Sub',
        },
      ]}
    />
  )
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([
    'Tåg 1234 mot Sundbyberg',
    '    Tullinge     17:30:31:32',
  ])
})

test('does not crash if the train has no announcements', () => {
  const wrapper = mount(<Main stations={stations()} train={[]} />)
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
