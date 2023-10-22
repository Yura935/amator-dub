import { Button } from "@mui/joy";
import { useState } from "react";

import { IGame } from "../../interfaces/game";

import classes from "./Games.module.scss";

const GamesPage = () => {
  const [games, setGames] = useState<IGame[]>([]);
  return (
    <section className={classes.content}>
      <div className={classes.actions}>
        <Button>Add game</Button>
      </div>
      <div className={classes.games}>
        {games.length === 0 && (
          <div className={classes.empty}>
            <img
              className={classes.helperIcon}
              src="./helper.svg"
              alt="helper icon"
            />
            <h4>Games Empty</h4>
            <p>Click &quot;Add game&quot; for creating new game!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GamesPage;
