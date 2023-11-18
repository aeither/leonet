import { useEffect, useState } from "react";
import Game from "./Game";

const parseUserStruct = (struct: string, username: string) => {
  const lines = struct.split("\n");

  let score: number | undefined;
  let gamesPlayed: number | undefined;

  lines.forEach((line) => {
    const trimmed = line.trim();

    const parseU64 = (val: string) =>
      val.split(":")[1].trim().replace(",", "").replace("u64", "");

    if (trimmed.startsWith("score")) {
      const value = parseU64(trimmed);
      score = parseInt(value);
      return;
    }

    if (trimmed.startsWith("games_played")) {
      const value = parseU64(trimmed);
      gamesPlayed = parseInt(value);
      return;
    }
  });

  if (!score || !gamesPlayed) throw new Error("Failed parsing Aleo struct");

  return { id: 0, score, gamesPlayed, username, position: 0 }; // position will be calculated later
};

function App() {
  const [leaderboard, setLeaderboard] = useState<Item[]>();
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await fetch(
        "https://aleo.obscura.network/v1/201d4fc4-8194-4462-90dd-6f31d8e278c4/testnet3/program/leaderboard_123122.aleo/mapping/users/1field"
      );
      const jsonData = await data.json();
      console.log(jsonData);

      if (!jsonData) {
        return;
      }
      // {
      // score: 122u64,
      // games_played: 1u64
      // }
      setLeaderboard([parseUserStruct(jsonData, "leo") as any]);
      console.log(jsonData);
    };
    fetchLeaderboard();
  }, []);

  const FirstColumn = () => {
    return (
      <div className="h-12">
        {/* Main Content */}
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Game
        </h2>
        <div className="min-h-screen">
          <div className="container mx-auto py-8">
            <Game />
          </div>
        </div>

        <div className="flex pt-4 gap-2">{/*  */}</div>
      </div>
    );
  };

  const CardItem = ({ item }: { item: Item }) => {
    return (
      <div className="flex flex-row justify-between border border-gray-300 rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">{item.username}</h3>
        <p className="text-gray-600 mb-4 text-lg font-bold shadow hover:shadow-md">
          {item.score}
        </p>
      </div>
    );
  };

  return (
    <div className="">
      <Header />
      <div className="min-h-[calc(100vh-64px)] grid grid-cols-3 p-4 gap-4 rounded">
        <div className="col-span-1 bg-card p-4 border shadow-md rounded-md">
          <FirstColumn />
        </div>
        <div className="col-span-2 bg-card p-4 border shadow-md rounded-md">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Leaderboard
          </h2>
          <div className="grid grid-cols-1 gap-4 pt-2">
            {leaderboard &&
              leaderboard.map((item) => <CardItem key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <header className="border-b-2 text-black sticky top-0 bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#" className="text-xl font-bold">
          LeoNet
        </a>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Games
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Rewards
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

interface Item {
  id: number;
  username: string;
  score: string;
}

export default App;
