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
