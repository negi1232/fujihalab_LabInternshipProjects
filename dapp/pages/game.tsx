import { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Heading, Text } from '@chakra-ui/react';
const Game = () => {
    const [number, setNumber] = useState<number>(0);
    const [consecutiveWins, setConsecutiveWins] = useState<number>(0);
    const [guess, setGuess] = useState<'high' | 'low' | null>(null);
    const [result, setResult] = useState<string | null>(null);

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1; // 1 to 100
    }

    const checkGuess = (g: 'high' | 'low') => {
        setGuess(g);
        const newNumber = generateRandomNumber();
        console.log(number, newNumber);
        if ((g === 'high' && newNumber > number) || (g === 'low' && newNumber < number)) {
            setResult('You Win!');
            setConsecutiveWins(consecutiveWins + 1);
        } else {
            setResult('You Lose!');
            setConsecutiveWins(0);
        }
        setNumber(generateRandomNumber());
    };

    useEffect(() => {
        setNumber(generateRandomNumber());
    }, []);

    return (
        <Box p={5} rounded="md" boxShadow="lg" maxWidth="400px" margin="0 auto">
            <Heading as="h1" size="lg" textAlign="center" marginBottom={4}>
                High and Low Game
            </Heading>

            <Text fontSize="xl" marginBottom={4} textAlign="center">
                Current Number: {number}
            </Text>

            <ButtonGroup isAttached variant="outline" marginBottom={4} width="100%">
                <Button flex={1} onClick={() => checkGuess('low')} colorScheme='blue'>Low</Button>
                <Button flex={1} onClick={() => checkGuess('high')} colorScheme='red'>High</Button>
            </ButtonGroup>

            <Text fontSize="lg" fontWeight="bold">
                consecutiveWins:{consecutiveWins}
            </Text>

            {result && (
                <Text fontSize="lg" fontWeight="bold">
                    result:{result}
                </Text>
            )}
        </Box>
    );

};

export default Game;