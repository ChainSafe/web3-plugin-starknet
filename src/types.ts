import { BlockTags } from "./StarknetRPC";

export type HexString = `0x${string}`;
export type BlockTag = `${BlockTags}`;

export type BlockNumberOrTag =
  | {
      block_hash?: HexString;
      block_number?: number;
    }
  | BlockTag;

export type SimulationFlagForEstimateFee = "SKIP_VALIDATE";

export type BroadcastedTxn =
  | BroadcastedInvokeTxn
  | BroadcastedDeclareTxn
  | BroadcastedDeployAccountTxn;

export type BroadcastedInvokeTxn = InvokeTxn;

export type BroadcastedDeployAccountTxn = DeployAccountTxn;

export type BroadcastedDeclareTxn =
  | BroadcastedDeclareTxnV1
  | BroadcastedDeclareTxnV2
  | BroadcastedDeclareTxnV3;

export type BroadcastedDeclareTxnV1 = {
  type: "DECLARE";
  sender_address: HexString;
  max_fee: HexString;
  version: "0x1" | "0x100000000000000000000000000000001";
  signature: HexString[];
  nonce: HexString;
  contract_class: ContractClassDeprecated;
};

export type BroadcastedDeclareTxnV2 = {
  type: "DECLARE";
  sender_address: HexString;
  compiled_class_hash: HexString;
  max_fee: HexString;
  version: "0x2" | "0x100000000000000000000000000000002";
  signature: HexString[];
  nonce: HexString;
  contract_class: ContractClass;
};

export type BroadcastedDeclareTxnV3 = {
  type: "DECLARE";
  sender_address: HexString;
  compiled_class_hash: HexString;
  version: "0x3" | "0x100000000000000000000000000000003";
  signature: HexString[];
  nonce: HexString;
  contract_class: ContractClass;
  resource_bounds: ResourceBoundsMapping;
  tip: string;
  paymaster_data: HexString[];
  account_deployment_data: HexString[];
  nonce_data_availability_mode: DaMode;
  fee_data_availability_mode: DaMode;
};

export type DeployAccountTxn = DeployAccountTxnV1 | DeployAccountTxnV3;

export type DeployAccountTxnV1 = {
  type: "DEPLOY_ACCOUNT";
  max_fee: HexString;
  version: "0x1" | "0x100000000000000000000000000000001";
  signature: HexString[];
  nonce: HexString;
  contract_address_salt: HexString;
  constructor_calldata: HexString[];
  class_hash: HexString;
};

export type DeployAccountTxnV3 = {
  type: "DEPLOY_ACCOUNT";
  version: "0x3" | "0x100000000000000000000000000000003";
  signature: HexString[];
  nonce: HexString;
  contract_address_salt: HexString;
  constructor_calldata: HexString[];
  class_hash: HexString;
  resource_bounds: ResourceBoundsMapping;
  tip: string;
  paymaster_data: HexString[];
  nonce_data_availability_mode: DaMode;
  fee_data_availability_mode: DaMode;
};

export type InvokeTxn = InvokeTxnV0 | InvokeTxnV1 | InvokeTxnV3;

export type InvokeTxnV0 = {
  type: "INVOKE";
  max_fee: HexString;
  version: "0x0" | "0x100000000000000000000000000000000";
  signature: HexString[];
  contract_address: HexString;
  entry_point_selector: HexString;
  calldata: HexString[];
};

export type InvokeTxnV1 = {
  type: "INVOKE";
  sender_address: HexString;
  calldata: HexString[];
  max_fee: HexString;
  version: "0x1" | "0x100000000000000000000000000000001";
  signature: HexString[];
  nonce: HexString;
};

export type InvokeTxnV3 = {
  type: "INVOKE";
  sender_address: HexString;
  calldata: HexString[];
  version: "0x3" | "0x100000000000000000000000000000003";
  signature: HexString[];
  nonce: HexString;
  resource_bounds: ResourceBoundsMapping;
  tip: string;
  paymaster_data: HexString[];
  account_deployment_data: HexString[];
  nonce_data_availability_mode: DaMode;
  fee_data_availability_mode: DaMode;
};

export type DaMode = "L1" | "L2";

export type ResourceBoundsMapping = {
  l1_gas: ResourceBounds;
  l2_gas: ResourceBounds;
};

export type ResourceBounds = {
  max_amount: string;
  max_price_per_unit: string;
};

export interface CallRequest {
  contract_address: HexString;
  entry_point_selector: HexString;
  calldata: HexString[];
}

export interface EstimateFeeRequest {
  request: BroadcastedTxn[];
  simulation_flags?: [SimulationFlagForEstimateFee] | [];
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
  unit: PriceUnit;
}

export type PriceUnit = "WEI" | "FRI";

export type InvokeTxnTrace = {
  type: "INVOKE";
  execute_invocation: FunctionInvocation | { revert_reason: string };
  validate_invocation?: FunctionInvocation;
  fee_transfer_invocation?: FunctionInvocation;
  state_diff?: StateDiff;
};

export type DeclareTxnTrace = {
  type: "DECLARE";
  validate_invocation?: FunctionInvocation;
  fee_transfer_invocation?: FunctionInvocation;
  state_diff?: StateDiff;
};

export type DeployAccountTxnTrace = {
  type: "DEPLOY_ACCOUNT";
  constructor_invocation: FunctionInvocation;
  validate_invocation?: FunctionInvocation;
  fee_transfer_invocation?: FunctionInvocation;
  state_diff?: StateDiff;
};

export type L1HandlerTxnTrace = {
  type: "L1_HANDLER";
  function_invocation: FunctionInvocation;
  state_diff?: StateDiff;
};

export type FunctionInvocation = FunctionCall & {
  caller_address: string;
  class_hash: string;
  entry_point_type: EntryPointType;
  call_type: CallType;
  result: string[];
  calls: NestedCall[];
  events: OrderedEvent[];
  messages: OrderedMessage[];
  execution_resources: ComputationResources;
};

export type ComputationResources = {
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

export type EntryPointType = "EXTERNAL" | "L1_HANDLER" | "CONSTRUCTOR";
export type CallType = "DELEGATE" | "LIBRARY_CALL" | "CALL";

export type NestedCall = FunctionInvocation;

export type OrderedEvent = {
  order: number;
  event: Event;
};

export type Event = {
  from_address: HexString;
} & EventContent;

export type EventContent = {
  keys: HexString[];
  data: HexString[];
};

export type OrderedMessage = {
  order: number;
  message: MsgToL1;
};

export type MsgToL1 = {
  from_address: HexString;
  to_address: HexString;
  payload: HexString[];
};

export type FunctionCall = {
  contract_address: HexString;
  entry_point_selector: HexString;
  calldata: HexString[];
};

export type StateDiff = {
  storage_diffs: ContractStorageDiffItem[];
  deprecated_declared_classes: HexString[];
  declared_classes: NewClasses[];
  deployed_contracts: DeployedContractItem[];
  replaced_classes: ReplacedClass[];
  nonces: NonceUpdate[];
};

export type ContractStorageDiffItem = {
  address: string;
  storage_entries: StorageDiffItem[];
};

export type StorageDiffItem = {
  key: string;
  value: string;
};

export type NewClasses = {
  class_hash: HexString;
  compiled_class_hash: HexString;
};

export type DeployedContractItem = {
  address: HexString;
  class_hash: HexString;
};

export type ReplacedClass = {
  class_hash: HexString;
  contract_address: HexString;
};

export type NonceUpdate = {
  contract_address: HexString;
  nonce: HexString;
};

export type SimulationFlag = "SKIP_VALIDATE" | "SKIP_FEE_CHARGE";

export interface ContractClass {
  sierra_program: HexString[];
  contract_class_version: string;
  entry_points_by_type: {
    CONSTRUCTOR: SierraEntryPoint[];
    EXTERNAL: SierraEntryPoint[];
    L1_HANDLER: SierraEntryPoint[];
  };
  abi: string;
}

export type SierraEntryPoint = {
  selector: HexString;
  function_idx: number;
};

export interface ContractClassDeprecated {
  program: string;
  entry_points_by_type: {
    CONSTRUCTOR: DeprecatedCairoEntryPoint[];
    EXTERNAL: DeprecatedCairoEntryPoint[];
    L1_HANDLER: DeprecatedCairoEntryPoint[];
  };
  abi: ContractAbi;
}

export type DeprecatedCairoEntryPoint = {
  offset: HexString | number;
  selector: HexString;
};

export type ContractAbi = readonly ContractAbiEntry[];

export interface ContractAbiEntry {
  selector: HexString;
  input: string;
  output: string;
}

export type TransactionWithHash = Txn & { transaction_hash: HexString };

export type Txn =
  | InvokeTxn
  | L1HandlerTxn
  | DeclareTxn
  | DeployTxn
  | DeployAccountTxn;

export type L1HandlerTxn = {
  version: "0x0";
  type: "L1_HANDLER";
  nonce: HexString;
} & FunctionCall;

export type DeclareTxn =
  | DeclareTxnV0
  | DeclareTxnV1
  | DeclareTxnV2
  | DeclareTxnV3;

export type DeployTxn = {
  type: "DEPLOY";
  version: HexString;
  contract_address_salt: HexString;
  constructor_calldata: HexString[];
  class_hash: HexString;
};

export type DeclareTxnV0 = {
  type: "DECLARE";
  sender_address: HexString;
  max_fee: HexString;
  version: "0x0" | "0x100000000000000000000000000000000";
  signature: HexString[];
  class_hash: HexString;
};

export type DeclareTxnV1 = {
  type: "DECLARE";
  sender_address: HexString;
  max_fee: HexString;
  version: "0x1" | "0x100000000000000000000000000000001";
  signature: HexString[];
  nonce: HexString;
  class_hash: HexString;
};

export type DeclareTxnV2 = {
  type: "DECLARE";
  sender_address: HexString;
  compiled_class_hash: HexString;
  max_fee: HexString;
  version: "0x2" | "0x100000000000000000000000000000002";
  signature: HexString[];
  nonce: HexString;
  class_hash: HexString;
};

export type DeclareTxnV3 = {
  type: "DECLARE";
  sender_address: HexString;
  compiled_class_hash: HexString;
  version: "0x3" | "0x100000000000000000000000000000003";
  signature: HexString[];
  nonce: HexString;
  class_hash: HexString;
  resource_bounds: ResourceBoundsMapping;
  tip: string;
  paymaster_data: HexString[];
  account_deployment_data: HexString[];
  nonce_data_availability_mode: DaMode;
  fee_data_availability_mode: DaMode;
};

export type MsgFromL1 = {
  from_address: HexString;
  to_address: HexString;
  entry_point_selector: HexString;
  payload: HexString[];
};

export type TransactionReceipt = TxnReceipt & {
  block_hash?: HexString;
  block_number?: number;
};

export type CommonReceiptProperties = {
  transaction_hash: HexString;
  actual_fee: FeePayment;
  execution_status: TxnExecutionStatus;
  finality_status: TxnFinalityStatus;
  messages_sent: MsgToL1[];
  revert_reason?: string;
  events: Event[];
  execution_resources: ExecutionResources;
};

export type TxnExecutionStatus = "SUCCEEDED" | "REVERTED";
export type TxnFinalityStatus = "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";

export type FeePayment = {
  amount: HexString;
  unit: PriceUnit;
};

export type ExecutionResources = ComputationResources & {
  data_availability: {
    l1_gas: number;
    l1_data_gas: number;
  };
};

export type InvokeTxnReceipt = {
  type: "INVOKE";
} & CommonReceiptProperties;

export type DeclareTxnReceipt = {
  type: "DECLARE";
} & CommonReceiptProperties;

export type DeployAccountTxnReceipt = {
  type: "DEPLOY_ACCOUNT";
  contract_address: HexString;
} & CommonReceiptProperties;

export type DeployTxnReceipt = {
  type: "DEPLOY";
  contract_address: HexString;
} & CommonReceiptProperties;

export type L1HandlerTxnReceipt = {
  type: "L1_HANDLER";
  message_hash: HexString;
} & CommonReceiptProperties;

export type TxnReceipt =
  | InvokeTxnReceipt
  | L1HandlerTxnReceipt
  | DeclareTxnReceipt
  | DeployTxnReceipt
  | DeployAccountTxnReceipt;

export type BlockWithTxHashes =
  | BlockStatusWithTxHashes
  | PendingBlockWithTxHashes;

export type BlockStatusWithTxHashes = { status: BlockStatus } & BlockHeader &
  BlockBodyWithTxHashes;

export type BlockStatus =
  | "PENDING"
  | "ACCEPTED_ON_L2"
  | "ACCEPTED_ON_L1"
  | "REJECTED";

export type BlockHeader = {
  block_hash: HexString;
  parent_hash: HexString;
  block_number: number;
  new_root: HexString;
  timestamp: number;
  sequencer_address: HexString;
  l1_gas_price: ResourcePrice;
  l1_data_gas_price: ResourcePrice;
  l1_da_mode: "BLOB" | "CALLDATA";
  starknet_version: string;
};

export type ResourcePrice = {
  price_in_fri: HexString;
  price_in_wei: HexString;
};

export type BlockBodyWithTxHashes = {
  transactions: HexString[];
};

export type PendingBlockWithTxHashes = BlockBodyWithTxHashes &
  PendingBlockHeader;

export type PendingBlockHeader = {
  parent_hash: HexString;
  timestamp: number;
  sequencer_address: HexString;
  l1_gas_price: ResourcePrice;
  l1_data_gas_price: ResourcePrice;
  l1_da_mode: "BLOB" | "CALLDATA";
  starknet_version: string;
};
