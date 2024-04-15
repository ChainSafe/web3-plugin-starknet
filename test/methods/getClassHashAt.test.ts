import { core } from "web3";
import { getClassHashAt } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method getClassHashAt Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager: core.Web3RequestManager<StarknetRpcApi> = {
    send: requestManagerSend,
  };

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getClassHashAt should return", () => {
    getClassHashAt(requestManager);
    expect(true).toBe(true);
  });
});
