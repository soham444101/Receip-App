import cors from "cors";

import e from "express";
const app = e();

app.use(cors());
app.use(e.json({limit:'20kb'}))
app.use(e.urlencoded({extended: true , limit:"20kb"}))

import userouter from './router/User_rouer.js';
import receipe from './router/Receip_router.js';
app.use("/api/auth", userouter);
app.use("/api/auth/receip",receipe );

export {app}
