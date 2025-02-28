import express from "express";
import {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  assignTeam,
} from "../controllers/teamController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTeams).post(protect, admin, createTeam);
router
  .route("/:id")
  .get(getTeamById)
  .put(protect, admin, updateTeam)
  .delete(protect, admin, deleteTeam);
router.route("/assign/:id").post(protect, admin, assignTeam);
export default router;
