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