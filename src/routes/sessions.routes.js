
import { Router } from 'express';
import userDao from '../dao/mongoDB/user.dao.js';
import { createHash } from '../utils/hashPassword.js';


const router = Router();

router.get("/", (req, res) => {
    res.render("index")
});

router.post("/register", async (req, res) => {
    
    try {
        const {first_name, last_name, age, email, gender, password} = req.body;
        const newUser = {
            first_name,
            last_name,
            age,
            email,
            gender,
            password: createHash(password)
        }
        const user = await userDao.create(newUser);
        if(!user) return res.status(400).json({status: error, msg: "User not created"});

        return res.status(201).json({status: "ok", msg: "User created", user});
        
    } catch (error) {
        console.log(`Error: ${error}`)
        res.status(500).json({status: "error", msg: "Internal Server Error"});
        
    }
})

router.post("/login", async (req, res) => {
    
    try {

        const {email, password} = req.body;
        if(email ==="admincoder@coder.com" && password === "123456") {
            req.session.user = {
                email,
                role: "admin"
            }
            return res.status(200).json({status: "ok", user: req.session.user});
        }

        const user = await userDao.getByEmail(email);
        
        if(!user || user.password !== password) return res.status(401).json({status: error, msg: "Email or password incorrect"});
        req.session.user = {
            email,
            role: "user"
        };

        return res.status(200).json({status: "ok", user: req.session.user});
        
    } catch (error) {
        console.log(`Error: ${error}`)
        res.status(500).json({status: "error", msg: "Internal Server Error"});
        
    }
})

router.get("/current", async (req, res) => {

    const user = await userDao.getByEmail(req.session.user.email);
    
    res.status(200).json({status: "ok", user});
})

router.get("/logout", async (req, res) => {
    
    req.session.destroy((error) => {
        if (!error) {
            res.status(200).json({status: "ok", msg: "Session closed"});
        } else {
            res.status(500).json({status: "error", msg: "Internal Server Error"});
        }
    });
})


/* router.get("/", (req, res) => {
    res.render("index")
});

router.get("/session", (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`); // Get a session
        
    } else {
        req.session.counter = 1; 
        res.send(" ¡Bienvenido el sitio! "); // Set a session
    }
});

router.get("/login", (req, res) => {
    
    const {username, password} = req.query;

    if (username !== "luiggy" || password !== "1234") {
        return res.send("Usuario o contraseña no válidos"); // Set a session
    };

    req.session.user = username;
    req.session.admin = true;
    res.send(`Bienvenido ${username}`); // Set a session

})

router.get("/login_admin", (req, res) => {
    
    if (!req.session.admin) {
        return res.send("No eres administrador"); // Set a session
    };

    res.send(`Bienvenido ${req.session.user} administrador`); // Set a session

})

router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (!error) {
            res.send("Sesion cerrada con éxito"); // Delete a session
        } else {
            res.send("Error en el Logout");
        }
    });
});

router.get("/deleteSession", (req, res) => {
    req.session.destroy((error) => {
        if (!error) {
            res.send("Session Eliminada"); // Delete a session
        } else {
            res.send("Error Eliminando session");
        }
    });
});

router.post("/setData", (req, res) => {
        
        const {user, email} = req.body;
    
        req.session.userData = {user, email};
        res.send("User Set Session"); // Set a session
    });

router.get("/getData", (req, res) => {
    res.send(req.session.userData); // Get a session
}); */




export default router;