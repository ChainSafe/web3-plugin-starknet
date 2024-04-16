import { core } from "web3";
import { call } from "../../src/methods";
import { StarknetRpcApi } from "../../src/types";

describe("Method ${NAME} Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("${NAME} should return", () => {
    call(requestManager);
    expect(true).toBe(true);
  });
});
