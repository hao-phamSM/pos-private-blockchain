#!/bin/bash
geth --datadir=gethdata init ./execution/genesis.json

geth --datadir=gethdata account import --password ./execution/password.txt ./execution/secret.txt

geth --http --http.api eth,net,web3,admin \
    --http.addr 0.0.0.0 --http.corsdomain="*" --http.vhosts="*" \
    --networkid 123456 \
    --ws --ws.api eth,net,web3,admin \
    --ws.addr 0.0.0.0 --ws.origins="*" \
    --authrpc.jwtsecret jwt.hex \
    --authrpc.addr=0.0.0.0 --authrpc.vhosts="*" \
    --datadir gethdata \
    --syncmode full \
    --allow-insecure-unlock \
    --unlock "0x123463a4b065722e99115d6c222f267d9cabb524" \
    --password ./execution/password.txt \
    --nat=extip:$PUBLIC_IP \
    --bootnodes $(geth --exec "admin.nodeInfo.enode" attach http://10.5.0.5:8545 | grep -o 'enode://[^ "]*') \
    --netrestrict 10.5.0.0/16 2>&1 | tee geth.log &

beacon-chain --accept-terms-of-use \
    --datadir beacondata \
    --min-sync-peers 1 \
    --genesis-state ./consensus/genesis.ssz \
    --rpc-host 0.0.0.0 \
    --grpc-gateway-host 0.0.0.0 \
    --bootstrap-node $(curl -s 10.5.0.5:8080/p2p | grep -o 'enr[^ ,]*') \
    --chain-config-file ./consensus/config.yml \
    --contract-deployment-block 0 \
    --deposit-contract 0x00000000219ab540356cbb839cbe05303d7705fa \
    --chain-id 123456 \
    --jwt-secret jwt.hex \
    --minimum-peers-per-subnet 0 \
    --enable-debug-rpc-endpoints \
    --monitoring-host 0.0.0.0 \
    --execution-endpoint gethdata/geth.ipc 2>&1 | tee beacon-chain.log &

validator --accept-terms-of-use \
    --datadir validatordata \
    --beacon-rpc-provider 127.0.0.1:4000 \
    --interop-num-validators 64 \
    --chain-config-file ./consensus/config.yml \
    --interop-num-validators 64 2>&1 | tee validator.log
