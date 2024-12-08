import { Button, Group, PasswordInput, Space, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useAppDispatch } from '../../app/hooks/hooks'
import { useRegisterUserMutation } from '../../entities/User/api/UserApi'
import { UserSliceActions } from '../../entities/User/api/UserSlice'
import { IRegisterUser } from '../../entities/User/model/IRegisterUser'

const RegisterForm = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const dispatch = useAppDispatch()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      login: '',
      password: '',
    },

    validate: {
      name: isNotEmpty('Введите имя'),
      login: isNotEmpty('Введите логин'),
      password: isNotEmpty('Введите пароль'),
    },
  })

  const getUserInfo = async (values: IRegisterUser) => {
    const userInfo = await registerUser(values)
    if ('data' in userInfo) {
      dispatch(UserSliceActions.setUser({ userId: userInfo.data.id, userName: userInfo.data.name }))
    }
    if ('error' in userInfo) {
      form.setFieldError('login', 'Такой логин уже занят')
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => getUserInfo(values))}>
      <TextInput withAsterisk label='Имя' key={form.key('name')} {...form.getInputProps('name')} />
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
      <Space h={'sm'} />
      <Group justify='flex-end'>
        <Button type='submit' loading={isLoading}>
          Войти
        </Button>
      </Group>
    </form>
  )
}

export default RegisterForm
