// No imports needed: web3, anchor, pg and more are globally available

describe("Test", () => {
   it("Create Counter!", async () => {
    // Keypair = account
    const [counter, _counterBump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [pg.wallet.publicKey.toBytes()],
        pg.program.programId
      );
    console.log("Your counter address", counter.toString());
    const tx = await pg.program.methods
      .createCounter()
      .accounts({
        authority: pg.wallet.publicKey,
        counter: counter,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] = await anchor.web3.PublicKey.findProgramAddress(
      [pg.wallet.publicKey.toBytes()],
      pg.program.programId
    );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await pg.program.account.counter.fetch(counterPubkey);
    console.log("Your counter count", counter.count.toString());
  });

  it("Update a counter!", async () => {
    // Keypair = account
    const [counterPubkey, _] = await anchor.web3.PublicKey.findProgramAddress(
      [pg.wallet.publicKey.toBytes()],
      pg.program.programId
    );
    console.log("Your counter address", counterPubkey.toString());
    const counter = await pg.program.account.counter.fetch(counterPubkey);
    // console.log("Your counter", counter);
    const tx = await pg.program.methods
      .updateCounter()
      .accounts({
        counter: counterPubkey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    const counterUpdated = await pg.program.account.counter.fetch(counterPubkey);
    console.log("Your counter count", counterUpdated.count.toString());
  });
});
