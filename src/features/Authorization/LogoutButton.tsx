import { Button } from '@mantine/core'
import { useAppDispatch } from '../../app/hooks/hooks'
import { UserSliceActions } from '../../entities/User/api/UserSlice'

const LogoutButton = () => {
  const disatch = useAppDispatch()
  return (
    <Button onClick={() => disatch(UserSliceActions.setUser({ userId: null, userName: null }))}>
      Выйти
    </Button>
  )
}

export default LogoutButton
