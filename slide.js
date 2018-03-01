$(window).on('load',function(){
    class slider{
        constructor(time, slideId, innerArea, prevBtn, nextBtn){
            this.slideId = slideId;
            this.innerArea = innerArea;
            this.defaultLeftVal = $(this.slideId).css("left");
            this.time = time;
            //ボタン制御
            $(prevBtn).click(()=>{this.move(false)});
            $(nextBtn).click(()=>{this.move(true)});
        }
        move(isNext){
            // 実行中は再度実行させない
            if($(this.slideId).css("left") !== this.defaultLeftVal) return;
            // スクロール領域をli要素数+1の大きさで用意する
            $(this.slideId).css("width", parseInt($(this.slideId).css("width")) * ($(this.innerArea+ " li").length + 1));

            // 押されたボタンによって要素を切り替える
            if(isNext){
                var clone = this.slideId + " li:first-child";
                var insertTo = this.slideId + " li:last-child";
                var left = "-=" + $(this.innerArea).css("width");
                if(isNext) $(insertTo).after($(clone).clone());
            }else{
                var clone = this.slideId + " li:last-child";
                var insertTo = this.slideId + " li:first-child";
                var left = "+=" + $(this.innerArea).css("width");
            }
            $(this.slideId).one("transitionend webkitTransitionEnd oTransitionEnd mozTransitionEnd",()=>{
              if(!isNext) $(insertTo).before($(clone).clone());
              $(clone).remove();  
              $(this.slideId).css({
                left: this.defaultLeftVal,
                WebkitTransition: "",
                MozTransition: "",
                MsTransition: "",
                OTransition: "",
                transition: ""
              });
            });
            $(this.slideId).css({
              left: left,
              WebkitTransition: "left "+ this.time + "ms linear",
              MozTransition: "left "+ this.time + "ms linear",
              MsTransition: "left "+ this.time + "ms linear",
              OTransition: "left "+ this.time + "ms linear",
              transition: "left "+ this.time + "ms linear"
            });
        }        
    }
    var slide = new slider(600, "#slideArea", "#viewableArea", "#prev", "#next");
    var slide2 = new slider(1000, "#slideArea2", "#viewableArea2", "#prev2", "#next2");
});