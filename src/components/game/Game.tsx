import { Button } from "@mui/joy";
import moment from "moment";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { IGame } from "../../interfaces/game";
import { useStore } from "../../utils/storeManager";

import classes from "./Game.module.scss";

const Game = (props: { game: IGame }) => {
  const { game } = props;
  const navigate = useNavigate();
  const { addCurrentGameToStore } = useStore();
  const randomNumber = useMemo(() => Math.round(Math.random() * 2 + 1), []);
  const imageSrc = useMemo(() => `./Hall${randomNumber}.jfif`, []);

  const goToDetailsPage = () => {
    addCurrentGameToStore(game);
    navigate(`${game.docId}`);
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
            <span>{moment(game.startDate).format("DD/MM/yyyy HH:mm")}</span>
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
          <Button onClick={goToDetailsPage}>Details &gt;</Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
