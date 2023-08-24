import {
  Heading,
  Box,
  Link,
  Flex,
  Spacer,
  Button,
  Stack,
  useColorMode
} from '@chakra-ui/react'
import { FC } from 'react'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Connect } from './Connect'

interface Props {
  isExternal?: boolean
}

const Header: FC<Props> = ({ isExternal = false }) => {
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box p="4">
      <Flex>
        <Box p={2}>
          <Heading size={{ base: 'xs', sm: 'md' }}>
            <a> Fujihalab internship</a>
          </Heading>
        </Box>
        <Spacer />
        <Connect />
      </Flex>
    </Box>
  )
}

export default Header