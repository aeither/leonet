import React from "react";
import Game from "./Game";
import { Button } from "./components/ui/button";

const requestDatas = [
  {
    id: 1,
    username: "vitalik",
    score: "23",
  },
  {
    id: 2,
    username: "buterin",
    score: "31",
  },
];

function App() {
  const FirstColumn = () => {
    const [progress, setProgress] = React.useState(3);

    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(20), 500);
      return () => clearTimeout(timer);
    }, []);

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
      <div className="border border-gray-300 rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-2">{item.username}</h3>
        <p className="text-gray-600 mb-4">{item.score}</p>
        <Button className="rounded-md" onClick={() => console.log("test")}>
          Vote
        </Button>
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
          <div className="grid grid-cols-2 gap-4 pt-2">
            {requestDatas.map((item) => (
              <CardItem key={item.id} item={item} />
            ))}
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
