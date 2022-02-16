var express = require('express');
var router = express.Router();
var cursosModels = require('../../models/cursosModels');
var teatrosModels = require('../../models/teatrosModels');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {
    let cursos = await cursosModels.getCursos();

    cursos = cursos.map(curso => {
        if (curso.img_id_curso) {
            var imagen = cloudinary.image(curso.img_id_curso, {
                width: 50,
                height: 50,
                crop: 'fill'
            })
            return {
                ...curso,
                imagen
            }
        } else {
            return {
                ...curso,
                imagen: ''
            }
        }
    })
    
    res.render('admin/cursos', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        cursos
    });
});

router.get('/insertCursos', async function (req, res, next) {
    let teatros = await teatrosModels.getTeatros();

    res.render('admin/insertCursos', {
        layout: 'admin/layout',
        teatros
    });
});

router.post('/insertCursos', async function (req, res, next) {
    let teatros = await teatrosModels.getTeatros();
    var img_id_curso = '';

    if (req.files.imagen && Object.keys(req.files.imagen).length > 0) {
        var imagen = req.files.imagen;
        img_id_curso = (await uploader(imagen.tempFilePath)).public_id;
    }

    try {
        if (req.body.nombre_curso != "" && req.body.id_teatro != "" && req.body.docentes != "" && req.body.resumen != "" && req.body.horario_funciones != "" && req.body.fecha_inicio != "" && req.body.fecha_fin != "") {
            await cursosModels.insertCursos({
                ...req.body,
                img_id_curso
            });

            res.redirect('/admin/cursos');
        } else {
            res.render ('admin/insertCursos', {
                layout: 'admin/layout', 
                teatros,
                error: true, 
                message: 'Todos los campos son requeridos'
            });
        }
    } catch (error) {
        console.log(error);

        res.render('admin/insertCursos', {
            layout: 'admin/layout', 
            teatros,
            error: true,
            message: 'No se pudo cargar el curso'
        });
    };
});

router.get('/deleteCursos/:id', async (req, res, next) => {
    let id = req.params.id;
    let curso = await cursosModels.getCursoById(id)
    
    if (curso.img_id_curso) {
        await destroy(curso.img_id_curso);
    }
    
    await cursosModels.deleteCursosById(id);
    res.redirect('/admin/cursos');
})

router.get('/updateCursos/:id', async (req, res, next) => {
    let id = req.params.id;
    let teatros = await teatrosModels.getTeatros();
    let curso = await cursosModels.getCursoById(id);
    curso.fecha_inicio = curso.fecha_inicio.toISOString().split('T')[0];
    curso.fecha_fin = curso.fecha_fin.toISOString().split('T')[0];

    res.render('admin/updateCursos', {
        layout: 'admin/layout',
        curso,
        teatros,
        error: false
    })
})

router.post('/updateCursos', async (req, res, next) => {
    try {
        let img_id_curso = req.body.img_original;
        let deleteOriginalImg = false;

        if (req.body.img_delete === '1') {
            img_id_curso = null;
            deleteOriginalImg = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                var imagen = req.files.imagen;
                img_id_curso = (await uploader(imagen.tempFilePath)).public_id;
                deleteOriginalImg = true;
            }
        }

        if (deleteOriginalImg && req.body.img_original) {
            await destroy(req.body.img_original);
        }

        let obj = {
            nombre_curso: req.body.nombre_curso,
            id_teatro: req.body.id_teatro,
            docentes: req.body.docentes,
            resumen: req.body.resumen,
            horario: req.body.horario,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            clasificacion: req.body.clasificacion,
            img_id_curso
        }
        await cursosModels.updateCursoById(obj, req.body.id_curso);
        res.redirect('/admin/cursos');
    } catch (error) { 
        console.log(error);
        res.render('admin/updateCursos', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar el curso'
        })
        
    }
})

module.exports = router;