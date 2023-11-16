program leonet_program.aleo;

struct User:
    score as u64;

struct Post:
    text as scalar;

record Ticket:
    owner as address.private;


mapping users:
	key as field.public;
	value as User.public;


mapping num_winners:
	key as u8.public;
	value as u8.public;


mapping counter:
	key as address.public;
	value as u64.public;

function username:
    input r0 as [u8; 32u32].public;
    output r0 as [u8; 32u32].private;


function dubble:
    async dubble self.caller into r0;
    output r0 as leonet_program.aleo/dubble.future;

finalize dubble:
    input r0 as address.public;
    add 0_0u64 234u64 into r1;
    add r1 0_1u64 into r2;
    get.or_use counter[r0] r2 into r3;
    add r3 1__u64 into r4;
    set r4 into counter[r0];
    get counter[r0] into r5;
    add r5 0___1u64 into r6;
    set r6 into counter[r0];


function play:
    cast self.caller into r0 as Ticket.record;
    async play into r1;
    output r0 as Ticket.record;
    output r1 as leonet_program.aleo/play.future;

finalize play:
    lte block.height 1000u32 into r0;
    assert.eq r0 true;
    rand.chacha into r1 as boolean;
    assert.eq r1 true;
    get.or_use num_winners[0u8] 0u8 into r2;
    lt r2 5u8 into r3;
    assert.eq r3 true;
    add r2 1u8 into r4;
    set r4 into num_winners[0u8];


function check:
    assert.eq self.caller aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a;
    output 23u8 as u8.private;


function main:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;


function update_score:
    input r0 as field.private;
    input r1 as u64.private;
    assert.eq self.caller self.signer;
    async update_score r0 r1 into r2;
    output r2 as leonet_program.aleo/update_score.future;

finalize update_score:
    input r0 as field.public;
    input r1 as u64.public;
    cast 0u64 into r2 as User;
    get.or_use users[r0] r2 into r3;
    add r3.score r1 into r4;
    cast r4 into r5 as User;
    set r5 into users[r0];
