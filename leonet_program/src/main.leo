// The 'leonet_program' program.
program leonet_program.aleo {
    transition main(public a: u32, b: u32) -> u32 {
        let c: u32 = a + b;
        let u: u32 = 23u32;
        return c;
    }
}
