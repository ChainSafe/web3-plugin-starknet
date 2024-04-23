import { Web3PluginBase } from "web3";
import {
  BlockNumberOrTag,
  CallRequest,
  EstimateFeeRequest,
  EstimateFeeResponse,
  HexString,
  MSG_FROM_L1,
  TransactionReceipt,
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

  public async getNonce(
    address: HexString,
    blockNumber: BlockNumberOrTag
  ): Promise<HexString> {
    return _methods.getNonce(this.requestManager, address, blockNumber);
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

  public async getTransactionReceipt(
    transactionHash: HexString
  ): Promise<TransactionReceipt> {
    return _methods.getTransactionReceipt(this.requestManager, transactionHash);
  }

  public async getBlockTransactionCount(
    blockNumber: BlockNumberOrTag
  ): Promise<number> {
    return _methods.getBlockTransactionCount(this.requestManager, blockNumber);
  }

  public async getPendingTransactions(): Promise<TransactionWithHash[]> {
    const transactions = await _methods.getBlockWithTxHashes(
      this.requestManager,
      "pending"
    );
    return Promise.all(transactions.map((it) => this.getTransactionByHash(it)));
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    starknet: StarknetPlugin;
  }
}
