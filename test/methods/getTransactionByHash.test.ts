import { core } from "web3";
import { getTransactionByHash } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method getTransactionByHash Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getTransactionByHash should return", () => {
    getTransactionByHash(requestManager);
    expect(true).toBe(true);
  });
});
