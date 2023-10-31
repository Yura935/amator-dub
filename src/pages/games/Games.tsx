import { Col, Nav, Tab } from "react-bootstrap";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@mui/joy";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import {
  getActiveGamesFromStore,
  getFinishedGamesFromStore,
  getIncomingGamesFromStore,
  useStore,
} from "../../utils/storeManager";
import Game from "../../components/game/Game";
import GamePopup from "./gamePopup/GamePopup";
import { IGame } from "../../interfaces/game";
import Loader from "../../components/loader/Loader";
import { MainContext } from "../../context/main/mainContext";
import Toastr from "../../components/toastr/Toastr";
import { db } from "../../firebase";

import classes from "./Games.module.scss";

const GamesPage = () => {
  const { isLoading, setLoadingStatus } = useContext(MainContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [displayingType, setDisplayingType] = useState("list");
  const { addNewGameToStore } = useStore();
  const activeGames = useSelector(getActiveGamesFromStore);
  const incomingGames = useSelector(getIncomingGamesFromStore);
  const finishedGames = useSelector(getFinishedGamesFromStore);
  const [games, setGames] = useState<IGame[]>([...activeGames]);
  const getGames = async () => {
    await getDocs(collection(db, "games")).then((querySnapshot) => {
      const games = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      const availableGames = [...(games as IGame[])];
      setGames(availableGames);
      addNewGameToStore(availableGames);
      setLoadingStatus(false);
    });
  };

  useEffect(() => {
    setLoadingStatus(true);
    getGames();
  }, []);

  const saveNewGame = useCallback(async (game: IGame) => {
    console.log(game);
    // if (hallName && maxPlayersCount && date && location) {
    //   try {
    // const isItalic = formats.find((format) => format === "italic");
    // const isBold = formats.find((format) => format === "bold");
    // const isUnderlined = formats.find((format) => format === "underlined");
    // const newGame: IGame = {
    //   hallName,
    //   status: "active",
    //   maxPlayersCount,
    //   playersCount: 0,
    //   players: [],
    //   date: date ? date.toString() : "",
    //   createdBy: getUserDataFromStore?.fullName,
    //   createdDate: moment().toString(),
    //   location,
    //   notes: {
    //     text: notes,
    //     fontStyle: isItalic ? "italic" : "normal",
    //     fontWeight: isBold ? "bold" : "normal",
    //     textDecoration: isUnderlined ? "underline" : "none",
    //     color,
    //   },
    // };
    //     console.log(newGame);
    //     const docRef = await addDoc(collection(db, "games"), newGame);
    //     setGames((prevState) => {
    //       const updatedState = [newGame, ...prevState];
    //       addNewGameToStore(updatedState);

    //       return updatedState;
    //     });
    //     toast.success(<Toastr itemName="Success" message="Game was created" />);
    //     setIsModalOpen(false);
    //     console.log("Document written with ID: ", docRef);
    //   } catch (e: any) {
    //     toast.error(<Toastr itemName="Error" message={e} />);
    //     console.error("Error adding document: ", e);
    //   }
    // }
  }, []);

  const onSelectGamesFilter = (eventKey: string | null) => {
    eventKey === "active" && setGames(activeGames);
    eventKey === "incoming" && setGames(incomingGames);
    eventKey === "finished" && setGames(finishedGames);
  };

  const onCloseHandler = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <div className={classes.actions}>
        <div className={classes.switch}>
          <div
            className={`${classes.switchCase} ${
              displayingType === "list" ? classes.active : ""
            }`}
            onClick={() => setDisplayingType("list")}
          >
            <div className={classes["switchCase__icon"]}>
              <div className={classes.line}></div>
              <div className={classes.line}></div>
              <div className={classes.line}></div>
            </div>
            <p className={classes["switchCase__label"]}>List</p>
          </div>
          <div
            className={`${classes.switchCase} ${
              displayingType === "calendar" ? classes.active : ""
            }`}
            onClick={() => setDisplayingType("calendar")}
          >
            <img
              className={classes["switchCase__icon"]}
              src="./calendarIcon.svg"
            />
            <p className={classes["switchCase__label"]}>Calendar</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Add game</Button>
      </div>
      <section className={classes.tabs}>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="active"
          onSelect={onSelectGamesFilter}
        >
          <Col sm={2} style={{ paddingRight: "10px" }}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className={classes.navLink} eventKey="active">
                  Active
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={classes.navLink} eventKey="inProgress">
                  In Progress
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={classes.navLink} eventKey="Closed">
                  Closed
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <section className={classes.content}>
                <div className={classes.games}>
                  {!isLoading && games.length === 0 && (
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
                  {!isLoading && games.length > 0 && (
                    <div className={classes.gamesItems}>
                      {games.map((game) => (
                        <Game key={game.docId} game={game} />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </Tab.Content>
          </Col>
        </Tab.Container>
      </section>

      {
        <GamePopup
          open={isModalOpen}
          onClose={onCloseHandler}
          onCreateGame={saveNewGame}
        />
      }
      {isLoading && <Loader />}
    </>
  );
};

export default GamesPage;
