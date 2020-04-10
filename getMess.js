
function getMessage(request,response){
     try {
        let NightMare = require("nightmare");
        let nightmare = NightMare({show:false});
        let reg = /iqiyi/img;
        let url_1 = require("url");
        let  params = url_1.parse(request.url,true).query;
        console.log("getMessage运行"+params.path);
        console.log(typeof request.url);
        let urlCut = request.url.slice(9);
        let iurl = "https://so.iqiyi.com/so/q_";
        let resultUrl = iurl + urlCut;
        // console.log(getMessage_2(resultUrl));
        let url = resultUrl;
        let result_last_inner;
        if(!url){
            return "地址为空";
        }
        if(reg.test(url+"")){
        //  aiqiy  
            console.log("reg执行");
            nightmare
            .goto(url+"")
            .wait("div.qy-search-result-item")
            .evaluate(function(){
                let regU = /(?=href=)[\w\W]+(?=.html)/img;
                let all = document.getElementsByClassName("qy-search-result-item");
                let resultArr = [];
                for(let i = 0;i < all.length;i++){
                    console.log("执行"+i);
                    let imgsrc = document.getElementsByClassName("qy-mod-cover")[i].getAttribute("src");
                    let title = document.getElementsByClassName("qy-mod-cover")[i].getAttribute("alt");
                    let drama = document.getElementsByClassName("album-list")[i] ? document.getElementsByClassName("album-list")[i].children : [];
    
                    let obj = {};
                    let obj2 = {};
                    obj.imgsrc = imgsrc;
                    obj.name = title;
                    for(let j = 0; j < drama.length;j++){
                         obj2[drama[j].innerText] = drama[j].innerHTML.match(regU);
                    }
                    obj.drama = obj2;
                    resultArr.push(obj);    
                }
                return resultArr;
                 
            })
            .end()
            .then(
                function(result){
                       
                       result_last_inner = result; 
                       console.log(result_last_inner);
                       response.writeHead(200);
                       console.log(1111);
                       response.write(JSON.stringify(result_last_inner));
                       console.log(2222);
                       response.end();
                       console.log(3333);
                }
            )
            .catch((error)=>{
                console.log("失误"+error);
            })
    
        }
       
    
    
     } catch (error) {
         console.log(error);
     }

    // console.log(message);
}
function ergodic (obj){
        
    

}

// getMessage("http://so.iqiyi.com/so/q_%E9%95%87%E9%AD%82");

module.exports = getMessage;

// let all = document.getElementsByClassName("qy-search-result-item");
// let resultArr = [];
// for(let i = 0;i < all.length;i++){
//     let imgsrc = document.getElementsByClassName("qy-mod-cover")[i].getAttribute("src");
//     let title = document.getElementsByClassName("qy-mod-cover")[i].getAttribute("alt");
//     let drama = document.getElementsByClassName("album-list")[i].children;
//     let obj = {};
//     let obj2 = {};
//     obj.imgsrc = imgsrc;
//     obj.name = title;
//     for(let j = 0; j < drama.length;j++){
//          obj2[drama[i].children.innerHTML] = drama[i].children.getAttribute("href");
//     }
//     obj.drama = obj2;
//     resultArr.push(obj);    
// }
// console.log(resultArr);