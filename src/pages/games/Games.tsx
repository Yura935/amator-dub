import {
  Button,
  Input,
  Modal,
  ModalDialog,
  Textarea,
  Typography,
} from "@mui/joy";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { toast } from "react-toastify";

import { IGame } from "../../interfaces/game";
import Loader from "../../components/loader/Loader";
import { MainContext } from "../../context/main/mainContext";
import Toastr from "../../components/toastr/Toastr";
import ToggleGroupToolbar from "../../components/toggleGroupYoolbar/ToggleGroupToolbar";
import { db } from "../../firebase";
import { useStore } from "../../utils/storeManager";

import classes from "./Games.module.scss";

const GamesPage = () => {
  const { isLoading, setLoadingStatus } = useContext(MainContext);
  const [name, setName] = useState("");
  const [maxPlayersCount, setMaxPlayersCount] = useState<string | number>("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formats, setFormats] = useState<string[]>([]);
  const [color, setColor] = useState("");
  const {
    getUserDataFromStore,
    addNewGameToStore,
    getAvailableGamesFromStore,
  } = useStore();
  const [games, setGames] = useState<IGame[]>([...getAvailableGamesFromStore]);

  const textareaConfigHandler = (formats: string[], color: string) => {
    setFormats(formats);
    setColor(color);
  };

  const getUsers = async () => {
    await getDocs(collection(db, "games")).then((querySnapshot) => {
      const games = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      const availableGames = (games as IGame[]).filter(
        (game) => game.status === "active"
      );
      setGames(availableGames);
      addNewGameToStore(availableGames);
      setLoadingStatus(false);
    });
  };

  useEffect(() => {
    setLoadingStatus(true);
    getUsers();
  }, []);

  const saveNewGame = async (event: any) => {
    try {
      const isItalic = formats.find((format) => format === "italic");
      const isBold = formats.find((format) => format === "bold");
      const isUnderlined = formats.find((format) => format === "underlined");
      const newGame: IGame = {
        name,
        status: "active",
        maxPlayersCount,
        playersCount: 0,
        players: [],
        date: date ? date.toString() : "",
        createdBy: getUserDataFromStore?.fullName,
        createdDate: moment().toString(),
        location,
        notes: {
          text: notes,
          fontStyle: isItalic ? "italic" : "normal",
          fontWeight: isBold ? "bold" : "normal",
          textDecoration: isUnderlined ? "underline" : "none",
          color,
        },
      };
      console.log(newGame);
      const docRef = await addDoc(collection(db, "games"), newGame);
      setGames((prevState) => {
        const updatedState = [newGame, ...prevState];
        addNewGameToStore(updatedState);

        return {
          ...prevState,
          ...updatedState,
        };
      });
      toast.success(<Toastr itemName="Success" message="Game was created" />);
      setIsModalOpen(false);
      console.log("Document written with ID: ", docRef);
    } catch (e: any) {
      toast.error(<Toastr itemName="Error" message={e} />);
      console.error("Error adding document: ", e);
    }
  };

  const modal = (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
      >
        <Typography id="basic-modal-dialog-title" level="h2">
          Creating new game
        </Typography>
        <section className={classes["modal-content"]}>
          <div className="row mb-3">
            <label className="mb-1" htmlFor="gameName">
              Game name:
            </label>
            <Input
              id="gameName"
              placeholder="Enter game name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="row mb-3">
            <label className="mb-1" htmlFor="maxPlayersCount">
              Players count (max):
            </label>
            <div className="d-flex align-items-center p-0">
              <Input
                sx={{
                  width: "80%",
                  marginRight: "10px",
                }}
                type="number"
                id="maxPlayersCount"
                required
                placeholder="number"
                value={maxPlayersCount}
                onChange={(event) => setMaxPlayersCount(event.target.value)}
                onBlur={(event) =>
                  setMaxPlayersCount(
                    Number(event.target.value) < 2 ? 2 : event.target.value
                  )
                }
              />
              <span>players</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <label className="mb-1" htmlFor="location">
                Location:
              </label>
              <Input
                id="location"
                required
                placeholder="Enter game location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
            <div className="col-6 row">
              <label className="mb-1" htmlFor="date">
                Date:
              </label>
              <DatePicker
                id="date"
                required
                placeholderText="DD/MM/YYYY"
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date: any) => setDate(date)}
                customInput={<Input />}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="d-flex align-items-center mb-3 p-0">
              <label className="mb-1" htmlFor="notes">
                Notes:
              </label>
              <ToggleGroupToolbar onHandler={textareaConfigHandler} />
            </div>
            <Textarea
              sx={{
                minHeight: "100px",
                color,
                fontWeight: formats.find((format) => format === "bold")
                  ? "bold"
                  : "normal",
                fontStyle: formats.find((format) => format === "italic")
                  ? "italic"
                  : "normal",
                textDecoration: formats.find(
                  (format) => format === "underlined"
                )
                  ? "underline"
                  : "none",
              }}
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>
        </section>
        <section className="modal-buttons d-flex justify-content-end">
          <Button
            color="primary"
            sx={{ marginRight: "20px" }}
            aria-label=""
            type="submit"
            onClick={saveNewGame}
          >
            Create
          </Button>
          <Button
            color="neutral"
            aria-label=""
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
        </section>
      </ModalDialog>
    </Modal>
  );

  return (
    <>
      <section className={classes.content}>
        <div className={classes.actions}>
          <Button onClick={() => setIsModalOpen(true)}>Add game</Button>
        </div>
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
            <div className={classes.gamesItems}></div>
          )}
        </div>
      </section>
      {modal}
      {isLoading && <Loader />}
    </>
  );
};

export default GamesPage;
