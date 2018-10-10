/**
 * Created by Administrator on 2017/12/12.
 */
$(document).ready(function () {
    /**
     * 懒加载
     */
    $("img").lazyload({
        effect : "fadeIn"
    });
    /**
     * 窗口改变的事件触发
     * 所有自适应宽度100%,切换成1372px
     */
    $(window).resize(function () {
        let width  = $(window).width();
        let minWidth = 1372;
        let wholeWidth = $(document).width();
        if(width < wholeWidth){
            changeWidth(minWidth);
            let minImgWidth = (Src.length + 2)*minWidth;                //设置轮播图最小宽度
            $("#list").css("width",minImgWidth);                       //设置轮播区域宽度
            $("#list img").css("width","1372")                       //设置轮播图片宽度
        }
        else{
            let autoWidth = "100%";
            changeWidth(autoWidth);
            $("#list").css("width",((Src.length+2)*100)+"%");       //设置轮播总宽度和每个图片宽度(实现自适应要求)
            let img_width = 100/(Src.length+2);
            $("#list img").css("width",img_width+"%");
        }
    })
    /**
     * 当网页在小窗口打开，宽度100%小于1372px,设为1372
     */
    function showMinWidth() {
        let width  = $(window).width();
        let minWidth = 1372;
        if(width < minWidth)
        {
            changeWidth(minWidth);
        }
    }
    showMinWidth();
    /**
     * 需要更改宽度的模块
     */
    function  changeWidth(width) {
        $(".head").css("width",width);
        $(".body").css("width",width);
        $(".footer").css("width",width);
    }

    //头部导航栏鼠标触摸的时候样式变化
    let flag;
    $(".head-right li a").hover(function () {
        if($(this).hasClass("title-active")){
            flag = true;
        }
        else{
            flag = false;
            $(this).css("color","#ffffff");
            $(this).addClass("title-active");
        }
    },function () {
        if(flag == false)
        {
            $(this).css("color","#333333");
            $(this).removeClass("title-active");
            flag = null;
        }
        else{
            flag = null;
        }
    })
})