import { Button, Group, PasswordInput, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useAppDispatch } from '../../app/hooks/hooks'
import { useLoginUserMutation } from '../../entities/User/api/UserApi'
import { UserSliceActions } from '../../entities/User/api/UserSlice'
import { ILoginUser } from '../../entities/User/model/ILoginUser'

const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useAppDispatch()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      login: '',
      password: '',
    },

    validate: {
      login: isNotEmpty('Введите логин'),
      password: isNotEmpty('Введите пароль'),
    },
  })

  const getUserInfo = async (values: ILoginUser) => {
    const userInfo = await loginUser(values)
    if ('data' in userInfo) {
      dispatch(UserSliceActions.setUser({ userId: userInfo.data.id, userName: userInfo.data.name }))
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => getUserInfo(values))}>
      <TextInput
        withAsterisk
        label='Логин'
        key={form.key('login')}
        {...form.getInputProps('login')}
      />
      <PasswordInput
        withAsterisk
        label='Пароль'
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      <Group justify='flex-end'>
        <Button type='submit' loading={isLoading}>
          Войти
        </Button>
      </Group>
    </form>
  )
}

export default LoginForm
