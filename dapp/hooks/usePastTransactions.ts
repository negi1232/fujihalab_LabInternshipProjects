import { useEffect, useState } from 'react';
import { useClient } from './client';
import {parseAbiItem} from 'viem';
import { useMounted } from "../hooks/useMounted";

interface Transaction {
    from: string;
    to: string;
    value: bigint;
    blockNumber: bigint;
}
const usePastTransactions = (account: string) => {
  const { publicClient, walletClient, tokenContract } = useClient();
  const mounted = useMounted();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchPastTransactions = async () => {
        const blockNumber = await publicClient.getBlockNumber();

        const logs_from = await publicClient.getLogs({
            address: tokenContract.address as `0x${string}`,
            event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)"),
            args: {
                from: account as `0x${string}`,
                to: null,
            },
            fromBlock:BigInt(0),
            toBlock: blockNumber,
        });

        const logs_to = await publicClient.getLogs({
            address: tokenContract.address as `0x${string}`,
            event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)"),
            args: {
                from: null,
                to: account as `0x${string}`
            },
            fromBlock: BigInt(0),
            toBlock: blockNumber,
        });

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
                from: log.args.from,
                to: log.args.to,
                value: log.args.value,
                blockNumber: log.blockNumber,
            };
        }));
    };

    if (mounted){
        fetchPastTransactions();
    }

  }, [account, mounted]);

  console.log(transactions);
  return transactions;
};

export { usePastTransactions };
