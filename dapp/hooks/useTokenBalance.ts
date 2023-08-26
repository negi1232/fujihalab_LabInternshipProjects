import { useState, useEffect } from 'react';
import { useMounted } from "../hooks/useMounted";
import { useAccount } from "wagmi";
import { useLoading } from './useLoading';
import tokenData from '../contract/token.json'; // JSON ファイルのインポート
import { readContract } from '@wagmi/core'
export const useTokenBalance = (address: string): number => {
    const mounted = useMounted();
    const account = useAccount();
    const {isLoading} = useLoading();
    const [balance, setBalance] = useState<bigint>(BigInt(0));

    useEffect(() => {
        console.log(mounted)
        console.log(address, "useEffect");
        const getBalance = async () => {
            try {
                const data:any = await readContract({
                    address: tokenData.address as `0x${string}`,
                    abi: tokenData.abi,
                    functionName: 'balanceOf',
                    args: [address as `0x${string}`],
                    })
                
                const balanceData = BigInt(data) as bigint;
                setBalance(balanceData);
                console.log(balanceData, [address as `0x${string}`]);
            } catch (error) {
                console.log(error);
                setBalance(BigInt(0));
            }
        };
        getBalance();
    }, [mounted,account,isLoading]);

    return Number(balance)/10**18;
};
