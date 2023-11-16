program leonet_program.aleo;

record Token:
    owner as address.private;
    amount as u64.private;


function issue:
    input r0 as address.private;
    input r1 as u64.private;
    assert.eq self.caller aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a;
    cast r0 r1 into r2 as Token.record;
    output r2 as Token.record;
