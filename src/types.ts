/* Generic */

export type HexString = `0x${string}`;
export type Bytes = Uint8Array | HexString;
export type Numbers = bigint | string | number | HexString;

export enum BlockTags {
  LATEST = "latest",
  PENDING = "pending",
}
export type BlockTag = `${BlockTags}`;

export type BlockNumberOrTag =
  | {
      block_hash?: HexString;
      block_number?: number;
    }
  | BlockTag;

export type SIMULATION_FLAG_FOR_ESTIMATE_FEE = "SKIP_VALIDATE";

export type BROADCASTED_TXN =
  | BROADCASTED_INVOKE_TXN
  | BROADCASTED_DECLARE_TXN
  | BROADCASTED_DEPLOY_ACCOUNT_TXN;

export type BROADCASTED_INVOKE_TXN = INVOKE_TXN;

export type BROADCASTED_DEPLOY_ACCOUNT_TXN = DEPLOY_ACCOUNT_TXN;

export type BROADCASTED_DECLARE_TXN =
  | BROADCASTED_DECLARE_TXN_V1
  | BROADCASTED_DECLARE_TXN_V2
  | BROADCASTED_DECLARE_TXN_V3;

export type BROADCASTED_DECLARE_TXN_V1 = {
  type: "DECLARE";
  sender_address: HexString;
  max_fee: HexString;
  version: "0x1" | "0x100000000000000000000000000000001";
  signature: HexString[];
  nonce: HexString;
  contract_class: ContractClassDeprecated;
};

export type BROADCASTED_DECLARE_TXN_V2 = {
  type: "DECLARE";
  sender_address: HexString;
  compiled_class_hash: HexString;
  max_fee: HexString;
  version: "0x2" | "0x100000000000000000000000000000002";
  signature: HexString[];
  nonce: HexString;
  contract_class: ContractClass;
};

export type BROADCASTED_DECLARE_TXN_V3 = {
  type: "DECLARE";
  sender_address: HexString;
  compiled_class_hash: HexString;
  version: "0x3" | "0x100000000000000000000000000000003";
  signature: HexString[];
  nonce: HexString;
  contract_class: ContractClass;
  // new...
  resource_bounds: RESOURCE_BOUNDS_MAPPING;
  tip: string;
  paymaster_data: HexString[];
  account_deployment_data: HexString[];
  nonce_data_availability_mode: DA_MODE;
  fee_data_availability_mode: DA_MODE;
};

export type DEPLOY_ACCOUNT_TXN = DEPLOY_ACCOUNT_TXN_V1 | DEPLOY_ACCOUNT_TXN_V3;

export type DEPLOY_ACCOUNT_TXN_V1 = {
  type: "DEPLOY_ACCOUNT";
  max_fee: HexString;
  version: "0x1" | "0x100000000000000000000000000000001";
  signature: HexString[];
  nonce: HexString;
  contract_address_salt: HexString;
  constructor_calldata: HexString[];
  class_hash: HexString;
};

export type DEPLOY_ACCOUNT_TXN_V3 = {
  type: "DEPLOY_ACCOUNT";
  version: "0x3" | "0x100000000000000000000000000000003";
  signature: HexString[];
  nonce: HexString;
  contract_address_salt: HexString;
  constructor_calldata: HexString[];
  class_hash: HexString;
  resource_bounds: RESOURCE_BOUNDS_MAPPING;
  tip: string;
  paymaster_data: HexString[];
  nonce_data_availability_mode: DA_MODE;
  fee_data_availability_mode: DA_MODE;
};

export type INVOKE_TXN = INVOKE_TXN_V0 | INVOKE_TXN_V1 | INVOKE_TXN_V3;

export type INVOKE_TXN_V0 = {
  type: "INVOKE";
  max_fee: HexString;
  version: "0x0" | "0x100000000000000000000000000000000";
  signature: HexString[];
  contract_address: HexString;
  entry_point_selector: HexString;
  calldata: HexString[];
};

export type INVOKE_TXN_V1 = {
  type: "INVOKE";
  sender_address: HexString;
  calldata: HexString[];
  max_fee: HexString;
  version: "0x1" | "0x100000000000000000000000000000001";
  signature: HexString[];
  nonce: HexString;
};

export type INVOKE_TXN_V3 = {
  type: "INVOKE";
  sender_address: HexString;
  calldata: HexString[];
  version: "0x3" | "0x100000000000000000000000000000003";
  signature: HexString[];
  nonce: HexString;
  resource_bounds: RESOURCE_BOUNDS_MAPPING;
  tip: string;
  paymaster_data: HexString[];
  account_deployment_data: HexString[];
  nonce_data_availability_mode: DA_MODE;
  fee_data_availability_mode: DA_MODE;
};

export type DA_MODE = "L1" | "L2";

export type RESOURCE_BOUNDS_MAPPING = {
  l1_gas: RESOURCE_BOUNDS;
  l2_gas: RESOURCE_BOUNDS;
};

export type RESOURCE_BOUNDS = {
  max_amount: string;
  max_price_per_unit: string;
};

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
  deprecated_declared_classes: HexString[];
  declared_classes: NEW_CLASSES[];
  deployed_contracts: DEPLOYED_CONTRACT_ITEM[];
  replaced_classes: REPLACED_CLASS[];
  nonces: NONCE_UPDATE[];
};

export type SIMULATION_FLAG = "SKIP_VALIDATE" | "SKIP_FEE_CHARGE";

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

export type MSG_FROM_L1 = {
  from_address: HexString;
  to_address: HexString;
  entry_point_selector: HexString;
  payload: HexString[];
};

export type TransactionReceipt = TXN_RECEIPT & {
  block_hash?: HexString;
  block_number?: number;
};

export type COMMON_RECEIPT_PROPERTIES = {
  transaction_hash: TXN_HASH;
  actual_fee: FEE_PAYMENT;
  execution_status: TXN_EXECUTION_STATUS;
  finality_status: TXN_FINALITY_STATUS;
  messages_sent: MSG_TO_L1[];
  revert_reason?: string;
  events: EVENT[];
  execution_resources: EXECUTION_RESOURCES;
};

export type INVOKE_TXN_RECEIPT = {
  type: "INVOKE";
} & COMMON_RECEIPT_PROPERTIES;

export type DECLARE_TXN_RECEIPT = {
  type: "DECLARE";
} & COMMON_RECEIPT_PROPERTIES;

export type DEPLOY_ACCOUNT_TXN_RECEIPT = {
  type: "DEPLOY_ACCOUNT";
  contract_address: HexString;
} & COMMON_RECEIPT_PROPERTIES;

export type DEPLOY_TXN_RECEIPT = {
  type: "DEPLOY";
  contract_address: HexString;
} & COMMON_RECEIPT_PROPERTIES;

export type L1_HANDLER_TXN_RECEIPT = {
  type: "L1_HANDLER";
  message_hash: NUM_AS_HEX;
} & COMMON_RECEIPT_PROPERTIES;

export type TXN_RECEIPT =
  | INVOKE_TXN_RECEIPT
  | L1_HANDLER_TXN_RECEIPT
  | DECLARE_TXN_RECEIPT
  | DEPLOY_TXN_RECEIPT
  | DEPLOY_ACCOUNT_TXN_RECEIPT;

export type BlockWithTxHashes = BLOCK_WITH_TX_HASHES | PENDING_BLOCK_WITH_TX_HASHES;
