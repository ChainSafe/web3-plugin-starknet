import { StarknetRPCMethods } from "./enums";

export type StarknetRpcApi = {
  [StarknetRPCMethods.call]: (
    transaction: CallRequest,
    blockNumber: BlockNumberOrTag
  ) => HexString[];

  [StarknetRPCMethods.estimateFee]: (
    request: EstimateFeeRequest,
    blockNumber: BlockNumberOrTag
  ) => EstimateFeeResponse[];

  [StarknetRPCMethods.estimateMessageFee]: (
    request: EstimateMessageFeeRequest,
    blockNumber: BlockNumberOrTag
  ) => EstimateFeeResponse;

  // TODO - Refactor and fix, this is complicated for first run!
  [StarknetRPCMethods.simulateTransactions]: (
    transaction: SimulateTransactionRequest[],
    blockNumber: BlockNumberOrTag
  ) => SimulateTransactionResponse[];

  // TODO - validate if this is missing "starknet_traceTransaction"
  [StarknetRPCMethods.traceBlockTransactions]: () => Object;

  [StarknetRPCMethods.getClassAt]: (
    address: HexString,
    blockNumber: BlockNumberOrTag
  ) => ContractClass | ContractClassDeprecated;

  [StarknetRPCMethods.getClassHashAt]: (
    address: HexString,
    blockNumber: BlockNumberOrTag
  ) => HexString;

  [StarknetRPCMethods.getNonce]: (
    blockNumber: BlockNumberOrTag,
    address: HexString
  ) => HexString;

  [StarknetRPCMethods.getStorageAt]: (
    address: HexString,
    key: string,
    blockNumber: BlockNumberOrTag
  ) => HexString;

  [StarknetRPCMethods.getTransactionByBlockIdAndIndex]: (
    index: number,
    blockNumber: BlockNumberOrTag
  ) => TransactionWithHash;

  [StarknetRPCMethods.getTransactionByHash]: (
    transaction_hash: HexString
  ) => TransactionWithHash;
};

/* Generic */

export type HexString = `0x${string}`;
export type Bytes = Uint8Array | HexString;
export type Numbers = bigint | string | number | HexString;

export enum BlockTags {
  LATEST = "latest",
  PENDING = "pending",
}
export type BlockTag = `${BlockTags}`;

export type BlockNumberOrTag = Numbers | BlockTag;

export type SIMULATION_FLAG_FOR_ESTIMATE_FEE = "SKIP_VALIDATE";

export type BROADCASTED_TXN = "";

/* Call */
export interface CallRequest {
  contract_address: HexString;
  entry_point_selector: HexString;
  calldata: HexString[];
}

/* Estimate Fee & Estimate Message Fee */
export interface EstimateFeeRequest {
  request: BROADCASTED_TXN[];
  simulation_flags?: [SIMULATION_FLAG_FOR_ESTIMATE_FEE] | []; // Diverged from spec (0.5 can't be, 0.6 must be)
  block_id: BlockNumberOrTag;
}

export interface EstimateMessageFeeRequest {
  from_address: HexString;
  to_address: HexString;
  entry_point_selector: HexString;
  payload: HexString[];
}

export interface EstimateFeeResponse {
  gas_consumed: HexString;
  gas_price: HexString;
  overall_fee: HexString;
  unit: "WEI" | "FRI";
}

/* Simulate */
// TODO - BIG FAT REFACTOR!
export interface SimulateTransactionRequest {
  transactions: BROADCASTED_TXN;
  simulation_flags: SIMULATION_FLAG;
}

export interface SimulateTransactionResponse {
  transaction_trace: TRANSACTION_TRACE;
  fee_estimation: EstimateFeeResponse;
}

export type TRANSACTION_TRACE = {
  invoke_tx_trace?: INVOKE_TXN_TRACE;
  declare_tx_trace?: DECLARE_TXN_TRACE;
  deploy_account_tx_trace?: DEPLOY_ACCOUNT_TXN_TRACE;
  l1_handler_tx_trace?: L1_HANDLER_TXN_TRACE;
};

// Represents a transaction trace for an invoke transaction.
export type INVOKE_TXN_TRACE = {
  type: "INVOKE";
  execute_invocation: FUNCTION_INVOCATION | { revert_reason: string };
  validate_invocation?: FUNCTION_INVOCATION;
  fee_transfer_invocation?: FUNCTION_INVOCATION;
  state_diff?: STATE_DIFF;
};

// Represents a transaction trace for a declare transaction.
export type DECLARE_TXN_TRACE = {
  type: "DECLARE";
  validate_invocation?: FUNCTION_INVOCATION;
  fee_transfer_invocation?: FUNCTION_INVOCATION;
  state_diff?: STATE_DIFF;
};

// Represents a transaction trace for a deploy account transaction.
export type DEPLOY_ACCOUNT_TXN_TRACE = {
  type: "DEPLOY_ACCOUNT";
  constructor_invocation: FUNCTION_INVOCATION;
  validate_invocation?: FUNCTION_INVOCATION;
  fee_transfer_invocation?: FUNCTION_INVOCATION;
  state_diff?: STATE_DIFF;
};

// Represents a transaction trace for an L1 handler transaction.
export type L1_HANDLER_TXN_TRACE = {
  type: "L1_HANDLER";
  function_invocation: FUNCTION_INVOCATION;
  state_diff?: STATE_DIFF;
};

type FUNCTION_INVOCATION = "";

export type STATE_DIFF = {
  storage_diffs: CONTRACT_STORAGE_DIFF_ITEM[];
  deprecated_declared_classes: FELT[];
  declared_classes: NEW_CLASSES[];
  deployed_contracts: DEPLOYED_CONTRACT_ITEM[];
  replaced_classes: REPLACED_CLASS[];
  nonces: NONCE_UPDATE[];
};

export type SIMULATION_FLAG = "SKIP_VALIDATE" | "SKIP_FEE_CHARGE";
/*
starknet_simulateTransactions: {
  params: {
    block_id: BLOCK_ID;
    transactions: Array<BROADCASTED_TXN>;
    simulation_flags: Array<SIMULATION_FLAG>;
  };
  result: SimulateTransactionResponse;
*/

/* Class at */
export interface ContractClass {
  sierra_program: HexString[];
  contract_class_version: string;
  entry_points_by_type: {
    CONSTRUCTOR: SIERRA_ENTRY_POINT[];
    EXTERNAL: SIERRA_ENTRY_POINT[];
    L1_HANDLER: SIERRA_ENTRY_POINT[];
  };
  abi: string;
}

export interface ContractClassDeprecated {
  program: string;
  entry_points_by_type: {
    CONSTRUCTOR: DEPRECATED_CAIRO_ENTRY_POINT[];
    EXTERNAL: DEPRECATED_CAIRO_ENTRY_POINT[];
    L1_HANDLER: DEPRECATED_CAIRO_ENTRY_POINT[];
  };
  abi: ContractAbi;
}

export type ContractAbi = readonly ContractAbiEntry[];

export interface ContractAbiEntry {
  selector: HexString;
  input: string;
  output: string;
}

/* Get Transaction */
export type TransactionWithHash = TXN & { transaction_hash: HexString };

export type TXN =
  | INVOKE_TXN
  | L1_HANDLER_TXN
  | DECLARE_TXN
  | DEPLOY_TXN
  | DEPLOY_ACCOUNT_TXN;
