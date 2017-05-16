/**
 * Theme: player
 * Dependence；jquery
 */
$(function () {

    var json=[
        { //0
            songName:"成都",
            singerName:"赵雷",
            src:"source/成都.mp3",
            s:"images/image/source/01.jpg"
        },
        { //1
            songName:"江湖写照",
            singerName:"柏凝",
            src:"source/江湖写照.mp3",
            s:"images/image/source/02.png"
        },
        { //2
            songName:"在这个世界相遇",
            singerName:"陈奕迅",
            src:"source/在这个世界相遇.mp3",
            s:"images/image/source/03.png"
        }
    ];



    //设置基本信息
    var curPlayLine = 0, //当前播放曲目序号
        isDrag = false, //是否允许拖动滚动条
        timer = null, //缓冲进度定时器timer
        volume = 0.36 //默认音量

    //DOM
    var media = $("#audio").get(0), //audio
        $playBtnGroup = $("#playBtnGroup"), //播放控制按钮
        $muteBtn = $("#muteBtn"), //静音按钮
        $audioCurrentTime = $("#audioCurrentTime"), //当前播放时间
        $audioDuration = $("#audioDuration"), //歌曲总时长
        // $timeProgressBox = $("#timeProgressBox"), //时间进度条父元素
        $progressTime = $("#progressTime"), //时间进度条本身
        $progressCircle = $("#progressCircle"), //圆点
        // $soundProgressBox = $("#soundProgressBox"), //音量进度条父元素
        $progressVolume = $("#progressVolume"), //音量进度条本身
        $progressSmallCircle = $("#progressSmallCircle"),//小圆点

        // $progressCache = $("#progressCache"), //缓冲进度条
        $songPicture = $("#songPicture"), //小窗口图片
        $songName = $("#songName"), //小窗口歌曲名
        $singerName = $("#singerName"); //小窗口歌手名



    //===========================初始化===============================================

    //清除定时器
    clearInterval(timer);
    //进度条初始化
    $progressTime.css("width","0%");
    $progressVolume.css("width","36%");
    //音量初始化
    media.volume = volume;



    //=============================播放音乐主函数==============================

    var playMusic = function () {
        //进度条初始化
        $progressTime.css("width","0%");
        //音频暂停播放
        media.pause();
        //播放按钮变为暂停样式
        stylePlayBtn($playBtnGroup.find(".play"),"pause");
        //获取资源
        $(media).attr("src",json[curPlayLine].src);
        //播放音频
        $(media).on("canplay",function () {
            this.play();
        });
        //播放按钮变为播放样式
        stylePlayBtn($playBtnGroup.find(".play"),"play");
        //刷新小窗歌曲信息
        $songName.html(json[curPlayLine].songName);
        $singerName.html(json[curPlayLine].singerName);
        //刷新小窗封面
        $songPicture.attr("src",json[curPlayLine].s);

    }



    //=================播放器================================

    //播放按钮
    $playBtnGroup.find(".play").on("click",function () {
        if(!media.src){
            alert("info:"+"没有播放资源，请选择曲目");
        }else {
            if(!media.paused){
                media.pause();
                //play按钮样式
                stylePlayBtn($playBtnGroup.find(".play"),"pause");
                $playBtnGroup.find(".play").attr("title","播放（Ctrl+P）");
            }else {
                media.play();
                stylePlayBtn($playBtnGroup.find(".play"),"play");
                $playBtnGroup.find(".play").attr("title","暂停（Ctrl+P）");
            }
            // audioError(media);
        }

    })

    //切换下一首
    $playBtnGroup.find(".next").on("click",function () {
        if (!media.src) {
            alert("info:"+"没有播放资源，请选择曲目");
        } else {
            var songLen=json.length;
            curPlayLine=curPlayLine+1>=songLen?0:curPlayLine+1; //循环播放
            playMusic(curPlayLine);
            $playBtnGroup.find(".play").attr("title","暂停（Ctrl+P）");
            console.log("next "+curPlayLine);
        }
    });

    //切换上一首
    $playBtnGroup.find(".prev").on("click",function () {
        if (!media.src) {
           alert("info:"+"没有播放资源，请选择曲目");
        } else {
            var songLen=json.length;
            curPlayLine=curPlayLine-1<0?songLen-1:curPlayLine-1;
            playMusic(curPlayLine);
            $playBtnGroup.find(".play").attr("title","暂停（Ctrl+P）");
            console.log("prev "+curPlayLine);

        }
    });

    // 静音
    $muteBtn.on("click",function () {
        if (!media.muted) {
            media.muted=true;
            $muteBtn.html('<i class="fa fa-volume-off" aria-hidden="true"></i>').attr("title","恢复音量");
            $progressVolume.css("display","none");
        } else {
            media.muted=false;
            $muteBtn.html('<i class="fa fa-volume-up" aria-hidden="true"></i>').attr("title","静音");
            $progressVolume.css("display","block");
        }
    });


    //=====================播放监听事件=================================

    //更新时间
    $(media).on("timeupdate",function () {
        if (!isDrag) {
            var objTimeCurTime=formatTime(this.currentTime);
            var objTimeDuration=formatTime(this.duration);
            $audioCurrentTime.html(objTimeCurTime.M+":"+objTimeCurTime.S);
            $audioDuration.html(objTimeDuration.M+":"+objTimeDuration.S);
            // 更新进度条
            $progressTime.css("width",(this.currentTime/this.duration).toFixed(4)*100+"%");
        }
    });
    // 播放完成 自动播放下一首 直至最后一首停止
    $(media).on("ended",function () {
        var songLen=json.length;
        if (curPlayLine+1>=songLen) {
            $(this).get(0).pause();
            stylePlayBtn($playBtnGroup.find(".play"),"pause");
            console.log("===All song are finished!!!===");
        } else {
            curPlayLine=curPlayLine+1;
            playMusic(curPlayLine);
            console.log("next "+curPlayLine);
        }
    });


    //==========拖动进度条事件=====================

    //未完待续...











    playMusic();


})
