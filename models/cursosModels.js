var pool = require('./bd');

async function getCursos() {
    var query = 'select * from cursos join teatros on cursos.id_teatro = teatros.id_teatro ';
    var rows = await pool.query(query);
    return rows
}

async function insertCursos(obj) {
    try {
        var query = 'insert into cursos set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteCursosById(id) {
    var query = 'delete from cursos where id_curso = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getCursoById(id) {
    var query = 'select * from cursos where id_curso = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function updateCursoById(obj, id) {
    try {
        var query = 'update cursos set ? where id_curso = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
    
}
module.exports = { getCursos, insertCursos, deleteCursosById, getCursoById, updateCursoById }