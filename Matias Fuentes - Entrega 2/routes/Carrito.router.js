import express from "express";
import Carrito from "../DAOs/Carrito.dao.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", async (req, res) => {
	const cartCreate = await carrito.crearCarrito();
	res.send(cartCreate);
});

router.delete("/:id", async (req, res) => {
	const cartDelete = await carrito.borrar(req.params.id);
	res.send(cartDelete);
});

router.delete("/:id/productos/:idPrd", async (req, res) => {
	const productDelete = await carrito.borrarProd(
		req.params.idPrd,
		req.params.id
		);
		res.send(productDelete);
})

router.get("/", async (req, res) => {
	const response = await carrito.listAll();
	res.send(response);
});

router.get("/:id", async (req, res) => {
	const cartSearch = Number(req.params.id);
	const cont = await carrito.listAdd(cartSearch);
	res.send(cont);
});

router.get("/:id/productos", async (req, res) => {
	const cartSearch = Number(req.params.id);
	const cont = await carrito.listProd(cartSearch);
	res.send(cont);
	console.log(cont)
});

router.post("/:id/productos/:idPrd", async (req, res) => {
	const resp = await carrito.guardarProductoEnCarrito(
		req.params.idPrd,
		req.params.id
	);
	res.send(resp);
});
export default router;
