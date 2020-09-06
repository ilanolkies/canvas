import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import './style.sass'
import { moveElement, MoveElementPayload, SelectElementPayload, selectElement } from './reducer'
import { RootState } from '../../store'
import { selectElementPositions } from './selectors'
import CanvasElement from '../CanvasElement'

interface CanvasProps {
  elementPositions: ReturnType<typeof selectElementPositions>
  moveElement: (payload: MoveElementPayload) => void
  selectElement: (payload: SelectElementPayload) => void
}

type DraggedElementPosition = {
  clientX: number
  clientY: number
}

type DraggedElement = {
  at: number
} & DraggedElementPosition

const Canvas: React.FC<CanvasProps> = ({
  elementPositions,
  moveElement,
  selectElement
}) => {
  const [draggedElement, drag] = useState({
    id: -1,
    clientX: -1,
    clientY: -1
  } as DraggedElementPosition)

  const drop = ({ at, clientX, clientY }: DraggedElement) => {
    const payload = {
      at,
      left: clientX - draggedElement.clientX,
      top: clientY - draggedElement.clientY
    }
    moveElement(payload)
  }

  return (
    <div className="Canvas">
      {
        elementPositions.map(({ top, left, id }, at) => {
          return (
            <div key={id}
              style={{ top, left }}
              className='canvas-element'
              onDragStart={({ clientX, clientY }) => drag({ clientX, clientY  })}
              onDragEnd={({ clientX, clientY }) => drop({ at, clientX, clientY  })}
              onClick={() => selectElement({ at })}
              draggable
            >
              <CanvasElement id={at} />
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
  moveElement: (payload: MoveElementPayload) => dispatch(moveElement(payload)),
  selectElement: (payload: SelectElementPayload) => dispatch(selectElement(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
