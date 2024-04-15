import { core } from "web3";
import { StarknetRPCMethods } from "./enums";

export function call(requestManager: core.Web3RequestManager<{}>): Object {
  return requestManager.send({
    method: StarknetRPCMethods.call,
    params: [],
  });
}

export function estimateFee(
  requestManager: core.Web3RequestManager<{}>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.estimateFee,
    params: [],
  });
}

export function estimateMessageFee(
  requestManager: core.Web3RequestManager<{}>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.estimateMessageFee,
    params: [],
  });
}

export function simulateTransactions(
  requestManager: core.Web3RequestManager<{}>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.simulateTransactions,
    params: [],
  });
}

export function traceBlockTransactions(
  requestManager: core.Web3RequestManager<{}>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.traceBlockTransactions,
    params: [],
  });
}

export function getClassAt(
  requestManager: core.Web3RequestManager<{}>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getClassAt,
    params: [],
  });
}

export function getClassHashAt(
  requestManager: core.Web3RequestManager<{}>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getClassHashAt,
    params: [],
  });
}

export function getNonce(requestManager: core.Web3RequestManager<{}>): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getNonce,
    params: [],
  });
}

export function getTransactionByHash(
  requestManager: core.Web3RequestManager<{}>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getTransactionByHash,
    params: [],
  });
}

export function getTransactionByBlockIdAndIndex(
  requestManager: core.Web3RequestManager<{}>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getTransactionByBlockIdAndIndex,
    params: [],
  });
}

export function getStorageAt(
  requestManager: core.Web3RequestManager<{}>
): Object {
  return requestManager.send({
    method: StarknetRPCMethods.getStorageAt,
    params: [],
  });
}
