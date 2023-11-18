#!/bin/bash

# Print a testing message
echo 'testing...'

# Change directory to "programs/leaderboard"
cd programs/leaderboard

# Run the command and store its output in a variable
output=$(leo execute update_score  "[ "72u8", "101u8", "108u8", "108u8", "111u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8" ]" 0u8 123field 12u64)

# Print the output
echo "The output is"
echo $output


# Execute on testnet dry run
# snarkos developer execute --private-key APrivateKey1zkpFykR4fKtyfrQtYuA7wYbNFQsC8qoUqeQt6iT2B44dn9z --query https://aleo.obscura.network/v1/201d4fc4-8194-4462-90dd-6f31d8e278c4 leaderboard_123124.aleo update_score "[ "72u8", "101u8", "108u8", "108u8", "111u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8" ]" 0u8 123field 12u64 --dry-run

# Update Score
# snarkos developer execute --private-key APrivateKey1zkpFykR4fKtyfrQtYuA7wYbNFQsC8qoUqeQt6iT2B44dn9z --query https://aleo.obscura.network/v1/201d4fc4-8194-4462-90dd-6f31d8e278c4 leaderboard_123124.aleo update_score "[ "72u8", "101u8", "108u8", "108u8", "111u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8" ]" 0u8 123field 12u64 --broadcast https://aleo.obscura.network/v1/201d4fc4-8194-4462-90dd-6f31d8e278c4/testnet3/transaction/broadcast