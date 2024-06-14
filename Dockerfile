FROM ubuntu as builder

RUN apt update && apt-get -y install build-essential unzip curl golang-go git

# Build Geth
RUN git clone https://github.com/ethereum/go-ethereum.git
RUN cd /go-ethereum && make geth
# Build Prysm
RUN git clone https://github.com/prysmaticlabs/prysm.git && cd ./prysm
WORKDIR /prysm
RUN go build -o=../prysmctl ./cmd/prysmctl
RUN go build -o=../beacon-chain ./cmd/beacon-chain
RUN go build -o=../validator ./cmd/validator

FROM ubuntu:latest

RUN apt update && apt-get install -y ca-certificates openssl curl
WORKDIR /devnet
RUN mkdir execution && mkdir consensus
COPY --from=builder /go-ethereum/build/bin/geth /usr/local/bin/
COPY --from=builder /beacon-chain /usr/local/bin/
COPY --from=builder /validator /usr/local/bin/
COPY --from=builder /prysmctl /usr/local/bin/
RUN openssl rand -hex 32 | tr -d "\n" > "jwt.hex"