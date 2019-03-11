import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { SelectDays } from './SelectDays'
import testData from '../../../test_data/selectDays'
import 'chai/register-should'

describe("UNIT TEST - Select Days Module", () => {
  configure({ adapter: new Adapter() });

  let props;
  let mountedModule;
  const selectDays = () => {
    if(!mountedModule) mountedModule = mount(<SelectDays { ...props } />)

    return mountedModule
  }

  beforeEach(() => {
    props = {
      submit: jest.fn(),
      trilhas: undefined,
      subject: undefined,
    }
    mountedModule = undefined
  })

  it("Should show one button for every day of the week", () => {
    const dias = selectDays().find('.dia')

    dias.should.have.length(7)
  })

  it("Should be able to select a day", () => {
    const component = selectDays()
    const first = component.find('.dia').first()

    component.state().dias.should.have.length(0)
    first.simulate('click')
    component.state().dias.should.have.length(1)
  })

  it("Should be able to select multiple days", () => {
    const component = selectDays()
    const dias = component.find('.dia')

    component.state().dias.should.have.length(0)
    dias.first().simulate('click')
    dias.at(1).simulate('click')
    component.state().dias.should.have.length(2)
  })

  it("Should be able to deselect a day", () => {
    const component = selectDays()
    const dias = component.find('.dia')

    component.state().dias.should.have.length(0)
    dias.first().simulate('click')
    component.state().dias.should.have.length(1)
    dias.first().simulate('click')
    component.state().dias.should.have.length(0)
  })

  it("Should select the right day", () => {
    const component = selectDays()
    const dias = component.find('.dia')

    component.state().dias.should.have.length(0)
    dias.first().simulate('click')
    component.state().dias[0].should.be.equal('segunda')
  })

  it("Should be able to select 'tudo hoje'", () => {
    props.trilhas = testData.trilhas
    props.subject = testData.subjectExists

    const component = selectDays()
    const hoje = component.find('#tudohoje')

    hoje.simulate('click')
    component.state().dias[0].should.be.equal('hoje')
    component.state().dias.should.have.length(1)
  })

  it("If the user previously selected a day, it should clear all when clicked in 'tudo hoje'", () => {
    props.trilhas = testData.trilhas
    props.subject = testData.subjectExists

    const component = selectDays()
    const segunda = component.find('.dia').first()
    const hoje = component.find('#tudohoje')

    segunda.simulate('click')
    component.state().dias[0].should.be.equal('segunda')
    hoje.simulate('click')
    component.state().dias[0].should.be.equal('hoje')
    component.state().dias.should.have.length(1)
  })

  it("Tudo hoje should toggle when clicked again", () => {
    props.trilhas = testData.trilhas
    props.subject = testData.subjectExists

    const component = selectDays()
    const hoje = component.find('#tudohoje')

    hoje.simulate('click')
    component.state().dias[0].should.be.equal('hoje')
    component.state().dias.should.have.length(1)

    hoje.simulate('click')
    component.state().dias.should.have.length(0)
  })

  it("Should submit when the user clicks the submit button", () => {
    const component = selectDays()
    const enviar = component.find('#submitdays')

    enviar.simulate('click')
    expect(props.submit).toHaveBeenCalled()
  })

  it("If the user asked for a tema that we dont have, 'tudo hoje' should be disabled", () => {
    props.trilhas = testData.trilhas
    props.subject = testData.subjectNotExists

    const component = selectDays()
    const hoje = component.find('.tudo-hoje')

    hoje.should.have.length(0)
  })

  it("If the user asked for a tema that we have, 'tudo hoje' should be enabled", () => {
    props.trilhas = testData.trilhas
    props.subject = testData.subjectExists

    const component = selectDays()
    const hoje = component.find('.tudo-hoje')

    hoje.should.have.length(1)
  })
})