import { ColorPicker } from '@mantine/core'
import { canvasManager } from '../../../Functions/api/CanvasManager'

const ChangeShapeFill = () => {
  return (
    <ColorPicker
      format='rgba'
      fullWidth
      swatches={[
        '#2e2e2e',
        '#868e96',
        '#fa5252',
        '#e64980',
        '#be4bdb',
        '#7950f2',
        '#4c6ef5',
        '#228be6',
        '#15aabf',
        '#12b886',
        '#40c057',
        '#82c91e',
        '#fab005',
        '#fd7e14',
      ]}
      onChange={(value) => canvasManager.changeSelectionColor(value)}
    />
  )
}

export default ChangeShapeFill
