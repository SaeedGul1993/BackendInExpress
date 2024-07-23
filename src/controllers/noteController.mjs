import { matchedData, validationResult } from "express-validator";
import { Note } from "../db/noteModel.mjs";

const addNoteController = async (request, response) => {
  const { user } = request;
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(400).send({ message: result.array() });
  const data = matchedData(request);
  console.log("user", user);
  data.userId = user?._id;
  try {
    const createNote = await Note.create(data);
    return response.status(201).send({
      message: "Note Added Successfully",
      data: createNote,
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
