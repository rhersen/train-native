import React from 'react'
import { mount } from 'enzyme'
import Trains from './Trains'

test('empty', () => {
  expect(mount(<Trains />).text()).toBe('')
  expect(mount(<Trains station={[]} train={[]} />).text()).toBe('')
  expect(mount(<Trains station={[{}]} train={[]} />).text()).toBe('')
  expect(mount(<Trains station={[]} train={[{}]} />).text()).toBe('')
})

test('one station announcement', () => {
  const wrapper = mount(<Trains station={[getAnnouncement()]} train={[]} />)
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([
    'Tul',
    '1234 Sub 17:30:31:32',
    '',
  ])
})

test('one train announcement', () => {
  const wrapper = mount(<Trains station={[]} train={[getAnnouncement()]} />)
    .childAt(0)
    .childAt(0)
  expect(wrapper.children().map(child => child.text())).toEqual([
    '1234',
    '',
    'Avg Tul  17:30:31:32',
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
