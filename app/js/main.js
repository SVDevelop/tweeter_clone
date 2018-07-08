$(document).ready(function() {
	
	var getDate = function () {
		var data = new Date(),
			day = data.getDate(),
			hrs = data.getHours(),
			min = data.getMinutes(),
			sec = data.getSeconds(),
			mnth = data.getMonth(),
			year = data.getFullYear();

		var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");
		//if (day <=9) day = "0" + day;

		var actualDate = `${day} ${monthArray[mnth]} ${year} г. ${hrs} часов ${min} мин`;

		return actualDate;
	};

	var countTweets = function () {
		var tweetCounter = $('.tweet-card').length;
		$('#tweetsCounter').text(tweetCounter);
	};

	var wrapURLs = function (text, new_window) {
	  var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
	  var target = (new_window === true || new_window == null) ? '_blank' : '';
	  
	  return text.replace(url_pattern, function (url) {
	    var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
	    var href = protocol_pattern.test(url) ? url : 'http://' + url;
	    return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
	  });
	};

	var createTweet = function (data, text) {
		var $tweetBox = $('<div class="card tweet-card"></div>');
		var $tweetDate = $('<div class="tweet-date"></div>').text( data );
		var $tweetText = $('<div class="tweet-text"></div>').html( wrapURLs(text) ).wrapInner('<p></p>');

		var additionalClassName;
		if ( text.length < 100 ) {
			additionalClassName = 'font-size-large';
		} else if ( text.length > 150 ) {
			additionalClassName = 'font-size-small';
		} else {
			additionalClassName = 'font-size-normal';
		}

		$tweetText.addClass(additionalClassName);

		$tweetBox.append($tweetDate).append($tweetText);
		$('#tweetLists').prepend($tweetBox);
		countTweets();
	};
	var tweetsBase = [
		{
			date: '28 апр. 2017 г.',
			text: ''
		},
		{
			date: '28 апр. 2017 г.',
			text: ''
		},
		{
			date: '28 апр. 2017 г.',
			text: ''
		},
		{
			date: '28 апр. 2017 г.',
			text: ''
		}
	];
	tweetsBase.forEach( function (tweet) {
		createTweet(tweet.date, tweet.text);
	});
	//Форма отправки
	$('#postNewTweet').on('submit', function(event) {
		event.preventDefault();
		var $tweetText = $('#tweetText').val();
		createTweet( getDate(), $tweetText );
		$('#tweetText').val('');//cбрасываем значение поля ввода
	});
});