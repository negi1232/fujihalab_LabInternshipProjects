// types.d.ts (型定義ファイル)
declare module "*.json" {
    const value: any;
    export default value;
  }
  
  interface TokenData {
    address: string;
    name: string;
    abi: any[];
  }
  