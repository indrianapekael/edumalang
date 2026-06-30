/**
* Template Name: Orbit
* Template URL: https://bootstrapmade.com/orbit-bootstrap-template/
* Updated: Jan 13 2026 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash) && !window.location.hash.includes('filter-')) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Integrasi Formulir Kontak ke WhatsApp
   */
  const btnWhatsApp = document.getElementById('btn-whatsapp');
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', function(e) {
      e.preventDefault();

      let nama = document.getElementById("wa_nama").value;
      let email = document.getElementById("wa_email").value;
      let subjek = document.getElementById("wa_subjek").value;
      let pesan = document.getElementById("wa_pesan").value;

      if (nama.trim() === "" || pesan.trim() === "") {
        alert("Mohon lengkapi Nama dan Pesan Anda sebelum mengirim.");
        return;
      }

      let nomorTujuan = "6281234567890"; 
      let pesanWA = "Halo EduMalang, saya ingin menyampaikan pesan dari website:%0A%0A" +
                    "*Nama:* " + nama + "%0A" +
                    "*Email:* " + email + "%0A" +
                    "*Subjek:* " + subjek + "%0A" +
                    "*Pesan:* " + pesan;

      let linkWA = "https://wa.me/" + nomorTujuan + "?text=" + pesanWA;
      window.open(linkWA, "_blank");
    });
  }

  /**
   * Init isotope layout and filters + URL Hash Filtering (Dari Footer)
   * Mengatur filter galeri secara otomatis jika ada penanda di URL (contoh: #filter-web)
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let initIsotope;

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      // 1. Inisialisasi Isotope Bawaan
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      // 2. Cek apakah ada Hash Filter dari link Footer setelah Isotope siap
      if (window.location.hash && window.location.hash.startsWith('#filter-')) {
        setTimeout(() => {
          const hash = window.location.hash; 
          const filterClass = '.' + hash.substring(1); 
          
          // Cari tombol yang sesuai (misal: tombol "Fasilitas")
          const targetButton = isotopeItem.querySelector(`.isotope-filters li[data-filter="${filterClass}"]`);
          
          if (targetButton) {
            // Hapus class aktif dari tombol sebelumnya
            isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
            // Tambahkan class aktif ke tombol target
            targetButton.classList.add('filter-active');
            
            // Perintahkan Isotope menyaring gambar
            initIsotope.arrange({ filter: filterClass });
            
            // Scroll layar secara perlahan ke arah Galeri Pendidikan
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
              const scrollMarginTop = getComputedStyle(portfolioSection).scrollMarginTop;
              window.scrollTo({
                top: portfolioSection.offsetTop - parseInt(scrollMarginTop),
                behavior: 'smooth'
              });
            }
          }
        }, 200); // Sedikit jeda agar transisi halus
      }
    });

    // 3. Fungsi klik manual pada tab galeri
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

})();