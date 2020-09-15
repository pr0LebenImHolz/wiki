const Navigation = {
	build(indexFile) {
		$.getJSON(indexFile, (data) => {
			var items = [];
			for (var i = 0; i < data.length; i++) {
				var anchor;
				switch(data[i].type) {
					case "page":
						anchor = `<a href="?page=${data[i].ref}" data-href="${data[i].ref}">${data[i].name}</a>`;
						break;
					case "link":
						if (data[i].target) {
							anchor = `<a href="${data[i].ref}" target="${data[i].target}">${data[i].name}</a>`;
						} else {
							anchor = `<a href="${data[i].ref}">${data[i].name}</a>`;
						}
						break;
				}
				items.push(anchor);
			}
			$("#navigation").html(items.join(""));
			$("#navigation > a[href^='?']").on("click", Page.navigate);
		});
	}
};