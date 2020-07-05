import React from 'react'
import { ElementTypes, ElementProps, getElementByType } from '../elements'
import { RootState } from '../../store'
import { selectElementPropsById } from '../Canvas/selectors'
import { connect } from 'react-redux'

interface CanvasElementOwnProps {
  id: number
}

interface CanvasElementProps {
  type: ElementTypes,
  props: ElementProps
}

const CanvasElement: React.FC<CanvasElementProps> = ({ type, props }) => {
  const ElementComponent = getElementByType(type)

  return (
    <ElementComponent {...props} />
  )
}

const mapStateToProps = (state: RootState, ownProps: CanvasElementOwnProps) => ({
  ...selectElementPropsById(state)(ownProps.id)
})

export default connect(mapStateToProps)(CanvasElement)
