import { core } from "web3";
import { estimateMessageFee } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method estimateMessageFee Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("estimateMessageFee should return", () => {
    estimateMessageFee(requestManager);
    expect(true).toBe(true);
  });
});
