// PROFILE_API

import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";

import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.use("/usuarios", publicRoutes);
app.use("/usuarios", auth, privateRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando");
});
