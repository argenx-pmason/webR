import React, { useState } from "react";
import { DataGridPro, LicenseInfo } from "@mui/x-data-grid-pro";
import { Box, Tooltip, Button, TextField, Grid } from "@mui/material";
import Graph from "./Graph"; // make your own components
import "./App.css";
import sashelp from "./sashelp.json";
import { WebR } from "webr";

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
    },
    // webR = new WebR(),
    webR = new WebR({ interactive: false }),
    [code1, setCode1] = useState(`
webr::canvas()
plot(rnorm(1000), rnorm(1000),
     xlab="x axis label", ylab="y axis label",
     main="An rnorm plot")
dev.off()
  `),
    [code2, setCode2] = useState(`rnorm(10,5,1)`),
    [code3, setCode3] = useState(`
webr::canvas()
library(datasets)
library(ggplot2)
ggplot(mpg, aes(x = displ, y = hwy)) + geom_point()
dev.off()
`),
    [code4, setCode4] = useState(`
library(haven)
dat <- read_sas("cars.sas7bdat")
head(dat)
`),
    imageWidth = 600,
    imageHeight = 400,
    canvasR = async () => {
      await webR.init();
      await webR.evalRVoid(code1);
      const canvas = document.getElementById("plot-canvas"),
        context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      const msgs = await webR.flush();
      console.log(msgs);
      msgs.forEach((msg) => {
        if (msg.type === "canvas" && msg.data.event === "canvasImage") {
          canvas
            .getContext("2d")
            .drawImage(msg.data.image, 0, 0, imageWidth, imageHeight);
        } else {
          console.log(msg);
        }
      });
    },
    textR = async () => {
      await webR.init();
      const res = await webR.evalR(code2),
        output = await res.toArray();
      setResult(output);
    },
    sas = async () => {
      await webR.init();
      await webR.installPackages(["haven"], true);
      const res = await webR.evalR(code4),
        output = await res.toArray();
      setResult(output);
    },
    ggplot = async () => {
      await webR.init();
      await webR.installPackages(["jsonlite", "ggplot2", "datasets"], true);
      await webR.evalRVoid(code3);
      const canvas = document.getElementById("plot-canvas"),
        context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      const msgs = await webR.flush();
      console.log(msgs);
      msgs.forEach((msg) => {
        if (msg.type === "canvas" && msg.data.event === "canvasImage") {
          canvas
            .getContext("2d")
            .drawImage(msg.data.image, 0, 0, imageWidth, imageHeight);
        } else {
          console.log(msg);
        }
      });
    },
    [result, setResult] = useState(null);

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            id="code1"
            label="R graphic code"
            placeholder="Enter some R code to generate graphics"
            value={code1}
            onChange={(e) => setCode1(e.target.value)}
            multiline
            sx={{ mr: 2, mb: 2, width: 600 }}
          />
          <TextField
            id="code2"
            label="R non-graphic code"
            placeholder="Enter some R code to generate text output"
            value={code2}
            onChange={(e) => setCode2(e.target.value)}
            multiline
            sx={{ mr: 2, width: 600 }}
          />
          <TextField
            id="code3"
            label="R ggplot code"
            placeholder="Enter some R code to generate ggplot output"
            value={code3}
            onChange={(e) => setCode3(e.target.value)}
            multiline
            sx={{ mr: 2, width: 600 }}
          />
          <p />
          <Button variant="contained" onClick={canvasR} sx={{ mr: 2 }}>
            Run R graphic code
          </Button>
          <Button variant="contained" onClick={textR} sx={{ mr: 2 }}>
            Run R non-graphic code
          </Button>
          <Button variant="contained" onClick={ggplot} sx={{ mr: 2 }}>
            Run R ggplot
          </Button>
          <Button variant="contained" onClick={sas}>
            Read SAS dataset
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Box>{result}</Box>
          <canvas id="plot-canvas" width="600" height="400"></canvas>
        </Grid>
        {/* example of ternary operator, can be used to decide what to show */}
        {rows.length > 19 ? "--> You have added rows <--" : null}
        {/* We can use components from libraries we import */}
        <Grid item xs={6}>
          <DataGridPro
            columns={cols}
            rows={rows}
            // sx can override most CSS properties
            sx={{
              backgroundColor: "lightblue",
              width: 500,
              height: 400,
              m: 10,
            }}
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
        </Grid>
        <Grid item xs={6}>
          <Graph data={sashelp.cars} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
