import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ScoreCreationPage } from "./ScoreCreation";
import { LeaderboardPage } from "./Leaderboard";
import { useState } from "react";
import { type Page } from "./utils";
import { Button } from "./components/ui/button";

const theme = createTheme();

function App() {
  const [page, setPage] = useState<Page>("score-creation");

  return (
    <>
      <div>
        <Button>Hello World</Button>
      </div>
    </>
  );

  // return (
  //   <ThemeProvider theme={theme}>
  //     {page === "score-creation" ? (
  //       <ScoreCreationPage setPage={setPage} />
  //     ) : (
  //       <LeaderboardPage setPage={setPage} />
  //     )}
  //   </ThemeProvider>
  // );
}

export default App;
