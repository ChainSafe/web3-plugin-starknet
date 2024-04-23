import { core } from "web3";
import { estimateMessageFee } from "../../src/methods";
import { StarknetRpcApi } from "../../src/StarknetRPC";

describe("Method estimateMessageFee Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("estimateMessageFee should return", async () => {
    requestManagerSend.mockResolvedValue({
      gas_consumed: "0x3e9b",
      data_gas_consumed: "0x80",
      gas_price: "0x174876e800",
      data_gas_price: "0x174876e800",
      overall_fee: "0x5bd49e7a27800",
      unit: "WEI",
    });

    const response = await estimateMessageFee(
      requestManager,
      {
        from_address: "0x8359e4b0152ed5a731162d3c7b0d8d56edb165a0",
        to_address:
          "0x709f66d7239035ff9407e08b80929912f8643e7df19b5953f8ac2377280de5",
        entry_point_selector:
          "0xc73f681176fc7b3f9693986fd7b14581e8d540519e27400e88b8713932be01",
        payload: ["0x22c", "0x7b"],
      },
      "latest"
    );
    expect(response.gas_consumed).toBe("0x3e9b");
    expect(response.gas_price).toBe("0x174876e800");
    expect(response.overall_fee).toBe("0x5bd49e7a27800");
    expect(response.unit).toBe("WEI");
  });
});
