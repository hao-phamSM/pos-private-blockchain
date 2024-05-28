var passphrase = '';
var accts = personal.listAccounts;
if (accts.length == 0){

  var keys = [
    "2e0834786285daccd064ca17f1654f67b4aef298acbb82cef9ec422fb4975622",
    // "097dd6aedb87b3b5e541cfb9ef8d4beb7a66084dd80d99c2e51aeabeae320980",
    // "abae82647f5881a398f7eede8910803d65470a7cbaee9ddda90dcdcdc8dcdacf",
    // "cc1af47cbc9de0c9a1e1049c1a62ddb9e08440d16093803d74e93f1cea3458ee",
    // "3e48c4e748b8f5baf6f870c5c4d2a0147390c94e778a9ca67de945bffeb2f72a"
  ]

  for(var i = 0; i < keys.length; i++){ 
    personal.importRawKey(keys[i], passphrase);
  }
  
  console.log('Successfully imported ', keys.length, ' keys into the keystore');
  accts = personal.listAccounts;
}

for(var i = 0; i < accts.length; i++){
  personal.unlockAccount(accts[i], passphrase);
}
console.log('Successfully unlocked ', accts.length, ' accounts');