import React, { useState } from "react";
import { externalFunction } from "../hooks/useBuytoken";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  InputGroup,
  InputLeftAddon ,
  InputRightAddon ,
} from "@chakra-ui/react";

function Buy() {
    const { BuyToken } = externalFunction();
  const [amount, setAmount] = useState<number>(0);
  const [to, setTo] = useState<string>("");
  const handleButtonClick = () => {
    BuyToken(amount);
};

  const handleTransfer = () => {
    // ここでフォームの送信を処理するコードを追加する
    console.log("送金が実行されました");
    console.log("金額: ", amount);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // 数字以外の文字を削除して数字だけを保持
    const numericValue = value.replace(/[^0-9.]/g, "");
    setAmount(parseFloat(numericValue)); // 数値に変換
  };

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };

  return (
    <Container maxW="md">
        

        <FormControl isRequired mt={4}>
        <InputGroup size='sm'>
          <FormLabel>金額</FormLabel>
          <Input
            type="number" 
            value={amount}
            onChange={handleAmountChange} 
            placeholder="金額" 
          />     
          <InputRightAddon children='Eth' />   
          </InputGroup>                     
        </FormControl>
        <Box mt={4}>
          <Button type="submit" colorScheme="blue"onClick={handleButtonClick}>
            送金
        </Button>
        </Box>
      
    </Container> 
  );
}

export default Buy;
