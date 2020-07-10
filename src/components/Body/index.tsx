import React from 'react'
import './style.sass'
import Sidebar from '../Sidebar'
import Canvas from '../Canvas'
import CanvasElementSettings from '../CanvasElementSettings'

export default () => (
  <div className="Body">
    <div className="sidebar">
      <Sidebar />
    </div>
    <div className="divisor"></div>
    <div className="canvas">
      <Canvas />
    </div>
    <div className="divisor"></div>
    <div className="settings">
      <CanvasElementSettings />
    </div>
  </div>
)
