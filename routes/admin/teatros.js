var express = require('express');
var router = express.Router();
var teatrosModels = require('../../models/teatrosModels');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {
    let teatros = await teatrosModels.getTeatros();

    teatros = teatros.map(teatro => {
        if (teatro.img_id_teatro) {
            const imagen = cloudinary.image(teatro.img_id_teatro, {
                width: 50,
                height: 50,
                crop: 'fill'
            });
            return {
                ...teatro,
                imagen
            }
        } else {
            return {
                ...teatro,
                imagen: ''
            }
        }
    })

    res.render('admin/teatros', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        teatros
    });
});

router.get('/insertTeatros', async function (req, res, next) {
    res.render('admin/insertTeatros', {
        layout: 'admin/layout',
    });
});

router.post('/insertTeatros', async function (req, res, next) {
    var img_id_teatro = '';

    if (req.files && Object.keys(req.files).length > 0) {
        let imagen = req.files.imagen;
        let img_id_teatro = (await uploader(imagen.tempFilePath)).public_id;
    }

    try {
        if (req.body.nombre_teatro != "" && req.body.direccion != "" && req.body.mail != "") {
            await teatrosModels.insertTeatros({
                ...req.body,
                img_id_teatro
            });

            res.redirect('/admin/teatros');
        } else {
            res.render('admin/insertTeatros', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/insertTeatros', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo cargar el teatro',
        });
    };
});

router.get('/deleteTeatros/:id', async (req, res, next) => {
    let id = req.params.id;
    let teatro = await teatrosModels.getTeatroById(id);

    if (teatro.img_id_teatro) {
        await (destroy(teatro.img_id_teatro));
    }

    await teatrosModels.deleteTeatrosById(id);
    res.redirect('/admin/teatros');
});

router.get('/updateTeatros/:id', async (req, res, next) => {
    let id = req.params.id;
    let teatro = await teatrosModels.getTeatroById(id);

    res.render('admin/updateTeatros', {
        layout: 'admin/layout',
        teatro
    });
});

router.post('/updateTeatros', async (req, res, next) => {
    try {
        let img_id_teatro = req.body.img_original;
        let deleteOriginalImg = false;

        if (req.body.img_delete === '1') {
            deleteOriginalImg = true;   
            img_id_teatro = null;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                var imagen = req.files.imagen;
                img_id_teatro = (await uploader(imagen.tempFilePath)).public_id;
                deleteOriginalImg = true;
            }
        }

        if (deleteOriginalImg && req.body.img_original) {
            await destroy(req.body.img_original);
        }

        let obj = {
            nombre_teatro: req.body.nombre_teatro,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            mail: req.body.mail,
            img_id_teatro
        }

        await teatrosModels.updateTeatroById(obj, req.body.id_teatro);
        res.redirect('/admin/teatros');

    } catch (error) {
        console.log(error);
        res.render('/updateTeatros', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar el teatro'
        })
    }
})

module.exports = router;