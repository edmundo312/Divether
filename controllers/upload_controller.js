import moment from "moment";
import path from 'path';
import multer from "multer";
import fs from "fs-extra";
// import { Localizacion } from "../models/localizacion.js";
// import { Cat_tipo_reporte } from "../models/cat_tipo_reporte.js";

console.log('Desde upload');

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
      const { body } = req;
      console.log('body1',body);
      // const {originalname} = file;
      // console.log('file',originalname);
    //   const localizacion = await Localizacion.findOne({where:{localizacion_id: body.localizacion_id}});
      // console.log(moment);
      const existe_carpeta = fs.existsSync(`public/reportes`);
      const existe_subcarpeta = fs.existsSync(`public/reportes/`);

      //se crea carpeta reportes
      if(!existe_carpeta){
        fs.mkdirSync(`public/reportes`);
      }

      //se crean subcarpetas
      if(!existe_subcarpeta){
        fs.mkdirSync(`public/reportes/`);
      }
      
      cb(null, `public/img/`)
    },
    
    filename: async function (req, file, cb) {
      const { body } = req;
      console.log('body  upload2',body);
    //   const localizacion = await Localizacion.findOne({where:{localizacion_id: body.localizacion_id}});
    //   const reporte = await Cat_tipo_reporte.findOne({where:{cat_tipo_reporte_id: body.cat_tipo_reporte_id}});
      // console.log(reporte);
      // let archivos = fs.readdirSync(`public/reportes/`);
      const extencion = path.extname(file.originalname);
      const {originalname} = file;
      // calcula el número de archivos que hay en la carpeta
      // const archivos_ =archivos.map(archivo => {
      //   return archivo
      // });
      // const fecha = moment().format('DDMMYYYY');

      // cb(null, `Reporte_estadistica_basica_${body.reporte_titulo}_${body.reporte_version}${extencion}`)
      // cb(null, `Reporte_estadistica_basica_${body.reporte_titulo}_${reporte.cat_tipo_reporte_nombre}_${localizacion.localizacion_nombre}_${body.reporte_version}_${fecha}${extencion}`)
      cb(null, `${originalname}`)
    }
  })

export const upload = multer({ storage: storage }).single('archivo');