import { Flex, Tabs, Text } from '@mantine/core'
import { useState } from 'react'
import DrawWindow from '../../widgets/DrawWindow/DrawWindow'
import FunctionsBar from '../../widgets/FunctionsBar/FunctionsBar'
import PropertiesBar from '../../widgets/PropertiesBar/PropertiesBar'

const MainPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>('Properties')

  return (
    <Flex h='100%'>
      <FunctionsBar />
      <DrawWindow />
      <Flex direction='column'>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value='Properties'>
              <Text fw={500}>Свойства</Text>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='Properties'>
            <PropertiesBar />
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </Flex>
  )
}

export default MainPage
