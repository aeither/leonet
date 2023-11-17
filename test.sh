echo 'testing...' 

cd programs/leaderboard

output=$(leo execute update_score  "[ "72u8", "101u8", "108u8", "108u8", "111u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8", "0u8" ]" 0u8 123field 12u64)

echo "The output is"
echo $output