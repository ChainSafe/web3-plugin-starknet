import { Web3PluginBase } from "web3";
import {
  BlockNumberOrTag,
  CallRequest,
  EstimateFeeRequest,
  EstimateFeeResponse,
  HexString,
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
    request: EstimateFeeRequest,
    blockNumber: BlockNumberOrTag
  ): Promise<EstimateFeeResponse[]> {
    return _methods.estimateFee(this.requestManager, request, blockNumber);
  }

  public estimateMessageFee(): Object {
    return _methods.estimateMessageFee(this.requestManager);
  }

  public simulateTransactions(): Object {
    return _methods.simulateTransactions(this.requestManager);
  }

  public traceBlockTransactions(): Object {
    return _methods.traceBlockTransactions(this.requestManager);
  }

  public getClassAt(): Object {
    return _methods.getClassAt(this.requestManager);
  }

  public getClassHashAt(): Object {
    return _methods.getClassHashAt(this.requestManager);
  }

  public async getNonce(
    address: HexString,
    blockNumber: BlockNumberOrTag
  ): Promise<HexString> {
    return _methods.getNonce(this.requestManager, blockNumber, address);
  }

  public getStorageAt(): Object {
    return _methods.getStorageAt(this.requestManager);
  }

  public getTransactionByBlockIdAndIndex(): Object {
    return _methods.getTransactionByBlockIdAndIndex(this.requestManager);
  }

  public getTransactionByHash(): Object {
    return _methods.getTransactionByHash(this.requestManager);
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    starknet: StarknetPlugin;
  }
}
