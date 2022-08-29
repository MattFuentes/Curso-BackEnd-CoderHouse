const fs = require("fs");

class Contenedor {
    constructor(name) {
        this.name = name;
    }
    async getInfo() { }

    async save(info) {
        try {
            const content = await fs.promises.readFile(`./${this.name}`, "utf-8");
            const contentParse = JSON.parse(content);
            const lastIn = contentParse.length - 1;
            const lastId = contentParse[lastIn].id;
            info.id = lastId + 1;
            const id = info.id;
            contentParse.push(info);
            await fs.promises.writeFile(
                `./${this.name}`,
                JSON.stringify(contentParse)
            );
            return id;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const content = await fs.promises.readFile(`./${this.name}`, "utf-8");
            const contentParse = JSON.parse(content);
            let contentArray;
            contentParse.forEach((e) => {
                if (e.id === id) {
                    contentArray = e;
                }
            });
            return contentArray;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const content = await fs.promises.readFile(`./${this.name}`, "utf-8");
            const contentParse = JSON.parse(content);
            return contentParse;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const content = await fs.promises.readFile(`./${this.name}`, "utf-8");
            const contentParse = JSON.parse(content);
            const newContent = contentParse.filter(
                (e) => e.id !== id
            );
            await fs.promises.writeFile(
                `./${this.name}`,
                JSON.stringify(newContent)
            );
            return newContent;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify([{}]));
            return console.log("contenido eliminado");
        } catch (error) {
            console.log(error);
        }
    }
}

const content = new Contenedor("productos.json");

let newInfo = {
    id: 9,
    name: "Sweter",
    price: 523,
};

content.save(newInfo).then((res) => console.log(res)); // New Item
content.getById(2).then((res) => console.log(res)); // Get by Id 
content.getAll().then((res) => console.log(res)); // Get All Items
content.deleteById(2).then((res) => console.log(res)); // Delete by ID 2
content.deleteAll().then((res) => console.log(res)); //Delete all