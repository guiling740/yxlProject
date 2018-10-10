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
    let Src = [];                                                                                                       //图片数组
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
            $("#list img").css("width",minWidth)                       //设置轮播图片宽度
            imgController.makeInit(minWidth);                             //浏览器窗口变化的时候，重置轮播图左侧偏移量
        }
        else{
            let autoWidth = "100%";
            changeWidth(autoWidth);
            $("#list").css("width",((Src.length+2)*100)+"%");       //设置轮播总宽度和每个图片宽度(实现自适应要求)
            let img_width = 100/(Src.length+2);
            $("#list img").css("width",img_width+"%");
            imgController.makeInit(0);
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
            let minImgWidth = (Src.length + 2)*minWidth;                //设置轮播图最小宽度
            $("#list").css("width",minImgWidth);                       //设置轮播区域宽度
            $("#list img").css("width",minWidth)                       //设置轮播图片宽度
        }
        else
        {
            $("#list").css("width",((Src.length+2)*100)+"%");       //设置轮播总宽度和每个图片宽度(实现自适应要求)
            let img_width = 100/(Src.length+2);
            $("#list img").css("width",img_width+"%");
        }
    }
    showMinWidth();
    /**
     * 需要更改宽度的模块
     */
    function  changeWidth(width) {
        $(".head").css("width",width);
        $(".container").css("width",width);
        $(".business-card").css("width",width);
        $(".consult").css("width",width);
        $(".act-recommed").css("width",width);
        $(".news-info").css("width",width);
    }
    /**
     * 轮播图区域
     */
    /**
     * 填充img
     */
    function  addImg() {

        let src1 = "../images/main.jpg";
        let src2 = "../images/公益.jpg";
        let src3 = "../images/咨询_bg.png";
        let src4 = "../images/新闻详情-big.jpg";
        let src5 = "../images/活动类别.jpg";

        Src.push(src1);
        Src.push(src2);
        Src.push(src3);
        Src.push(src4);
        Src.push(src5);
        let oList = $("#list");
        let img;
        let imgIndex = Src.length;

        img = "<img alt='"+imgIndex+"'src = '../images/活动类别.jpg'/>";                                          //循环轮播，相比图片数量多填充2张
        oList.append(img);
        for(let i=1;i<= imgIndex;i++){
            img = "<img alt='"+i+"'src = '" +Src[i-1]+ "'/>";
            oList.append(img);
        }
        img = "<img alt='"+1+"'src = '../images/main.jpg'/>";
        oList.append(img);

        oList.css("width",((imgIndex+2)*100)+"%");                                                                    //设置轮播总宽度和每个图片宽度(实现自适应要求)
        let img_width = 100/(imgIndex+2);
        $("#list img").css("width",img_width+"%");                                                                   //设置图片宽度
    }
    addImg();
    /**
     *添加小原点
     * @type {jQuery|HTMLElement}
     */
    function addItem(){
        let imgIndex = Src.length;
        for(let i=1;i<= imgIndex; i++)
        {
            let item = "<span index='"+i+"'></span>"
            $(".btns").append(item);
        }
        $(".btns span:nth-of-type(1)").attr('class','on');
    }
    addItem();

    /**
     * 触摸出现左右按钮
     */
    $('.container').hover(function () {
        $(this).find('a').attr('class','arrow');
    },function () {
        $(this).find('a').attr('class','');
    });


    /**
     * 初始化轮播对象以及涉及到各个dom元素，封装成类
     * @type {{rollList: (jQuery|HTMLElement), rightButton: (jQuery|HTMLElement), leftButton: (jQuery|HTMLElement), spanButtton: (jQuery|HTMLElement), len: number, index: number, interval: number, timer: null}}
     */
    let imgList ={
        rollList:$("#list"),
        rightButton:$("#right"),
        leftButton:$("#left"),
        spanButtton:$(".btns span"),
        len:$("#list img").length - 2,
        index : 1,
        interval:2000,
        timer:null
    }

    /**
     * 初始化对象，调用自动播放函数
     */
    let imgController = ImgScroll(imgList);
    imgController.autoPlay();
    /**
     * 轮播图右侧点击事件
     */
    imgList.rightButton.on("click",function () {
        imgController.rightClickFun();
    });
    /**
     * 轮播图左侧点击事件
     */
    imgList.leftButton.on("click",function () {
        imgController.leftClickFun();
    })
    /**
     * 轮播图底部按钮点击事件
     */
    imgList.spanButtton.each(function () {
        $(this).on('click',function(){
            if($(this).attr('class') == "on")
            {
                return
            }
            let myIndex = parseInt($(this).attr('index'));
            let offset = (myIndex - imgController.index) * -imgController.imgWidth;
            imgController.index = myIndex;
            imgController.spanClickFun(offset);
        })
    })
    /**
     * 鼠标触摸轮播图范围，停止播放
     */
    imgList.rollList.on('mouseover',function(){
        imgController.stopPlay();
    });
    imgList.rollList.on('mouseout',function(){
        imgController.autoPlay();
    });

    /**
     * 头部触摸样式变化
     */
    let flag;                                                                                                            //定义全局控制变量
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
        else
            {
            flag = null;
           }
    });

    //所有标题旁边的图标点击出现二维码
    $(".show-title i").each(function (index) {
        $(this).mouseenter(function () {
            $(".show-wechat").eq(index).show();
        });
        $(this).mouseleave(function () {
            $(".show-wechat").eq(index).hide();
        });

    })
    $(".show-wechat").hover(function () {
        $(this).show();
    },function () {
        $(this).hide();
    });



    //易咨询点击二维码图像移动
    $(".consult .list-box").hover(function () {
        $(this).find(".wechat-bg").animate({"bottom":"0"},200);
    },function () {
        $(this).find(".wechat-bg").animate({"bottom":"-267"},200);
    });

    //活动推荐点击二维码图像移动
    $(".list-category .top-part").hover(function () {
        $(this).find(".list-catebox").animate({"left":"0"},200);
    },function () {
        $(this).find(".list-catebox").animate({"left":"302"},200);
    })

    /**
     * 活动推荐 模块
     */
    /**
     * “活动推荐”总宽度设置函数
     */
    let marginRight = 40;                                                                                               //定义偏移量
    let showCount = 4;                                                                                                  //定义当前视口数量
    function addWidth() {
        let len = $(".act-roll li").length;                                                                          // li数量
        let width = $(".act-roll li").width();
        let max_length = 0;

        for(let i =0 ;i<len;i++)
        {
             max_length += width;
        }
        max_length += marginRight*(len) ;                                                                               //最大宽度为li宽度右侧margin-right距离
        let min_length = showCount*(width + marginRight);                                                               //最小宽度为页面视口宽度
        if(len > showCount)
        {
            $(".act-roll").css('width',max_length);
            $(".act-roll").css('left',0);
            if(len % 2 == 0)
            {
                $(".act-roll").css('left',-(len-showCount)/2*(width+marginRight));                                    //偶数个li时候左侧偏移量
            }
            else
                {
                $(".act-roll").css('left',-(len-(showCount+1))/2*(width+marginRight));                               //基数个li时候左侧偏移量
                }
        }
        else{
            $(".act-roll").css('width',min_length);
        }
    }
    addWidth();

    //活动推荐左侧点击
   $("#act-left").on("click",function () {
       let offset = parseInt($(".act-roll li").width() + marginRight);                                                //每点击一次对应的偏移量
       let newLeft = parseInt($(".act-roll").css('left'));                                                           //当前左侧偏移量
       if(newLeft > -marginRight)
       {
           $(".act-left").css("left",0);
       }
       else
       {
           newLeft =  newLeft + offset;
           $(".act-roll").animate({'left':newLeft + 'px'},function(){
               if(newLeft > 0){
                   oList.css('left',0);
               }
               if(newLeft < 0){
                   oList.css('left',newLeft);
               }
           });
        }
   })

    //活动推荐右侧点击
    $("#act-right").on("click",function () {
        let offset = parseInt( $(".act-roll li").width() + marginRight);                                              // 点击一次的偏移量

        let width = $(".act-roll").width() -  parseInt($(".act-roll li").width())*showCount + marginRight * 3;      //宽度 = 总宽度- 视口宽度
        let newRight = width +  parseInt($(".act-roll").css('left'));                                                //右侧宽度
        let newLeft = parseInt($(".act-roll").css('left'));                                                          //左侧宽度
        if(newRight > offset)                                                                                           //当右侧宽度大于偏移量
        {
            $(".act-roll").animate({'left':-offset + newLeft + 'px'},function(){
                newRight -= offset;
            });
        }
        else{}
    })

})
/**
 * 封装轮播的对象
 */
let ImgScroll = (function(window) {
    var ImgScroll = function(ImgList)
    {
        return new ImgScroll.fn.init(ImgList);
    }
    ImgScroll.fn = ImgScroll.prototype =
        {
            constructor: ImgScroll,
            //初始化参数
            init: function(ImgList) {
                this.rollList = ImgList.rollList;
                this.rightButton = ImgList.rightButton;
                this.leftButton = ImgList.leftButton;
                this.spanButtton = ImgList.spanButtton;
                this.imgWidth = 0;
                this.len = ImgList.len;
                this.index = ImgList.index;
                this.interval = ImgList.interval;
                this.timer = ImgList.timer;
                this.makeInit(0);
            },
            //初始化默认设置，图像宽度，刷新页面时候偏移距离
            makeInit:function (changeOffset) {
                if (changeOffset == 0)
                {
                    this.imgWidth = parseInt(this.rollList.css('width'))/(this.len + 2);
                    this.rollList.css('left',-this.imgWidth);
                }
                else
                {
                    this.rollList.css('left',-changeOffset);
                }
            },
            /**
             * 每个图片过渡效果
             * @param offset
             */
            animate: function(offset)
            {
                if(offset == 0){
                    return;
                }
                let newLeft = parseInt(this.rollList.css('left')) + offset;//点击后的图片偏移量
                let $ = this;
                this.rollList.animate({'left':newLeft + 'px'},function(){
                    if(newLeft > -200){                                                                                         //判断图片是否已经循环一次
                        $.rollList.css('left',-$.imgWidth * $.len);
                    }
                    if(newLeft < -$.imgWidth * $.len){
                        $.rollList.css('left',-$.imgWidth);
                    }
                });
            },
            /**
             * 显示图片下面小圆点按钮样式
             */
            showSpanButtons:function () {
                this.spanButtton.each(function(){
                    $(this).attr('class','');
                });
                $(".btns span").eq(this.index - 1).addClass('on');
            },
            /**
             * 自动播放
             */
            autoPlay:function () {
                var $ = this;
                $.timer = setTimeout(function(){
                    $.rightButton.trigger('click');
                    $.autoPlay();
                },this.interval);
            },
            /**
             * 停止播放
             */
            stopPlay:function () {
                clearInterval(this.timer);
            },
            /**
             * 右侧点击事件
             */
            rightClick:function () {
                let $ = this;
                $.rightButton.on("click",function () {
                    $.rightClickFun();
                })
            },
            /**
             * 右侧点击触发函数
             */
            rightClickFun:function () {
                if(this.rollList.is(':animated')){
                    return;
                }
                this.stopPlay();
                if(this.index == this.len){
                    this.index = 1;
                }else{
                    this.index = this.index + 1;
                }
                this.animate(-this.imgWidth);
                this.showSpanButtons();
            },
            /**
             * 左侧点击触发函数
             */
            leftClickFun:function () {
                if(this.rollList.is(':animated')){
                    return;
                }
                this.stopPlay();
                if(this.index == 1){
                    this.index = this.len;
                }else{
                    this.index -= 1;
                }
                this.animate(this.imgWidth);
                this.showSpanButtons();
            },
            /**
             * 底部小圆点点击触发函数
             * @param offset
             */
            spanClickFun:function (offset) {
                this.stopPlay();
                if(this.rollList.is(":animated")){
                    return;
                }
                this.animate(offset);
                this.showSpanButtons();
            }
        }
    ImgScroll.fn.init.prototype = ImgScroll.fn;

    return ImgScroll;
})();
