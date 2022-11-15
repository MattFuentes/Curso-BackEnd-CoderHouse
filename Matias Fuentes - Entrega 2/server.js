import express from "express";
import routerCarrito from "../routes/Carrito.router.js";
import routerProductos from "../routes/Productos.router.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/productos", routerProductos);
app.use("/api/carritos", routerCarrito);
const server = app.listen(PORT, () => {
	console.log(`Server on PORT ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));