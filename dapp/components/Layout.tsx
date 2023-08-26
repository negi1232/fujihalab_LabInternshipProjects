import { ReactElement, ReactNode } from 'react'
import { Box, Container, useToast } from '@chakra-ui/react'
import Header from '../components/Header'
interface Props {
  children: ReactElement | ReactNode
  isLoading?: boolean
  isError?: boolean
}

const Layout: React.FC<Props> = ({
  children,
  isLoading,
  isError,
}) => {
  const toast = useToast()
  return (
    <>
      <Header />
      <Box minH="60vh">
        <Container maxW="container.md" mt="3em">
          {children}
        </Container>
      </Box>
    </>
  )
}

export default Layout