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
      selector: (row: any) => row.id,
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
      name: "Player Height",
      selector: (row: any) => (row.userHeight ? row.userHeight : "-"),
      sortable: true,
      center: true,
    },
    {
      name: "Player Weight",
      selector: (row: any) => (row.userWeight ? row.userWeight : "-"),
      sortable: true,
      center: true,
    },
    {
      name: "Max Jump height",
      selector: (row: any) => (row.maxJumpHeight ? row.maxJumpHeight : "-"),
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
      console.log(users);
      const rows: any[] = [];
      users.forEach((user, index) => {
        const rowData = {
          id: index + 1,
          fullName: user.fullName,
          userHeight: user.characteristics.userHeight,
          userWeight: user.characteristics.userWeight,
          maxJumpHeight: user.characteristics.maxJumpHeight,
          playedGamesCount: user.characteristics.playedGamesCount,
          playerFeedback: 0,
        };
        rows.push(rowData);
      });
      console.log(data);
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
          itemWidth="177px"
        />
      )}
    </section>
  );
};

export default OverallRatingPage;
