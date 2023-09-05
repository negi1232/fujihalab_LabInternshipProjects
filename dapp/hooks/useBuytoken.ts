import { usePublicClient ,useWalletClient} from 'wagmi'
import tokenData from '../contract/token.json';
import { useLoading } from './useLoading';
import { useError } from './useError';
import { useAccount ,useContractWrite} from "wagmi";
import {parseEther} from 'viem'
export const externalFunction = () => {
    const { data: walletClient, isError, isLoading } = useWalletClient();

    const publicClient = usePublicClient();
    const { startLoading, stopLoading } = useLoading();
    const { setError } = useError();
    const account = useAccount();
    const BuyToken = async (amount: number): Promise<void> => {
       
        try {
        
            // const config = await prepareWriteContract({
            //     address: tokenData.address as `0x${string}`,
            //     abi: tokenData.abi,
            //     functionName: 'transfer',
            //     args: [to,amount],
            //   })
            
            //   const { hash } = await writeContract(config)
            // startLoading();
            // await publicClient.waitForTransactionReceipt({hash});
            stopLoading();
            // const {request} = await publicClient.simulateContract({
            //     account: account.address,
            //     address: tokenData.address as `0x${string}`,
            //     abi:tokenData.abi,
            //     functionName: 'receiveEnter',
            //     args: [],
            //     value:parseEther("1"),
            // });

            const res=await walletClient?.writeContract({
                address: tokenData.address as `0x${string}`,
                    abi:tokenData.abi,
                    functionName: 'receiveEnter',
                    args: [],
                    value:parseEther(amount.toString()),
            })

            // startLoading();
            // if (walletClient) {
            //     const hash = await walletClient.writeContract({request});
            //     await publicClient.waitForTransactionReceipt({hash});
            //     stopLoading();
            // }

            
        } catch (error) {
            console.log(error);

            setError();
            stopLoading();
        }
    };

    return { BuyToken };
};
