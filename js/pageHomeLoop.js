/**
 * Theme: animateLoop
 * Dependence: javascript
 * .
 */
window.onload = function () {
    /*设置json样式*/
    var json = [
        { //1
            height:198,
            top:0,
            left:0,
            opacity:100,
            z:5
        },
        { //2
            height:188,
            top:10,
            left:135,
            opacity:80,
            z:4
        },
        { //3
            height:188,
            top:10,
            left:135,
            opacity:0,
            z:3
        },
        { //4
            height:188,
            top:10,
            left:135,
            opacity:0,
            z:2
        },
        { //5
            height:198,
            top:0,
            left:0,
            opacity:0,
            z:1
        },
        { //6
            height:188,
            top:10,
            left:-105,
            opacity:0,
            z:2
        },
        { //7
            height:188,
            top:10,
            left:-105,
            opacity:0,
            z:3
        },
        { //8
            height:188,
            top:10,
            left:-105,
            opacity:80,
            z:4
        }
    ];

    /*步骤*/
    //0、获取元素
    // var pageHomeWrap = document.getElementById("pageHomeWrap");
    var slide = document.getElementById("slide");
    var imgArr = slide.getElementsByTagName("img");
    var arrow = document.getElementById("arrow");
    var arrowChilden = arrow.children;

    // var btn = pageHomeWrap.children[1];
    // var lis = btn.getElementsByTagName("li");

    //1、鼠标放到轮播图上，两侧按钮显示，移开隐藏
    slide.onmouseover = function () {
        // arrow.style.opacity = 100;
        animate(arrow,{"opacity":100});
    };
    slide.onmouseout = function () {
        // arrow.style.opacity = 0;
        animate(arrow,{"opacity":0});
    };

    //2、让页面中加载出所有盒子的样式
    for (var i=0; i<imgArr.length; i++) {
        //利用animate()框架让指定的属性，缓慢运动到指定位置
        animate(imgArr[i],{
            "height":json[i].height,
            "top":json[i].top,
            "left":json[i].left,
            "opacity":json[i].opacity,
            "zIndex":json[i].z
        });
    }

    //3、为两侧按钮绑定事件（调用同一个方法，只传一个参数，true为正向旋转，false为反向旋转）
    for (var k in arrowChilden) {
        arrowChilden[k].onclick = function () {
            if (this.className === "prev") {
                move(true); //左移
            }else {
                move(false); //右移
            }
        }
    }

    //4、书写函数
    function move(bool) {
        if(bool){
            //（操作数组。正向旋转，删除数组中第一个元素，添加到数组中的最后一位）
            json.push(json.shift());
        }else{
            //（操作数组。反向选转，删除数组中最后一个元素，添加到数组中的第一位）
            json.unshift(json.pop());
        }
        for (var i=0; i<imgArr.length; i++) {
            //利用animate()框架让指定的属性，缓慢运动到指定位置
            animate(imgArr[i],{
                "height":json[i].height,
                "top":json[i].top,
                "left":json[i].left,
                "opacity":json[i].opacity,
                "zIndex":json[i].z
            });

        }


    }


};
