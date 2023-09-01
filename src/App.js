import React, { useState } from "react";
import { DataGridPro, LicenseInfo } from "@mui/x-data-grid-pro";
import { Box, Tooltip, Button } from "@mui/material";
import Graph from "./Graph"; // make your own components
import "./App.css";
import sashelp from "./sashelp.json";

function App() {
  LicenseInfo.setLicenseKey(
    "369a1eb75b405178b0ae6c2b51263cacTz03MTMzMCxFPTE3MjE3NDE5NDcwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
  );
  const // define the columns we want in the table (field names are case sensitive)
    cols = [
      { field: "Name" },
      { field: "Sex" },
      { field: "Age" },
      { field: "Height" },
      { field: "Weight" },
    ],
    // pick the dataset we want, but also add a unique id for each row (which is required)
    [rows, setRows] = useState(
      // map function will go through each element of an Array, returning a new element so we can modify things
      sashelp.class.map((r, id) => {
        return { id: id, ...r };
      })
    ),
    // button to add a row (for demo purposes)
    add = () => {
      const seconds = Date.now(),
        tempRows = [...rows, { id: seconds, Name: seconds.toString() }];
      setRows(tempRows);
    },
    // button to remove a row (for demo purposes)
    remove = () => {
      const tempRows = [...rows];
      tempRows.pop();
      setRows(tempRows);
    };

  return (
    <>
      {/* we can use standard HTML */}
      <h1>Example</h1>
      {/* example of ternary operator, can be used to decide what to show */}
      {rows.length > 19 ? "--> You have added rows <--" : null}
      {/* We can use components from libraries we import */}
      <Box
        sx={
          {
            // backgroundColor: "lightyellow",
            // fontSize: 12,
            // fontWeight: "bold",
          }
        }
      >
        Here's a Material UI Data Grid in a Material UI Box
        <DataGridPro
          columns={cols}
          rows={rows}
          // sx can override most CSS properties
          sx={{ backgroundColor: "lightblue", width: 500, height: 400, m: 10 }}
        />
        <Tooltip title="add data">
          <Button onClick={add}>Add</Button>
        </Tooltip>
        {/* we can use conditions to make components appear under certain conditions */}
        {rows.length > 5 && (
          <Tooltip title="remove data">
            <Button onClick={remove}>Remove</Button>
          </Tooltip>
        )}
        <Graph data={sashelp.cars} />
      </Box>
    </>
  );
}

export default App;
