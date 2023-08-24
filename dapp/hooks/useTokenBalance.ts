import { useState, useEffect } from 'react';
import { useClient } from './client';
import { useMounted } from "../hooks/useMounted";
import { useAccount } from "wagmi";
import { useLoading } from './useLoading';
export const useTokenBalance = (address: string): number => {
    const mounted = useMounted();
    const account = useAccount();
    const {isLoading} = useLoading();
    const [balance, setBalance] = useState<bigint>(BigInt(0));
    const {publicClient, walletClient, tokenContract } = useClient();
    useEffect(() => {
        console.log(mounted)
        console.log(address, "useEffect");
        const getBalance = async () => {
            console.log(publicClient,walletClient ,tokenContract )
            try {
                const data: any = await tokenContract.read.balanceOf([address as `0x${string}`]);
                const balanceData = BigInt(data) as bigint;
                setBalance(balanceData);
                console.log(balanceData, [address as `0x${string}`]);
            } catch (error) {
                console.log(error);
            }
        };

        getBalance();
    }, [mounted,account,isLoading]);

    return Number(balance)/10**18;
};
