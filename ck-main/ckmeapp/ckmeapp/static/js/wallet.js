// global vars 
let provider = null; // an interface to th blockchain (eg to ask for the current block # or the balance of the address)
let signer = null; // an interface for signing tx associated with an address

/*
    Ensure that we have a signer to sign transactions with
*/
async function ensureConnected() {
    // Prompt user to connect site to provider
    if (signer === null) {
        // metamask = injected provider, which injects an interface into the window.ethereum object into the website users visit
        provider = new ethers.providers.Web3Provider(window.ethereum);

        // requesting to connect to the users account using a json RPC call
        await provider.send('eth_requestAccounts', []);

        // getting the signer (eg an eth account) from metamask
        signer = provider.getSigner();
    }
}

//called when the user clicks the CK Me button
async function addCk() {
    // Ensure we have a signer (if the user rejects, an Error will be thrown)
    await ensureConnected();
    // Form a transaction to be signed. This function returns when the user
    // sends the transaction, and a Transaction object is returned.
    let response = await signer.sendTransaction({
        to: "0x0000000000000000000000000000000000000001",
        value: ethers.BigNumber.from(5)
    });
    console.log(response);
}