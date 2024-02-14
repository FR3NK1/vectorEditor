import { Button, NumberInput, Popover } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks/hooks'
import { IRootState } from '../../app/store/store'
import { changeCanvasSize } from '../Canvas/api/CanvasSlice'

const ChangeSizePopover = () => {
  const size = useSelector((state: IRootState) => state.canvas.size)
  const dispatch = useAppDispatch()

  const sizeForm = useForm({
    initialValues: {
      width: size.width,
      height: size.height,
    },

    validate: {
      width: isNotEmpty('Введите ширину'),
      height: isNotEmpty('Введите высоту'),
    },
  })

  return (
    <Popover width={300} trapFocus position='bottom' withArrow shadow='md'>
      <Popover.Target>
        <Button>Размер</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <NumberInput label='Ширина' {...sizeForm.getInputProps('width')} />
        <NumberInput label='Высота' {...sizeForm.getInputProps('height')} />
        <Button
          onClick={() =>
            dispatch(
              changeCanvasSize({
                width: sizeForm.values.width,
                height: sizeForm.values.height,
              }),
            )
          }
        >
          Сохранить
        </Button>
      </Popover.Dropdown>
    </Popover>
  )
}

export default ChangeSizePopover
