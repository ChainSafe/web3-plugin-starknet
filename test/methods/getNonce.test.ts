import { core } from "web3";
import { getNonce } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method getNonce Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager: core.Web3RequestManager<StarknetRpcApi> = {
    send: requestManagerSend,
  };

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getNonce should return", () => {
    getNonce(requestManager);
    expect(true).toBe(true);
  });
});
