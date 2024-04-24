import { core } from "web3";
import { getTransactionByBlockIdAndIndex } from "../../src/methods";
import { StarknetRpcApi } from "../../src/StarknetRPC";

describe("Method getTransactionByBlockIdAndIndex Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<StarknetRpcApi>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getTransactionByBlockIdAndIndex should return", async () => {
    requestManagerSend.mockResolvedValue({
      transaction_hash:
        "0x92c1c3b8b0c99ffacf0acb5fa71c6725e3c22c6490ec5f9d1a0c510213e93d",
      type: "INVOKE",
      max_fee: "0x2126ad4d5400",
      version: "0x1",
      signature: [
        "0x27a21d578d963ad46610809cf163f1ec49bae0ae2bdc2915af34fc95f946740",
        "0x665e32202ac124103d0d921367a9ff82f731ee3d7cfcb2e07d10e95863976f",
      ],
      nonce: "0x8",
      sender_address:
        "0x9ccea7a00cf70b223a86db934073ca1df2f78592d716d853992f0588ae580b",
      calldata: [
        "0x1",
        "0x41a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf",
        "0x1987cbd17808b9a23693d4de7e246a443cfe37e6e7fbaeabd7d7e6532b07c3d",
        "0x4",
        "0x2cbe2e8145b35db6fbb61a8697385f81f16b8fb294b2d88ec7400bfc7edcbda",
        "0x476d0fb5e42d202145f0a5c74285a8381c22358ae7704ad64fdf46d2994dcb0",
        "0x1",
        "0x0",
      ],
    });

    const response = await getTransactionByBlockIdAndIndex(
      requestManager,
      0,
      "latest"
    );
    expect(response.transaction_hash).toBe(
      "0x92c1c3b8b0c99ffacf0acb5fa71c6725e3c22c6490ec5f9d1a0c510213e93d"
    );
    expect(response.version).toBe("0x1");
  });
});
