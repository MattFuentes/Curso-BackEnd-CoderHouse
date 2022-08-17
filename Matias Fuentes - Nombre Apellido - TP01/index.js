
class User {
    constructor(name, lastname, books, pets) {
        this.name = name;
        this.lastname = lastname;
        this.books = books;
        this.pets = pets;
    }
    getFullName() {
        return `\n- Su NOMBRE es: ${this.name}.\n- Su APELLIDO es: ${this.lastname}.`;
    }
    addPet(pet) {
        this.pets.push(pet);
    }
    countPet() {
        let i = 0;
        this.pets.forEach(e => i++);

        return `\n- Cantidad de mascotas ${i}`;
    }
    addBook(title, author) {
        this.books.push({ title, author });
    }
    getBook() {
        return this.books.map(libro => `${libro.title}`);
    }
}

const user1 = new User("Matias", "Martinez", [{ title: 'Los Juegos del Hambre', author: 'Suzanne Collins' }], ['Perro', 'Gato', 'Tortuga']);

const user2 = new User("Luis", "Rodriguez", [], ['Gato']);

console.log('\n--------------USER 1----------------')
console.log(user1.getFullName());
console.log('\n- Agregando Mascota: Loro')
user1.addPet('Loro');
console.log(user1.countPet());
console.log('\n- Agregando Libro: El código Da Vinci')
user1.addBook('El código Da Vinci', 'Dan Brown');
console.log('\n- Libros adquiridos: ', user1.getBook());
// Info User1
console.log('\n', user1)
console.log('------------------------------------')


console.log('\n--------------USER 2----------------')
console.log(user2.getFullName());
console.log('\n- Agregando Mascota: Perro')
user2.addPet('Perro');
console.log(user2.countPet());
console.log('\n- Agregando Libro: Crepúsculo')
user2.addBook('Crepúsculo', 'Stephenie Meyer');
console.log('\n- Libros adquiridos: ', user2.getBook());
// Info User1
console.log('\n', user2)
console.log('------------------------------------')