import { Button, NumberInput, Popover } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { canvasManager } from '../api/CanvasManager'

const ChangeSizePopover = () => {
  const sizeForm = useForm({
    initialValues: {
      width: 0,
      height: 0,
    },

    validate: {
      width: isNotEmpty('Введите ширину'),
      height: isNotEmpty('Введите высоту'),
    },
  })

  return (
    <Popover
      onChange={() =>
        sizeForm.setValues({
          width: canvasManager.canvas?.width,
          height: canvasManager.canvas?.height,
        })
      }
      width={300}
      trapFocus
      position='bottom'
      withArrow
      shadow='md'
    >
      <Popover.Target>
        <Button onClick={() => console.log(123)}>Размер</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <NumberInput label='Ширина' {...sizeForm.getInputProps('width')} />
        <NumberInput label='Высота' {...sizeForm.getInputProps('height')} />
        <Button
          onClick={() =>
            canvasManager.changeCanvasSize(sizeForm.values.width, sizeForm.values.height)
          }
        >
          Сохранить
        </Button>
      </Popover.Dropdown>
    </Popover>
  )
}

export default ChangeSizePopover
