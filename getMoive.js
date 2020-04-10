function getMess (request,response){
    try {
        response.setHeader("Access-Control-Allow-Origin", "*");
        // 上线更改处 
    
       
        let NightMare = require("nightmare");
        let nightmare = NightMare({show:false});
        // openDevTools: {
        //    mode: 'detach'
        // }
       
        let request_url = "https://movie.douban.com/explore#!type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86";
     
    
        nightmare.goto(request_url)
             .wait(1000) 
             .evaluate(function(){
                  let list = document.getElementsByClassName("cover-wp");
                  console.log(list.length);
                  let result = [];
                  for(let i = 0; i < list.length;i++){
                      let imgsrc = list[i].children[0].getAttribute("src");
                      let title = list[i].children[0].getAttribute("alt")
                      let obj = {imgsrc,title};
                      result.push(obj);
                  }
                  return result;
             })
             .end() 
             .then((result)=>{
                 response.writeHead(200);
                 response.write(JSON.stringify(result));
                 response.end();
             })
            
    } catch (error) {
        
    }
}

module.exports = getMess;