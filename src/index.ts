import { Web3PluginBase } from "web3";

export class StarknetPlugin extends Web3PluginBase {
  public pluginNamespace = "starknet";

  public test(param: string): void {
    console.log(param);
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    template: StarknetPlugin;
  }
}
