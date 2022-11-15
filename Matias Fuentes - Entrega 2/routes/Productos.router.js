import express from "express";
import Producto from "../DAOs/Producto.dao.class.js";

const router = express.Router();
const producto = new Producto();

function validateAdm(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("No tiene acceso");
	}
}

router.post("/", validateAdm, async (req, res) => {
	console.log(req.body);
	const response = await producto.createData(req.body)
	res.send(response);
});

router.delete("/:id", validateAdm, async (req, res) => {
	const productDelete = await producto.borrar(req.params.id);
	res.send(productDelete);
});

router.get("/", async (req, res) => {
	const response = await producto.getAll();
	res.send(response)
});

router.get("/:id", async (req, res) => {
	const cont = await producto.getById(req.params.id);
	res.send(cont);
});

router.put('/:id', validateAdm, async (req, res) => {
	const id = await producto.put(req.params.id, req.body);
	res.json(id);
})

export default router;