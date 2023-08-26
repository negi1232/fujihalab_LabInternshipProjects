import { usePastTransactions } from '../hooks/usePastTransactions';
import { useAccount } from 'wagmi';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

import { Box, Heading } from '@chakra-ui/react';

export function PastTransactions() {
    const pastTransactions = usePastTransactions(); // account.address が undefined の場合も考慮

    console.log(pastTransactions);
    return (
        <Box>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th>From</Th>
                            <Th>To</Th>
                            <Th isNumeric>value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {pastTransactions.map((tx, index) => (

                            <Tr key={index}>
                                <Td>{tx.from.slice(0, 6) + "..." + tx.from.slice(36, 43)}</Td>
                                <Td>{tx.to.slice(0, 6) + "..." + tx.to.slice(36, 43)}</Td>
                                <Td isNumeric>{Number(tx.value) / 10 ** 18}Fuji</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>


        </Box>
    )
}

