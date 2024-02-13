import { Flex } from '@mantine/core'
import DrawWindow from '../../widgets/DrawWindow/DrawWindow'
import FunctionsBar from '../../widgets/FunctionsBar/FunctionsBar'
import Header from '../../widgets/Header/Header'
import HierarchyBar from '../../widgets/HierarchyBar/HierarchyBar'

const MainPage = () => {
  return (
    <>
      <Header />
      <Flex h='100%'>
        <FunctionsBar />
        <DrawWindow />
        <HierarchyBar />
      </Flex>
    </>
  )
}

export default MainPage
