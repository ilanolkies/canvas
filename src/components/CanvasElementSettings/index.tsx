import React from 'react'
import { connect } from 'react-redux'
import toPairs from 'lodash/toPairs'
import { selectSelectedElementProps } from '../Canvas/selectors'
import { RootState } from '../../store'
import { ElementProps } from '../elements'

interface ElementSettingsProps {
  [key: string]: any
  selectedElementProps: ElementProps
}

const ElementSettings = ({ selectedElementProps }: ElementSettingsProps) => {
  return (
    <>
      {toPairs(selectedElementProps).map(([key, value]) => {
        return <div key={key}>{key}: {value}</div>
      })}
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  selectedElementProps: selectSelectedElementProps(state)
})

export default connect(mapStateToProps)(ElementSettings)
