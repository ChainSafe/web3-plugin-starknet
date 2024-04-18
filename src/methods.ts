import { core } from "web3";
import { StarknetRpcApi, StarknetRPCMethods } from "./StarknetRPC";
import {
  BlockNumberOrTag,
  CallRequest,
  EstimateFeeRequest,
  EstimateFeeResponse,
  HexString,
} from "./types";

export async function call(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  transaction: CallRequest,
  blockNumber: BlockNumberOrTag
): Promise<HexString[]> {
  return requestManager.send({
    method: StarknetRPCMethods.call,
    params: [transaction, blockNumber],
  });
}

export async function estimateFee(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  request: EstimateFeeRequest,
  blockNumber: BlockNumberOrTag
): Promise<EstimateFeeResponse[]> {
  return requestManager.send({
    method: StarknetRPCMethods.estimateFee,
    params: [request, blockNumber],
  });
}

export function estimateMessageFee(
  requestManager: core.Web3RequestManager<StarknetRpcApi>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.estimateMessageFee,
    params: [],
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

export function traceBlockTransactions(
  requestManager: core.Web3RequestManager<StarknetRpcApi>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.traceBlockTransactions,
    params: [],
  });
}

export function getClassAt(
  requestManager: core.Web3RequestManager<StarknetRpcApi>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getClassAt,
    params: [],
  });
}

export function getClassHashAt(
  requestManager: core.Web3RequestManager<StarknetRpcApi>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getClassHashAt,
    params: [],
  });
}

export async function getNonce(
  requestManager: core.Web3RequestManager<StarknetRpcApi>,
  blockNumber: BlockNumberOrTag,
  address: HexString
): Promise<HexString> {
  return requestManager.send({
    method: StarknetRPCMethods.getNonce,
    params: [blockNumber, address],
  });
}

export function getTransactionByHash(
  requestManager: core.Web3RequestManager<StarknetRpcApi>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getTransactionByHash,
    params: [],
  });
}

export function getTransactionByBlockIdAndIndex(
  requestManager: core.Web3RequestManager<StarknetRpcApi>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getTransactionByBlockIdAndIndex,
    params: [],
  });
}

export function getStorageAt(
  requestManager: core.Web3RequestManager<StarknetRpcApi>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getStorageAt,
    params: [],
  });
}
