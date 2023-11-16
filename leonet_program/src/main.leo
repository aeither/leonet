// leo run test "[72u8, 101u8, 108u8, 108u8, 111u8 ]"
// leo run update_score 13field 23u64
// leo execute check (exec)

program leonet_program.aleo {

    struct User {
        score: u64,
        // username: [u8; 32]
    }

    struct Post {
        text: scalar
    }

    mapping users: field => User;
    mapping num_winners: u8 => u8;

    transition username (public el: [u8; 32]) -> [u8;32] {
        return el;
    }

    record Ticket {
        owner: address,
    }

    const SMALL:u64 = 0_1u64;
    mapping counter: address => u64;

    transition dubble() {
        return then finalize(self.caller);
    }

    finalize dubble(addr: address) {
        const BIG: u64 = 234u64;
        let current_value: u64 = Mapping::get_or_use(counter, addr, 0_0u64 + BIG + SMALL);
        Mapping::set(counter, addr, current_value + 1__u64);
        current_value = Mapping::get(counter, addr);
        Mapping::set(counter, addr, current_value + 0___1u64);
    }

    transition play() -> Ticket {
        let ticket: Ticket = Ticket {
            owner: self.caller,
        };
        return ticket then finalize();
    }

    finalize play() {
        // Check that the lottery has not expired.
        assert(block.height <= 1000u32);

        // Randomly select whether or not the ticket is a winner.
        assert(ChaCha::rand_bool());

        // Check that the maximum number of winners have not been reached.
        let winners: u8 = num_winners.get_or_use(0u8, 0u8);
        assert(winners < 5u8);
        num_winners.set(0u8, winners + 1u8);

    }


    transition check () -> u8 {
        assert_eq(self.caller, aleo1t0uer3jgtsgmx5tq6x6f9ecu8tr57rzzfnc2dgmcqldceal0ls9qf6st7a);

        return 23u8;
    }

    transition main(public a: u32, b: u32) -> u32 {
        let c: u32 = a + b;
        let u: u32 = 23u32;
        return c;
    }

    transition update_score(user_id: field, new_score: u64) {
        assert_eq(self.caller, self.signer);
        return then finalize(user_id, new_score);
    }

    finalize update_score(user_id: field, new_score: u64) {
        let current_user: User = Mapping::get_or_use(users, user_id, User {
            score: 0u64,
        });

        Mapping::set(users, user_id, User {
            score: current_user.score + new_score,
            // games_played: current_user.games_played + 1u64
        });
    }
}

// contract Social {

//     /*********/
//     //GLOBAL DATA
//     /*********/

//     //Address to Users
//     mapping(address => User) users;

//     /*********/
//     //USER DATA
//     /*********/

//     struct User {
//         string name;
//         bool registered;
//         structAddress[] following;
//         structAddress[] followers;
//         Post[] posts;
//     }

//     struct Post {
//         string text;
//     }

//     struct structAddress {
//         address addr;
//     }

//     /*********/
//     //USER FUNCTIONS
//     /*********/

//     fn registerUser(string name_) {
//         address msgSender = caller_address();
//         User storage newUser = users[msgSender];
//         assert(newUser.registered == false);

//         //Initialize
//         newUser.name = name_;
//         newUser.registered = true;
//     }

//     fn getUserName(address address_) -> (string) {
//         return(users[address_].name);
//     }

//     fn changeName(string name_) {
//         address msgSender = caller_address();
//         User storage sender = users[msgSender];
//         sender.name = name_;
//     }

//      fn follow(address otherAddress) {
//         address msgSender = caller_address();
//         User storage sender = users[msgSender];
//         User storage otherUser = users[otherAddress];
//         //sender is now following otherAddress
//         sender.following.push(structAddress({addr: otherAddress}));
//         //otherUser is now followed by msgSender
//         otherUser.followers.push(structAddress({addr: msgSender}));
//     }

//     fn checkFirstFollowsSecond(address firstAddr, address secondAddr) -> (bool) {
//         User storage firstUser = users[firstAddr];
//         for (u32 i = 0; i < firstUser.following.length; i++) {
//             if (secondAddr == firstUser.following[i].addr) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     fn checkFriendship(address addrOne, address addrTwo) -> (bool) {
//         bool forward = checkFirstFollowsSecond(addrOne, addrTwo);
//         bool backward = checkFirstFollowsSecond(addrTwo, addrOne);
//         //return (forward && backward);
//         if (forward == true) {
//             if (backward == true) {return true;} {return false;}
//         }
//         return false;
//     }

//     /*********/
//     //POST DATA
//     /*********/

//     fn post(string text_) {
//         address msgSender = caller_address();
//         User storage sender = users[msgSender];
//         sender.posts.push(Post({text: text_}));
//     }

//     fn getPost(address address_, u32 postIndex) -> (string) {
//         User storage poster = users[address_];
//         return poster.posts[postIndex].text;
//     }

//     fn getLatestPost(address address_) -> (string) {
//         User storage poster = users[address_];
//         u32 latestPostIndex = poster.posts.length - 1;
//         return poster.posts[latestPostIndex].text;
//     }

//     fn getNewsfeed() {
//         address msgSender = caller_address();
//         User storage sender = users[msgSender];

//         for (u32 i = 0; i < sender.following.length; i++) {
//             address otherAddress = sender.following[i].addr;
//             print(users[otherAddress].name);
//             print(getLatestPost(otherAddress));
//         }
//     }
// }