import { Card, Tabs, Text } from '@mantine/core'
import { useState } from 'react'
import AIChangeShapeColor from '../AIChangeShapeColor/AIChangeShapeColor'
import ChangeShapeFill from './ChangeShapeFill'
import ChangeShapeGradient from './ChangeShapeGradient'

const ChangeShapeColor = () => {
  const [activeTab, setActiveTab] = useState<string | null>('Fill')

  return (
    <Card withBorder shadow='sm' radius='md'>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Card.Section>
          <Tabs.List>
            <Tabs.Tab value='Fill'>
              <Text fw={500}>Заливка</Text>
            </Tabs.Tab>
            <Tabs.Tab value='AIFill'>
              <Text fw={500}>AI перекраска</Text>
            </Tabs.Tab>
            <Tabs.Tab value='Gradient'>
              <Text fw={500}>Градиент</Text>
            </Tabs.Tab>
          </Tabs.List>
        </Card.Section>
        <Card.Section mt='sm' inheritPadding>
          <Tabs.Panel value='Fill'>
            <ChangeShapeFill />
          </Tabs.Panel>
          <Tabs.Panel value='AIFill'>
            <AIChangeShapeColor />
          </Tabs.Panel>
          <Tabs.Panel value='Gradient'>
            <ChangeShapeGradient />
          </Tabs.Panel>
        </Card.Section>
      </Tabs>
    </Card>
  )
}

export default ChangeShapeColor
