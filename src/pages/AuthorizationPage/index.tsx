import { BackgroundImage, Flex } from '@mantine/core'
import AuthorizationCard from '../../widgets/Authorization/AuthorizationCard'

const AuthorizationPage = () => {
  return (
    <div className='Page'>
      <BackgroundImage
        src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'
        h={'100%'}
      >
        <Flex h={'100%'} justify='flex-end' align='center' pr={'100px'}>
          <AuthorizationCard />
        </Flex>
      </BackgroundImage>
    </div>
  )
}

export default AuthorizationPage
