export const setCookie = (name, val, expire = 2592000000) => {
	if (typeof expire !== "number") {
		return Promise.reject("invaild expires");
	}
	return new Promise(function(resolve) {
		var date = new Date();
		date.setTime((new Date()) + expire);
		document.cookie = name + "=" + val + "; expires=" + date.toGMTString();
		resolve();
	});
}

export const getCookie = (name) => {
	return new Promise(function(resolve, reject) {
		var regexp = new RegExp(name + "=(\\S+)(;|$)");
		var rs = document.cookie.match(regexp);
		if (rs)
			resolve(rs[1]);
		else
			reject('not exist');
	});
}

export const delCookie = (name) => {
	return new Promise(function(resolve) {
		document.cookie = name + "= ; expires =Thu, 01 Jan 1970 00:00:00 GMT";
		resolve();
	});
}

export const autoLogin = (dispatchLogin) => {
	// TODO:::
	// return Promise.resolve(false);
	return new Promise((resolve) => {
		dispatchLogin({
			userInfo: {
				id: 1,
				name: 'hhhname',
				email: 'hhhemail@163.com',
			},
			collection: [1,5,4,6,8],
			focusTopics: [1,5,4,7]
		});
		resolve(true);
	});
	return getCookie('USERLOGINFO').then((vals) => {
		var time = ((+new Date()) / 1000) >> 0;
		return postUrl('user/login', {
			info: vals,
			time
		}).then(vals => {
			if(!vals)
				return Promise.resolve(false);
			dispatchLogin(vals);
			return Promise.resolve(true);
		});
	}, () => {
		return Promise.resolve(false);
	});
}

export const postUrl = (url, data) => {
	console.log(data);
	return fetch('http://localhost:3000/api/' + url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then(res => res.json()).then(val => {
		if(val.succ == 0){
			// TODO:: 弹窗
			console.error(val.data);
			return Promise.resolve(false);
		}
		if(val.succ == 2){
			// 暂定登录异常..
			console.error(val.data);
			return Promise.resolve(false);
		}
		return Promise.resolve(val.data);
	});
}

export const htmlProcess = {
	encode: function(text) {
		return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt').replace(/\'/g, '&#39;').replace(/\"/g, '&quot;');
	},
	decode: function(text) {
		return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
	}
}