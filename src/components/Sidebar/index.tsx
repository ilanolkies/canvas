import React from 'react'
import './style.sass'
import { Box, ElementTypes } from '../elements'
import { Dispatch } from '@reduxjs/toolkit'
import { addElement } from '../Canvas/reducer'
import { connect } from 'react-redux'

interface SidebarProps {
  onClick: () => void
}

const sidebarDraggableElements = [
  () => <Box height={40} width="100%" backgroundColor="#444444" />
]

const Sidebar: React.FC<SidebarProps> = ({ onClick }) => (
  <div className="Sidebar">
    <h4>Add element</h4>
    {
      sidebarDraggableElements.map((Element, i) => (
        <div key={i} className="element-container" onClick={onClick}>
          <Element />
        </div>
      ))
    }
  </div>
)

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClick: () => dispatch(addElement({
    type: ElementTypes.Box,
    props: {
      width: 140,
      height: 50,
      backgroundColor: '#ac04f2'
    }
  }))
})

export default connect(null, mapDispatchToProps)(Sidebar)
