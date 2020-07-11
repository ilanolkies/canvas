import React from 'react'
import { connect } from 'react-redux'
import toPairs from 'lodash/toPairs'
import { selectSelectedElementProps } from '../Canvas/selectors'
import { changeSelectedElementProp } from '../Canvas/reducer'
import { RootState } from '../../store'
import { ElementProps } from '../elements'
import { Dispatch } from '@reduxjs/toolkit'

interface ElementSettingsProps {
  [key: string]: any
  selectedElementProps: ElementProps
  changeSelectedElementProp: (payload: Partial<ElementProps>) => void
}

const stringToType = (type: string) => (value: string) => {
  if (type === 'string') return value
  if (type === 'number') return parseInt(value)
}

const ElementSettings = ({ selectedElementProps, changeSelectedElementProp }: ElementSettingsProps) => {
  return (
    <>
      {toPairs(selectedElementProps).map(([key, value]) => {
        return <div key={key}>{key}: <input type={typeof value} value={value} onChange={(e) => changeSelectedElementProp({ [key]: stringToType(typeof value)(e.target.value) })} /></div>
      })}
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  selectedElementProps: selectSelectedElementProps(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeSelectedElementProp: (payload: Partial<ElementProps>) => dispatch(changeSelectedElementProp(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ElementSettings)
