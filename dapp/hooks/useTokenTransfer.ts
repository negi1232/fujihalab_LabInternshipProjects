import { useEffect } from 'react';
import { useClient } from './client';
import { useAccount } from "wagmi";
import { useLoading } from './useLoading';
import { useError } from './useError';

export const useTokenTransfer = () => {

    const { startLoading, stopLoading } = useLoading();
    const { setError } = useError();
    const {publicClient, walletClient, tokenContract } = useClient();
    const transferToken = async (account:string,from : string,to: string, amount: number): Promise<void> => {
        
        console.log(
        account as `0x${string}`,
         tokenContract.address as `0x${string}`,
         tokenContract.abi,
         'transfer',
         [to,amount],)
       
        try {
            const {request} = await publicClient.simulateContract({
                account: account as `0x${string}`,
                address: tokenContract.address as `0x${string}`,
                abi: tokenContract.abi,
                functionName: 'transfer',
                args: [to,amount],
            });
            
            let hash=await walletClient.writeContract(request);
            startLoading();
            await publicClient.waitForTransactionReceipt({hash});
            stopLoading();
            
        } catch (error) {
            console.log(error);
            setError();
            stopLoading();

        }
    };

    return { transferToken };
};
