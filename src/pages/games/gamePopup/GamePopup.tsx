import {
  Button,
  Input,
  Modal,
  ModalDialog,
  Textarea,
  Typography,
} from "@mui/joy";
import { memo, useCallback, useState } from "react";
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
  onCreateGame: (game: IGame) => void;
}) => {
  const [hallName, setHallName] = useState("");
  const [maxPlayersCount, setMaxPlayersCount] = useState<string | number>("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [formats, setFormats] = useState<string[]>([]);
  const [color, setColor] = useState("");
  const [level, setLevel] = useState<GameLevel>(null);

  const userData = useSelector(getUserDataFromStore);

  const textareaConfigHandler = useCallback(
    (formats: string[], color: string) => {
      setFormats(formats);
      setColor(color);
    },
    []
  );

  const saveNewGame = useCallback(() => {
    const isItalic = formats.find((format) => format === "italic");
    const isBold = formats.find((format) => format === "bold");
    const isUnderlined = formats.find((format) => format === "underlined");
    const newGame: IGame = {
      hallName,
      status: "active",
      maxPlayersCount,
      playersCount: 0,
      players: [],
      date: date ? date.toString() : "",
      createdBy: userData?.fullName,
      createdDate: moment().toString(),
      location,
      level,
      notes: {
        text: notes,
        fontStyle: isItalic ? "italic" : "normal",
        fontWeight: isBold ? "bold" : "normal",
        textDecoration: isUnderlined ? "underline" : "none",
        color,
      },
    };
    props.onCreateGame(newGame);
  }, []);

  return (
    <Modal open={props.open} onClose={() => props.onClose()}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
      >
        <Typography id="basic-modal-dialog-title" level="h2">
          Creating new game
        </Typography>
        <section className={classes["modal-content"]}>
          <div className="row mb-3">
            <label className="mb-1" htmlFor="hallName">
              Hall name:
            </label>
            <Input
              id="hallName"
              placeholder="Enter hall name"
              required
              value={hallName}
              onChange={(event) => setHallName(event.target.value)}
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
              <ReactDatePicker
                showTimeSelect
                autoComplete="off"
                id="date"
                required
                placeholderText="DD/MM/YYYY"
                dateFormat="dd/MM/yyyy HH:mm"
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
          <Button color="neutral" aria-label="" onClick={() => props.onClose()}>
            Cancel
          </Button>
        </section>
      </ModalDialog>
    </Modal>
  );
};

export default memo(GamePopup);