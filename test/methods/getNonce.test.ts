import { core } from "web3";
import { getNonce } from "../../src/methods";
import { StarknetRpcApi } from "../../src/StarknetRPC";

describe("Method getNonce Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getNonce should return", async () => {
    requestManagerSend.mockResolvedValue("0x0");

    const nonce = await getNonce(
      requestManager,
      "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      "latest"
    );
    expect(nonce).toBe("0x0");
  });
});
