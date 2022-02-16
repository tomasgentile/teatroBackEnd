var pool = require('./bd');

async function getTeatros() {
    var query = 'select * from teatros';
    var rows = await pool.query(query);
    return rows
}

async function insertTeatros(obj) {
    try {
        var query = 'insert into teatros set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteTeatrosById(id) {
    var query = 'delete from teatros where id_teatro = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getTeatroById(id) {
    var query = 'select * from teatros where id_teatro = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function updateTeatroById(obj, id) {
    try {
        var query = 'update teatros set ? where id_teatro = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getTeatros, insertTeatros, deleteTeatrosById, getTeatroById, updateTeatroById }