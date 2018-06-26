const services = {
	domain: 'http://school.jsonpro.cn/pt-school/api/',
	getParam: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return decodeURIComponent(r[2]);
		}
		return null; //返回参数值
	},
	setUser: function(stuId) {
		localStorage.setItem('userId', stuId);
	},
	getUser: function() {
		return localStorage.getItem('userId');
	},
	request: function(type, url, params, cb) {
		$.showLoading();
		if(type == 'post') {
			params = JSON.stringify(params);
		}
		$.ajax({
			type: type,
			url: services.domain + url,
			data: params,
			headers: {
				'Content-Type': 'application/json'
			},
			async: true,
			success: function(res) {
				$.hideLoading();
				if(res.code == 200) {
					cb(res);
				} else {
					$.tooltip(res.msg);
				}
			},
			error: function() {
				$.hideLoading();
				$.tooltip('请求失败,请重试!');
			}
		});
	},
	login: function(params, cb) {
		services.request('post', 'member/login', params, cb);
	},
	studentList: function(params, cb) {
		services.request('get', 'student/list', params, cb);
	},
	studentInfo: function(params, cb) {
		services.request('get', 'student/' + params.id, params, cb);
	},
	studentActive: function(params, cb) {
		services.request('post', 'student/active', params, cb);
	},
	classNoticeList: function(params, cb) {
		services.request('get', 'notice/list', params, cb);
	},
	msgWallList: function(params, cb) {
		services.request('get', 'msgWall/list', params, cb);
	},
	publishMessage: function(params, cb) {
		services.request('post', 'msgWall/push', params, cb);
	},
	campusList: function(params, cb) {
		services.request('get', 'campus/list', params, cb);
	},
	gradeList: function(params, cb) {
		services.request('get', 'grade/list', params, cb);
	},
	classList: function(params, cb) {
		services.request('post', 'class/list', params, cb);
	},
	expand: function(stuId, params, cb) {
		services.request('post', 'student/' + stuId + '/expand', cb);
	},
	setPages: function(curPage, count, pageSize, ele, cb) {
		var totPage = Math.ceil(count / pageSize);
		ele.innerHTML = '';
		var html = '<a class="prev" data-value="1">首页</a>';
		html += '<a class="prev" data-value="' + (curPage > 1 ? (curPage - 1) : 1) + '">上一页</a>';
		var page = curPage;
		if(totPage - curPage > 5) {
			while(page <= curPage + 5) {
				if(page == curPage) {
					html += '<span class="current">' + page + '</span>';
				} else {
					html += '<a class="num" data-value="' + page + '">' + page + '</a>';
				}
				page++;
			}
		} else {
			page = curPage - (5 - (totPage - curPage));
			page = page < 1 ? 1 : page;
			while(page <= totPage) {
				if(page == curPage) {
					html += '<span class="current">' + page + '</span>';
				} else {
					html += '<a class="num" data-value="' + page + '">' + page + '</a>';
				}
				page++;
			}
		}
		html += '<a class="next" data-value="' + (curPage < totPage ? (curPage + 1) : totPage) + '">下一页</a>';
		html += '<a class="next" data-value="' + totPage + '">尾页</a><samp class="jldqys">共有 ' + count + ' 条记录，当前 <strong>' + curPage + '</strong>/' + totPage + ' 页</samp>';
		ele.innerHTML = html;
		$(ele).on('click', 'a', function() {
			var cur = this.dataset.value;
			if(cur != curPage) {
				cb(cur, pageSize);
			}
		});
	}
}

Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}