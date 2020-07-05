import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import './style.sass'
import { moveElement } from './reducer'
import { RootState } from '../../store'
import { selectElementPositions } from './selectors'
import CanvasElement from '../CanvasElement'

interface CanvasProps {
  elementPositions: ReturnType<typeof selectElementPositions>,
  onClick: (id: number) => void
}

const Canvas: React.FC<CanvasProps> = ({ elementPositions, onClick }) => {
  return (
    <div className="Canvas">
      {
        elementPositions.map(({ top, left }, id) => {
          return (
            <div key={id} style={{ top, left }} className='canvas-element' onClick={() => onClick(id)}>
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
  onClick: (id: number) => dispatch(moveElement({ id, top: 50, left: 10 }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
