import React from 'react';

export default function Comment(props){
	var lastTime, lastMinute = ((new Date() - props.time * 1000) / 1000 / 60) >> 0;
	console.log(lastMinute);
	switch(true){
		case lastMinute < 60:
			lastTime = lastMinute + ' 分钟前';
			break;
		case lastMinute < 1440:
			lastTime = (lastMinute / 60 >> 0) + ' 小时前';
			break;
		case lastMinute < 43200:
			lastTime = (lastMinute / 1440 >> 0) + ' 天前';
			break;
		default: 
			lastTime = (lastMinute / 43200 >> 0) + ' 月前';
	}
	// TODO:: 回复和赞
	return (
		<div>
			<div>{props.user.name} <span style={{float: 'right',color: '#8E9B9A'}}>{lastTime}</span></div>
			{props.content}

		</div>
	);
}