import { core } from "web3";
import { estimateFee } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method estimateFee Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("estimateFee should return", () => {
    estimateFee(requestManager);
    expect(true).toBe(true);
  });
});
