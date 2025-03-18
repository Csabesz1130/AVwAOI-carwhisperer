import { Image } from 'antd'
import React from 'react'

type Props = {
  year: number
  make: string
  model: string
  color: string
  imageUrl: string
}

export const CarImage: React.FC<Props> = ({ year, make, model, color, imageUrl }) => {
  return (
    <div className="relative">
      <Image
        src={imageUrl}
        alt={`${year} ${make} ${model} in ${color}`}
        className="object-cover rounded-lg"
        style={{
          aspectRatio: '4/3',
          transform: 'perspective(1000px) rotateY(-15deg)',
          transformOrigin: 'center center'
        }}
        preview={false}
      />
    </div>
  )
}
