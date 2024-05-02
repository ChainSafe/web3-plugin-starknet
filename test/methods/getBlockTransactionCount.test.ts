import { core } from "web3";
import { getBlockTransactionCount } from "../../src/methods";
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
    requestManagerSend.mockResolvedValue(0);

    const count = await getBlockTransactionCount(requestManager, "latest");
    expect(count).toBe(0);
  });
});
