# Generate consensus's genesis block
./prysmctl testnet generate-genesis \
 --fork capella \
 --num-validators 64 \
 --genesis-time-delay 600 \
 --chain-config-file ./consensus/config.yml \
 --geth-genesis-json-in ./execution/genesis.json  \
 --geth-genesis-json-out ./execution/genesis.json \
 --output-ssz ./consensus/genesis.ssz
