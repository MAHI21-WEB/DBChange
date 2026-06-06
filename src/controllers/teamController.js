const teamService = require("../services/teamService");

async function getTeams(req, res) {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
}

async function createTeam(req, res) {
    try {
        const { team_name, leader_name } = req.body;

        const team = await teamService.createTeam(
            team_name,
            leader_name
        );
        res.status(201).json(team);
    }
    catch(err) {

        res.status(500).json({
            message: err.message
        });
    }
}

async function updateTeam(req, res) {
    try {
        const { status } = req.body;
        const team = await teamService.updateTeam(
            req.params.id,
            status
        );
        res.status(200).json(team);
    }
    catch(err) {

        res.status(500).json({
            message: err.message
        });
    }
}

async function deleteTeam(req, res) {
    try {
        const team = await teamService.deleteTeam(
            req.params.id
        );
        res.status(200).json(team);
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    getTeams,
    createTeam,
    updateTeam,
    deleteTeam
};