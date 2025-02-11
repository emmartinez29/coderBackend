import express from 'express';


const mascotas = []
let nextIdmascotas = 0
let USERS_DB = [
    {
        title: "Seiya de Pegaso",
        price: 888,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/seiya3.png",
        id: 1
    },
    {
        title: "Hyoga de Cisne",
        price: 997,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/cisne.png",
        id: 2
    },
    {
        title: "Shun de Andromeda",
        price: 547,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/andromeda.png",
        id: 3
    },    
    {
        title: "Ikki de Fenix",
        price: 1050,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/ikki.png",
        id: 4
    },
    {
        title: "Shiriu del Dragon",
        price: 1020,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/dragon.png",
        id: 5
    }
]
// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function crearRouterApiProductos(){
    
    const routerApiProductos = express.Router()
    routerApiProductos.use(express.json())
    routerApiProductos.use(express.urlencoded({extended: true}))
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // RAIZ API
    routerApiProductos.get('/', (req, res) =>{
        res.json({saludo:"Bienvenido a la raiz de la ruta API"})
    })
    //GET DATA
    routerApiProductos.get("/productos", (req, res)=>{
        if(USERS_DB.length<1){
            return res.json({error: "no hay productos agregados"})
        }
        res.json(USERS_DB)
    })
    routerApiProductos.get("/productos/:id", (req, res)=>{
        const {id} = req.params
        const producto = USERS_DB.filter(product => product.id == parseInt(id))[0];
        if(producto){
            return res.json(producto)
        }
        res.json({error: "usuario no encontrado"})
    })
    //SEND DATA
    routerApiProductos.post("/productos", (req, res)=>{
        const data = req.body;
        data.id = USERS_DB.length +1;
        USERS_DB.push(data);
        res.status(200).json(data);
    })

    // UPDATE
    routerApiProductos.put("/productos/:id", (req, res)=>{
        const data = req.body
        const {id} = req.params
        const producto = USERS_DB.filter(product => product.id == parseInt(id))[0];
        if(!producto){
            return res.json({error: "No hay productos con ese ID"})
        }
        if(!data.title && !data.price && !data.thumbnail){
            return res.json({"Solo pueden actualizarse las siguientes propiedades del producto:": "title:text, price:number, thumbnail:text"})
        }
        if(producto){
            if(USERS_DB[parseInt(id)-1].title){
                USERS_DB[parseInt(id)-1].title=data.title
            }else if(USERS_DB[parseInt(id)-1].price){
                USERS_DB[parseInt(id)-1].price=data.price
            }else if(USERS_DB[parseInt(id)-1].thumbnail){
                USERS_DB[parseInt(id)-1].thumbnail=data.thumbnail
            }
            // return res.json(USERS_DB[parseInt(id)-1])
            return res.json({"El producto quedó Actualizado de la siguiente forma": USERS_DB[parseInt(id)-1]})
        }

    })

    // DELETE
    routerApiProductos.delete("/productos/:id", (req, res)=>{
        const {id} = req.params
        const devolver = USERS_DB.filter(user => user.id === parseInt(id))
        USERS_DB = USERS_DB.filter(user => user.id !== parseInt(id));
        res.json({productoEliminado: devolver})//el delete no suele enviar dato
    })

    return routerApiProductos;

}
export {crearRouterApiProductos}