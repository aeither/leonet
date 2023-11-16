program leonet_program.aleo;

struct User:
    a as u8;
    b as boolean;
    f as field;
    g as group;

struct Post:
    text as scalar;


mapping users:
	key as address.public;
	value as User.public;

function test:
    input r0 as [u8; 5u32].public;
    output r0 as [u8; 5u32].private;


function main:
    input r0 as u32.public;
    input r1 as u32.private;
    add r0 r1 into r2;
    output r2 as u32.private;
