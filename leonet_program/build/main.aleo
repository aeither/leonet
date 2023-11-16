program leonet_program.aleo;

struct User:
    score as u64;
    username as [u8; 32u32];

struct Post:
    text as scalar;


mapping users:
	key as address.public;
	value as User.public;

function username:
    input r0 as [u8; 32u32].public;
    output r0 as [u8; 32u32].private;


function check:
    assert.eq self.caller aleo1wv65g445yhl3nk6yka0rj5tdy275vz633l74kvf5ta4hnmf7kcqscf9drk;
    output 23u8 as u8.private;


function main:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;
