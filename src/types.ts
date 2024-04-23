import { BlockTags } from "./StarknetRPC";

export type HexString = `0x${string}`;
export type Bytes = Uint8Array | HexString;
export type Numbers = bigint | string | number | HexString;

export type BlockTag = `${BlockTags}`;

export type BlockNumberOrTag =
  | {
      block_hash?: HexString;
      block_number?: number;
    }
  | BlockTag;

export type SIMULATION_FLAG_FOR_ESTIMATE_FEE = "SKIP_VALIDATE";

export type BroadcastedTXN =
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
  request: BroadcastedTXN[];
  simulation_flags?: [SIMULATION_FLAG_FOR_ESTIMATE_FEE] | [];
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
  unit: PRICE_UNIT;
}

export type PRICE_UNIT = "WEI" | "FRI";

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

// Represents a function invocation along with its execution details.
export type FUNCTION_INVOCATION = FUNCTION_CALL & {
  caller_address: string;
  class_hash: string;
  entry_point_type: ENTRY_POINT_TYPE;
  call_type: CALL_TYPE;
  result: string[];
  calls: NESTED_CALL[];
  events: ORDERED_EVENT[];
  messages: ORDERED_MESSAGE[];
  execution_resources: COMPUTATION_RESOURCES;
};

export type COMPUTATION_RESOURCES = {
  steps: number;
  memory_holes?: number;
  range_check_builtin_applications?: number;
  pedersen_builtin_applications?: number;
  poseidon_builtin_applications?: number;
  ec_op_builtin_applications?: number;
  ecdsa_builtin_applications?: number;
  bitwise_builtin_applications?: number;
  keccak_builtin_applications?: number;
  segment_arena_builtin?: number;
};

export type ENTRY_POINT_TYPE = "EXTERNAL" | "L1_HANDLER" | "CONSTRUCTOR";

export type CALL_TYPE = "DELEGATE" | "LIBRARY_CALL" | "CALL";

// Represents a nested function call.
export type NESTED_CALL = FUNCTION_INVOCATION;

// Represents an ordered event alongside its order within the transaction.
export type ORDERED_EVENT = {
  order: number;
  event: EVENT;
};

export type EVENT = {
  from_address: HexString;
} & EVENT_CONTENT;

export type EVENT_CONTENT = {
  keys: HexString[];
  data: HexString[];
};

// Represents an ordered message alongside its order within the transaction.
export type ORDERED_MESSAGE = {
  order: number;
  message: MSG_TO_L1;
};

export type MSG_TO_L1 = {
  from_address: HexString;
  to_address: HexString;
  payload: HexString[];
};

export type FUNCTION_CALL = {
  contract_address: HexString;
  entry_point_selector: HexString;
  calldata: HexString[];
};

export type STATE_DIFF = {
  storage_diffs: CONTRACT_STORAGE_DIFF_ITEM[];
  deprecated_declared_classes: HexString[];
  declared_classes: NEW_CLASSES[];
  deployed_contracts: DEPLOYED_CONTRACT_ITEM[];
  replaced_classes: REPLACED_CLASS[];
  nonces: NONCE_UPDATE[];
};

export type CONTRACT_STORAGE_DIFF_ITEM = {
  // The contract address for which the storage changed (in FELT format)
  address: string;
  // The changes in the storage of the contract
  storage_entries: StorageDiffItem[];
};

export type StorageDiffItem = {
  // The key of the changed value (in FELT format)
  key: string;
  // The new value applied to the given address (in FELT format)
  value: string;
};

export type NEW_CLASSES = {
  class_hash: HexString;
  compiled_class_hash: HexString;
};

export type DEPLOYED_CONTRACT_ITEM = {
  address: HexString;
  class_hash: HexString;
};

export type REPLACED_CLASS = {
  class_hash: HexString;
  contract_address: HexString;
};

export type NONCE_UPDATE = {
  contract_address: HexString;
  nonce: HexString;
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

export type SIERRA_ENTRY_POINT = {
  selector: HexString;
  function_idx: number;
};

export interface ContractClassDeprecated {
  program: string;
  entry_points_by_type: {
    CONSTRUCTOR: DEPRECATED_CAIRO_ENTRY_POINT[];
    EXTERNAL: DEPRECATED_CAIRO_ENTRY_POINT[];
    L1_HANDLER: DEPRECATED_CAIRO_ENTRY_POINT[];
  };
  abi: ContractAbi;
}

export type DEPRECATED_CAIRO_ENTRY_POINT = {
  offset: HexString | number;
  selector: HexString;
};

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

export type L1_HANDLER_TXN = {
  version: "0x0";
  type: "L1_HANDLER";
  nonce: HexString;
} & FUNCTION_CALL;

export type DECLARE_TXN =
  | DECLARE_TXN_V0
  | DECLARE_TXN_V1
  | DECLARE_TXN_V2
  | DECLARE_TXN_V3;

export type DEPLOY_TXN = {
  type: "DEPLOY";
  version: HexString;
  contract_address_salt: HexString;
  constructor_calldata: HexString[];
  class_hash: HexString;
};

export type DECLARE_TXN_V0 = {
  type: "DECLARE";
  sender_address: HexString;
  max_fee: HexString;
  version: "0x0" | "0x100000000000000000000000000000000";
  signature: HexString[];
  class_hash: HexString;
};

export type DECLARE_TXN_V1 = {
  type: "DECLARE";
  sender_address: HexString;
  max_fee: HexString;
  version: "0x1" | "0x100000000000000000000000000000001";
  signature: HexString[];
  nonce: HexString;
  class_hash: HexString;
};

export type DECLARE_TXN_V2 = {
  type: "DECLARE";
  sender_address: HexString;
  compiled_class_hash: HexString;
  max_fee: HexString;
  version: "0x2" | "0x100000000000000000000000000000002";
  signature: HexString[];
  nonce: HexString;
  class_hash: HexString;
};

export type DECLARE_TXN_V3 = {
  type: "DECLARE";
  sender_address: HexString;
  compiled_class_hash: HexString;
  version: "0x3" | "0x100000000000000000000000000000003";
  signature: HexString[];
  nonce: HexString;
  class_hash: HexString;
  resource_bounds: RESOURCE_BOUNDS_MAPPING;
  tip: string;
  paymaster_data: HexString[];
  account_deployment_data: HexString[];
  nonce_data_availability_mode: DA_MODE;
  fee_data_availability_mode: DA_MODE;
};

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
  transaction_hash: HexString;
  actual_fee: FEE_PAYMENT;
  execution_status: TXN_EXECUTION_STATUS;
  finality_status: TXN_FINALITY_STATUS;
  messages_sent: MSG_TO_L1[];
  revert_reason?: string;
  events: EVENT[];
  execution_resources: EXECUTION_RESOURCES;
};

export type TXN_EXECUTION_STATUS = "SUCCEEDED" | "REVERTED";
export type TXN_FINALITY_STATUS = "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";

export type FEE_PAYMENT = {
  amount: HexString;
  unit: PRICE_UNIT;
};

export type EXECUTION_RESOURCES = COMPUTATION_RESOURCES & {
  data_availability: {
    l1_gas: number;
    l1_data_gas: number;
  };
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
  message_hash: HexString;
} & COMMON_RECEIPT_PROPERTIES;

export type TXN_RECEIPT =
  | INVOKE_TXN_RECEIPT
  | L1_HANDLER_TXN_RECEIPT
  | DECLARE_TXN_RECEIPT
  | DEPLOY_TXN_RECEIPT
  | DEPLOY_ACCOUNT_TXN_RECEIPT;

export type BlockWithTxHashes =
  | BLOCK_WITH_TX_HASHES
  | PENDING_BLOCK_WITH_TX_HASHES;

export type BLOCK_WITH_TX_HASHES = { status: BLOCK_STATUS } & BLOCK_HEADER &
  BLOCK_BODY_WITH_TX_HASHES;

export type BLOCK_STATUS =
  | "PENDING"
  | "ACCEPTED_ON_L2"
  | "ACCEPTED_ON_L1"
  | "REJECTED";

export type BLOCK_HEADER = {
  block_hash: HexString;
  parent_hash: HexString;
  block_number: number;
  new_root: HexString;
  timestamp: number;
  sequencer_address: HexString;
  l1_gas_price: RESOURCE_PRICE;
  l1_data_gas_price: RESOURCE_PRICE;
  l1_da_mode: "BLOB" | "CALLDATA";
  starknet_version: string;
};

export type RESOURCE_PRICE = {
  price_in_fri: HexString;
  price_in_wei: HexString;
};

export type BLOCK_BODY_WITH_TX_HASHES = {
  transactions: HexString[];
};

export type PENDING_BLOCK_WITH_TX_HASHES = BLOCK_BODY_WITH_TX_HASHES &
  PENDING_BLOCK_HEADER;

export type PENDING_BLOCK_HEADER = {
  parent_hash: HexString;
  timestamp: number;
  sequencer_address: HexString;
  l1_gas_price: RESOURCE_PRICE;
  l1_data_gas_price: RESOURCE_PRICE;
  l1_da_mode: "BLOB" | "CALLDATA";
  starknet_version: string;
};
