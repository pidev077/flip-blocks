export default {
    init() {
        const block = document.querySelector('.block-teams-list');
        if (!block) return;

        const dropdown        = document.querySelector('.block-teams__drowdown');
        const labelDropdown   = document.querySelector('.block-teams__drowdown--label');
        const lmContainer     = block.querySelector('.block-teams-list__load-more');
        const btnLoadMore     = block.querySelector('.btn-load-more');
        const teamsGrid       = document.querySelector('.block-teams__list');
        const query           = teamsGrid.dataset.query;
        const dropdownLoading = block.querySelector('.teams-filter__loading');


        function fetchData(params = {}, scroll = false) {

            if (scroll) lmContainer.classList.add('has-loading');
            if (!scroll) dropdownLoading.classList.add('has-active');
            
            fetch(block_script.ajax_url, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ action: "ajax_filter_teams", ...params })
            })
            .then(response => response.json())
            .then(data => {
                if (teamsGrid) {
                    if (scroll) {
                        teamsGrid.insertAdjacentHTML('beforeend', data.data.items);
                        btnLoadMore?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'end'
                        });
                    }else{
                        teamsGrid.innerHTML = data.data.items;
                    }

                    if(lmContainer){    
                        lmContainer.style.display = data.data.has_more ? 'block' : 'none';
                    }
                }
            })
            .catch(error => console.error("AJAX Error:", error))
            .finally(() => {
                if (!scroll) dropdownLoading.classList.remove('has-active');
                if (scroll) lmContainer.classList.remove('has-loading');
            });
        }
        

        // Toggle dropdown
        labelDropdown?.addEventListener('click', (event) => {
            event.preventDefault();
            dropdown.classList.toggle('active');
        });


        btnLoadMore?.addEventListener('click', () => {
            const paged             = parseInt(teamsGrid.dataset.paged) + 1;
            const catID             = dropdown.dataset.cate;
            teamsGrid.dataset.paged = paged;
            fetchData({ query, catID, paged }, true);
        })
    
        // Category item click
        dropdown?.querySelectorAll('.block-teams__drowdown--item').forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                labelDropdown.textContent = item.textContent;
                dropdown.dataset.cate     = item.dataset.id;
                teamsGrid.dataset.paged   = 1;

                let catID  = dropdown.dataset.cate;

                dropdown.classList.toggle('active');
                fetchData({ query, catID, paged: 1 }, false);
            });
        });


        document.addEventListener('click', (event) => {
            if (!dropdown) return;

            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });

        const popup = document.getElementById('team-popup');
        const popupBody = popup?.querySelector('.team-popup__body');
        const popupClose = popup?.querySelector('.team-popup__close');
        const popupOverlay = popup?.querySelector('.team-popup__overlay');

        function openPopup() {
            popup.classList.remove('hidden');
            document.body.classList.add('team-popup-open');
            window.lenis?.stop();
        }

        function closePopup() {
            popup.classList.add('hidden');
            popupBody.innerHTML = "";
            document.body.classList.remove('team-popup-open');
            window.lenis?.start();
        }
        
        popupClose?.addEventListener("click", closePopup);
        popupOverlay?.addEventListener("click", closePopup);

        // Delegation: click card
        document.addEventListener("click", (e) => {
            const card = e.target.closest(".team-card");
            if (!card) return;

            const teamID = card.dataset.id;
            if (!teamID) return;

            popupBody.innerHTML = "";
            popup.querySelector('.team-popup__loading')?.classList.add('active');
            openPopup();

            fetch(block_script.ajax_url, {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({
                    action: "load_team_detail",
                    team_id: teamID
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    popupBody.innerHTML = res.data.html;
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                popup.querySelector('.team-popup__loading')?.classList.remove('active');
            });
        });
    }
};
