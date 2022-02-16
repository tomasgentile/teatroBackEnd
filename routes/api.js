var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
var obrasModels = require('./../models/obrasModels');
var cursosModels = require('./../models/cursosModels');
var teatrosModels = require('./../models/teatrosModels');
var nodemailer = require('nodemailer');

router.get('/obras', async function (req, res, next) {
    let obras = await obrasModels.getObras();

    obras = obras.map(obra => {
        if (obra.img_id_obra) {
            const imagen = cloudinary.url(obra.img_id_obra, {
                width: 185,
                height: 185,
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

    res.json(obras);
});

router.get('/cursos', async function (req, res, next) {
    let cursos = await cursosModels.getCursos();

    cursos = cursos.map(curso => {
        curso.fecha_inicio = curso.fecha_inicio.toISOString().split('T')[0];
        curso.fecha_fin = curso.fecha_fin.toISOString().split('T')[0];
        console.log(curso.fecha_inicio);
        if (curso.img_id_curso) {
            const imagen = cloudinary.url(curso.img_id_curso, {
                width: 185,
                height: 185,
                crop: 'fill'
            });
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

    res.json(cursos);
});

router.get('/teatros', async function (req, res, next) {
    let teatros = await teatrosModels.getTeatros();

    teatros = teatros.map(teatro => {
        if (teatro.img_id_teatro) {
            const imagen = cloudinary.url(teatro.img_id_teatro, {
                width: 185,
                height: 185,
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
    });

    res.json(teatros);
});

router.post('/contacto', async (req, res) => {
    const mail = {
        to: 'tomasgentile@gmail.com',
        subject: 'Contacto web',
        html: `${req.body.nombre} se contacto a traves de la web: <br>
        email: ${req.body.email} <br> 
        Telefono: ${req.body.telefono} <br>
        Mensaje: ${req.body.mensaje} <br>`
    }
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    await transport.sendMail(mail);

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    });
})

module.exports = router;