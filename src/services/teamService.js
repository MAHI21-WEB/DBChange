const pool = require("../config/db");

//return all teams in db
async function getAllTeams() {
    const result = await pool.query(
        "SELECT * FROM teams ORDER BY id"
    );
    return result.rows;
}

//create new team
async function createTeam(team_name, leader_name) {
    const result = await pool.query(
        `INSERT INTO teams(team_name, leader_name)
         VALUES($1,$2)
         RETURNING *`,
        [team_name, leader_name]
    );

    return result.rows[0];
}

//update team info
async function updateTeam(id, status) {
    const result = await pool.query(
        `UPDATE teams
         SET status=$1,
             updated_at=CURRENT_TIMESTAMP
         WHERE id=$2
         RETURNING *`,
        [status, id]
    );

    return result.rows[0];
}

//delete a team from db using id
async function deleteTeam(id) {
    const result = await pool.query(
        `DELETE FROM teams
         WHERE id=$1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
}
module.exports = {
    getAllTeams,
    createTeam,
    updateTeam,
    deleteTeam
};