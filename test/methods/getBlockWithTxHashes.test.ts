import { core } from "web3";
import { getBlockWithTxHashes } from "../../src/methods";
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
      status: "ACCEPTED_ON_L2",
      block_hash:
        "0x7d8822ce6ed27cd7355d7c133f408beb5f77fc237bd052a36644129259e2f19",
      parent_hash:
        "0x62b578798f7b42696634ed212fb680b464dceb7293ab1c3587001b37dab2360",
      block_number: 62,
      sequencer_address: "0x1000",
      new_root: "0x0",
      timestamp: 1713875894,
      starknet_version: "0.13.1.1",
      l1_gas_price: {
        price_in_fri: "0x174876e800",
        price_in_wei: "0x174876e800",
      },
      l1_data_gas_price: {
        price_in_fri: "0x174876e800",
        price_in_wei: "0x174876e800",
      },
      l1_da_mode: "BLOB",
      transactions: [
        "0x7d4dbe745689d9239c82c1d063d3332e2b2a4d56258cb91482b34f270630026",
      ],
    });

    const response = await getBlockWithTxHashes(requestManager, "latest");
    expect(response.parent_hash).toBe(
      "0x62b578798f7b42696634ed212fb680b464dceb7293ab1c3587001b37dab2360"
    );
    expect(Array.isArray(response.transactions)).toBe(true);
    expect(response.transactions[0]).toBe(
      "0x7d4dbe745689d9239c82c1d063d3332e2b2a4d56258cb91482b34f270630026"
    );
  });
});
