//IMPORTS
const express = require("express");
const User = require("./users/model");

//instance of express
const server = express();

server.use(express.json());

server.get("/api/users", async (req, res) => {
  //returns all users
  try {
    let allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.post("/api/users", async (req, res) => {
  //creates a new user

  try {
    let user = req.body;
    if (!user.name || !user.bio) {
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    } else {
      let inserted = await User.insert(user);
      res.status(201).json(inserted);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    let selectedUser = await User.findById(req.params.id);
    if (!selectedUser) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      res.status(200).json(selectedUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    let selectedUser = await User.findById(req.params.id);
    if (!selectedUser) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      let deletedUser = await User.remove(req.params.id);
      res.status(200).json(deletedUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinemedi." });
  }
});

server.put("/api/users/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let userById = await User.findById(id);
    if (!userById) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      let user = req.body;
      if (!user.name || !user.bio) {
        res
          .status(400)
          .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
      } else {
        let updatedUser = await User.update(req.params.id, user);
        res.json(updatedUser);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
  }
});

module.exports = server;
