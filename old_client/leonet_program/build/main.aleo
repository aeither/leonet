program leonet_program.aleo;

struct User:
    username as [u8; 32u32];
    avatar as u8;
    score as u64;
    games_played as u64;

record Token:
    owner as address.private;
    amount as u64.private;


mapping users:
	key as field.public;
	value as User.public;

function update_score:
    input r0 as [u8; 32u32].private;
    input r1 as u8.private;
    input r2 as field.private;
    input r3 as u64.private;
    assert.eq self.caller self.signer;
    async update_score r0 r1 r2 r3 into r4;
    output 3u8 as u8.private;
    output r4 as leonet_program.aleo/update_score.future;

finalize update_score:
    input r0 as [u8; 32u32].public;
    input r1 as u8.public;
    input r2 as field.public;
    input r3 as u64.public;
    cast r0 0u8 0u64 0u64 into r4 as User;
    get.or_use users[r2] r4 into r5;
    add r5.score r3 into r6;
    add r5.games_played 1u64 into r7;
    cast r0 0u8 r6 r7 into r8 as User;
    set r8 into users[r2];


function issue:
    input r0 as address.private;
    input r1 as u64.private;
    assert.eq self.caller aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a;
    cast r0 r1 into r2 as Token.record;
    output r2 as Token.record;
