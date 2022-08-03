let isConnected = false;
let provider = null;
let signer = null;

/*
    Ensure that we have a signer to sign transactions with
*/
async function ensureConnected() {
    // Prompt user to connect site to provider
    if (signer === null) {
        await window.ethereum.enable();
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
    }
}

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