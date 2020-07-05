import React from 'react'

export interface BoxProps {
  width: string | number
  height: string | number
  backgroundColor: string
}

export const Box: React.FC<BoxProps> = ({ width, height, backgroundColor }) => (
  <div style={{ width, height, backgroundColor }} />
)
