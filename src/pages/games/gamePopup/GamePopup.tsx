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
import { useEffect, useMemo, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { useSelector } from "react-redux";

import { GameLevel } from "../../../types/gameLevel";
import { IFeedback } from "../../../interfaces/feedback";
import { IGame } from "../../../interfaces/game";
import { IPlayer } from "../../../interfaces/player";
import ToggleGroupToolbar from "../../../components/toggleGroupToolbar/ToggleGroupToolbar";
import { getUserDataFromStore } from "../../../utils/storeManager";

import classes from "./GamePopup.module.scss";
import { toast } from "react-toastify";
import Toastr from "../../../components/toastr/Toastr";

const GamePopup = (props: {
  open: boolean;
  onClose: () => void;
  onActionGame: (game: IGame) => void;
  mode: string;
  game?: IGame;
  onGameDelete?: (game: IGame) => void;
  onSendFeedback?: (feedback: IFeedback) => void;
  receiverPlayer?: IPlayer;
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
  const feedbackOptions = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);
  const [feedbackEstimate, setFeedbackEstimate] = useState<string | null>(null);
  const feedbackMessageRef = useRef<HTMLTextAreaElement>(null);

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

  const onChangeEstimateHandler = (event: any) => {
    setFeedbackEstimate(event.target.value);
  };

  const submitSendingFeedback = () => {
    if (feedbackEstimate) {
      const feedback: IFeedback = {
        docId: "",
        estimate: feedbackEstimate,
        message: feedbackMessageRef.current!.value,
        gameId: props.game!.docId!,
        author: {
          avatar: userData.avatar,
          fullName: userData.fullName,
          gameId: props.game!.docId!,
          uid: userData.uid,
        },
        receiver: props.receiverPlayer!,
      };
      props.onSendFeedback!(feedback);
      closeModal();
    } else {
      toast.warn(
        <Toastr itemName="Empty field" message="You have to choose estimate!" />
      );
    }
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
        {props.mode === "feedback" && (
          <section className={classes.feedback}>
            <h4 className={classes.title}>
              How can you evaluate a player&apos;s performance?
            </h4>
            <div className={classes.options}>
              {feedbackOptions.map((option) => (
                <div key={option} className={classes.option}>
                  <label
                    htmlFor={`option_${option}`}
                    className={`${classes.controls} ${classes["control-selection"]}`}
                  >
                    <input
                      className={classes["radio-check"]}
                      type="radio"
                      role="radio"
                      name="option"
                      id={`option_${option}`}
                      value={option}
                      onChange={onChangeEstimateHandler}
                    />
                    <span className={classes["control-label"]}>{option}</span>
                    <span className={classes.blinker}></span>
                  </label>
                </div>
              ))}
            </div>
            <div className={classes.additionalInfo}>
              <div className={classes.label}>
                <span>Looser</span>
              </div>
              <div className={classes.label}>
                <span>Best player</span>
              </div>
            </div>
            <h5 className={classes.additionalTitle}>Additional feedback</h5>
            <textarea
              className={classes.message}
              name="feedbackMessage"
              id="feedbackMessage"
              placeholder="Please provide your feedback here..."
              ref={feedbackMessageRef}
            ></textarea>
            {/* <Textarea
              name="feedbackMessage"
              sx={{ minHeight: "100px", marginBottom: "10px" }}
              placeholder="Please provide your feedback here..."
              ref={feedbackMessageRef}
            /> */}
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
          {props.mode === "feedback" && (
            <Button
              color="primary"
              sx={{ marginRight: "20px" }}
              aria-label=""
              type="submit"
              onClick={submitSendingFeedback}
            >
              Submit
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
