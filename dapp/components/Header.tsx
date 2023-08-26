// import {
//   Heading,
//   Box,
//   Flex,
//   Spacer,
//   useColorMode
// } from '@chakra-ui/react'
// import { FC } from 'react'
// import { useRouter } from 'next/router'
// import { Connect } from './Connect'
// import Link from 'next/link'

// interface Props {
//   isExternal?: boolean
// }

// const Header: FC<Props> = ({ isExternal = false }) => {
//   const router = useRouter()
//   const { colorMode, toggleColorMode } = useColorMode()

//   return (
//     <Box p="4">
//       <Flex alignItems="center">
//         <Box p={2}>
//           <Heading size={{ base: 'xs', sm: 'md' }}>
//             <a> Fujihalab internship</a>
//           </Heading>
//         </Box>
//         <Link href="/" passHref>
//           Wallet
//         </Link>
//         <Spacer />
//         <Link href="/about" passHref>
//           etc
//         </Link>
//         <Spacer />
//         <Connect />
//       </Flex>
//     </Box>
//   )
// }

// export default Header;
'use client'
import { Connect } from './Connect'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

interface Props {
  children: React.ReactNode
}

const Links = ['', 'about']

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={"/about"}>
      {children}
    </Box>
  )
}

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Fujihalab Internship</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={"/"}>
                Wallet
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={"/about"}>
                about
              </Box>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Connect />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={"/"}>
                Wallet
              </Box>
              <Box
                as="a"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={"/about"}>
                about
              </Box>
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  )
}