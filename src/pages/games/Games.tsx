import { Col, Nav, Tab } from "react-bootstrap";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@mui/joy";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import {
  getActiveGamesFromStore,
  getAllGamesFromStore,
  getFinishedGamesFromStore,
  getIncomingGamesFromStore,
  useStore,
} from "../../utils/storeManager";
import Game from "../../components/game/Game";
import GamePopup from "./gamePopup/GamePopup";
import { GameStatus } from "../../types/gameStatus";
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
  const { addCurrentGameToStore, addNewGameToStore, updateGameById } =
    useStore();
  const allGames = useSelector(getAllGamesFromStore);
  const activeGames = useSelector(getActiveGamesFromStore);
  const incomingGames = useSelector(getIncomingGamesFromStore);
  const finishedGames = useSelector(getFinishedGamesFromStore);
  const [games, setGames] = useState<IGame[]>([...activeGames]);
  const [activeTab, setActiveTab] = useState("active");

  const getGames = async () => {
    await getDocs(collection(db, "games")).then((querySnapshot) => {
      const games = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      const allGames = [...(games as IGame[])];
      const gamesForTab = allGames.filter((game) => {
        if (
          (activeTab === "incoming" && game.status === "incoming") ||
          (activeTab === "active" && game.status === "active") ||
          (activeTab === "finished" && game.status === "finished")
        ) {
          return game;
        }
        return;
      });
      setGames(gamesForTab);
      addNewGameToStore(allGames);
      setLoadingStatus(false);
    });
  };

  useEffect(() => {
    setLoadingStatus(true);
    getGames();
    addCurrentGameToStore({
      createdBy: "",
      createdDate: "",
      endDate: "",
      hallName: "",
      level: null,
      location: "",
      maxPlayersCount: "",
      notes: {
        color: "",
        fontStyle: "",
        fontWeight: "",
        text: "",
        textDecoration: "",
      },
      players: [],
      playersCount: "",
      price: "",
      startDate: "",
      status: "active",
      comments: [],
      docId: "",
    });
  }, []);

  const updateGameStatus = (game: IGame, status: GameStatus) => {
    console.log(game, status);
    const docRef = updateDoc(doc(db, "games", game.docId!), {
      ...game,
      status,
    });
    updateGameById({ ...game, status });
    setGames((prevState) => {
      console.log(prevState);
      // if (prevState.find((g) => g.status === status)) {
      //   return prevState;
      // }
      const updatedState = [{ ...game, status }, ...prevState];

      console.log(status === "active" && activeTab === "active");
      console.log(prevState);
      return status === "active" && activeTab === "active"
        ? updatedState
        : games; // investigate, should be prevState
    });
  };

  useEffect(() => {
    console.log(allGames);
    allGames.forEach((game) => {
      const now = moment.now();
      const startDate = moment(game.startDate).toDate().getTime();
      const endDate = moment(game.endDate).toDate().getTime();

      if (startDate <= now && game.status !== "finished") {
        if (endDate > now) {
          game.status !== "active" && updateGameStatus(game, "active");
          // console.log("active");
        } else {
          updateGameStatus(game, "finished");
          console.log("finished");
        }
      }
    });
  }, [allGames]);

  const saveNewGame = async (game: IGame) => {
    try {
      const docRef = await addDoc(collection(db, "games"), game);
      setGames((prevState) => {
        const updatedState = [{ ...game, docId: docRef.id }, ...prevState];
        addNewGameToStore([{ ...game, docId: docRef.id }, ...allGames]);
        return activeTab === "incoming" ? updatedState : prevState;
      });
      toast.success(<Toastr itemName="Success" message="Game was created" />);
      setIsModalOpen(false);
      console.log("Document written with ID: ", docRef);
    } catch (e: any) {
      toast.error(<Toastr itemName="Error" message={e} />);
      console.error("Error adding document: ", e);
    }
  };

  const onSelectGamesFilter = (eventKey: string | null) => {
    setActiveTab(eventKey!);
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
          defaultActiveKey={activeTab}
          onSelect={onSelectGamesFilter}
        >
          <Col sm={2} style={{ paddingRight: "10px" }}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className={classes.navLink} eventKey="incoming">
                  Incoming
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={classes.navLink} eventKey="active">
                  Active
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={classes.navLink} eventKey="finished">
                  Finished
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
                      <h4>There are no {activeTab} games.</h4>
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
          onActionGame={saveNewGame}
          mode="add"
        />
      }
      {isLoading && <Loader />}
    </>
  );
};

export default GamesPage;
