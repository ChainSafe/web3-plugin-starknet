import { core } from "web3";
import { estimateFee } from "../../src/methods";
import { StarknetRpcApi } from "../../src/StarknetRPC";

describe("Method estimateFee Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("estimateFee should return", async () => {
    requestManagerSend.mockResolvedValue([
      {
        gas_consumed: "0x14",
        data_gas_consumed: "0x120",
        gas_price: "0x174876e800",
        data_gas_price: "0x174876e800",
        overall_fee: "0x1c032f0f2000",
        unit: "WEI",
      },
    ]);

    const response = await estimateFee(
      requestManager,
      [
        {
          type: "INVOKE",
          sender_address:
            "0xae0d77cafab54bc8dbb896a399fedc5b614c3d0e89e321f558addc06a8d672",
          calldata: [
            "0x1",
            "0x41a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf",
            "0x1987cbd17808b9a23693d4de7e246a443cfe37e6e7fbaeabd7d7e6532b07c3d",
            "0x5",
            "0x36c7e49a16f8fc760a6fbdf71dde543d98be1fee2eda5daff59a0eeae066ed9",
            "0x13a8ee73111a1564849db46f3d49707f0c11e6c0102255f89373c6435ad71c9",
            "0x1",
            "0x1",
            "0x13a8ee73111a1564849db46f3d49707f0c11e6c0102255f89373c6435ad71c9",
          ],
          version: "0x100000000000000000000000000000001",
          signature: [],
          nonce: "0xe",
          max_fee: "0x0",
        },
      ],
      "latest",
      ["SKIP_VALIDATE"]
    );
    expect(response[0].gas_consumed).toBe("0x3e9b");
    expect(response[0].gas_price).toBe("0x174876e800");
    expect(response[0].overall_fee).toBe("0x5bd49e7a27800");
    expect(response[0].unit).toBe("WEI");
  });
});
