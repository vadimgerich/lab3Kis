import express from "express";
import bugaltControler from "./controler";

const bugaltRouter = new express.Router();

bugaltRouter.get("/", bugaltControler.get);
bugaltRouter.get("/:id", bugaltControler.getById);
bugaltRouter.post("/", bugaltControler.post);
bugaltRouter.delete("/:id", bugaltControler.delete);
bugaltRouter.patch("/:id", bugaltControler.patch);

export default bugaltRouter;