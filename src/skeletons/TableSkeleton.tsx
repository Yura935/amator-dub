import { memo } from "react";

const TableSkeleton = (props: {
  colCount: number;
  rowCount: number;
  itemHeight: string;
  itemWidth: string;
}) => {
  const rowArr: any[] = [];
  for (let i = 0; i < props.rowCount; i++) {
    rowArr.push({});
  }
  const colArr: any[] = [];
  for (let j = 0; j < props.colCount; j++) {
    colArr.push({});
  }
  return (
    <div
      className="placeholder-glow"
      style={{ backgroundColor: "#fff", padding: "10px" }}
    >
      {rowArr.map((row, index) => (
        <div key={index} className="d-flex justify-content-between">
          {colArr.map((cal, i) => (
            <div
              className="placeholder"
              key={i}
              style={{
                height: props.itemHeight,
                width: props.itemWidth,
                marginRight: "5px",
                marginBottom: "5px",
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(TableSkeleton);
