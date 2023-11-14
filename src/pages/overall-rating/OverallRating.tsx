import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

import { getAllUsers, getUserDataFromStore } from "../../utils/storeManager";

import classes from "./OverallRating.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TableSkeleton from "../../skeletons/TableSkeleton";

const OverallRatingPage = () => {
  const userData = useSelector(getUserDataFromStore);
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, setData] = useState<any[]>([]);

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
          rowCount={7}
          itemHeight="40px"
          itemWidth="175px"
        />
      )}
    </section>
  );
};

export default OverallRatingPage;
