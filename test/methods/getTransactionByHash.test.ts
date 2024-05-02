import { core } from "web3";
import { getTransactionByHash } from "../../src/methods";
import { StarknetRpcApi } from "../../src/StarknetRPC";

describe("Method getTransactionByHash Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getTransactionByHash should return", async () => {
    requestManagerSend.mockResolvedValue({
      transaction_hash:
        "0x5ae8cc4e0b5fad1e96630a55c41ee515c403d0b52dd5462f6774d1abc5116b2",
      type: "INVOKE",
      max_fee: "0x2a04c696b000",
      version: "0x1",
      signature: [
        "0x3b97464137ea73e3daebed9f0646f90ae50f5b7c0284c2567ff14c02e562fc6",
        "0x2b888d429ef5f453dfc61f4344f436fc0baa171e4521c93a093fb54d613d06e",
      ],
      nonce: "0xe",
      sender_address:
        "0x9ccea7a00cf70b223a86db934073ca1df2f78592d716d853992f0588ae580b",
      calldata: [
        "0x1",
        "0x41a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf",
        "0x1987cbd17808b9a23693d4de7e246a443cfe37e6e7fbaeabd7d7e6532b07c3d",
        "0x5",
        "0x36c7e49a16f8fc760a6fbdf71dde543d98be1fee2eda5daff59a0eeae066ed9",
        "0x403c7e1ba066d55306b23e0e1f90b6c2b5d2246fa79041ec72734507da469",
        "0x1",
        "0x1",
        "0x403c7e1ba066d55306b23e0e1f90b6c2b5d2246fa79041ec72734507da469",
      ],
    });

    const response = await getTransactionByHash(
      requestManager,
      "0x5ae8cc4e0b5fad1e96630a55c41ee515c403d0b52dd5462f6774d1abc5116b2"
    );
    expect(response.transaction_hash).toBe(
      "0x5ae8cc4e0b5fad1e96630a55c41ee515c403d0b52dd5462f6774d1abc5116b2"
    );
    expect(response.version).toBe("0x1");
  });
});
