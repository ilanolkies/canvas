import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import './style.sass'
import { moveElement, MoveElementPayload } from './reducer'
import { RootState } from '../../store'
import { selectElementPositions } from './selectors'
import CanvasElement from '../CanvasElement'

interface CanvasProps {
  elementPositions: ReturnType<typeof selectElementPositions>,
  moveElement: (payload: MoveElementPayload) => void
}
type DraggedElementPosition = {
  clientX: number
  clientY: number
}

type DraggedElement = {
  id: number
} & DraggedElementPosition

const Canvas: React.FC<CanvasProps> = ({ elementPositions, moveElement }) => {
  const [draggedElement, drag] = useState({
    id: -1,
    clientX: -1,
    clientY: -1
  } as DraggedElementPosition)

  const drop = ({ id, clientX, clientY }: DraggedElement) => {
    const payload = {
      id,
      left: clientX - draggedElement.clientX,
      top: clientY - draggedElement.clientY
    }
    moveElement(payload)
  }

  return (
    <div className="Canvas">
      {
        elementPositions.map(({ top, left }, id) => {
          return (
            <div key={id}
              style={{ top, left }}
              className='canvas-element'
              onDragStart={({ clientX, clientY }) => drag({ clientX, clientY  })}
              onDragEnd={({ clientX, clientY }) => drop({ id, clientX, clientY  })}
              draggable
            >
              <CanvasElement id={id} />
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  elementPositions: selectElementPositions(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  moveElement: (payload: MoveElementPayload) => dispatch(moveElement(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
