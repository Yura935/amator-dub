import { Avatar, AvatarGroup, Button, Tooltip } from "@mui/joy";
import { doc, updateDoc } from "firebase/firestore";
import { useMemo, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getUserDataFromStore, useStore } from "../../utils/storeManager";
import { IGame } from "../../interfaces/game";
import { IPlayer } from "../../interfaces/player";
import { db } from "../../firebase";

import classes from "./Game.module.scss";

const Game = (props: { game: IGame }) => {
  const { game } = props;
  const navigate = useNavigate();
  const { addPlayerToGame } = useStore();
  const userData = useSelector(getUserDataFromStore);

  const [isYouPlayer, setIsYouPlayer] = useState<boolean>(
    Boolean(
      game.players.length > 0 &&
        game.players.find((player) => player.uid === userData.uid)
    )
  );
  const randomNumber = useMemo(() => Math.round(Math.random() * 2 + 1), []);
  const imageSrc = useMemo(() => `./Hall${randomNumber}.jfif`, []);

  const joinGame = async (event: any) => {
    const player: IPlayer = {
      uid: userData.uid,
      fullName: userData.fullName,
      avatar: userData.avatar,
      gameId: event.target.id,
    };

    const updatedGame = { ...game };
    updatedGame.players = [...updatedGame.players, player];
    updatedGame.playersCount = (
      Number(updatedGame.playersCount) + 1
    ).toString();
    updateDoc(doc(db, "games", event.target.id), updatedGame)
      .then(() => {
        addPlayerToGame(player);
        setIsYouPlayer(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.game}>
      <div className={classes.image}>
        <img src={imageSrc} alt="" />
      </div>
      <div className={classes.info}>
        <div className={classes.header}>
          <h3>{game.hallName}</h3>
          <div className={classes.created}>
            <p className={classes.postedDate}>
              {moment(game.createdDate).format("DD/MM/yyyy HH:mm")}
            </p>
            <span>{game.createdBy}</span>
          </div>
        </div>
        <div className={classes.infoDetails}>
          <div className="d-flex align-items-center">
            <img
              className={classes.icon}
              src="./locationIcon.svg"
              alt="location icon"
            />
            <span>{game.location}</span>
          </div>
          <div className="d-flex align-items-center">
            <img
              className={classes.icon}
              src="./playersIcon.svg"
              alt="players icon"
            />
            <span>
              {game.playersCount}/{game.maxPlayersCount}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <img
              className={classes.icon}
              src="./calendarIcon.svg"
              alt="location icon"
            />
            <span>{moment(game.date).format("DD/MM/yyyy HH:mm")}</span>
          </div>
        </div>
        <div
          className={classes.notes}
          style={{
            textDecoration: game.notes.textDecoration,
            color: game.notes.color,
            fontStyle: game.notes.fontStyle,
            fontWeight: game.notes.fontWeight,
          }}
        >
          {game.notes.text}
        </div>
        <div className={classes.footer}>
          {/* <AvatarGroup sx={{ marginTop: "20px", marginBottom: "10px" }}>
            {game.players.map((player) => (
              <Tooltip key={player.uid} title={player.fullName} variant="solid">
                <Avatar src={player.avatar} alt={player.fullName} />
              </Tooltip>
            ))} */}
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
          {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" /> */}
          {/* <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
          {/* <Avatar>+3</Avatar> */}
          {/* </AvatarGroup> */}
          {/* {!isYouPlayer && (
            <Button id={game.docId} onClick={joinGame}>
              Join
            </Button>
          )}
          {isYouPlayer && <Button disabled>You already joined!</Button>} */}
          <Button onClick={() => navigate(`${game.docId}`)}>
            Details &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
