import { core } from "web3";
import { StarknetRpcApi, StarknetRPCMethods } from "./StarknetRPC";
import {
  BlockNumberOrTag,
  BlockWithTxHashes,
  CallRequest,
  EstimateFeeRequest,
  EstimateFeeResponse,
  HexString,
  MSG_FROM_L1,
  TransactionReceipt,
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

export async function getTransactionReceipt(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  transactionHash: HexString
): Promise<TransactionReceipt> {
  return requestManager.send({
    method: StarknetRPCMethods.getTransactionReceipt,
    params: {
      transaction_hash: transactionHash,
    },
  });
}

export async function getBlockTransactionCount(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  blockNumber: BlockNumberOrTag
): Promise<number> {
  return requestManager.send({
    method: StarknetRPCMethods.getBlockTransactionCount,
    params: { block_id: blockNumber },
  });
}

export async function getBlockWithTxHashes(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  blockNumber: BlockNumberOrTag
): Promise<BlockWithTxHashes> {
  return requestManager.send({
    method: StarknetRPCMethods.getBlockWithTxHashes,
    params: { block_id: blockNumber },
  });
}
