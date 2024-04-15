import { core } from "web3";
import { simulateTransactions } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method simulateTransactions Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager: core.Web3RequestManager<StarknetRpcApi> = {
    send: requestManagerSend,
  };

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("simulateTransactions should return", () => {
    simulateTransactions(requestManager);
    expect(true).toBe(true);
  });
});
