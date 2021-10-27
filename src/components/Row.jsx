import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  row: {
    margin: "10px 12px",
  },
  label: {
    color: "grey",
    fontWeight: 400,
    flexGrow: 1,
    fontSize: 18,
    wordWrap: "break-word",
  },
  value: {
    color: "black",
    fontWeight: 600,
    flexGrow: 1,
    fontSize: 17,
    wordWrap: "break-word",
  },
});

const Row = ({ label, value }) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <Typography className={classes.label}>{label}</Typography>
      <Typography className={classes.value}>
        {value || "Not Available"}
      </Typography>
    </div>
  );
};

export default Row;
