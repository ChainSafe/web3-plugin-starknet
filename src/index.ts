import { Web3PluginBase } from "web3";
import { StarknetRpcApi } from "./types";
import * as _methods from "./methods";

export class StarknetPlugin extends Web3PluginBase<StarknetRpcApi> {
  public pluginNamespace = "starknet";

  public test(param: string): void {
    console.log(param);
  }

  public call(): Object {
    return _methods.call(this.requestManager);
  }

  public estimateFee(): Object {
    return _methods.estimateFee(this.requestManager);
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

  public getNonce(): Object {
    return _methods.getNonce(this.requestManager);
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
