import { core } from "web3";
import { getTransactionByBlockIdAndIndex } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method getTransactionByBlockIdAndIndex Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager: core.Web3RequestManager<StarknetRpcApi> = {
    send: requestManagerSend,
  };

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getTransactionByBlockIdAndIndex should return", () => {
    getTransactionByBlockIdAndIndex(requestManager);
    expect(true).toBe(true);
  });
});
