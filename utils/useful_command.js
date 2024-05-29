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