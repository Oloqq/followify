function renderFollowing(data) {
	var list = $('#followingList');
	data.forEach(artist => {
		console.log(artist);
		list.append(`<li>${artist.name}</li>`);
	});
}