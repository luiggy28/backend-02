import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import usersRouter from "./users.routes.js";
import cookieRouter from "./cookies.routes.js";
import sessionsRouter from "./sessions.routes.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/users", usersRouter);
router.use("/cookies", cookieRouter);
router.use("/session", sessionsRouter);

export default router;