import React, { useState } from "react";
import { DataGridPro, LicenseInfo } from "@mui/x-data-grid-pro";
import { Box, Tooltip, Button } from "@mui/material";
import "./App.css";

function App() {
  LicenseInfo.setLicenseKey(
    "5b931c69b031b808de26d5902e04c36fTz00Njk0NyxFPTE2ODg4MDI3MDM3MjAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
  );
  const cols = [{ field: "info", headerName: "Info", width: 200 }],
    [rows, setRows] = useState([{ id: 1, info: "123" }]),
    add = () => {
      const seconds = Date.now(),
        tempRows = [...rows, { id: seconds, info: seconds.toString() }];
      setRows(tempRows);
    },
    remove = () => {
      const tempRows = [...rows];
      tempRows.pop();
      setRows(tempRows);
    };

  return (
    <>
      <h1>Example</h1>
      <Box
        sx={{
          backgroundColor: "lightyellow",
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        Here's a MUI Data Grid in a MUI Box
        <DataGridPro
          columns={cols}
          rows={rows}
          sx={{ backgroundColor: "lightblue", width: 500, height: 400, m: 10 }}
        />
        <Tooltip title="add data">
          <Button onClick={add}>Add</Button>
        </Tooltip>
        {rows.length > 5 && (
          <Tooltip title="remove data">
            <Button onClick={remove}>Remove</Button>
          </Tooltip>
        )}
      </Box>
    </>
  );
}

export default App;
