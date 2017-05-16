/**
 * Theme:index Utils
 * Dependence:jquery
 *
 */





/**//****************************头部*******************************************/

var $searchInput = $("#searchInput"),
    $searchTag = $(".menu-search-tag"),
    $userMenu =  $(".menu-user"),
    $userTag = $(".menu-user-tag");

/*搜索区弹出窗口*/
$searchInput.on("focus",function () {
    $(this).attr("placeholder","");
    $searchTag.show();
});
$searchInput.on("blur",function () {
    $searchTag.hide();
    $(this).attr("placeholder","搜索音乐，歌词，歌手，用户");
});

/*用户区弹出窗口*/
$userMenu.on("click",function () {
   $userTag.toggle();
});


/**//****************************主体*******************************************/

/**//*左侧导航==歌单*/

$("#titleCreate , #titleCollect").on("click",function () {
    $(this).next().toggle();
    if(this.title === "收起"){
       $(this).attr("title","展开").find(".unfold-list").html("<i class='fa fa-angle-right' aria-hidden='true' title='展开'></i>");
    }else {
       $(this).attr("title","收起").find(".unfold-list").html("<i class='fa fa-angle-down' aria-hidden='true' title='收起'></i>");
    }
});







/**//****************************底部*******************************************/

/*player*/
var stylePlayBtn = function ($ele,playType) {
    var html_play ='<i class="fa fa-play" aria-hidden="true"></i>';
    var html_pause = '<i class="fa fa-pause" aria-hidden="true"></i>';
    $ele.html(playType === 'play' ? html_pause : html_play );
};

/**
 * @Theme: 时间格式转换
 * @Param: seconds
 * @Memo: s => h:m:s   1 => 01
 */
var formatTime = function (seconds) {
    var h = 0,
        m = 0,
        s = Math.floor(seconds);
    h = Math.floor(s/3600);
    m = Math.floor((s%3600)/60);
    s = s%3600%60;

    return{
        H: h=h<10 ? "0"+h : h,
        M: m=m<10 ? "0"+m : m,
        S: s=s<10 ? "0"+s : s
    };
};

/**
 * @Theme: 日期格式转换
 * @Param: seconds
 * @Memo: 1486684800000 -> 2017-02-10
 */
var formatDate = function (timestamp) {
    var current = new Date(timestamp);
    var y = current.getFullYear(),
        mo = current.getMonth() + 1,
        d = current.getDay();

    return {
        Y: y,
        Mo: mo=mo<10 ? "0"+mo : mo,
        D: d=d<10 ? "0"+d : d
    };
};


//=======================EXPORT============================

//export
window.stylePlayBtn = stylePlayBtn;
window.formatTime = formatTime;
window.formatDate = formatDate;


