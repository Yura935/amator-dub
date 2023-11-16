/* eslint-disable max-lines */
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import {
  getCurrentGame,
  getUserDataFromStore,
  useStore,
} from "../../../utils/storeManager";
import GameComments from "../../../components/game/gameComments/GameComments";
import GamePopup from "../gamePopup/GamePopup";
import { IFeedback } from "../../../interfaces/feedback";
import { IGame } from "../../../interfaces/game";
import { IPlayer } from "../../../interfaces/player";
import Loader from "../../../components/loader/Loader";
import { MainContext } from "../../../context/main/mainContext";
import Players from "../../../components/game/players/Players";
import TableSkeleton from "../../../skeletons/TableSkeleton";
import Toastr from "../../../components/toastr/Toastr";
import { db } from "../../../firebase";

import classes from "./GameDetails.module.scss";

// eslint-disable-next-line complexity
const GameDetailsPage = () => {
  const { isLoading, setLoadingStatus } = useContext(MainContext);
  const currentGame = useSelector(getCurrentGame);
  const params = useParams();
  const [game, setGame] = useState<IGame | undefined>(currentGame);
  const { addPlayerToGame, addCurrentGameToStore, updateFeedbackById } = useStore();
  const userData = useSelector(getUserDataFromStore);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("edit");
  const navigate = useNavigate();
  const [isYouPlayer, setIsYouPlayer] = useState<boolean>(
    Boolean(
      game?.players &&
        game.players.length > 0 &&
        game?.players.find((player) => player.uid === userData.uid)
    )
  );
  const [receiver, setReceiver] = useState<IPlayer | null>(null);

  const joinGameHandler = async (id: string) => {
    const player: IPlayer = {
      uid: userData.uid,
      fullName: userData.fullName,
      avatar: userData.avatar,
      gameId: id,
    };

    const updatedGame = { ...game };
    updatedGame.players = [...updatedGame.players!, player];
    updatedGame.playersCount = (
      Number(updatedGame.playersCount) + 1
    ).toString();
    updateDoc(doc(db, "games", id), updatedGame)
      .then(() => {
        addPlayerToGame(player);
        setIsYouPlayer(true);
        addCurrentGameToStore(updatedGame as IGame);
        toast.success(
          <Toastr itemName="Success" message="You joined the game" />
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(<Toastr itemName="Error" message={err} />);
      });
  };

  const getGame = async () => {
    await getDocs(collection(db, "games")).then((querySnapshot) => {
      const games = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      const currentGame = games.find((g) => g.docId === params.docId);
      setGame(currentGame as IGame);
      addCurrentGameToStore(currentGame as IGame);
      setLoadingStatus(false);
    });
  };

  useEffect(() => {
    if (!game?.docId) {
      setLoadingStatus(true);
      getGame();
    }
  }, []);

  useEffect(() => {
    if (game && userData) {
      setIsYouPlayer(
        Boolean(
          game?.players &&
            game.players.length > 0 &&
            game.players.find((player) => player.uid === userData.uid)
        )
      );
    }
  }, [game, userData]);

  const onCloseHandler = useCallback(() => setIsModalOpen(false), []);

  const editGameHandler = (newGame: IGame) => {
    updateDoc(doc(db, "games", newGame.docId!), { ...newGame })
      .then((data) => {
        addCurrentGameToStore(newGame);
        setGame(newGame);
        toast.success(
          <Toastr
            itemName="Success"
            message="Game details was updated successfully!"
          />
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(<Toastr itemName="Error" message={err} />);
      });
  };

  const deleteGame = (game: IGame) => {
    deleteDoc(doc(db, "games", game.docId!))
      .then((data) => {
        toast.success(
          <Toastr itemName="Success" message="Game deleted successfully!" />
        );
        navigate("/games");
      })
      .catch((err) => {
        console.log(err);
        toast.error(<Toastr itemName="Error" message={err} />);
      });
  };

  const openEditModal = () => {
    setMode("edit");
    setIsModalOpen(true);
  };

  const openDeleteModal = () => {
    setMode("delete");
    setIsModalOpen(true);
  };

  const handleSendFeedback = (player: IPlayer) => {
    setReceiver(player);
    setMode("feedback");
    setIsModalOpen(true);
  };

  const sendFeedback = (feedback: IFeedback) => {
    addDoc(collection(db, "feedbacks"), { ...feedback })
      .then((res) => {
        console.log(res);
        updateFeedbackById({...feedback, docId: res.id});
        toast.success(
          <Toastr
            itemName="Success"
            message={`Feedback to ${feedback.receiver.fullName} was send.`}
          />
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          <Toastr itemName="Sign Up error" message="Email already in use." />
        );
      });
  };

  return (
    <>
      <section className={classes.details}>
        <div className={classes.infoBox}>
          {isLoading && (
            <div className="placeholder-glow">
              <h2
                className="placeholder"
                style={{ width: "130px", height: "165px" }}
              ></h2>
            </div>
          )}
          {!isLoading && (
            <div className={classes.calendar}>
              <div className={classes.calendarHeader}>
                {moment(game?.startDate).format("MMMM")}
              </div>
              <div className={classes.calendarBody}>
                {moment(game?.startDate).format("DD")}
              </div>
            </div>
          )}
          <div className={classes.body}>
            {isLoading && (
              <div className="placeholder-glow">
                <h2
                  className="placeholder"
                  style={{
                    width: "170px",
                    height: "38px",
                    marginBottom: "20px",
                  }}
                ></h2>
              </div>
            )}
            {!isLoading && <h2 className={classes.name}>{game?.hallName}</h2>}
            {isLoading && (
              <TableSkeleton
                colCount={2}
                rowCount={5}
                itemHeight="41px"
                itemWidth="300px"
              />
            )}
            {!isLoading && (
              <table className="table">
                <tbody>
                  <tr>
                    <td width="150px">
                      <div
                        className={`${classes.locationIcon} ${classes.icon}`}
                      ></div>
                      <b>Location</b>
                    </td>
                    <td style={{ minWidth: "250px" }}>{game?.location}</td>
                  </tr>
                  <tr>
                    <td width="150px">
                      <div
                        className={`${classes.dateIcon} ${classes.icon}`}
                      ></div>
                      <b>Date</b>
                    </td>
                    <td style={{ minWidth: "250px" }}>
                      {moment(game?.startDate).format(
                        "ddd, DD MMM, YYYY HH:mm"
                      )}{" "}
                      - {moment(game?.endDate).format("HH:mm")}
                    </td>
                  </tr>
                  <tr>
                    <td width="150px">
                      <div
                        className={`${classes.priceIcon} ${classes.icon}`}
                      ></div>
                      <b>Price</b>
                    </td>
                    <td style={{ minWidth: "250px" }}>{game?.price}</td>
                  </tr>
                  <tr>
                    <td width="150px">
                      <div
                        className={`${classes.loudIcon} ${classes.icon}`}
                      ></div>
                      <b>Notifications</b>
                    </td>
                    <td style={{ minWidth: "250px" }}>none</td>
                  </tr>
                  <tr>
                    <td width="150px" style={{ height: "inherit" }}>
                      <div
                        className={`${classes.notesIcon} ${classes.icon}`}
                      ></div>
                      <b>Notes</b>
                    </td>
                    <td style={{ minWidth: "250px", maxWidth: "760px" }}>
                      {game?.notes.text}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          {game?.createdBy === userData.fullName &&
            game.status === "incoming" && (
              <div className={classes.actions}>
                <div
                  className={`${classes.actionIcon} ${classes.edit}`}
                  onClick={openEditModal}
                ></div>
                <div
                  className={`${classes.actionIcon} ${classes.delete}`}
                  onClick={openDeleteModal}
                ></div>
              </div>
            )}
        </div>
        <hr />
        <Tabs
          aria-label="tabs"
          defaultValue="players"
          // value={index}
          // onChange={(event, newValue) => setIndex(newValue as number)}
        >
          <TabList variant="soft" underlinePlacement="bottom">
            <Tab indicatorPlacement="top" value="players">
              Players
            </Tab>
            <Tab indicatorPlacement="top" value="comments">
              Comments
            </Tab>
            {/* {game?.status === "finished" && (
              <Tab indicatorPlacement="top" value="feedback">
                Feedback
              </Tab>
            )} */}
          </TabList>
          <TabPanel value="players">
            {!isLoading && (
              <Players
                isUserJoined={isYouPlayer}
                onJoinGame={joinGameHandler}
                onSendFeedback={handleSendFeedback}
              />
            )}
          </TabPanel>
          <TabPanel value="comments">
            <GameComments isYouPlayer={isYouPlayer} />
          </TabPanel>
          {game?.status === "finished" && (
            <TabPanel value="feedback"></TabPanel>
          )}
        </Tabs>
      </section>
      {
        <GamePopup
          open={isModalOpen}
          onClose={onCloseHandler}
          onActionGame={editGameHandler}
          onGameDelete={deleteGame}
          onSendFeedback={sendFeedback}
          game={game}
          mode={mode}
          receiverPlayer={receiver!}
        />
      }
      {isLoading && <Loader />}
    </>
  );
};

export default GameDetailsPage;
