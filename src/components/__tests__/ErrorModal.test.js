import React            from 'react'
import {mount}          from 'enzyme'
import ErrorModal       from '../ErrorModal'
import {
    Modal,
    Button
}                       from 'antd'

let wrapped

const TEXT_ERROR_BODY = 'Sorry, Millennium Falcon is under maintenance, we could not find a planet at the moment.'
const error = {message: 'Network error'}

beforeEach(()=>{
    wrapped = mount(
        <ErrorModal
            message={error.message}
        />
    )
})

afterEach(()=>{
    wrapped.unmount()
})

it('Main modal rendered',()=>{
    expect(wrapped.find(Modal).length).toEqual(1)
})

it('Retry button rendered',()=>{
    expect(wrapped.find(Button).length).toEqual(1)
})

it('Title message rendered as received in props',()=>{
    expect(wrapped.text()).toContain(wrapped.props().message)
})

it('Error message rendered',()=>{
    expect(wrapped.text()).toContain(TEXT_ERROR_BODY)
})

