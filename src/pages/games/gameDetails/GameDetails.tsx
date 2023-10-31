import moment from "moment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getAllGamesFromStore } from "../../../utils/storeManager";

import classes from "./GameDetails.module.scss";

const GameDetailsPage = () => {
  const allGames = useSelector(getAllGamesFromStore);
  const params = useParams();
  const game = allGames.find((g) => {
    console.log(g.docId, params.docId);
    return g.docId === params.docId;
  });
  console.log(game);

  return (
    <section className={classes.details}>
      <div className={classes.calendar}>
        <div className={classes.calendarHeader}>
          {moment(game?.date).format("MMM")}
        </div>
        <div className={classes.calendarBody}>
          {moment(game?.date).format("DD")}
        </div>
      </div>
      <div className={classes.body}>
        <h2 className={classes.name}>{game?.hallName}</h2>
        <table className="table">
          <tbody>
            <tr>
              <td width="115px">
                <div
                  className={`${classes.locationIcon} ${classes.icon}`}
                ></div>
                <b>Location</b>
              </td>
              <td>{game?.location}</td>
            </tr>
            <tr>
              <td width="115px">
                <div className={`${classes.dateIcon} ${classes.icon}`}></div>
                <b>Date</b>
              </td>
              <td>{moment(game?.date).format("ddd, DD MMM, YYYY HH:mm")}</td>
            </tr>
            <tr>
              <td width="115px">
                <div className={`${classes.loudIcon} ${classes.icon}`}></div>
                <b>Notifications</b>
              </td>
              <td>none</td>
            </tr>
            <tr>
              <td width="115px">
                <div className={`${classes.notesIcon} ${classes.icon}`}></div>
                <b>Notes</b>
              </td>
              <td>{game?.notes.text}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default GameDetailsPage;
