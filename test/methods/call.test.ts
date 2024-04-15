import { core } from "web3";
import { call } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method ${NAME} Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager: core.Web3RequestManager<StarknetRpcApi> = {
    send: requestManagerSend,
  };

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("${NAME} should return", () => {
    call(requestManager);
    expect(true).toBe(true);
  });
});
