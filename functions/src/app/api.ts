import * as express from "express";
import * as cors from "cors";
import { audioToSpeech } from "../actions/audio";

const app = express();

app.use(cors({ origin: true }));

app.use((req, res, next) => {
  const { auth } = req.headers;
  if (!auth || auth !== "auth-token") {
    res.status(401).send("Unauthorized: Missing auth header");
    return;
  }

  next();
});

app.post("/audio", audioToSpeech);

export default app;
