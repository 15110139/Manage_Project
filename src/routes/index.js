import express from "express";

const router = express.Router();

import RouteV1 from "./v1";
// API V1
router.use("/v1", RouteV1);

export default router;
