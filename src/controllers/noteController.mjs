import { matchedData, validationResult } from "express-validator";
import { Note } from "../db/noteModel.mjs";
import { firebasePushNotification } from "../config/firebase.pushNotification.config.mjs";

const addNoteController = async (request, response) => {
  const { user } = request;
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(400).send({ message: result.array() });
  const data = matchedData(request);
  data.userId = user?._id;
  try {
    const createNote = await Note.create(data);
    let pushNotifyPayload = {
      to: "dU5BB0vRRROqanD36Wyb5t:APA91bHb-LnffsSqMB5d_eYaDFxsvO1qXgrCQNA5TJUAL7_hVkkKHpSV8O-6ZnNE8si0aHxzhlpHFtl-adjsbPXugQP02UO1LFcB565Hx_gCFSTxUImXLQRXPrFyOi18Z-4yCRgpf4NY",
      notification: {
        title: data?.title,
        body: data?.description,
      },
    };
    firebasePushNotification().send(pushNotifyPayload, (err, _response) => {
      if (err) {
        console.log("Something has gone wrong!", err);
      } else {
        console.log("Successfully sent with response: ", _response);
        return response.status(201).send({
          message: "Note Added Successfully",
          data: createNote,
        });
      }
    });
  } catch (error) {
    return response.statusSend(500);
  }
};

const fetchNotesController = async (request, response) => {
  const { user } = request;
  try {
    const getNotes = await Note.find({ userId: user?._id });
    return response
      .status(200)
      .send({ message: "Notes Fetched Successfully", data: getNotes });
  } catch (error) {
    return response.statusSend(500);
  }
};

export { addNoteController, fetchNotesController };
