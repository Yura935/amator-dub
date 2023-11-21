import { Input } from "@mui/joy";

import classes from "./Filter.module.scss";

const Filter = (props: {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
}) => {
  const { filterText, onFilter, onClear } = props;

  return (
    <Input
      value={filterText}
      onChange={onFilter}
      placeholder="Filter by FullName"
      endDecorator={
        <div className={classes.closeIcon} onClick={onClear}>
          X
        </div>
      }
    />
  );
};

export default Filter;
