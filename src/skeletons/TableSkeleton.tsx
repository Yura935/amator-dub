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
    <table className="placeholder-glow">
      {rowArr.map((row, index) => (
        <div key={index}>
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
    </table>
  );
};

export default memo(TableSkeleton);
