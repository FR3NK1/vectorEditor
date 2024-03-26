import { ActionIcon, Drawer, Pagination, Stack, Text, TextInput } from '@mantine/core'
import { useDebouncedState, useDidUpdate, useDisclosure } from '@mantine/hooks'
import { IconIcons } from '@tabler/icons-react'
import { useState } from 'react'
import { useLazyGetAllVectorImagesQuery } from '../../../entities/VectorImage/api/VectorImageApi'
import VectorImagesGrid from '../../../entities/VectorImage/ui/VectorImagesGrid'

const VectorImagesButton = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [searchValue, setSearchValue] = useDebouncedState('', 300)
  const [page, setPage] = useState(1)
  const [getAllVectorImagesQuery, { data, error }] = useLazyGetAllVectorImagesQuery()

  useDidUpdate(() => {
    getAllVectorImagesQuery({ name: searchValue, page: page })
  }, [searchValue])

  return (
    <>
      <Drawer opened={opened} onClose={close} title='Добавить изображение' size='40%'>
        <Stack>
          <TextInput
            label='Поиск'
            defaultValue={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
          />
          {data && (
            <>
              <Pagination value={page} onChange={setPage} total={data.pagination.lastPage} />
              <VectorImagesGrid data={data.items} />
              <Pagination value={page} onChange={setPage} total={data.pagination.lastPage} />
            </>
          )}
          {error && <Text>Не удалось выполнить поиск</Text>}
        </Stack>
      </Drawer>
      <ActionIcon variant='light' color='orange' aria-label='Icons' size='xl' onClick={open}>
        <IconIcons />
      </ActionIcon>
    </>
  )
}

export default VectorImagesButton
