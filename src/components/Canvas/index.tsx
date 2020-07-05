import React from 'react'
import { connect } from 'react-redux'
import './style.sass'
import { ElementState } from './reducer'
import { getElementByType } from '../elements'
import { RootState } from '../../store'
import { selectElements } from './selectors'

interface CanvasProps {
  elements: ElementState[]
}

const Canvas: React.FC<CanvasProps> = ({ elements }) => {
  return (
    <div className="Canvas">
      {
        elements.map(({ top, left, type, props }, i) => {
          const ElementComponent = getElementByType(type)
          return (
            <div key={i} style={{ top, left }} className='canvas-element'>
              <ElementComponent {...props} />
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  elements: selectElements(state)
})

export default connect(mapStateToProps)(Canvas)
