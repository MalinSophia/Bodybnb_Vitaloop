// ==========================================================================
// DESIGN SWITCHER
// ==========================================================================
function switchDesign(theme) {
    document.body.classList.remove('design-nature', 'design-sports', 'design-senior');
    document.body.classList.add('design-' + theme);

    document.querySelectorAll('.switch-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + theme);
    if (activeBtn) activeBtn.classList.add('active');
}

// ==========================================================================
// SCROLL-FORTSCHRITTSBALKEN
// ==========================================================================
window.addEventListener('scroll', () => {
    const scrollBar = document.getElementById('scrollBar');
    if (!scrollBar) return;

    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollBar.style.width = ((winScroll / height) * 100) + '%';
});

// ==========================================================================
// ALLES NACH DOM-LADEN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener("DOMContentLoaded", function() {
    // 1. Elemente holen
    const settingsTrigger = document.getElementById("settings-trigger");
    const burgerTrigger = document.getElementById("burger-trigger");
    const countryModal = document.getElementById("country-modal");
    const burgerModal = document.getElementById("burger-modal");

    // Helper-Funktion zum Umschalten (Toggle)
    function toggleDropdown(modalToOpen, modalToClose) {
        // Wenn das andere Menü offen ist, schließen wir es zuerst
        if (modalToClose) {
            modalToClose.style.display = "none";
        }
        
        // Aktuelles Menü umschalten
        if (modalToOpen.style.display === "block") {
            modalToOpen.style.display = "none";
        } else {
            modalToOpen.style.display = "block";
        }
    }

    // 2. Klick auf das Zahnrad
    if (settingsTrigger && countryModal) {
        settingsTrigger.addEventListener("click", function(event) {
            event.stopPropagation(); // Verhindert, dass der Klick das Menü sofort wieder schließt
            toggleDropdown(countryModal, burgerModal);
        });
    }

    // 3. Klick auf das Burger-Menü
    if (burgerTrigger && burgerModal) {
        burgerTrigger.addEventListener("click", function(event) {
            event.stopPropagation();
            toggleDropdown(burgerModal, countryModal);
        });
    }

    // 4. Klick irgendwo auf die restliche Website schließt die Menüs automatisch
    window.addEventListener("click", function() {
        if (countryModal) countryModal.style.display = "none";
        if (burgerModal) burgerModal.style.display = "none";
    });
});
    document.addEventListener('click', () => {
        countryModal?.classList.remove('active');
        burgerModal?.classList.remove('active');
    });

function flipCard(cardElement) {
    // Schaltet die Klasse "flipped" beim Anklicken ein oder aus
    cardElement.classList.toggle('flipped');
}

document.addEventListener("DOMContentLoaded", () => {
    const typewriterElements = document.querySelectorAll(".js-typewriter");

    // 1. Alle Texte sichern, BEVOR wir irgendwas animieren
    typewriterElements.forEach(el => {
        if (el) {
            // Wir speichern den sichtbaren Text in einem temporären Speicher im Element ab
            el.dataset.savedText = el.innerText.trim();
            el.innerText = ""; // Danach machen wir die Box leer, bereit fürs Tippen
        }
    });

    const typeEffect = (element, text) => {
        let i = 0;
        element.innerText = ""; 
        element.classList.add("typing"); // Aktiviert den blinkenden Cursor

        let speed = 45; 
        if (text.length > 50) speed = 30;
        if (text.length > 100) speed = 18;

        const timer = setInterval(() => {
            if (i < text.length) {
                element.append(text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                element.classList.remove("typing");
                element.classList.add("typing-finished"); // Cursor wegschalten
            }
        }, speed);
    };

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px", // Löst aus, kurz bevor es im sichtbaren Bereich ist
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.dataset.savedText; // Hol den gesicherten Text
                
                if (text) {
                    typeEffect(element, text);
                } else {
                    // Fallback: Falls kein Text geladen wurde, zeige zur Sicherheit alles an
                    element.innerText = element.dataset.savedText || "";
                }
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observer auf die Elemente ansetzen
    typewriterElements.forEach(el => {
        if (el) observer.observe(el);
    });
});

    // --- HERZ / MERKEN-BUTTON ---
    const saveBtn   = document.getElementById('save-btn');
    const heartIcon = document.getElementById('heart-icon');

    if (saveBtn && heartIcon) {
        saveBtn.addEventListener('click', () => {
            const isActive = heartIcon.classList.toggle('heart-active');
            heartIcon.innerText = isActive ? '♥' : '♡';
        });
    }

    // --- INHALTSSTOFFE: KLICK-TOGGLE ---
    document.querySelectorAll('.ingredient-item').forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('show-name'));
    });

    // --- BUCHUNGSBOX: PREIS & DATUM BERECHNEN ---
    const startInput  = document.getElementById('start-date');
    const endInput    = document.getElementById('end-date');
    const portionSel  = document.getElementById('portion-select');
    const priceDisplay = document.getElementById('display-price');
    const stornoText  = document.getElementById('storno-text');

    // Startdatum auf heute setzen
    if (startInput) {
        const today = new Date();
        startInput.value = today.toISOString().split('T')[0];
    }

    function updateBooking() {
        if (!startInput || !endInput || !portionSel || !priceDisplay) return;

        const startDate = new Date(startInput.value);
        if (isNaN(startDate.getTime())) return;

        const months = parseInt(portionSel.value);

        // Enddatum berechnen
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + months);
        endInput.value = endDate.toISOString().split('T')[0];

        // Preis berechnen (mit Mengenrabatt)
        let pricePerMonth = 150;
        if (months === 3) pricePerMonth = 140;
        if (months === 6) pricePerMonth = 125;
        priceDisplay.innerText = `Gesamtpreis ${pricePerMonth * months}€`;

        // Stornierungstext aktualisieren
        if (stornoText) {
            const stornoDate = new Date(startDate);
            stornoDate.setDate(stornoDate.getDate() - 1);
            const formatted = stornoDate.toLocaleDateString('de-DE', { day: '2-digit', month: 'long' });
            stornoText.innerText = `0€ heute. Kostenlose Stornierung vor dem ${formatted}`;
        }
    }

    if (startInput && portionSel) {
        startInput.addEventListener('change', updateBooking);
        portionSel.addEventListener('change', updateBooking);
        updateBooking(); // Initialaufruf
    }

// ==========================================
// LOGIK: INTERAKTIVE PRODUKT-GALERIE
// ==========================================

// 1. Liste deiner Produktbilder definieren (Pfade hier anpassen!)
const productImages = [
    "HeaderBild1.0.png", // Hauptbild Verpackung
    "HeaderBild4.0.png", // Detailansicht Inhaltsstoffe
    "HeaderBild3.0.png"  // Lifestyle-Bild Schwarzwald / Tannenzapfen
];

let currentImageIndex = 0;

// 2. Elemente aus dem HTML holen
const openGalleryBtn = document.getElementById("show-all-photos");
const galleryModal = document.getElementById("galleryModal");
const galleryImg = document.getElementById("activeGalleryImage");
const galleryCaption = document.getElementById("galleryCaption");
const closeGalleryBtn = document.getElementById("closeGallery");
const prevBtn = document.getElementById("prevImage");
const nextBtn = document.getElementById("nextImage");

// Funktion zum Aktualisieren des Bildes und der Anzeige (z.B. "Bild 1 von 3")
function updateGalleryDisplay() {
    galleryImg.src = productImages[currentImageIndex];
    galleryCaption.innerText = `Ansicht ${currentImageIndex + 1} von ${productImages.length}`;
}

// Galerie öffnen
if (openGalleryBtn && galleryModal) {
    openGalleryBtn.addEventListener("click", function() {
        currentImageIndex = 0; // Immer beim ersten Bild starten
        updateGalleryDisplay();
        galleryModal.style.display = "flex";
    });
}

// Zum nächsten Bild blättern
if (nextBtn) {
    nextBtn.addEventListener("click", function() {
        currentImageIndex++;
        if (currentImageIndex >= productImages.length) {
            currentImageIndex = 0; // Zurück zum ersten Bild springen am Ende
        }
        updateGalleryDisplay();
    });
}

// Zum vorherigen Bild blättern
if (prevBtn) {
    prevBtn.addEventListener("click", function() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = productImages.length - 1; // Zum letzten Bild springen am Anfang
        }
        updateGalleryDisplay();
    });
}

// Galerie schließen
if (closeGalleryBtn) {
    closeGalleryBtn.addEventListener("click", () => galleryModal.style.display = "none");
}

// Schließen bei Klick auf den dunklen Hintergrund
if (galleryModal) {
    galleryModal.addEventListener("click", function(event) {
        if (event.target === galleryModal) {
            galleryModal.style.display = "none";
        }
    });
}

// Tastatur-Support (Pfeiltasten zum Blättern, ESC zum Schließen)
window.addEventListener("keydown", function(event) {
    if (galleryModal && galleryModal.style.display === "flex") {
        if (event.key === "ArrowRight") nextBtn.click();
        if (event.key === "ArrowLeft") prevBtn.click();
        if (event.key === "Escape") galleryModal.style.display = "none";
    }
});

    // --- BEZAHL-MODAL ---
    const payTrigger  = document.getElementById('btn-pay-trigger');
    const payModal    = document.getElementById('paymentModal');
    const closeModal  = document.getElementById('closeModal');

    if (payTrigger && payModal) {
        payTrigger.addEventListener('click', (e) => {
            e.preventDefault();

            const set = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.innerText = val;
            };

            set('modal-start-date', startInput?.value.split('-').reverse().join('.') ?? '');
            set('modal-end-date',   endInput?.value.split('-').reverse().join('.')   ?? '');
            set('modal-total-price', priceDisplay?.innerText ?? '');

            payModal.style.display = 'flex';
        });
    }

    if (closeModal && payModal) {
        closeModal.addEventListener('click', () => payModal.style.display = 'none');
    }

    if (payModal) {
        window.addEventListener('click', (e) => {
            if (e.target === payModal) payModal.style.display = 'none';
        });
    }

    // Standard-Design beim Laden
    switchDesign('nature');
});