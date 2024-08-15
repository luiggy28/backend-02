import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
    res.render("index")
});

router.get("/setCookie", (req, res) => {
    res.cookie("userData", "Welcome Luiggy", { maxAge: 100000 }).send("Cookie setted"); // Set a cookie
});

router.get("/setSignedCookie", (req, res) => {
    res.cookie("userData", "Welcome Luiggy", { maxAge: 100000, signed: true }).send("Cookie setted"); // Set a cookie
});

router.get("/getCookie", (req, res) => {
    res.send(req.cookies.userDara); // Get a cookie
});

router.get("/getSignedCookie", (req, res) => {
    res.send(req.signedCookies.userDara); // Get a cookie
});

router.get("/deleteCookie", (req, res) => {
    res.clearCookie("userData").send("Cookie deleted"); // Delete a cookie
});

router.get("/deleteSignedCookie", (req, res) => {
    res.clearCookie("userData").send("Cookie deleted"); // Delete a cookie
});

router.post("/setData", (req, res) => {
    
    const {user, email} = req.body;

    res.cookie("userData", {user, email}, { maxAge: 100000, signed: true }).send("User Set Cookie"); // Set a cookie
});

router.get("/getData", (req, res) => {
    res.send(req.signedCookies.userData); // Get a cookie
});

export default router;