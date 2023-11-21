import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  getAllUsers,
  getFeedbacks,
  getUserDataFromStore,
  useStore,
} from "../../utils/storeManager";
import { IFeedback } from "../../interfaces/feedback";
import TableSkeleton from "../../skeletons/TableSkeleton";
import { db } from "../../firebase";

import classes from "./OverallRating.module.scss";

const OverallRatingPage = () => {
  const userData = useSelector(getUserDataFromStore);
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const feedbacks = useSelector(getFeedbacks);
  const { initializeFeedbacks } = useStore();

  const users = useSelector(getAllUsers);

  const columns = [
    {
      name: "",
      selector: (row: any, index: any) => index + 1,
      width: "50px",
      center: true,
    },
    {
      name: "FullName",
      selector: (row: any) => row.fullName,
      sortable: true,
      center: true,
    },
    {
      name: "Age",
      selector: (row: any) => row.age,
      sortable: true,
      center: true,
    },
    {
      name: "Player Height",
      selector: (row: any) => (row.userHeight ? row.userHeight : null),
      sortable: true,
      center: true,
    },
    {
      name: "Player Weight",
      selector: (row: any) => (row.userWeight ? row.userWeight : null),
      sortable: true,
      center: true,
    },
    {
      name: "Max Jump height",
      selector: (row: any) => (row.maxJumpHeight ? row.maxJumpHeight : null),
      sortable: true,
      center: true,
    },
    {
      name: "Played Games Count",
      selector: (row: any) => (row.playedGamesCount ? row.playedGamesCount : 0),
      sortable: true,
      center: true,
    },
    {
      name: "Player Rating/Feedback",
      selector: (row: any) => (row.playerFeedback ? row.playerFeedback : 0),
      sortable: true,
      center: true,
    },
  ];

  useEffect(() => {
    if (users.length && !isDataLoaded) {
      const rows: any[] = [];
      users.forEach((user, index) => {
        let userFeedbackEstimate = 0;
        let count = 0;
        const currentUserFeedback = feedbacks.filter(
          (feedback) => feedback.receiver.uid === user.uid
        );
        currentUserFeedback.forEach((fb) => {
          userFeedbackEstimate += Number(fb.estimate);
          count++;
        });
        const rowData = {
          id: index + 1,
          fullName: user.fullName,
          age: user.age,
          userHeight: user.characteristics.userHeight,
          userWeight: user.characteristics.userWeight,
          maxJumpHeight: user.characteristics.maxJumpHeight,
          playedGamesCount: user.characteristics.playedGamesCount,
          playerFeedback: Math.round(userFeedbackEstimate / count) | 0,
          uid: user.uid,
        };
        rows.push(rowData);
      });
      setData(rows);
      setIsDataLoaded(true);
    }
  }, [users]);

  const viewPlayerProfile = (event: any) => {
    navigate(`user/${event.target.id}`);
  };

  useEffect(() => {
    if (!feedbacks.length) {
      getDocs(collection(db, "feedbacks")).then((querySnapshot) => {
        const receivedFeedbacks = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        initializeFeedbacks(receivedFeedbacks as IFeedback[]);
      });
    }
  }, []);

  const conditionalRowStyles = [
    {
      when: (row: any) => row.uid === userData.uid,
      style: {
        backgroundColor: "#6c757d",
        color: "white",
      },
    },
  ];

  // A super simple expandable component.
  //   const ExpandedComponent = (props: { data: any }) => (
  //     <pre>{JSON.stringify(props.data, null, 2)}</pre>
  //   );

  //   const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

  return (
    <section className={classes.rating}>
      {isDataLoaded && (
        <DataTable
          pagination
          //   dense
          columns={columns}
          data={data}
          defaultSortFieldId={8}
          defaultSortAsc={false}
          conditionalRowStyles={conditionalRowStyles}
          // selectableRowsComponent={<input type="checkbox" />}
          // selectableRowsComponentProps={selectProps}
          // sortIcon={sortIcon}
          // expandableRows
          // expandableRowsComponent={ExpandedComponent}
        />
      )}
      {!isDataLoaded && (
        <TableSkeleton
          colCount={columns.length}
          rowCount={15}
          itemHeight="40px"
          itemWidth="154px"
        />
      )}
    </section>
  );
};

export default OverallRatingPage;
