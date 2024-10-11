import express from "express";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/perfil-usuario", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      omit: {
        id: true,
        password: true,
      },
      where: { id: req.userId },
    });

    return res.status(200).json({ message: "Usuários listados com sucesso", user });
  } catch (err) {
    return res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

router.put("/editar-nome", async (req, res) => {
  try {
    const userName = req.body;

    console.log(userName);

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: userName,
    });
    return res.status(200).json({ message: "Nome de usuário atualizado com sucesso", userName });
  } catch (err) {
    return res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

router.put("/editar-email", async (req, res) => {
  try {
    const userEmail = req.body;

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: userEmail,
    });
    return res.status(200).json({ message: "Email do usuário atualizado com sucesso", userEmail });
  } catch (err) {
    return res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

router.put("/editar-senha", async (req, res) => {
  try {
    const userInfo = req.body;

    const userPassword = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    const isMatch = await bcrypt.compare(userInfo.password, userPassword.password);

    if (!isMatch) {
      res.status(400).json({ message: "Senha incorreta" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userInfo.newPassword, salt);

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { password: hashPassword },
    });
    return res.status(204).json({ message: "Senha atualizada com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

router.delete("/deletar-usuario", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.userId },
    });

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});

export default router;
