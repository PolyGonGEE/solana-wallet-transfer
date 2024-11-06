const solanaWeb3 = require('@solana/web3.js');

// User inputs their private key
const privateKeyInput = "2ghHw5DCocXVLKpZbFce5t3Usb7q3w9S75b4wXSvwQvUDKSJ7kcUM8bhcCTvxPiVEY7AiY28uZYgfUFMHCCj1rHJ"; // Replace this with the user-provided key

// Generate a keypair from the private key
const privateKeyArray = Uint8Array.from(privateKeyInput.split(',').map(num => parseInt(num)));
const payer = solanaWeb3.Keypair.fromSecretKey(privateKeyArray);

// Connect to Solana testnet
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('testnet'), 'confirmed');

// Function to generate a random wallet address
function generateRandomWallet() {
  return solanaWeb3.Keypair.generate().publicKey;
}

// Function to send 0.001 SOL
async function sendTransaction(toPublicKey) {
  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: toPublicKey,
      lamports: 1000000, // 0.001 SOL in lamports
    })
  );

  const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [payer]);
  console.log(`Transaction sent to ${toPublicKey.toString()}: ${signature}`);
}

// Main function to generate wallets and send transactions
async function main() {
  try {
    // Generate 50 random wallet addresses
    for (let i = 0; i < 50; i++) {
      const randomWallet = generateRandomWallet();
      await sendTransaction(randomWallet);
    }
    console.log('Transactions completed.');
  } catch (error) {
    console.error('Error sending transactions:', error);
  }
}

// Run the main function
main();
