const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");
const argument = require("./models/argument");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async(req, res) => {
    let data_title = await argument.findAll({ order: Sequelize.literal("id DESC") });   
  res.send({ titles: data_title });
});

app.post("/check", async(req, res) => {
  let check = await argument.findOne({ where: { title: req.body.title.trim() } });
  if (check == null) {
    res.send({ status: true, message: "ข้อมูลไม่ซ้ำ" });
  } else {
    res.send({ status: false, message: "ข้อมูลซ้ำ!!!!!" });
  }
});

app.post("/insert", async(req, res) => {
  text = req.body.title.trim();
//   let check = await argument.findOne({ where: { title: text } });
  let check = await argument.findOne({ where: { title: text } });
  if (text != "" && text != " " && check == null) {
    let result = await argument.create({title: text });
    let data_title = await argument.findAll();
    res.send({ titles: data_title, status: true, message: "บันทึกแล้ว" });
  } else {
    let data_title = await argument.findAll();
    res.send({ titles: data_title, status: false, message: "ข้อมูลซ้ำ!!!!!" });
  }
});

app.delete("/delete/:id", async(req, res) => {
  try{
    let id_ = req.params.id
    let result = await argument.findOne({ where: { id: id_ } });
    result = await argument.destroy({ where: { id: id_ } });
    res.send("removed");
  }catch(error){
      res.send("error")
  }
  
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("server runing port", PORT));