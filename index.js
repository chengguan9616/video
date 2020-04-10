let express = require("express");
let app = new express();
let getMess = require("./getMess_31");
let getMoive = require("./getMoive");
// let suning = require("./suning");
app.use(express.static("page"));
app.get("/getMess",getMess);
app.get("/moive",getMoive);
// app.get("/suning",suning);
app.listen(8081);

// let pro = function () {
//     let img = new Image();
//     img.setAttribute("crossOrigin","ad");
//     img.src = "https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top-e3b63a0b1b.png";
//     img.onload = function () {

//         let canvas_1 = document.getElementsByClassName("slide-canvas")[0];
//         let context = canvas_1.getContext('2d');
//         // 打印出context对象属性名或方法名
//         console.log(context);
//         let data = content.getImageData(0,0,300,180).data;
//         console.log(data);
//     }
// }