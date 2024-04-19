import { Web3PluginBase } from "web3";
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
import * as _methods from "./methods";
import { StarknetRpcApi } from "./StarknetRPC";

export class StarknetPlugin extends Web3PluginBase<StarknetRpcApi> {
  public pluginNamespace = "starknet";

  public async call(
    transaction: CallRequest,
    blockNumber: BlockNumberOrTag
  ): Promise<HexString[]> {
    return _methods.call(this.requestManager, transaction, blockNumber);
  }

  public async estimateFee(
    request: EstimateFeeRequest["request"],
    blockNumber: BlockNumberOrTag,
    simulationFlags?: EstimateFeeRequest["simulation_flags"]
  ): Promise<EstimateFeeResponse[]> {
    return _methods.estimateFee(
      this.requestManager,
      request,
      blockNumber,
      simulationFlags
    );
  }

  public async estimateMessageFee(
    message: MSG_FROM_L1,
    blockNumber: BlockNumberOrTag
  ): Promise<EstimateFeeResponse> {
    return _methods.estimateMessageFee(
      this.requestManager,
      message,
      blockNumber
    );
  }

  public simulateTransactions(): Object {
    return _methods.simulateTransactions(this.requestManager);
  }

  public async traceBlockTransactions(
    blockNumber: BlockNumberOrTag
  ): Promise<BlockTransactionsTraces> {
    return _methods.traceBlockTransactions(this.requestManager, blockNumber);
  }

  public async getClassAt(
    address: HexString,
    blockNumber: BlockNumberOrTag
  ): Promise<ContractClass | ContractClassDeprecated> {
    return _methods.getClassAt(this.requestManager, address, blockNumber);
  }

  public async getClassHashAt(
    address: HexString,
    blockNumber: BlockNumberOrTag
  ): Promise<HexString> {
    return _methods.getClassHashAt(this.requestManager, address, blockNumber);
  }

  public async getNonce(
    address: HexString,
    blockNumber: BlockNumberOrTag
  ): Promise<HexString> {
    return _methods.getNonce(this.requestManager, address, blockNumber);
  }

  public async getStorageAt(
    address: HexString,
    key: string,
    blockNumber: BlockNumberOrTag
  ): Promise<HexString> {
    return _methods.getStorageAt(
      this.requestManager,
      address,
      key,
      blockNumber
    );
  }

  public async getTransactionByBlockIdAndIndex(
    index: number,
    blockNumber: BlockNumberOrTag
  ): Promise<TransactionWithHash> {
    return _methods.getTransactionByBlockIdAndIndex(
      this.requestManager,
      index,
      blockNumber
    );
  }

  public async getTransactionByHash(
    transactionHash: HexString
  ): Promise<TransactionWithHash> {
    return _methods.getTransactionByHash(this.requestManager, transactionHash);
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    starknet: StarknetPlugin;
  }
}
