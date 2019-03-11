import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { PopularContent } from './PopularContent'
import testData from '../../../test_data/popularContent'
import 'chai/register-should'

describe("UNIT TEST - Popular Content Module", () => {
  configure({ adapter: new Adapter() });

  let props;
  let mountedModule;
  const popularContent = () => {
    if(!mountedModule) mountedModule = mount(<PopularContent { ...props } />)

    return mountedModule
  }

  beforeEach(() => {
    props = {
      fetch: jest.fn(),
      select: jest.fn(),
      trilhas: undefined,
      filter: undefined
    }
    mountedModule = undefined
  })

  it("Should not show the box if there is no trilhas", () => {
    const box = popularContent().find('#PopularContent')

    box.should.have.length(0)
  })

  it("Should show the box if there is any trilhas", () => {
    props.trilhas = testData.trilhas

    const box = popularContent().find('#PopularContent')

    box.should.have.length(1)
  })

  it("Should fetch trilhas when component mounts", () => {
    const component = popularContent()

    expect(props.fetch).toHaveBeenCalled()
  })

  it("Should create a single li tag for every trilha that has been fetched", () => {
    props.trilhas = testData.trilhas

    const trilhas = popularContent().find('li')

    trilhas.should.have.length(2)
  })

  it("Should run the selector when a item is clicked", () => {
    props.trilhas = testData.trilhas

    const trilha = popularContent().find('li').first()

    trilha.simulate('click')
    expect(props.select).toHaveBeenCalled()
  })

  it("Should show only trilhas that are similar with what the users is typing", () => {
    props.trilhas = testData.trilhas
    props.filter = 'Gr'

    const trilhas = popularContent().find('li').text()

    trilhas.should.be.equal('Growth Hacking')
  })

  it("Should show trilha if the text typed is included in the middle of the trilha title", () => {
    props.trilhas = testData.trilhas
    props.filter = 'Hac'

    const trilhas = popularContent().find('li').text()

    trilhas.should.be.equal('Growth Hacking')
  })

  it("Should show trilha even if the text typed is in a different case", () => {
    props.trilhas = testData.trilhas
    props.filter = 'hac'

    const trilhas = popularContent().find('li').text()

    trilhas.should.be.equal('Growth Hacking')
  })
})