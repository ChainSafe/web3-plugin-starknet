import { core } from "web3";
import { StarknetPlugin } from "../src";

describe("TemplatePlugin Tests", () => {
  it("should register TemplatePlugin plugin on Web3Context instance", () => {
    const web3Context = new core.Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new StarknetPlugin());
    expect(web3Context.starknet).toBeDefined();
  });
});
