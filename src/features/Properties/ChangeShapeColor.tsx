import { Card, ColorPicker, Tabs, Text } from '@mantine/core'
import { useState } from 'react'
import { canvasManager } from '../Functions/api/CanvasManager'

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
            <Tabs.Tab value='Gradient'>
              <Text fw={500}>Градиент</Text>
            </Tabs.Tab>
          </Tabs.List>
        </Card.Section>
        <Card.Section mt='sm' inheritPadding>
          <Tabs.Panel value='Fill'>
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
          </Tabs.Panel>
          <Tabs.Panel value='Gradient'>Gradient</Tabs.Panel>
        </Card.Section>
      </Tabs>
    </Card>
  )
}

export default ChangeShapeColor
