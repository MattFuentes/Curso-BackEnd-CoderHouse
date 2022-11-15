import Producto from "./Producto.dao.class.js";
// import fs from "fs";
import mongoose from 'mongoose'
import CarritoModel from '../Proyecto Final/models/CartModel.js'


export default class Carrito {
	constructor() {
		this.url = "mongodb+srv://Apizarro:darbeta12@cluster0.ho8uwm4.mongodb.net/?retryWrites=true&w=majority";
		this.mongodb = mongoose.connect
		this.producto = new Producto();
	}

	async crearCarrito(carr) {
		try{
			await this.mongodb(this.url);
			const newCart =  new CarritoModel(carr);
			return await newCart.save();

		}catch(err){
			console.log(err);
			return { error: "No se pudo crear el carrito" }
		}
	}

	async listAdd(id) {
		try{
			await this.mongodb(this.ulr);
			return await CarritoModel.findById(id)
		}catch(error){
			return {error: "No existe"}
		}
	}

	async listProd(id){
			 const carrProd = await this.listAdd(id);
			 console.log(carrProd.length);
			 return carrProd.productos;
				
	}

	async listAll() {
		try {
			await this.mongodb(this.url);
			return await CarritoModel.find();
		} catch (err) {
			return {error: "No existe"}
		}
	}

	async addCarrito() {
		try {
			const contenido = await this.listAll();
			const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
			const carr = { id: indice + 1, timeStamp: Date.now(), productos: [] };
			contenido.push(carr);
			this.crearCarrito(contenido);
			console.log("--- Carrito sumado ---");
			return carr;	

		} catch (err) {
			await this.crearCarrito([]);
			const contenido = await this.listAll();
			const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
			contenido.push(carr)
			await this.crearCarrito(contenido);
			return carr;
		}
	}

	async guardarProductoEnCarrito(idProd, idCarrito) {
		await this.mongodb(this.url);
		const prod = await this.producto.getById(idProd);
		const carr = new CarritoModel(idCarrito)
		return await carr.findByIdAndUpdate(carr,{$push: prod});
	}

	async actualizar(carr, id) {
		const contenido = await this.listAll();
		let index = contenido.findIndex((p) => p.id == id);
		carr.timeStamp = Date.now();
		if (index >= 0) {
			contenido.splice(index, 1, { ...carr, id });
			this.crearCarrito(contenido);
			return {msj: "Producto agregado"};
		} else {
			return {error: `Producto con id: ${carr.id} no existe`};
		}
	}

	async borrar(id) {
		const contenido = await this.listAll();
		let index = contenido.findIndex((carr) => carr.id == id);
		contenido.splice(index, 1);
		console.log(contenido);
		this.crearCarrito(contenido);

		return {msj: `{ Carrito con id: ${id} eliminado }`};
	}

	async borrarProd(idProd, idCarrito){

		const carrito = await this.listAdd(idCarrito);
		console.log(carrito.productos);
		if(carrito.productos.length){
			for ( var i = 0; i < carrito.productos.length ; i++){
				let obj = carrito.productos[i];
				if ( obj.id == idProd){
					let indexProducto = carrito.productos.findIndex((prod) => prod.id == idProd);
					carrito.productos.splice(indexProducto, 1);
				}
			}
			this.actualizar(carrito, idCarrito);

		return {msj: `Producto ID: ${idProd} eliminado del carrito id: ${idCarrito}`}

		}else{
			return {msj: "Producto no encontrado"}
		}

	
	}
}