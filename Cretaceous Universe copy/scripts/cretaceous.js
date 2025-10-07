// General: Hamburger Menu for Mobile
document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function () {
            const open = mobileMenu.classList.toggle('open');
            navToggle.classList.toggle('open', open);
            navToggle.setAttribute('aria-expanded', open);
            mobileMenu.setAttribute('aria-hidden', !open);
            // Trap focus if menu open
            if (open) {
                mobileMenu.querySelector('a').focus();
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
        // Close on Esc
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', false);
                mobileMenu.setAttribute('aria-hidden', true);
                navToggle.focus();
                document.body.style.overflow = '';
            }
        });
    }

    // ---- Newsletter Signup Form ----
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        const feedback = document.getElementById('newsletterFeedback');
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = newsletterForm.elements['email'];
            const email = emailInput.value.trim();
            feedback.textContent = '';
            emailInput.setAttribute('aria-invalid', 'false');
            if (!email) {
                feedback.textContent = "Email is required.";
                emailInput.setAttribute('aria-invalid', 'true');
                emailInput.focus();
                return;
            }
            if (!/^[\w.\-]+@[\w\-]+\.\w{2,}$/.test(email)) {
                feedback.textContent = "Please enter a valid email address.";
                emailInput.setAttribute('aria-invalid', 'true');
                emailInput.focus();
                return;
            }
            feedback.style.color = '#338e35';
            feedback.textContent = `You’ve subscribed! Welcome to our newsletter, ${email}.`;
            // Optionally persist to localStorage as a demonstration
            try {
                localStorage.setItem('newsletterSignup', JSON.stringify({ email, date: Date.now() }));
            } catch (e) { }
            newsletterForm.reset();
        });
    }

    // ---- Lightbox / Modal for Worker Gallery ----
    const workerGallery = document.getElementById('workerGallery');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    if (workerGallery && lightboxOverlay && lightboxImg && lightboxCaption && lightboxClose) {
        // Open lightbox on click
        workerGallery.addEventListener('click', function (e) {
            const target = e.target.closest('.worker-thumb');
            if (target) {
                openLightbox(target);
            }
        });
        // Open with Enter for accessibility
        workerGallery.addEventListener('keydown', function (e) {
            if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('worker-thumb')) {
                openLightbox(e.target);
            }
        });
        lightboxClose.addEventListener('click', closeLightbox);
        // Also close on outside click or Escape
        lightboxOverlay.addEventListener('click', function (e) {
            if (e.target === lightboxOverlay) closeLightbox();
        });
        document.addEventListener('keydown', function (e) {
            if (lightboxOverlay.classList.contains('open')) {
                if (e.key === 'Escape') closeLightbox();
            }
        });
        function openLightbox(imgEl) {
            lightboxImg.src = imgEl.getAttribute('data-full') || imgEl.src;
            lightboxImg.alt = imgEl.alt;
            lightboxCaption.textContent = imgEl.nextElementSibling ? imgEl.nextElementSibling.innerText : '';
            lightboxOverlay.classList.add('open');
            document.body.classList.add('modal-open');
            lightboxClose.focus();
        }
        function closeLightbox() {
            lightboxOverlay.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    }

    // ---- Dinosaurs Dynamic Page ----
    const dinoList = document.getElementById('dinoList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (dinoList && filterBtns.length) {
        // Dinosaur data array
        const dinosaurs = [
            {
                name: "Tyrannosaurus Rex",
                size: "12.3 m",
                diet: "Carnivore",
                img: "assets/images/dino-trex.jpg"
            },
            {
                name: "Triceratops",
                size: "9 m",
                diet: "Herbivore",
                img: "assets/images/dino-triceratops.jpg"
            },
            {
                name: "Velociraptor",
                size: "2.1 m",
                diet: "Carnivore",
                img: "assets/images/dino-velociraptor.jpg"
            },
            {
                name: "Stegosaurus",
                size: "9 m",
                diet: "Herbivore",
                img: "assets/images/dino-stegosaurus.jpg"
            },
            {
                name: "Ankylosaurus",
                size: "6.2 m",
                diet: "Herbivore",
                img: "assets/images/dino-ankylosaurus.jpg"
            },
            {
                name: "Gallimimus",
                size: "6 m",
                diet: "Omnivore",
                img: "assets/images/dino-gallimimus.jpg"
            },
            {
                name: "Baryonyx",
                size: "9.5 m",
                diet: "Carnivore",
                img: "assets/images/dino-baryonyx.jpg"
            },
            {
                name: "Maiasaura",
                size: "9 m",
                diet: "Herbivore",
                img: "assets/images/dino-maiasaura.jpg"
            },
            {
                name: "Pachycephalosaurus",
                size: "5 m",
                diet: "Herbivore",
                img: "assets/images/dino-pachy.jpg"
            },
            {
                name: "Oviraptor",
                size: "1.5 m",
                diet: "Omnivore",
                img: "assets/images/dino-oviraptor.jpg"
            }
        ];
        // Restore filter from localStorage if present
        let currentFilter = localStorage.getItem('dinoFilter') || "All";

        function renderDinosaurs(filter = "All") {
            dinoList.innerHTML = "";
            let filtered = filter === "All" ? dinosaurs : dinosaurs.filter(dino => dino.diet === filter);
            if (filtered.length === 0) {
                dinoList.innerHTML = `<p>No dinosaurs found for diet: ${filter}.</p>`;
                return;
            }
            for (const dino of filtered) {
                const card = document.createElement('article');
                card.className = 'dino-card';
                card.innerHTML = `
                    <img src="${dino.img}" alt="${dino.name}" width="220" height="120" class="dino-img" loading="lazy" />
                    <div class="dino-info">
                        <h2 class="dino-name">${dino.name}</h2>
                        <div class="dino-details">
                            <span><b>Size:</b> ${dino.size}</span><br>
                            <span><b>Diet:</b> ${dino.diet}</span>
                        </div>
                    </div>`;
                dinoList.appendChild(card);
            }
        }
        // Initial render
        renderDinosaurs(currentFilter);
        // Update filter UI and event handlers
        filterBtns.forEach(btn => {
            btn.setAttribute('aria-pressed', btn.dataset.filter === currentFilter ? 'true' : 'false');
            btn.classList.toggle('active', btn.dataset.filter === currentFilter);
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                renderDinosaurs(btn.dataset.filter);
                // Persist filter choice in localStorage
                try {
                    localStorage.setItem('dinoFilter', btn.dataset.filter);
                } catch (e) { }
            });
        });
    }
});