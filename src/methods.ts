import { core } from "web3";
import { StarknetRpcApi, StarknetRPCMethods } from "./StarknetRPC";
import {
  BlockNumberOrTag,
  BlockTransactionsTraces,
  CallRequest,
  ContractClass,
  ContractClassDeprecated,
  EstimateFeeRequest,
  EstimateFeeResponse,
  HexString,
  MSG_FROM_L1,
  TransactionWithHash,
} from "./types";

export async function call(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  transaction: CallRequest,
  blockNumber: BlockNumberOrTag
): Promise<HexString[]> {
  return requestManager.send({
    method: StarknetRPCMethods.call,
    params: {
      request: transaction,
      block_id: blockNumber,
    },
  });
}

export async function estimateFee(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  request: EstimateFeeRequest["request"],
  blockNumber: BlockNumberOrTag,
  simulationFlags?: EstimateFeeRequest["simulation_flags"]
): Promise<EstimateFeeResponse[]> {
  return requestManager.send({
    method: StarknetRPCMethods.estimateFee,
    params: {
      request,
      simulation_flags: simulationFlags,
      block_id: blockNumber,
    },
  });
}

export async function estimateMessageFee(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  message: MSG_FROM_L1,
  blockNumber: BlockNumberOrTag
): Promise<EstimateFeeResponse> {
  return requestManager.send({
    method: StarknetRPCMethods.estimateMessageFee,
    params: {
      message,
      block_id: blockNumber,
    },
  });
}

export function simulateTransactions(
  requestManager: core.Web3RequestManager<StarknetRpcApi>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.simulateTransactions,
    params: [],
  });
}

export async function traceBlockTransactions(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  blockNumber: BlockNumberOrTag
): Promise<BlockTransactionsTraces> {
  return requestManager.send({
    method: StarknetRPCMethods.traceBlockTransactions,
    params: {
      block_id: blockNumber,
    },
  });
}

export async function getClassAt(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  address: HexString,
  blockNumber: BlockNumberOrTag
): Promise<ContractClass | ContractClassDeprecated> {
  return requestManager.send({
    method: StarknetRPCMethods.getClassAt,
    params: {
      contract_address: blockNumber,
      block_id: address,
    },
  });
}

export async function getClassHashAt(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  address: HexString,
  blockNumber: BlockNumberOrTag
): Promise<HexString> {
  return requestManager.send({
    method: StarknetRPCMethods.getClassHashAt,
    params: {
      contract_address: address,
      block_id: blockNumber,
    },
  });
}

export async function getNonce(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  address: HexString,
  blockNumber: BlockNumberOrTag
): Promise<HexString> {
  return requestManager.send({
    method: StarknetRPCMethods.getNonce,
    params: {
      contract_address: address,
      block_id: blockNumber,
    },
  });
}

export async function getTransactionByHash(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  transactionHash: HexString
): Promise<TransactionWithHash> {
  return requestManager.send({
    method: StarknetRPCMethods.getTransactionByHash,
    params: {
      transaction_hash: transactionHash,
    },
  });
}

export async function getTransactionByBlockIdAndIndex(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  index: number,
  blockNumber: BlockNumberOrTag
): Promise<TransactionWithHash> {
  return requestManager.send({
    method: StarknetRPCMethods.getTransactionByBlockIdAndIndex,
    params: {
      index,
      block_id: blockNumber,
    },
  });
}

export async function getStorageAt(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  address: HexString,
  key: string,
  blockNumber: BlockNumberOrTag
): Promise<HexString> {
  return requestManager.send({
    method: StarknetRPCMethods.getStorageAt,
    params: {
      contract_address: address,
      key: key,
      block_id: blockNumber,
    },
  });
}
