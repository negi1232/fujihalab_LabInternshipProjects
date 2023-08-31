import { NextPage } from "next";
import { useState } from "react";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useTokenTransfer } from "../hooks/useTokenTransfer";
import { useAccount } from "wagmi";
import { Button } from "@chakra-ui/react";
import { ImCross } from 'react-icons/im';
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
import { useError } from "../hooks/useError";
import { PastTransactions } from "../components/PastTransactions";
import {
  Alert,
  AlertTitle,
} from '@chakra-ui/react'
import Link from 'next/link'

const IndexPage: NextPage = () => {
  const account = useAccount();
  const balance = useTokenBalance(account.address as string);
  const mounted = useMounted();
  const { isLoading } = useLoading();
  const { isError, unsetError } = useError();
  const [amount, setAmount] = useState<number>(0);
  const [to, setTo] = useState<string>("");

  const { transferToken } = useTokenTransfer();

  const handleTransfer = () => {
    const from = account.address;
    transferToken(account.address as string, from as string, to, amount * 10 ** 18);
  };

  const handleAmountChange = (valueAsString: string, valueAsNumber: number) => {
    setAmount(valueAsNumber);
  };

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };

  const closeAlert = () => {
    unsetError();
  };

  if (mounted) {
    return (
      <div>
        {isLoading && (
          <Alert status='error'>
            <Spinner style={{ marginRight: "10px" }} />
            <AlertTitle>Pending now</AlertTitle>
          </Alert>
        )}

        {isError && (
          <Alert status='error'>
            <AlertTitle>Reject</AlertTitle>
            <Button onClick={closeAlert}><ImCross size={12} /></Button>
          </Alert>
        )}
        <div>アカウント: {account.address}</div>
        <div>残金: {balance}</div>
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

      </div>
    );
  }
  return <div>loading...</div>
};

export default IndexPage;
