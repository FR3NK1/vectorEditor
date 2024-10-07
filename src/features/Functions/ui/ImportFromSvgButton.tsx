import { ActionIcon, FileButton } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import { canvasManager } from '../api/CanvasManager'

const ImportFromSvgButton = () => {
  const fileToCanvas = async (file: File) => {
    const svgText = await file.text()
    canvasManager.renderSVG(svgText)
  }

  return (
    <FileButton
      onChange={(event) => {
        if (event) fileToCanvas(event)
      }}
      accept='image/svg+xml'
    >
      {(props) => (
        <ActionIcon {...props} variant='transparent' color='orange'>
          <IconUpload />
        </ActionIcon>
      )}
    </FileButton>
  )
}

export default ImportFromSvgButton
