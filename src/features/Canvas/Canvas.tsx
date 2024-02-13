import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks/hooks'
import { IRootState } from '../../app/store/store'
import { decrement, increment } from './api/CanvasSlice'

const Canvas = () => {
  const count = useSelector((state: IRootState) => state.canvas.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(count)
  }, [count])
  return (
    <div style={{ width: '1000px', height: '600px', backgroundColor: 'white' }}>
      <div>
        <div>
          <button aria-label='Increment value' onClick={() => dispatch(increment())}>
            Increment
          </button>
          <span>{count}</span>
          <button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
            Decrement
          </button>
        </div>
      </div>
    </div>
  )
}

export default Canvas
