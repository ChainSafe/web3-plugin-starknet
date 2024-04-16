import { StarknetRPCMethods } from "./enums";

export type StarknetRpcApi = {
  [StarknetRPCMethods.call]: () => Object;
  [StarknetRPCMethods.estimateFee]: () => Object;
  [StarknetRPCMethods.estimateMessageFee]: () => Object;
  [StarknetRPCMethods.simulateTransactions]: () => Object;
  [StarknetRPCMethods.traceBlockTransactions]: () => Object;
  [StarknetRPCMethods.getClassAt]: () => Object;
  [StarknetRPCMethods.getClassHashAt]: () => Object;
  [StarknetRPCMethods.getNonce]: () => Object;
  [StarknetRPCMethods.getStorageAt]: () => Object;
  [StarknetRPCMethods.getTransactionByBlockIdAndIndex]: () => Object;
  [StarknetRPCMethods.getTransactionByHash]: () => Object;
};
