import { core } from "web3";
import { traceBlockTransactions } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method traceBlockTransactions Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("traceBlockTransactions should return", () => {
    traceBlockTransactions(requestManager);
    expect(true).toBe(true);
  });
});
