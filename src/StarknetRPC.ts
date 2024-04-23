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
  call = "starknet_call", //
  estimateFee = "starknet_estimateFee", //
  estimateMessageFee = "starknet_estimateMessageFee", //
  getNonce = "starknet_getNonce", //
  getTransactionByBlockIdAndIndex = "starknet_getTransactionByBlockIdAndIndex", //
  getTransactionByHash = "starknet_getTransactionByHash", //
  // getTransactionReceipt
  // getBlockTransactionCount
  // pendingTransactions
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

  [StarknetRPCMethods.getNonce]: (
    blockNumber: BlockNumberOrTag,
    address: HexString
  ) => HexString;

  [StarknetRPCMethods.getTransactionByBlockIdAndIndex]: (
    index: number,
    blockNumber: BlockNumberOrTag
  ) => TransactionWithHash;

  [StarknetRPCMethods.getTransactionByHash]: (
    transaction_hash: HexString
  ) => TransactionWithHash;
};
