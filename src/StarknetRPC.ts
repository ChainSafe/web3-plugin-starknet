import {
  BlockNumberOrTag,
  BlockTransactionsTraces,
  CallRequest,
  ContractClass,
  ContractClassDeprecated,
  EstimateFeeRequest,
  EstimateFeeResponse,
  EstimateMessageFeeRequest,
  HexString,
  SimulateTransactionRequest,
  SimulateTransactionResponse,
  TransactionWithHash,
} from "./types";

export enum StarknetRPCMethods {
  call = "starknet_call",
  estimateFee = "starknet_estimateFee",
  estimateMessageFee = "starknet_estimateMessageFee",
  simulateTransactions = "starknet_simulateTransactions",
  traceBlockTransactions = "starknet_traceBlockTransactions",
  getClassAt = "starknet_getClassAt",
  getClassHashAt = "starknet_getClassHashAt",
  getNonce = "starknet_getNonce",
  getStorageAt = "starknet_getStorageAt",
  getTransactionByBlockIdAndIndex = "starknet_getTransactionByBlockIdAndIndex",
  getTransactionByHash = "starknet_getTransactionByHash",
}

export type StarknetRpcApi = {
  [StarknetRPCMethods.call]: (
    transaction: CallRequest,
    blockNumber: BlockNumberOrTag
  ) => HexString[];

  [StarknetRPCMethods.estimateFee]: (
    request: EstimateFeeRequest,
    blockNumber: BlockNumberOrTag
  ) => EstimateFeeResponse[];

  [StarknetRPCMethods.estimateMessageFee]: (
    request: EstimateMessageFeeRequest,
    blockNumber: BlockNumberOrTag
  ) => EstimateFeeResponse;

  // TODO - Refactor and fix, this is complicated for first run!
  [StarknetRPCMethods.simulateTransactions]: (
    transaction: SimulateTransactionRequest[],
    blockNumber: BlockNumberOrTag
  ) => SimulateTransactionResponse[];

  // TODO - validate if this is missing "starknet_traceTransaction"
  [StarknetRPCMethods.traceBlockTransactions]: (
    blockNumber: BlockNumberOrTag
  ) => BlockTransactionsTraces;

  [StarknetRPCMethods.getClassAt]: (
    address: HexString,
    blockNumber: BlockNumberOrTag
  ) => ContractClass | ContractClassDeprecated;

  [StarknetRPCMethods.getClassHashAt]: (
    address: HexString,
    blockNumber: BlockNumberOrTag
  ) => HexString;

  [StarknetRPCMethods.getNonce]: (
    blockNumber: BlockNumberOrTag,
    address: HexString
  ) => HexString;

  [StarknetRPCMethods.getStorageAt]: (
    address: HexString,
    key: string,
    blockNumber: BlockNumberOrTag
  ) => HexString;

  [StarknetRPCMethods.getTransactionByBlockIdAndIndex]: (
    index: number,
    blockNumber: BlockNumberOrTag
  ) => TransactionWithHash;

  [StarknetRPCMethods.getTransactionByHash]: (
    transaction_hash: HexString
  ) => TransactionWithHash;
};
