import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { changeElementOrder } from '../Canvas/reducer'
import { selectSelectedElement } from '../Canvas/selectors'
import { RootState } from '../../store'

type ElementZIndexProps = {
  moveTop: () => void,
  moveUp: () => void,
  moveDown: () => void,
  moveBottom: () => void,
}

const ElementZIndex = ({ moveTop, moveUp, moveDown, moveBottom }: ElementZIndexProps) => (
  <>
    <button onClick={moveTop}>move top</button>
    <button onClick={moveUp}>move up</button>
    <button onClick={moveDown}>move down</button>
    <button onClick={moveBottom}>move bottom</button>
  </>
)

const mapStateToProps = (state: RootState) => ({
  selectedElement: selectSelectedElement(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeElementOrder: (at: number) => (reorder: number) => dispatch(changeElementOrder({ at, reorder }))
})

const mergeProps = (stateProps: ReturnType<typeof mapStateToProps>, dispatchProps: ReturnType<typeof mapDispatchToProps>, ownProps: any) => {
  const changeElementOrder = dispatchProps.changeElementOrder(stateProps.selectedElement)
  return {
    moveTop: () => changeElementOrder(Number.MAX_SAFE_INTEGER),
    moveUp: () => changeElementOrder(1),
    moveDown: () => changeElementOrder(-1),
    moveBottom: () => changeElementOrder(Number.MIN_SAFE_INTEGER),
    ...ownProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ElementZIndex)
