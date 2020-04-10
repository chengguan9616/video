let NightMare = require("nightmare");
let nightmare = NightMare({show:true});


nightmare
.goto("http://www.shisun.nh.edu.sh.cn/website/")
.wait("div")
.evaluate(function(){
    let code = document.getElementsByTagName("body")[0];return code;})
    
.end()
.then(
        function(result){
               console.log(result);
               result_last = result; 
        }
    )
.catch((error)=>{
        console.log("失误"+error);
}) 