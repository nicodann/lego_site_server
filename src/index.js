import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"))

app.get("/api/v1/users", (req,res) => {
  const users = [
    {id:1, name: "John Doe" },
    {id: 2, name: "Jane Doe" },
  ];

  return res.status(200).json({ users });
});

app.listen(5001, () => {
  console.log("App listening on port 5001!");
})