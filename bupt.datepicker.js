//get the month data
(function(){
	var datepicker = {};
	datepicker.getMonthData = function(year, month){
		var ret = [];
		if(!year || !month){
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}
		//get the first day of this month
		var firstDay = new Date(year, month-1, 1);
		var firstDayWeekDay = firstDay.getDay();
		if(firstDayWeekDay===0){
			firstDayWeekDay = 7;
		}
		var curYear = firstDay.getFullYear();
		var curMonth = firstDay.getMonth()+1;
		//get the last day of last month
		var lastDayOfLastMonth = new Date(year, month-1, 0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
		var preMonthDayCount = firstDayWeekDay-1;
		//get the last day of this month
		var lastDay = new Date(year, month , 0);
		var lastDate = lastDay.getDate();
		for(var i=0; i<7*6; i++){
			var date = i + 1 - preMonthDayCount;
			var showDate = date;
			var thisMonth = month;
			if(date<=0){
				//last month
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			}else if(date>lastDate){
				//next month
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}
			if(thisMonth ===0 ){
				thisMonth = 12;
			}
			if(thisMonth === 13){
				thisMonth = 1;
			}
			ret.push({
				month: thisMonth,
				date: date,
				showDate: showDate
			});
		}
		return {
			curYear: curYear,
			curMonth: curMonth,
			days: ret
		};
	}
	window.datepicker = datepicker;
})();

//show in the datepicker
(function(){
	var monthData;
	var $wrapper;
	var datepicker = window.datepicker;
	datepicker.buildUi = function(year, month){
		monthData = datepicker.getMonthData(year, month);
		var curYear = monthData.curYear;
		var curMonth = monthData.curMonth;
		var html = '<div class="ui-datepicker-header">'
			+'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>'
			+'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'
			+'<span class="ui-datepicker-curr-month">'+curYear+'-'+curMonth+'</span></div>'
			+'<div class="ui-datepicker-body"><table><thead>'
			+'<tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th>'
			+'</tr></thead>'
			+'<tbody>';
		for(var i=0; i<monthData.days.length; i++){
			var data = monthData.days[i];
			if(i%7 === 0){
				html += '<tr>';
			}
			html += '<td data-date="'+data.date+'">'+data.showDate+'</td>';
			if(i%7 === 6){
				html += '</tr>';
			}
		}
		html += '</tbody></table></div>';
		return html;
	}

	datepicker.render = function(direction){
		var year, month;
		if(monthData){
			year = monthData.curYear;
			month = monthData.curMonth;
		}
		if(direction === 'prev'){
			month--;
			if(month === 0){
				month = 12;
				year = year-1;
			}
		}else if(direction === 'next'){
			month++;
		}
		var html = datepicker.buildUi(year, month);
		$wrapper = document.getElementsByClassName('ui-datepicker-wrapper')[0];
		if(!$wrapper){
			$wrapper = document.createElement('div');
			document.body.append($wrapper);
			$wrapper.className = 'ui-datepicker-wrapper';
		}
		$wrapper.innerHTML = html;
	}

	datepicker.init = function(input){
		datepicker.render();
		var isOpenFlag = false;
		var $input = document.getElementById(input);
		$input.classList.add('ui-datepicker-wrapper-input-style');
		$input.addEventListener('click', function(){
			if(isOpenFlag){
				isOpenFlag = false;
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
			}else{
				isOpenFlag = true;
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$wrapper.style.top = top + height + 2 +'px';
				$wrapper.style.left = left + 'px';
			}
		}, false);

		$wrapper.addEventListener('click', function(e){
			var $target = e.target;
			if(!$target.classList.contains('ui-datepicker-btn')){
				return;
			};
			if($target.classList.contains('ui-datepicker-prev-btn')){
				datepicker.render('prev');
			}else if($target.classList.contains('ui-datepicker-next-btn')){
				datepicker.render('next');
			}
		}, false);

		$wrapper.addEventListener('click', function(e){
			var $target = e.target;
			if($target.tagName.toLowerCase()!=='td'){
				return;
			}
			var date = new Date(monthData.curYear, monthData.curMonth-1, $target.dataset.date);
			$input.value = format(date);
			//close the datepicker panel
			isOpenFlag = false;
			$wrapper.classList.remove('ui-datepicker-wrapper-show');
		}, false);
	};

	function format(date){
		var str = '';
		var formatter = function(num){
			if(num<=9){
				num = '0'+num;
			}
			return num;
		}
		str += date.getFullYear()+'-';
		str += formatter(date.getMonth()+1)+'-';
		str += date.getDate();
		return str; 
	};
})();