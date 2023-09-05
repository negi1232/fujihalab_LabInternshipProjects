import { useLoading } from './useLoading';
import { useError } from './useError';
import tokenData from '../contract/token.json'; // JSON ファイルのインポート
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { usePublicClient ,useWalletClient} from 'wagmi'

export const useGiftToken = () => {

    const { startLoading, stopLoading } = useLoading();
    const { setError } = useError();
    const publicClient = usePublicClient();
    const { data: walletClient, isError, isLoading } = useWalletClient()
   
    const giftToken = async (account:string, amount: number): Promise<void> => {
       
        try {
            const {request} = await publicClient.simulateContract({
                account: account as `0x${string}`,
                address: tokenData.address as `0x${string}`,
                abi: tokenData.abi,
                functionName: 'gitToken',
                args: [amount],
            });

            startLoading();
            if (walletClient) {
                const hash = await walletClient.writeContract(request);
                await publicClient.waitForTransactionReceipt({hash});
                stopLoading();
            }
            
        } catch (error) {
            console.log(error);

            setError();
            stopLoading();
        }
    };

    return { giftToken };
};
