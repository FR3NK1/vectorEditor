import { Card, Group, SegmentedControl, Text } from '@mantine/core'
import { useState } from 'react'
import LoginForm from '../../features/Authorization/LoginForm'
import RegisterForm from '../../features/Authorization/RegisterForm'

const AuthorizationCard = () => {
  const [mode, setMode] = useState('login')

  return (
    <Card withBorder shadow='sm' radius='md'>
      <Card.Section withBorder inheritPadding py='xs'>
        <Group justify='space-between'>
          <Text fw={500}>Войдите в систему</Text>
          <SegmentedControl
            value={mode}
            onChange={setMode}
            data={[
              { label: 'Войти', value: 'login' },
              { label: 'Зарегистрироваться', value: 'register' },
            ]}
          />
        </Group>
      </Card.Section>

      {mode === 'login' && <LoginForm />}
      {mode === 'register' && <RegisterForm />}
    </Card>
  )
}

export default AuthorizationCard
