/* ==========================================================================
   AUTOKRAFT AMG - INTERACTIVE JAVASCRIPT
   Handles Nav toggles, Smooth Scrolling, Modal Popups, Filters, and Forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. HEADER SCROLL & MOBILE MENU TOGGLE
       -------------------------------------------------------------------------- */
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header background intensity on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu on clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    /* --------------------------------------------------------------------------
       2. INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);

    /* --------------------------------------------------------------------------
       3. MODAL WINDOW SYSTEM
       -------------------------------------------------------------------------- */
    const modalAbout = document.getElementById('modal-about');
    const modalContact = document.getElementById('modal-contact');
    const modalSocial = document.getElementById('modal-social');
    const modalNotification = document.getElementById('modal-notification');

    const btnQuickAbout = document.getElementById('btn-quick-about');
    const btnQuickContact = document.getElementById('btn-quick-contact');
    const btnQuickSocial = document.getElementById('btn-quick-social');
    const btnQuickWhatsapp = document.getElementById('btn-quick-whatsapp');

    // Function to open modal
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for Quick Action Bar Buttons
    if (btnQuickAbout) {
        btnQuickAbout.addEventListener('click', () => openModal(modalAbout));
    }
    if (btnQuickContact) {
        btnQuickContact.addEventListener('click', () => openModal(modalContact));
    }
    if (btnQuickSocial) {
        btnQuickSocial.addEventListener('click', () => openModal(modalSocial));
    }
    if (btnQuickWhatsapp) {
        btnQuickWhatsapp.addEventListener('click', () => {
            window.open('https://wa.me/15550000000?text=Hola%20Autokraft%20AMG,%20necesito%20consultar%20por%20un%20repuesto', '_blank');
        });
    }

    // Close buttons & backdrop click inside modals
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        // Close button inside modal
        const closeBtn = modal.querySelector('.modal-close');
        const closeFooterBtn = modal.querySelector('.close-modal-btn');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        if (closeFooterBtn) {
            closeFooterBtn.addEventListener('click', () => closeModal(modal));
        }

        // Close on clicking outside modal card (backdrop)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal on Press ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });

    /* --------------------------------------------------------------------------
       4. CATALOG CATEGORY FILTERS
       -------------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       5. CATALOG PRODUCT QUOTE CLICK -> AUTOFILL FORM
       -------------------------------------------------------------------------- */
    const productQuoteBtns = document.querySelectorAll('.btn-product-quote');
    const formPartInput = document.getElementById('form-part');
    const contactSection = document.getElementById('contact');

    productQuoteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const partName = btn.getAttribute('data-part');
            
            if (formPartInput) {
                formPartInput.value = partName;
                // Add highlight focus to input
                formPartInput.focus();
                formPartInput.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Dynamic visual highlight on input field
                formPartInput.style.borderColor = '#00d2ff';
                formPartInput.style.boxShadow = '0 0 15px rgba(0, 210, 255, 0.6)';
                setTimeout(() => {
                    formPartInput.style.boxShadow = '';
                }, 2000);
            }
        });
    });

    /* --------------------------------------------------------------------------
       6. CONTACT FORM SUBMISSION
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value;
            const brand = document.getElementById('form-brand').value;
            const part = document.getElementById('form-part').value;

            // Update modal text dynamically
            const notifTitle = document.getElementById('notif-title');
            const notifMessage = document.getElementById('notif-message');

            if (notifTitle && notifMessage) {
                notifTitle.textContent = `¡Solicitud Recibida, ${name}!`;
                notifMessage.textContent = `Hemos registrado tu pedido para el repuesto "${part}" (${brand}). Un especialista técnico verificará la compatibilidad y se comunicará contigo a la brevedad.`;
            }

            // Open notification modal
            openModal(modalNotification);

            // Reset form
            contactForm.reset();
        });
    }

    /* --------------------------------------------------------------------------
       7. OPEN QUOTE MODAL FROM HEADER CTA
       -------------------------------------------------------------------------- */
    const openQuoteBtns = document.querySelectorAll('.open-quote-modal');
    openQuoteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                const nameInput = document.getElementById('form-name');
                if (nameInput) {
                    setTimeout(() => nameInput.focus(), 600);
                }
            }
        });
    });

});
