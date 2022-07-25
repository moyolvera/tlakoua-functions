import speech from "@google-cloud/speech";
import { Request, Response } from "firebase-functions/v1";

/**
 *
 * Function to return the audio transcription of a given audio file.
 *   request: {
 *     audio: Base64 encoded audio file
 *     encoding: Encoding of the audio file (OGG_OPUS or LINEAR16)
 *     languageCode: Language code of the audio file (en-US or es-MX)
 *     sampleRateHertz: Sample rate of the audio file (16000 or 48000)
 *   }
 */
async function audioToSpeech(request: Request, response: Response) {
  const client = new speech.SpeechClient();

  const {
    audio: requestedAudio,
    encoding,
    sampleRateHertz,
    languageCode,
  } = request.body as {
    audio: string;
    encoding: "OGG_OPUS" | "LINEAR16";
    languageCode: string;
    sampleRateHertz: number;
  };

  if (!requestedAudio || !encoding || !languageCode || !sampleRateHertz) {
    response.status(400).send("Missing required parameters");
    return;
  }

  const audio = {
    content: requestedAudio,
  };

  const config = {
    encoding,
    sampleRateHertz,
    languageCode,
  };

  const requestSpeech = {
    audio: audio,
    config: config,
  };

  try {
    const [result] = await client.recognize(requestSpeech);
    response.send({ result });
  } catch (error) {
    response.status(400).send(error);
  }
}

export { audioToSpeech };
