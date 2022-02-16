var express = require('express');
var router = express.Router();
var obrasModels = require('../../models/obrasModels');
var teatrosModels = require('../../models/teatrosModels');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {
    let obras = await obrasModels.getObras();
    obras = obras.map(obra => {
        if (obra.img_id_obra) {
            const imagen = cloudinary.image(obra.img_id_obra, {
                width: 50,
                height: 50,
                crop: 'fill'
            });
            return {
                ...obra,
                imagen
            }
        } else {
            return {
                ...obra,
                imagen: ''
            }
        }
    })

    res.render('admin/obras', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        obras
    });
});

router.get('/insertObras', async function (req, res, next) {
    let teatros = await teatrosModels.getTeatros();

    res.render('admin/insertObras', {
        layout: 'admin/layout',
        teatros
    });
});

router.post('/insertObras', async function (req, res, next) {
    let teatros = await teatrosModels.getTeatros();
    var img_id_obra = '';

    if (req.files && Object.keys(req.files).length > 0) {
        var imagen = req.files.imagen;
        img_id_obra = (await uploader(imagen.tempFilePath)).public_id;
    }

    try {
        if (req.body.nombre_obra != "" && req.body.id_teatro != "" && req.body.elenco != "" && req.body.direccion != "" && req.body.resumen != "" && req.body.horario_funciones != "" && req.body.fecha_inicio != "" && req.body.fecha_fin != "") {
            await obrasModels.insertObras({
                ...req.body,
                img_id_obra
            });

            res.redirect('/admin/obras');
        } else {
            res.render('admin/insertObras', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos',
                teatros
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/insertObras', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo cargar la obra',
            teatros
        });
    };
});

router.get('/deleteObras/:id', async (req, res, next) => {
    let id = req.params.id;

    await obrasModels.deleteObrasById(id);
    res.redirect('/admin/obras');
});

router.get('/updateObras/:id', async (req, res, next) => {
    let id = req.params.id;
    let teatros = await teatrosModels.getTeatros();
    let obra = await obrasModels.getObrasById(id);
    obra.fecha_inicio = obra.fecha_inicio.toISOString().split('T')[0];
    obra.fecha_fin = obra.fecha_fin.toISOString().split('T')[0];

    res.render('admin/updateObras', {
        layout: 'admin/layout',
        obra,
        teatros
    });
});

router.post('/updateObras', async (req, res, next) => {
    try {
        let img_id_obra = req.body.img_original;
        let deleteOriginalImg = false;

        if (req.body.img_delete === '1') {
            img_id_obra = null;
            deleteOriginalImg = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                var imagen = req.files.imagen;
                img_id_obra = (await uploader(imagen.tempFilePath)).public_id;
                deleteOriginalImg = true;
            }
        }
        if (deleteOriginalImg && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

        let obj = {
            nombre_obra: req.body.nombre_obra,
            id_teatro: req.body.id_teatro,
            elenco: req.body.elenco,
            direccion: req.body.direccion,
            resumen: req.body.resumen,
            horario_funciones: req.body.horario_funciones,
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            clasificacion: req.body.clasificacion,
            img_id_obra
        }

        await obrasModels.updateObrasById(obj, req.body.id_obra);
        res.redirect('/admin/obras');
    } catch (error) {
        console.log(error);
        res.render('admin/updateObras', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar la obra'
        });
    }
})

module.exports = router;