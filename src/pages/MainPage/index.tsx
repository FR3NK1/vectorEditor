import { Flex, Tabs, Text } from '@mantine/core'
import { useState } from 'react'
import DrawWindow from '../../widgets/DrawWindow/DrawWindow'
import FunctionsBar from '../../widgets/FunctionsBar/FunctionsBar'
import Header from '../../widgets/Header/Header'
import HierarchyBar from '../../widgets/HierarchyBar/HierarchyBar'
import PropertiesBar from '../../widgets/PropertiesBar/PropertiesBar'

const MainPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>('Hierarchy')

  return (
    <>
      <Header />
      <Flex h='100%'>
        <FunctionsBar />
        <DrawWindow />
        <Flex direction='column'>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value='Hierarchy'>
                <Text fw={500}>Иерархия</Text>
              </Tabs.Tab>
              <Tabs.Tab value='Properties'>
                <Text fw={500}>Свойства</Text>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='Hierarchy'>
              <HierarchyBar />
            </Tabs.Panel>
            <Tabs.Panel value='Properties'>
              <PropertiesBar />
            </Tabs.Panel>
          </Tabs>
        </Flex>
      </Flex>
    </>
  )
}

export default MainPage
