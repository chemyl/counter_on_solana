const wallet = pg.wallet;
const program = pg.program;
const counterSeed = Buffer.from("counter");

const counterPubkey = await web3.PublicKey.findProgramAddressSync(
    [counterSeed],
    pg.PROGRAM_ID
);

const initializeTx = await pg.program.methods
    .initialize()
    .accounts({
        counter: counterPubkey[0],
        authority: pg.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
    })
    .rpc();

let counterAccount = await program.account.counter.fetch(counterPubkey[0]);
console.log("account after initializing ==> ", Number(counterAccount.count));

const incrementTx = await pg.program.methods
    .increment()
    .accounts({
        counter: counterPubkey[0],
        authority: pg.wallet.publicKey,
    })
    .rpc();

counterAccount = await program.account.counter.fetch(counterPubkey[0]);
console.log("account after increasing ==>", Number(counterAccount.count));