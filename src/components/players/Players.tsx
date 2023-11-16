import { Avatar, Button } from "@mui/joy";
import { memo } from "react";
import { useSelector } from "react-redux";

import { IPlayer } from "../../interfaces/player";
import { getCurrentGame, getUserDataFromStore } from "../../utils/storeManager";
import { useNavigate } from "react-router-dom";

import classes from "./Players.module.scss";

const Players = (props: any) => {
  const { isUserJoined, onJoinGame, onSendFeedback } = props;
  const currentGame = useSelector(getCurrentGame);
  const userData = useSelector(getUserDataFromStore);
  const navigate = useNavigate();

  const joinGame = (event: any) => {
    onJoinGame(event.target.id);
  };

  const sendFeedback = (event: any) => {
    const currentPlayer = currentGame.players.filter(
      (pl) => pl.uid === event.target.id.slice(1)
    )[0];
    console.log(currentPlayer);
    onSendFeedback(currentPlayer);
  };

  const viewPlayerProfile = (event: any) => {
    navigate(`user/${event.target.id}`);
  };

  const avatarNameFormatter = (name: string): string => {
    const words = name.split(" ");
    let newName = "";
    words.forEach((word) => {
      newName += word[0];
    });
    return newName;
  };

  return (
    <div className={classes.players}>
      <div className={classes.buttons}>
        {!isUserJoined && currentGame.status === "incoming" && (
          <Button id={currentGame?.docId} onClick={joinGame}>
            Join game
          </Button>
        )}
        {isUserJoined && <Button disabled>You already joined the game</Button>}
      </div>
      {currentGame.players?.length === 0 && (
        <div className={classes.empty}>
          There are no players in this game for now!
        </div>
      )}
      {currentGame.players?.length > 0 &&
        currentGame.players.map((player: IPlayer) => (
          <div key={player.uid} id={player.uid} className={classes.player}>
            <Avatar sx={{ marginRight: "40px" }} src={player.avatar}>
              {avatarNameFormatter(player.fullName)}
            </Avatar>
            <h4>{player.fullName}</h4>
            {player.uid !== userData.uid && isUserJoined && (
              <Button
                id={"b" + player.uid}
                variant="outlined"
                sx={{ position: "absolute", right: "10px" }}
                onClick={sendFeedback}
              >
                ★
              </Button>
            )}
          </div>
        ))}
    </div>
  );
};

export default Players;
