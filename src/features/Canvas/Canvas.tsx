import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks/hooks'
import { IRootState } from '../../app/store/store'

const Canvas = () => {
  const size = useSelector((state: IRootState) => state.canvas.size)
  const dispatch = useAppDispatch()

  return (
    <div style={{ width: `${size.width}px`, height: `${size.height}px`, backgroundColor: 'white' }}>
      123
    </div>
  )
}

export default Canvas
