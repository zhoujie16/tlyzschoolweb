$(function() {
	/*navbox*/
	$(window).resize(function() {
		if($(".navbtn:visible").length > 0) {
			$(".navbox").addClass("navopen");
			$(".navopen").show().css({
				height: "0px",
				display: "none"
			});
		} else {
			$(".navopen").show().css({
				height: "76px",
				display: "block"
			});
			$(".navbox").removeClass("navopen");
		}
	});
	$(window).trigger("resize");
	var h = $(".navopen").height();
	$(".navopen").height(0);
	$(".navmain .navbtn").click(function() {
		if($(".navbox").height() > 0) {
			$(".navopen").animate({
				height: "0px"
			}, 500, function() {
				$(".navopen").hide().css({
					height: "0px"
				});
			});
		} else {
			$(".navopen").show().animate({
				height: "260px"
			}, 500);
		}
	});
	const user = JSON.parse(localStorage.getItem('user'));
	if(user) {
		$('.login-hd').remove('on');
		$('.login-hd').addClass('hide');
		$('.user-hd').remove('hide');
		$('.user-hd').addClass('on');
	} else {
		$('.login-hd').remove('hide');
		$('.login-hd').addClass('on');
		$('.user-hd').remove('on');
		$('.user-hd').addClass('hide');
	}
})

$(function() {
	// 搜索输入隐藏下拉菜单
	$(".search-val").keydown(function() {
		$('.search-select ul').hide();
	});
	//滑过导航显示子导航
	$(".nav-hd li").hover(function() {
		$(this).addClass("open");
		$(this).find(".subnav-hd").show();
	}, function() {
		$(this).removeClass("open");
		$(this).find(".subnav-hd").hide();
	});

	//兼容个人中心,立即激活的样式。
	$(".jsemailverify").parent('div').parent('li').css("background", "#fff7e7").find('a').addClass('f14').css('display', 'block');

	$(".user-hd").hover(function() {
		$(this).addClass('on');
		$(this).find('.user-menu').show();
	}, function() {
		$(this).removeClass('on');
		$(this).find('.user-menu').hide();
	});

	$(".quick-item").hover(function() {
		$(this).addClass('on');
		$(this).find('.quick-menu').show();
	}, function() {
		$(this).removeClass('on');
		$(this).find('.quick-menu').hide();
	});

	$(".quick-item").mouseenter(function() {
		if($(this).find('.quick-menu').attr('id') == 'quickTab' && nav_loc.length > 0) {
			var navi = nav_loc.substr(0, 1); // 获取第一个展开S
			navi = parseInt(navi);
			tabNav.eq(navi).trigger('click'); //默认有动态 展开项
		}
	});

	$(".search-hd-btn").click(function(ev) {
		var ev = ev || event, // enent做兼容
			isTrue = $(".search-hd").is(".on"); // 判断.search-hd是否是展开状态
		ev.stopPropagation(); // 阻止冒泡
		if($(".search-hd").addClass('on').find('input').val() == "") { // 在输入框没有文字时执行
			if(isTrue) { // isTrue等于 true 移除on，false就添加on
				$(".search-hd").removeClass('on').find('input').blur();
				$('.search-select ul').hide();
			} else {
				$(".search-hd").addClass('on').find('input').focus();
			}
		} else { //提交事件search-hd
			$(".search-hd").find('input').focus();
			if(isTrue) {
				$("#searchForm").submit();
			} else {

			}
		}
	})
	$(".search-filter").click(function(ev) {
		ev.stopPropagation();
	})
	$(document).click(function() {
		$(".search-hd").removeClass('on').find('input').blur();
	});
	//回车提交
	$(document).on("keydown", "#keywords", function(e) {
		var keyVal = $(this).val();
		var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if(keyVal == '' && keyCode == 13) {
			e.preventDefault();
		}
	})

	// 搜索分类
	$(".search-filter").hover(function() {
		$(this).find('ul').show();
	}, function() {
		$(this).find('ul').hide();
	})
	// selectBoxSer (".search-filter");
	$(".search-filter ul a").click(function() {
		var textVal = $(this).text();
		var tVal = $(this).attr("data-rel");
		$(".search-filter ul li").removeClass("on");
		$(this).parent().addClass("on");
		$("#sType").val(tVal);
		$(this).parents(".search-filter").find(".tit").text(textVal);
		$(this).parents(".search-filter").find(".options").hide();
		return false;
	});

	// 搜索提示
	selectBoxSer(".search-select");
	$(".search-select ul a").click(function() {
		var textVal = $(this).text();
		$(".search-val").val(textVal);
		$(this).parents(".search-select").find(".options").hide();
		// $(".search-hd").find('input').focus();搜索下拉选择后获取焦点
		return false;
	});

});
// 搜索选项下拉
selectBoxSer = function(box) {
	$(box).click(function() {
		var $this = $(this);
		$this.blur();
		var options = $this.find('.options').css('display');

		if(options == 'none' && $(".search-val[type=text]").val() == "") { //
			$this.find(".options").show();

		} else {
			$this.find(".options").hide();
		}
		/*点击任何地方关闭层*/
		$(document).click(function(event) {
			var tar = $(event.target).attr("class");
			if(tar != $this) {
				$this.find(".options").hide();
			}
		});
		return false;

	});
	$('.noti_img').parent().parent().addClass("nl");
	$('.noti_img').parent().find('br').remove();
	$('.tab-wrap ul li a').find('br').remove();
};