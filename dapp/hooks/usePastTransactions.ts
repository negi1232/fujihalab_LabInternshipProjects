import { useEffect, useState } from 'react';
import { useMounted } from "../hooks/useMounted";
import tokenData from '../contract/token.json'; // JSON ファイルのインポート
import { useBlockNumber } from 'wagmi'
import { usePublicClient } from 'wagmi'
import {parseAbiItem} from 'viem'
import { watchContractEvent } from '@wagmi/core'
interface Transaction {
    from: string;
    to: string;
    value: bigint;
    blockNumber: bigint;
}
const usePastTransactions = (account: string) => {
//   const { publicClient, walletClient } = useClient();
  
  const mounted = useMounted();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const publicClient = usePublicClient();

  const { data, isError, isLoading } = useBlockNumber()
  useEffect(() => {
    
    const fetchPastTransactions = async () => {
        try {
        const blockNumber = data;
        console.log(publicClient);
        console.log(account)

        if(account === undefined){
            return;
        }


        const logs_from = await publicClient.getLogs({
            address: tokenData.address as `0x${string}`,
            event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)"),
            args: {
                from: account as `0x${string}`,
                to: null,
            },
            fromBlock:BigInt(0),
            toBlock: blockNumber,
        });

        const logs_to = await publicClient.getLogs({
            address: tokenData.address as `0x${string}`,
            event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)"),
            args: {
                from: null,
                to: account as `0x${string}`
            },
            fromBlock: BigInt(0),
            toBlock: blockNumber,
        });
        console.log(await publicClient.getBlock() );
        const unwatch = watchContractEvent(
        {
            address: tokenData.address as `0x${string}`,
            abi: tokenData.abi,
            eventName: 'Transfer',
            
        },
        (log:any) => console.log(log),
        )
                //ブロックナンバー順に組み合わせ

        let logs = logs_from.concat(logs_to);

        logs.sort(function (a, b) {
            if (Number(a.blockNumber) > Number(b.blockNumber)) {
                return 1;
            } else {
                return -1;
            }
        });

        console.log(logs);
        setTransactions(logs.map((log) => {
            return {
                from: log.args.from as string,
                to: log.args.to as string,
                value: log.args.value as bigint,
                blockNumber: log.blockNumber as bigint,
            };
        }));
        } catch (error) {
        console.log(error);
            setTransactions([]);
        }

    };

    fetchPastTransactions();
    

  }, [account, mounted]);

  console.log(transactions);
  return transactions;
};

export { usePastTransactions };
