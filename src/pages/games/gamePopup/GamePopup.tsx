/* eslint-disable max-lines */
/* eslint-disable complexity */
import {
  Button,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
  Textarea,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { useSelector } from "react-redux";

import { GameLevel } from "../../../types/gameLevel";
import { IGame } from "../../../interfaces/game";
import ToggleGroupToolbar from "../../../components/toggleGroupToolbar/ToggleGroupToolbar";
import { getUserDataFromStore } from "../../../utils/storeManager";

import classes from "./GamePopup.module.scss";

const GamePopup = (props: {
  open: boolean;
  onClose: () => void;
  onActionGame: (game: IGame) => void;
  mode: string;
  game?: IGame;
  onGameDelete?: (game: IGame) => void;
}) => {
  const userData = useSelector(getUserDataFromStore);
  const initialGameState: IGame = {
    createdBy: "",
    createdDate: "",
    endDate: null,
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
    startDate: null,
    status: "active",
    comments: [],
    docId: "",
  };
  const [game, setGame] = useState<IGame>(initialGameState);
  const [notes, setNotes] = useState("");
  const [formats, setFormats] = useState<string[]>([]);
  const [color, setColor] = useState("");

  const onGameHallNameChangeHandler = (event: any) => {
    setGame((prevState) => {
      const updatedGame: IGame = {
        ...prevState,
      };
      updatedGame.hallName = event.target.value;
      return updatedGame;
    });
  };

  const onGameMaxPlayersCountChangeHandler = (event: any) => {
    setGame((prevState) => {
      const updatedGame: IGame = {
        ...prevState,
      };
      updatedGame.maxPlayersCount = event.target.value;
      return updatedGame;
    });
  };

  const onGameLocationChangeHandler = (event: any) => {
    setGame((prevState) => {
      const updatedGame: IGame = {
        ...prevState,
      };
      updatedGame.location = event.target.value;
      return updatedGame;
    });
  };

  const onGamePriceChangeHandler = (event: any) => {
    setGame((prevState) => {
      const updatedGame: IGame = {
        ...prevState,
      };
      updatedGame.price = event.target.value;
      return updatedGame;
    });
  };

  const onGameStartDateChangeHandler = (date: any) => {
    setGame((prevState) => {
      const updatedGame: IGame = {
        ...prevState,
      };
      updatedGame.startDate = date;
      return updatedGame;
    });
  };

  const onGameEndDateChangeHandler = (date: any) => {
    setGame((prevState) => {
      const updatedGame: IGame = {
        ...prevState,
      };
      updatedGame.endDate = date;
      return updatedGame;
    });
  };

  const textareaConfigHandler = (formats: string[], color: string) => {
    setFormats(formats);
    setColor(color);
  };

  const onSelectGameLevelHandler = (
    event: React.SyntheticEvent | null,
    newValue: GameLevel | null
  ) => {
    setGame((prevState) => {
      const updatedGame: IGame = {
        ...prevState,
      };
      updatedGame.level = newValue;
      return updatedGame;
    });
  };

  const clearFields = () => {
    setGame(initialGameState);
    setNotes("");
    setColor("");
    setFormats([]);
  };

  useEffect(() => {
    if (props.open && (props.mode === "edit" || props.mode === "delete")) {
      setGame(props.game!);
    }
  }, [props.open]);

  // eslint-disable-next-line complexity
  const saveNewGame = () => {
    if (
      game.hallName &&
      game.maxPlayersCount &&
      game.startDate &&
      game.endDate &&
      game.location
    ) {
      const isItalic = formats.find((format) => format === "italic");
      const isBold = formats.find((format) => format === "bold");
      const isUnderlined = formats.find((format) => format === "underlined");
      const newGame: IGame = {
        hallName: game.hallName,
        status: "incoming",
        maxPlayersCount: game.maxPlayersCount,
        playersCount: 0,
        players: [],
        startDate: game.startDate ? game.startDate.toString() : null,
        endDate: game.endDate ? game.endDate.toString() : null,
        createdBy: userData?.fullName,
        createdDate: moment().toString(),
        location: game.location,
        level: game.level,
        price: game.price,
        notes: {
          text: notes,
          fontStyle: isItalic ? "italic" : "normal",
          fontWeight: isBold ? "bold" : "normal",
          textDecoration: isUnderlined ? "underline" : "none",
          color,
        },
        comments: [],
      };
      props.onActionGame(newGame);
      clearFields();
    }
  };

  const closeModal = () => {
    clearFields();
    props.onClose();
  };

  const editGameDetails = () => {
    props.onActionGame(game);
    closeModal();
  };

  const deleteGameHandler = () => {
    props.onGameDelete!(game);
    closeModal();
  };

  return (
    <Modal open={props.open} onClose={closeModal}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
      >
        <Typography id="basic-modal-dialog-title" level="h2">
          {props.mode === "add" && "Creating new game"}
          {props.mode === "edit" && "Edit game details"}
          {props.mode === "delete" && "Delete game"}
        </Typography>
        {(props.mode === "add" || props.mode === "edit") && (
          <section className={classes["modal-content"]}>
            <div className="row mb-3">
              <div className="col-6">
                <label className="mb-1" htmlFor="hallName">
                  Hall name:
                </label>
                <Input
                  id="hallName"
                  placeholder="Enter hall name"
                  required
                  value={game.hallName}
                  onChange={onGameHallNameChangeHandler}
                />
              </div>
              <div className="col-6">
                <label className="mb-1" htmlFor="gameLevel">
                  Game level:
                </label>
                <Select
                  id="gameLevel"
                  placeholder="Choose game level"
                  required
                  value={game.level}
                  onChange={onSelectGameLevelHandler}
                >
                  <Option value="High">High</Option>
                  <Option value="Intermediate">Intermediate</Option>
                  <Option value="Low">Low</Option>
                </Select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
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
                    value={game.maxPlayersCount}
                    onChange={onGameMaxPlayersCountChangeHandler}
                    // onBlur={(event) =>
                    //   setMaxPlayersCount(
                    //     Number(event.target.value) < 2 ? 2 : event.target.value
                    //   )
                    // }
                  />
                  <span>players</span>
                </div>
              </div>
              <div className="col-6">
                <label className="mb-1" htmlFor="location">
                  Location:
                </label>
                <Input
                  id="location"
                  required
                  placeholder="Enter game location"
                  value={game.location}
                  onChange={onGameLocationChangeHandler}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-4">
                <label className="mb-1" htmlFor="price">
                  Price:
                </label>
                <Input
                  type="number"
                  id="price"
                  required
                  placeholder="Price"
                  value={game.price}
                  onChange={onGamePriceChangeHandler}
                  endDecorator={<div className={classes.currencyIcon}></div>}
                />
              </div>
              <div className="col-4">
                <label className="mb-1" htmlFor="startDate">
                  Start Date:
                </label>
                <ReactDatePicker
                  showTimeSelect
                  autoComplete="off"
                  id="date"
                  required
                  placeholderText="DD/MM/YYYY"
                  dateFormat="dd/MM/yyyy HH:mm"
                  selected={
                    game.startDate ? moment(game.startDate).toDate() : null
                  }
                  onChange={onGameStartDateChangeHandler}
                  customInput={<Input />}
                />
              </div>
              <div className="col-4">
                <label className="mb-1" htmlFor="endDate">
                  End Date:
                </label>
                <ReactDatePicker
                  showTimeSelect
                  autoComplete="off"
                  id="date"
                  required
                  placeholderText="DD/MM/YYYY HH:mm"
                  dateFormat="dd/MM/yyyy HH:mm"
                  selected={game.endDate ? moment(game.endDate).toDate() : null}
                  onChange={onGameEndDateChangeHandler}
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
        )}
        {props.mode === "delete" && (
          <section>
            <h5 className="text-center">
              Game: {game.hallName} will be deleted!
            </h5>
            <p className="text-center">Are you sure to delete this game?</p>
          </section>
        )}
        <section className="modal-buttons d-flex justify-content-end">
          {props.mode === "add" && (
            <Button
              color="primary"
              sx={{ marginRight: "20px" }}
              aria-label=""
              type="submit"
              onClick={saveNewGame}
            >
              Create
            </Button>
          )}
          {props.mode === "edit" && (
            <Button
              color="primary"
              sx={{ marginRight: "20px" }}
              aria-label=""
              type="submit"
              onClick={editGameDetails}
            >
              Edit
            </Button>
          )}
          {props.mode === "delete" && (
            <Button
              color="danger"
              sx={{ marginRight: "20px" }}
              aria-label=""
              type="submit"
              onClick={deleteGameHandler}
            >
              Delete
            </Button>
          )}
          <Button color="neutral" aria-label="" onClick={closeModal}>
            Cancel
          </Button>
        </section>
      </ModalDialog>
    </Modal>
  );
};

export default GamePopup;
