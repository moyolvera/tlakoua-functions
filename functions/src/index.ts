import * as functions from "firebase-functions";
import app from "./app/api";

exports.api = functions.https.onRequest(app);
