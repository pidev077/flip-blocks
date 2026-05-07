export default {
	init() {
		const block = document.querySelector(".block-insights");
		if (!block) return;

		const dropdown = document.querySelector(".block-insights__drowdown");
		const labelDropdown = document.querySelector(
			".block-insights__drowdown--label"
		);
		const dataInsight = document.querySelector(".block-insights__inner");
		const infinite = document.getElementById("block-insights__infinite");
		const insightsGrid = document.querySelector(".block-insights__grid");

		let maxPages = null;
		let loading = false;

		// Toggle dropdown
		labelDropdown?.addEventListener("click", (event) => {
			event.preventDefault();
			dropdown.classList.toggle("active");
		});

		// Category item click
		dropdown
			?.querySelectorAll(".block-insights__drowdown--item")
			.forEach((item) => {
				item.addEventListener("click", (event) => {
					event.preventDefault();
					labelDropdown.textContent = item.textContent;
					dataInsight.dataset.id = item.dataset.id;
					dataInsight.dataset.paged = 1;
					dropdown.classList.toggle("active");
					let query = dataInsight.dataset.query;
					let cat_id = dataInsight.dataset.id;
					let paged = 1;

					maxPages = null;
					loading = false;

					fetchData({ cat_id: cat_id, query, paged }, false);
				});
			});

		function initObserver() {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !loading) {
							let paged = parseInt(dataInsight.dataset.paged) + 1;

							if (maxPages !== null && paged > maxPages) {
								observer.disconnect();
								return;
							}

							dataInsight.dataset.paged = paged;
							loading = true;
							infinite.classList.add("showing");
							let cat_id = dataInsight.dataset.id;
							let query = dataInsight.dataset.query;

							fetchData({ cat_id, query, paged }, true);
						}
					});
				},
				{
					root: null,
					rootMargin: "0px 0px -200px 0px",
					threshold: 0,
				}
			);

			if (infinite) {
				observer.observe(infinite);
			}

			return observer;
		}

		let observer = initObserver();

		function fetchData(params = {}, scroll = false) {
			fetch(block_script.ajax_url, {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: new URLSearchParams({
					action: "ajax_filter_insights",
					...params,
				}),
			})
				.then((response) => response.json())
				.then((res) => {
					if (res) {
						let { items, max_pages } = res.data;
						if (max_pages) maxPages = max_pages;

						if (scroll) {
							insightsGrid.insertAdjacentHTML("beforeend", items);
						} else {
							insightsGrid.innerHTML = items;
						}
					}
				})
				.catch((error) => console.error("AJAX Error:", error))
				.finally(() => {
					loading = false;
					infinite.classList.remove("showing");
					observer.disconnect();
					observer = initObserver();
				});
		}
	},
};
