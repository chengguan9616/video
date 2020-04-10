function getMess (request,response){
    try {
        response.setHeader("Access-Control-Allow-Origin", "*");
        // 上线更改处 
    
        let url_1 = require("url");
        let NightMare = require("nightmare");
        let nightmare = NightMare({show:false});
        let query = request.url.slice(9);
        let request_url = "https://so.iqiyi.com/so/q_" + query;
     
    
        nightmare.goto(request_url)
             .wait(function(){
                let clicklist = document.getElementsByClassName("album-link");
                let arr = [];
                for(let i = 0; i < clicklist.length; i ++){
                    if(clicklist[i].getAttribute("title") == "第...集"){
                        arr.push(clicklist[i]);
                        console.log("点击");
                        clicklist[i].click();
                    }
                    // clicklist[i].setAttribute("title",clicklist[i].getAttribute("title") + i)
                }
                return true;
             })
             .evaluate(function(){
                 let resultArr = [];
    
                 function analysis (dom) {
                    if(dom.innerText == "电视剧" || dom.innerText == "动漫" ){
    
     
                       let dramaObj = {}; 
                       let imgUrl = "https:" + dom.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute("src");
                       let title = dom.nextElementSibling.getAttribute("title");
                       let year = dom.nextElementSibling.nextElementSibling.innerText;
                       let linkresult = document.getElementsByClassName("album-item");
                       // Get the address and title in each Li 
                       for(let i = 0; i < linkresult.length;i ++){
                           try {
                                console.log(i + "数组长度");
                                let name =linkresult[i].parentElement.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.firstElementChild.innerText  + linkresult[i].parentElement.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.getAttribute("title");
                                let url_drama = linkresult[i].firstElementChild.getAttribute("href").indexOf("https") != -1 ?  linkresult[i].firstElementChild.getAttribute("href") :"https:" + linkresult[i].firstElementChild.getAttribute("href");
                                let name_drama = linkresult[i].firstElementChild.getAttribute("title");
                                dramaObj[name + name_drama] = url_drama;
                           } catch (error) {
                               
                           }
                       }
                       dramaObj["title"] = title;
                       dramaObj["year"] = year;
                       dramaObj["imgUrl"] = imgUrl; 
                       dramaObj["type"] = dom.innerText;
                       return dramaObj; 
                    }else{
                       let imgUrl = "https:" + dom.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute("src"); 
                       let title = dom.nextElementSibling.getAttribute("title");
                       let year = dom.nextElementSibling.nextElementSibling.innerText;
                       let linkresult;
                       if( dom.parentElement.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.getAttribute("href").toString().indexOf("http") == -1){
                         linkresult = "https:" + dom.parentElement.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.getAttribute("href");
                       }else{
                         linkresult = dom.parentElement.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.getAttribute("href").toString();
                       }
                       
                       let dramaObj = {};
                       dramaObj["title"] = title;
                       dramaObj["year"] = year;
                       dramaObj["imgUrl"] = imgUrl; 
                       dramaObj["地址"] = linkresult;
                       dramaObj["type"] = "电影";
                       return dramaObj;
                    }
                } 
    
                 function init () {
                    console.log("init执行");
                    let allResultType = document.getElementsByClassName("item-type");
                    for(let i = 0; i < allResultType.length;i++){
                        if(allResultType[i].innerText == "电视剧" || allResultType[i].innerText == "电影" || allResultType[i].innerText == "动漫"){
                             resultArr.push(analysis(allResultType[i]));
                        }
                    }
                 } 
                 init();
                
                // //  监听dom变化 对应爱奇艺变化没效果神奇
                //  let targetDom = document.getElementsByClassName("album-list")[0];
                //  let option = {
                //      childList:true,
                //      subtree: true,
                //      attributes: true,
                //      attributeOldValue: true,
                //      characterData: true
                //  };
                //  function observe (el, options, callback) {
                //     console.log("开始监听"); 
                //     var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
                //     var observer = new MutationObserver(callback)
                //     observer.observe(el, options)
                //   }
                //  observe(targetDom,option,init);
                //  function callback () {
                //      alert("callback执行");
                //  }    
    
               
    
    
                //  function judge () {  
                //     alert("执行judge"); 
                //     let clicklist = document.getElementsByClassName("album-link");
                //     let arr = [];
                //     for(let i = 0; i < clicklist.length; i ++){
                //         if(clicklist[i].getAttribute("title") == "第...集"){
                //             arr.push(clicklist[i]);
                //             console.log("点击");
                //             clicklist[i].click();
                //         }
                //     }
                //     return arr; 
                //  }  
                //  let a = judge();
                //  if(a.length == 0){
                //      console.log("a==0");
                //      init();
                //  }
    
                //  动漫和电视剧一起处理 动漫 斗罗大陆3龙王传说
    
                 return resultArr;
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