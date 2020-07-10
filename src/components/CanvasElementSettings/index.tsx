import React from 'react'
import { connect } from 'react-redux'
import './style.sass'
import { selectSelectedElement } from '../Canvas/selectors'
import { RootState } from '../../store'

interface ElementSettingsProps {
  selectedElement: number
}

const ElementSettings = ({ selectedElement }: ElementSettingsProps) => (
  <div className="ElementSettings">
    <p>Settings</p>
    {selectedElement}
  </div>
)

const mapStateToProps = (state: RootState) => ({
  selectedElement: selectSelectedElement(state)
})

export default connect(mapStateToProps)(ElementSettings)
