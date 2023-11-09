import { Avatar, Button, Textarea } from "@mui/joy";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";

import {
  getCurrentGame,
  getUserDataFromStore,
  useStore,
} from "../../../utils/storeManager";
import { IComment } from "../../../interfaces/comment";
import Toastr from "../../toastr/Toastr";
import { db } from "../../../firebase";

import classes from "./GameComments.module.scss";

const GameComments = (props: any) => {
  const { isYouPlayer } = props;
  const userData = useSelector(getUserDataFromStore);
  const currentGame = useSelector(getCurrentGame);
  const [commentMessage, setCommentMessage] = useState("");
  const [isNewComment, setIsNewComment] = useState(false);
  const [comments, setComments] = useState(currentGame.comments!);
  const { addComment } = useStore();

  const onCommentMessageChangeHandler = (event: any) => {
    setCommentMessage(event.target.value);
  };

  const addCommentToGame = () => {
    const comment: IComment = {
      message: commentMessage,
      creationDate: moment().toString(),
      author: {
        docId: userData.docId,
        uid: userData.uid,
        avatar: userData.avatar,
        fullName: userData.fullName,
      },
    };

    updateDoc(doc(db, "games", currentGame.docId!), {
      ...currentGame,
      comments: [...currentGame.comments, comment],
    })
      .then((data) => {
        addComment(comment);
        setComments((prevState) => [...prevState, comment]);
        setIsNewComment(false);
        toast.success(
          <Toastr itemName="Success" message="Your comment was added!" />
        );
      })
      .catch((err) => {
        console.log(err);
        setIsNewComment(false);
        toast.error(<Toastr itemName="Error" message={err} />);
      });
  };

  const avatarNameFormatter = (name: string): string => {
    const words = name.split(" ");
    let newName = "";
    words.forEach((word) => {
      newName += word[0];
    });
    return newName;
  };

  return (
    <section className={classes.comments}>
      {!isNewComment && isYouPlayer && (
        <div className={classes.buttons}>
          <Button onClick={() => setIsNewComment(true)}>Add my comment</Button>
        </div>
      )}
      {!isNewComment && !comments?.length && (
        <div className={classes.empty}>
          {isYouPlayer
            ? "There are no comments for now!"
            : "There are no comments for now! You can add comment after joining the game."}
        </div>
      )}
      {isNewComment && (
        <>
          <Textarea
            name="comment"
            sx={{ minHeight: "100px", marginBottom: "10px" }}
            placeholder="Please provide your comment here..."
            value={commentMessage}
            onChange={onCommentMessageChangeHandler}
          />
          <div className={classes.actions}>
            <Button onClick={addCommentToGame}>Add comment</Button>
          </div>
        </>
      )}
      {!isNewComment && comments?.length > 0 && (
        <div className={classes.commentsList}>
          {comments.map((comm, index) => (
            <div key={index} className={classes.comment}>
              <Avatar src={comm.author.avatar} sx={{ marginRight: "20px" }}>
                {avatarNameFormatter(comm.author.fullName)}
              </Avatar>
              <div className={classes.messageBody}>
                <div className={classes.header}>
                  <h5 className={classes.username}>{comm.author.fullName}</h5>
                  <div className={classes.createdDate}>
                    {moment(comm.creationDate).format("DD/MM/yyyy HH:mm")}
                  </div>
                </div>
                <div className={classes.message}>{comm.message}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default GameComments;
