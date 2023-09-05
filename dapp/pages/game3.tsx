import { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Heading, Text } from '@chakra-ui/react';
import { useGiftToken } from '@/hooks/useGiftToken';
import { useAccount } from "wagmi";
const Game3 = () => {

    const [number, setNumber] = useState<number>(0);
    const { giftToken } = useGiftToken();
    const account = useAccount();
    //ランダムな数値を生成する関数
    function generateRandomNumber() {
        //0から5までのランダムな数値を生成
        setNumber(Math.floor(Math.random() * 6));

    }

    function handleGift() {
        giftToken(account.address as string, number);
    }


    return (
        <Box p={5} rounded="md" boxShadow="lg" maxWidth="400px" margin="0 auto">
            <ButtonGroup isAttached variant="outline" marginBottom={4} width="100%">
                <Button flex={1} onClick={() => generateRandomNumber()} colorScheme='blue'>おみくじを引く</Button>

            </ButtonGroup>

            {number === 5 && <Text fontSize="lg" fontWeight="bold">大吉</Text>}
            {number === 4 && <Text fontSize="lg" fontWeight="bold">中吉</Text>}
            {number === 3 && <Text fontSize="lg" fontWeight="bold">小吉</Text>}
            {number === 2 && <Text fontSize="lg" fontWeight="bold">吉</Text>}
            {number === 1 && <Text fontSize="lg" fontWeight="bold">凶</Text>}
            {number === 0 && <Text fontSize="lg" fontWeight="bold">大凶</Text>}

            <ButtonGroup isAttached variant="outline" marginBottom={4} width="100%">
                <Button flex={1} onClick={() => handleGift()} colorScheme='blue'>受け取る</Button>

            </ButtonGroup>

        </Box>
    );

};

export default Game3;