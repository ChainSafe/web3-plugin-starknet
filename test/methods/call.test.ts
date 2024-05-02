import { core } from "web3";
import { call } from "../../src/methods";
import { StarknetRpcApi } from "../../src/StarknetRPC";

describe("Method call Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("call should return", async () => {
    requestManagerSend.mockResolvedValue(["0x1158e460913d00000", "0x0"]);

    const response = await call(
      requestManager,
      {
        contract_address:
          "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
        entry_point_selector:
          "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
        calldata: [
          "0x2d123cb1cc6cee6aada5d34283a509acbf495f94b99cf120494d34384b98d36",
        ],
      },
      "latest"
    );
    expect(response[0]).toBe("0x1158e460913d00000");
    expect(response[1]).toBe("0x0");
  });
});
