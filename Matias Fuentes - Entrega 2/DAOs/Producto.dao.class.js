import mongoose from 'mongoose'
import ProductoModel from '../Proyecto Final/models/ProductoModel.js';

export default class Producto {
	constructor() {
		this.url = 'mongodb+srv://Julio:12345678Coder@cluster0.zif4o6k.mongodb.net/?retryWrites=true&w=majority'
		this.mongodb = mongoose.connect
	}

	async createData(prod) {
		try {
			await this.mongodb(this.url);
			const newProduct = new ProductoModel(prod);
			return await newProduct.save();
		} catch (err) {
			console.log(err)
		}
	}

	async getById(id) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findById(id);

		} catch (error) {
			return { error: "Producto no existe" }
		}
	}

	async getAll() {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.find();

		} catch (err) {
			return { error: "No existen productos" }
		}
	}

	async save(prod) {
		try {
		} catch (err) {
		}

	}

	async put(id, prod) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findByIdAndUpdate(id, prod);

		} catch (err) {
			console.log(err)
		}
	}

	async borrar(id) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findByIdAndDelete(id);

		} catch (err) {
			return { error: "No existen productos" }
		}


	}
}