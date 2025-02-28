import Team from "../models/Team.js";
import User from "../models/User.js";
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    const createdTeam = await team.save();
    res.status(201).json(createdTeam);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Invalid team data" });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      Object.assign(team, req.body);
      const updatedTeam = await team.save();
      res.json(updatedTeam);
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Invalid team data" });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      await team.remove();
      res.json({ message: "Team removed" });
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const assignTeam = async (req, res) => {
  try {
    const { userId, finalPrice } = req.body;
    const teamId = req.params.id;

    // Find the user for assignment
    const selectedUser = await User.findOne({ _id: userId });

    if (!selectedUser) {
      return res
        .status(400)
        .json({ message: "Could not find user for assignment." });
    }

    // Assign the team to the user
    selectedUser.ipl_team_id = teamId;
    selectedUser.Purse -= finalPrice;
    await selectedUser.save();

    return res.status(200).json({ message: "Team assigned successfully" });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
