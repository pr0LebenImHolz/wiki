const Page = {
	search: null,
	content: null,
	parseSearch() {
		var search = window.location.search;
		var response = {};
		if (search) {
			search = window.location.search.substr(1).split("&");
			if (search.length < 1) throw `Can't parse window.location.search: Invalid search string`;
			for (var i = 0; i < search.length; i++) {
				var item = search[i].split("=");
				if (item.length != 2) throw `Can't parse window.location.search: Invalid search item at #${i + 1}`;
				response[item[0]] = item[1];
			}
		}
		Page.search = response;
	},
	updateSearch() {
		var keys = Object.keys(Page.search);
		var search = "?";
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			search += `${key}=${Page.search[key]}&`;
		}
		search = search.slice(0, -1);
		history.pushState(null, "null", search);
	},
	init(DEFAULT_LOCATION, ERROR_PAGES, PAGE_DIR, BASE_TITLE) {
		Page.DEFAULT_LOCATION = DEFAULT_LOCATION;
		Page.ERROR_PAGES = ERROR_PAGES;
		Page.PAGES_DIR = PAGE_DIR;
		Page.BASE_TITLE = BASE_TITLE;
	},
	handleRequest() {
		var content = null;
		try {
			Page.parseSearch();
		} catch (e) {
			console.error(e)
			$("#main").html(Page.ERROR_PAGES.ERROR_BAD_REQUEST);
			return;
		}
		if (Object.keys(Page.search).length == 0 || !Page.search.page) {
			Page.search.page = Page.DEFAULT_LOCATION;
			Page.updateSearch();
		}
		$.ajax({
			dataType: "text/markdown",
			url: Page.PAGES_DIR + Page.search.page + ".md",
			complete: (xhr, textStatus) => {
				var content = null;
				switch (xhr.status) {
					case 200:
						content = Page.parsePage(xhr.responseText);
						document.title = Page.BASE_TITLE + $(content).find("h1").text();
						content = xhr.responseText ? content : Page.ERROR_PAGES.ERROR_BAD_REQUEST;
						break;
					case 403:
						content = Page.ERROR_PAGES.ERROR_RATE_LIMIT;
						break;
					case 404:
						content = Page.ERROR_PAGES.ERROR_NOT_FOUND;
						break;
					case 500:
					default:
						content = Page.ERROR_PAGES.ERROR_INTERNAL;
						break;
				}
				$("#main").html(content);
				Page.parseContent();
			}
		});
	},
	parsePage(content) {
		
		// Parse markdown
		var md = new markdownit({
			html: true,					// Enable html code in markdown.
			xhtmlOut: false,			// No xhtml synthax.
			breaks: true,				// Linebreaks are interpreted as newlines.
			linkify: false,				// Link-like text is ignored.
			typographer: false,			// '(c)', for example won't be converted to '©'.
			quotes: '„“‚‘',				// '"""'
			highlight: (str, lang) => {	// Code highlighting
				if (lang && hljs.getLanguage(lang)) {
					try {
						return hljs.highlight(lang, str).value;
					} catch (__) {}
				}
				return ""; // use external default escaping
			}
		}).use(markdownitFootnote);
		content = md.render(content);
		
		// Parse headlines
		//@todo
		
		return content;
	},
	parseContent() {
		var elements = $("#main div.recipe");
		if (elements.length === 0) return;
		for (var i = 0; i < elements.length; i++) {
			var title = elements[i].dataset.title
			var tool = elements[i].dataset.tool
			var inputs = elements[i].dataset.inputs.split(",");
			var outputs = elements[i].dataset.outputs.split(",");
			$(elements[i]).html(Minecraft.parseRecipe(tool, inputs, outputs));
		};
	},
	navigate(e) {
		e.preventDefault();
		Page.search.page = $(e.target).data("href");
		Page.updateSearch();
		Page.handleRequest();
	}
};