import React from 'react'
import { connect } from 'react-redux'
import './style.sass'
import { isSelectedElement } from '../Canvas/selectors'
import { RootState } from '../../store'
import CanvasElementSettings from '../CanvasElementSettings'

interface ElementSettingsProps {
  [key: string]: any
  isSelectedElement: boolean
}

const ElementSettings = ({ isSelectedElement }: ElementSettingsProps) => {
  console.log(isSelectedElement)
  return (
    <div className="ElementSettings">
      <p>Settings</p>
      {
        isSelectedElement && <CanvasElementSettings />
      }
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  isSelectedElement: isSelectedElement(state),
})

export default connect(mapStateToProps)(ElementSettings)
