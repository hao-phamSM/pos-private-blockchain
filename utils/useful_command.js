// Check account balance
web3.fromWei(eth.getBalance("0x123463a4B065722E99115D6c222f267d9cABb524"), "ether")

// Check deposit contract balance
web3.fromWei(eth.getBalance("0x00000000219ab540356cbb839cbe05303d7705fa"), "ether")

// Send transaction
web3.eth.sendTransaction({
    from: "0x123463a4b065722e99115d6c222f267d9cabb524",
    to: "0x123c0ffee567beef890decade123fade456bed78",
    value: web3.toWei(1, "ether")
})

// Get peers list
admin.peers.forEach(function(value){console.log(value.network.remoteAddress+"\t"+value.name)})

// Contract
var abi = [{"type":"function","name":"increment","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"number","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"setNumber","inputs":[{"name":"newNumber","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"}]

var counterContract = web3.eth.contract(abi);

var myInstance = counterContract.at('0x30bdaE426d3CBD42e9d41D23958Fac6AD8310f81');

myInstance.number.call();

// forge script script/Counter.sol --broadcast --rpc-url http://localhost:8545 --legacy

// Auto-generate transactions, to test the transactions broadcast
const fromAddress = "0x123463a4b065722e99115d6c222f267d9cabb524";
const toAddress = "0x123c0ffee567beef890decade123fade456bed78";
const value = web3.toWei('1', 'ether');

async function sendTransactions(numberOfTransactions) {
    for (let i = 0; i < numberOfTransactions; i++) {
        try {
            const receipt = await web3.eth.sendTransaction({
                from: fromAddress,
                to: toAddress,
                value: value
            });
            // console.log(`Transaction ${i + 1} successful with hash: ${receipt.transactionHash}`);
        } catch (error) {
            console.error(`Transaction ${i + 1} failed:`, error);
        }
    }
}