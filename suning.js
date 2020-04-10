let NightMare = require("nightmare");
let nightmare = new NightMare({show:true,openDevTools: {
    mode: 'detach'
}});

nightmare
     .goto("https://quan.suning.com/lq_1.htm#classId=1")
     .click(".receive_202004030012729315")
     .wait(2000)
     .evaluate(function(){
        
        var iframe = document.getElementById("iframeLogin");

        iframe.src = "https://quan.suning.com/popupLoginSuccess?topLocation=https://passport.suning.com/ids/login?loginTheme=b2c_pop&multipleActive=false&loginTheme=b2c_pop"
        //  Window.frames["iframeLogin"].document.body.style.backgroundColor = "blue";
         console.log(iframe);
     }) 
     .wait(2000)
     .evaluate(function(){
         let username = document.getElementById("userName");
         let password = document.getElementById("password");
         let submit = document.getElementById("submit");
         username.innerHTML = 18721015729;
         password.innerHTML = "2007chx";
         submit.click();
         let cook = document.cookie;
         console.log(cook);
     })
     .wait(1800)
     .back()
    //  .type("#userName",13524033457)
    //  .type("#password","19971001sfr")
    //  .click("#submit")
     .evaluate(function(){
         console.log("99999");
         let cook = document.cookie;
         console.log(cook);
         console.log("6666");
     })    
     .then((res)=>{
         console.log(res);
     })