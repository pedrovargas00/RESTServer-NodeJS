const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/config');
const fileUpload = require('express-fileupload');

class Server{

   constructor(){
      this.app = express();
      this.paths = {
         auth: '/api/auth',
         buscar: '/api/buscar',
         categorias: '/api/categorias',
         productos: '/api/productos',
         uploads: '/api/uploads',
         usuarios: '/api/usuarios'
      };
      //Conectar a base de datos
      this.conectarDB();
      //Midlewares
      this.middleware();
      this.routes();
   }

   async conectarDB(){
      await dbConnection();
   }

   middleware(){
      //CORS
      this.app.use(cors());
      //Lectura y parseo del body
      this.app.use(express.json());
      //Directorio público
      this.app.use(express.static('public'));
      //Carga de archivos
      this.app.use(fileUpload({
         useTempFiles : true,
         tempFileDir : '/tmp/',
         createParentPath: true
      }));
   }

   routes(){
      this.app.use(this.paths.auth, require('../routes/auth'));
      this.app.use(this.paths.buscar, require('../routes/buscar'));
      this.app.use(this.paths.categorias, require('../routes/categorias'));
      this.app.use(this.paths.productos, require('../routes/productos'));
      this.app.use(this.paths.uploads, require('../routes/uploads'));
      this.app.use(this.paths.usuarios, require('../routes/user'));
   }

   listen(){
      this.app.listen(process.env.PORT);
   }
}

module.exports = Server;