# Web3.js Plugin for Starknet

[Web3.js plugin](https://docs.web3js.org/guides/web3_plugin_guide/) for
[Starknet](https://www.starknet.io/) developers.

## RPC Methods

This plugin exposes the following RPC methods (type definitions can be found in
[src/types.ts](src/types.ts)):

### `starknet_call`

```ts
public async call(
  transaction: CallRequest,
  blockNumber: BlockNumberOrTag
): Promise<HexString[]>
```

### `starknet_estimateFee`

```ts
public async estimateFee(
  request: EstimateFeeRequest["request"],
  blockNumber: BlockNumberOrTag,
  simulationFlags?: EstimateFeeRequest["simulation_flags"]
): Promise<EstimateFeeResponse[]>
```

### `starknet_estimateMessageFee`

```ts
public async estimateMessageFee(
  message: MsgFromL1,
  blockNumber: BlockNumberOrTag
): Promise<EstimateFeeResponse>
```

### `starknet_getNonce`

```ts
public async getNonce(
  address: HexString,
  blockNumber: BlockNumberOrTag
): Promise<HexString>
```

### `starknet_getTransactionByBlockIdAndIndex`

```ts
public async getTransactionByBlockIdAndIndex(
  index: number,
  blockNumber: BlockNumberOrTag
): Promise<TransactionWithHash>
```

### `starknet_getTransactionByHash`

```ts
public async getTransactionByHash(
  transactionHash: HexString
): Promise<TransactionWithHash>
```

### `starknet_getTransactionReceipt`

```ts
public async getTransactionReceipt(
  transactionHash: HexString
): Promise<TransactionReceipt>
```

### `starknet_getBlockTransactionCount`

```ts
public async getBlockTransactionCount(
  blockNumber: BlockNumberOrTag
): Promise<number>
```

## Additional Methods

### `getPendingTransactions`

```ts
public async getPendingTransactions(): Promise<TransactionWithHash[]>
```

## Contributing

[Pull requests](https://github.com/ChainSafe/web3-plugin-starknet/pulls) are
welcome. For major changes, please
[open an issue](https://github.com/ChainSafe/web3-plugin-starknet/issues/new)
first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
