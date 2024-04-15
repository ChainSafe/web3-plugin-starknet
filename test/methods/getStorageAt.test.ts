import { core } from "web3";
import { getStorageAt } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method getStorageAt Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager: core.Web3RequestManager<StarknetRpcApi> = {
    send: requestManagerSend,
  };

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getStorageAt should return", () => {
    getStorageAt(requestManager);
    expect(true).toBe(true);
  });
});
