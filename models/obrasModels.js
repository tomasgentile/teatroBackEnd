var pool = require('./bd');

async function getObras() {
    var query = 'select * from obras join teatros on obras.id_teatro = teatros.id_teatro ';
    var rows = await pool.query(query);
    return rows
}

async function insertObras(obj) {
    try {
        var query = 'insert into obras set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteObrasById(id) {
    var query = 'delete from obras where id_obra = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getObrasById(id) {
    var query = 'select * from obras where id_obra = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function updateObrasById(obj, id) {
    try {
        var query = 'update obras set ? where id_obra = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getObras, insertObras, deleteObrasById, getObrasById, updateObrasById }