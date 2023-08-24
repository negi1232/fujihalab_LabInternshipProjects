import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useTokenTransfer } from "../hooks/useTokenTransfer";
import { useAccount } from "wagmi";
import { Button } from "@chakra-ui/react";
import {
  Spinner,
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useMounted } from "../hooks/useMounted";
import { useLoading } from "../hooks/useLoading";

import { PastTransactions } from "../components/PastTransactions";

const IndexPage: NextPage = () => {
  const account = useAccount();
  const balance = useTokenBalance(account.address);
  const mounted = useMounted();
  const { isLoading } = useLoading();
  const [amount, setAmount] = useState<number>(0);
  const [to, setTo] = useState<string>("");
  const { transferToken } = useTokenTransfer();

  const handleTransfer = () => {
    const from = account.address; // 送信元アドレスを指定
    transferToken(account.address, from, to, amount * 10 ** 18);
  }
  const handleAmountChange = (valueAsString: string, valueAsNumber: number) => {
    setAmount(valueAsNumber); // 値の変更を保存
  };

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };

  if (mounted) {
    return (
      <div>
        <div>アカウント: {account.address}</div>
        <div>残高: {balance}</div>
        <div>送金</div>
        <Flex>
          <Input placeholder='to' className="walletaddress" onChange={handleToChange} />
          <NumberInput value={amount} min={0} max={1000} onChange={handleAmountChange}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button onClick={handleTransfer}>送金</Button>
        </Flex>
        <PastTransactions />
        {isLoading ? (
          <Spinner />
        ) : (
          <></>
        )}
      </div >
    );
  }
  return <div>loading...</div>
};

export default IndexPage;
