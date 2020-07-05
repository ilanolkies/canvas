import React from 'react'
import { Box, BoxProps } from './Box'

export enum ElementTypes {
  Box = 'element_box'
}

export type ElementProps = BoxProps

export const getElementByType = (type: ElementTypes) => {
  switch (type) {
    case ElementTypes.Box:
      return (props: BoxProps) => <Box {...props} />
    default:
      throw new Error(`No element for ${type} type`)
  }
}

export { Box }
