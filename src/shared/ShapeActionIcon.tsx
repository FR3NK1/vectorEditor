import { useEffect, useState } from 'react'
import { IShape } from '../entities/Shape/model/IShape'

interface ShapeActionIconProps {
  shape: IShape
  onClick: () => void
}

const ShapeActionIcon = ({ shape, onClick }: ShapeActionIconProps) => {
  const [viewBox, setViewBox] = useState<string>('0 0 100 100')

  const calculateViewBox = (path: string): string => {
    const svgNS = 'http://www.w3.org/2000/svg'
    const tempSvg = document.createElementNS(svgNS, 'svg')
    const tempPath = document.createElementNS(svgNS, 'path')
    tempPath.setAttribute('d', path)
    tempSvg.appendChild(tempPath)

    document.body.appendChild(tempSvg)
    const bbox = tempPath.getBBox()
    document.body.removeChild(tempSvg)

    return `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
  }

  useEffect(() => {
    const calculatedViewBox = calculateViewBox(shape.path)
    setViewBox(calculatedViewBox)
  }, [shape])

  return (
    <svg
      width='100%'
      height='100%'
      viewBox={viewBox}
      xmlns='http://www.w3.org/2000/svg'
      style={{ aspectRatio: '1 / 1' }}
      onClick={onClick}
    >
      <path
        d={shape.path}
        fill={shape.fill}
        stroke={shape.stroke}
        strokeWidth={shape.stroke_width}
      />
    </svg>
  )
}

export default ShapeActionIcon
