$('#buttonRefresh').click(function (ev) {
	//prevent continuous requests
	var elem = $(this);
	elem.attr('disabled', true);
	setTimeout(()=>elem.attr('disabled', false), 10000);
	$('#loadingFollowing').text('Loading...');
	$('#loadingFollowing').css('visibility', 'visible');

	//request
	$.ajax({
		url: '/following',
		type: 'get',
		success: function(data) {
			if (data.status == 'error') {
				console.log(data.message);
				$('#loadingFollowing').text(`Failed: ${data.message}. Try relogging`);
				return;
			}
			$('#loadingFollowing').css('visibility', 'hidden');
			renderFollowing(data);
		}
	});
}).click();
