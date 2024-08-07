import fs from "fs"

class UserManager {

    constructor() {
        this.users = []
        this.path = "./users.json"
    }

    async createUser(nombre, apellido, edad, email){
        try {
            let newUser = {
                nombre,
                apellido,
                edad,
                email
            }

            this.users.push(newUser)

            await fs.promises.writeFile(this.path, JSON.stringify(this.users))

        } catch (error) {
            console.log(error)
        }
    }
    
    async showUsers() {

        try {

            let users = await fs.promises.readFile(this.path, "utf-8");
            let usersParse = await JSON.parse(users);
            console.log(usersParse);

        } catch (error) {
            console.log(error)
        }

    }
}

const user1 = new UserManager()

user1.createUser("Juan", "Perez", 25, "juanperez@gmail.com");
user1.createUser("Pedro", "Lopez", 32, "pedrolopez@gmail.com");
user1.showUsers();
