// Client
console.log("My address:", pg.wallet.publicKey.toString());
const balance = await pg.connection.getBalance(pg.wallet.publicKey);
console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);

// Keypair = account
const [counterPubkey, _] = await anchor.web3.PublicKey.findProgramAddress(
  [pg.wallet.publicKey.toBytes()],
  pg.program.programId
);
console.log("Your counter address", counterPubkey.toString());
const counter = await pg.program.account.counter.fetch(counterPubkey);
console.log("Your counter count", counter.count.toString());
