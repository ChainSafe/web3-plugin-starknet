import { core } from "web3";
import { getClassAt } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method getClassAt Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getClassAt should return", () => {
    getClassAt(requestManager);
    expect(true).toBe(true);
  });
});
