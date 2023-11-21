const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

setInterval(() => console.log("running"), 1000);

let allMetrics = [];

app.get("/metrics", (_req, res) => {
  const cdi = "13.65";
  const selic = "13.25";
  const ipca = "8.19";
  // const cdi = "12.65";
  // const selic = "12.25";
  // const ipca = "5.19";
  const metrics = [
    "# HELP financial_index_value Current Financial Index Value",
    "# TYPE financial_index_value gauge",
    `financial_index_value{service="index-tracker",name="SELIC"} ${selic}`,
    `financial_index_value{service="index-tracker",name="CDI"} ${cdi}`,
    `financial_index_value{service="index-tracker",name="IPCA"} ${ipca}`,
    `financial_index_tracker_keeper_value{service="index-tracker"} ${
      allMetrics.length + 1
    }`,
  ];

  if (allMetrics.length > 1300) {
    allMetrics = [];
  }
  allMetrics.push(metrics);

  res.set("content-type", "text/plain");
  res.send(metrics.join("\n"));
});

app.listen(3000, () => console.log("app is running"));
