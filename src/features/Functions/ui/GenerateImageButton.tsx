import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Grid,
  Image,
  Loader,
  LoadingOverlay,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPhotoAi } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useGetImagesByPromptMutation } from '../../../entities/GenerateImage/api/GenerateImageApi'
import { canvasManager } from '../api/CanvasManager'

const GenerateImageButton = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [generateImage, { isLoading }] = useGetImagesByPromptMutation()
  const [prompt, setPrompt] = useState<string>()
  const [image1, setImage1] = useState<string>()
  const [image2, setImage2] = useState<string>()
  const [image3, setImage3] = useState<string>()
  const [image4, setImage4] = useState<string>()

  const generateImages = async (prompt: string) => {
    setImage1(undefined)
    setImage2(undefined)
    setImage3(undefined)
    setImage4(undefined)

    const image1 = await generateImage(prompt)
    const image2 = await generateImage(prompt)
    const image3 = await generateImage(prompt)
    const image4 = await generateImage(prompt)

    if ('data' in image1) setImage1(image1.data.images[0])
    if ('data' in image2) setImage2(image2.data.images[0])
    if ('data' in image3) setImage3(image3.data.images[0])
    if ('data' in image4) setImage4(image4.data.images[0])
  }

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  return (
    <>
      <Drawer opened={opened} onClose={close} title='Генерация объектов' size='40%'>
        <Stack>
          <Textarea
            label='Описание'
            value={prompt}
            onChange={(event) => setPrompt(event.currentTarget.value)}
          />
          <Button
            color='orange'
            onClick={() => {
              if (prompt) generateImages(prompt)
            }}
          >
            Создать
          </Button>

          {isLoading && (
            <Grid>
              <Grid.Col span={6}>
                <LoaderBox />
              </Grid.Col>
              <Grid.Col span={6}>
                <LoaderBox />
              </Grid.Col>
              <Grid.Col span={6}>
                <LoaderBox />
              </Grid.Col>
              <Grid.Col span={6}>
                <LoaderBox />
              </Grid.Col>
            </Grid>
          )}
          {image1 && image2 && image3 && image4 && (
            <Grid>
              <Grid.Col span={6}>
                <Image
                  radius='md'
                  src={`data:image/png;base64, ${image1}`}
                  onClick={(event) => canvasManager.addImage(event.currentTarget)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Image
                  radius='md'
                  src={`data:image/png;base64, ${image2}`}
                  onClick={(event) => canvasManager.addImage(event.currentTarget)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Image
                  radius='md'
                  src={`data:image/png;base64, ${image3}`}
                  onClick={(event) => canvasManager.addImage(event.currentTarget)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Image
                  radius='md'
                  src={`data:image/png;base64, ${image4}`}
                  onClick={(event) => canvasManager.addImage(event.currentTarget)}
                />
              </Grid.Col>
            </Grid>
          )}
        </Stack>
      </Drawer>
      <ActionIcon variant='light' color='orange' aria-label='Icons' size='xl' onClick={open}>
        <IconPhotoAi />
      </ActionIcon>
    </>
  )
}

const LoaderBox = () => {
  return (
    <Box pos='relative' w={'100%'} style={{ aspectRatio: '1/1' }}>
      <Skeleton w={'100%'} h={'100%'} />
      <LoadingOverlay
        visible={true}
        overlayProps={{
          opacity: 0,
        }}
        loaderProps={{
          children: (
            <Stack justify='center' align='center'>
              <Loader />
              <Text>Генерация...</Text>
            </Stack>
          ),
        }}
      />
    </Box>
  )
}

export default GenerateImageButton
