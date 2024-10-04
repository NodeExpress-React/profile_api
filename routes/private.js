import express from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/perfil-usuario", async (req, res) => {
  try {
    const users = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(200).json({ message: "Usuários listados com sucesso", users });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

router.put("/editar-usuario", async (req, res) => {
  try {
    const userInfo = req.body;

    const updatedFields = {};
    if (userInfo.name) updatedFields.name = userInfo.name;
    if (userInfo.email) updatedFields.email = userInfo.email;
    if (userInfo.password) updatedFields.password = userInfo.password;

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: updatedFields,
    });
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

router.delete("/deletar-usuario", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.userId },
    });

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

export default router;
