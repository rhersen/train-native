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
  ).toBe('Tåg undefined mot undefined  ')
})

test('one station announcement', () => {
  const wrapper = mount(
    <Main stations={stations()} station={[getAnnouncement()]} train={[]} />
  )
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([
    'Tullinge',
    '1234 Sundbyberg 17:30:31:32',
    '',
  ])
})

test('one train announcement', () => {
  const wrapper = mount(
    <Main stations={stations()} station={[]} train={[getAnnouncement()]} />
  )
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([
    'Tåg 1234 mot Sundbyberg ',
    '',
    'Avg Tullinge     17:30:31:32',
  ])
})

function getAnnouncement() {
  return {
    AdvertisedTimeAtLocation: '2018-05-04T17:30:00',
    EstimatedTimeAtLocation: '2018-05-04T17:31:00',
    TimeAtLocation: '2018-05-04T17:32:00',
    AdvertisedTrainIdent: '1234',
    LocationSignature: 'Tul',
    ActivityType: 'Avgang',
    ToLocation: [{ LocationName: 'Sub' }],
  }
}

function stations() {
  return {
    Tul: 'Tullinge',
    Sub: 'Sundbyberg',
  }
}
