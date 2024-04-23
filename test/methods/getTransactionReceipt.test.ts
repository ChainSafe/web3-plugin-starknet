import { core } from "web3";
import { getTransactionReceipt } from "../../src/methods";
import { StarknetRpcApi } from "../../src/StarknetRPC";

describe("Method getNonce Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getNonce should return", async () => {
    requestManagerSend.mockResolvedValue({
      type: "INVOKE",
      transaction_hash:
        "0x1d5ccf63e227bce4e458ae35efc12792142f992c9e71c7c54d098fd556676b7",
      actual_fee: { unit: "WEI", amount: "0x1f0386630800" },
      messages_sent: [],
      events: [
        {
          from_address:
            "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          keys: [
            "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9",
            "0x4c088e6e339ffc32609c1587fc165b81fe7586537c1763394ead01ee739e60",
            "0x1000",
          ],
          data: ["0x1f0386630800", "0x0"],
        },
      ],
      execution_status: "SUCCEEDED",
      finality_status: "ACCEPTED_ON_L2",
      block_hash:
        "0x263ec7f593550ab4ceb0117c689295f4d06bae0ef12dd81bcade5a30c8f104c",
      block_number: 14,
      execution_resources: {
        steps: 7750,
        memory_holes: 178,
        range_check_builtin_applications: 174,
        pedersen_builtin_applications: 25,
        ec_op_builtin_applications: 3,
        data_availability: { l1_gas: 0, l1_data_gas: 320 },
      },
    });

    const response = await getTransactionReceipt(
      requestManager,
      "0x1d5ccf63e227bce4e458ae35efc12792142f992c9e71c7c54d098fd556676b7"
    );
    expect(response.transaction_hash).toBe(
      "0x1d5ccf63e227bce4e458ae35efc12792142f992c9e71c7c54d098fd556676b7"
    );
    expect(response.execution_status).toBe("SUCCEEDED");
    expect(response.block_hash).toBe(
      "0x263ec7f593550ab4ceb0117c689295f4d06bae0ef12dd81bcade5a30c8f104c"
    );
    expect(Array.isArray(response.events)).toBe(true);
  });
});
