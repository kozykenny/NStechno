// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;

    function closeMobileNav() {
        if (nav) nav.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (body) body.classList.remove('nav-open');
    }

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            body.classList.toggle('nav-open', nav.classList.contains('active'));
        });
    }

    // Close mobile nav when a nav link is clicked (after smooth scroll)
    document.querySelectorAll('.nav-list a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
                closeMobileNav();
            }
        });
    });

    // Initialize Slick Slider
    if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
        const $slider = jQuery('.mainvisual-slider');
        
        if ($slider.length) {
            $slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                fade: false,
                arrows: true,
                prevArrow: '.postSlider__prev',
                nextArrow: '.postSlider__next',
                pauseOnHover: true,
                pauseOnFocus: true,
                infinite: true,
                speed: 400,
                cssEase: 'linear',
                adaptiveHeight: true
            });

            // Play/Pause button functionality
            const playPauseBtn = document.querySelector('.slider-play-pause');
            const controlLine = document.querySelector('.mainvisual__controlLine');
            let isPlaying = true;

            if (playPauseBtn && controlLine) {
                const playIcon = playPauseBtn.querySelector('.play-icon');
                const pauseIcon = playPauseBtn.querySelector('.pause-icon');
                
                playPauseBtn.addEventListener('click', function() {
                    isPlaying = !isPlaying;
                    
                    if (isPlaying) {
                        $slider.slick('slickPlay');
                        controlLine.classList.add('isAutoPlaying');
                        controlLine.classList.remove('isPaused');
                        if (playIcon) playIcon.style.display = 'none';
                        if (pauseIcon) pauseIcon.style.display = 'block';
                    } else {
                        $slider.slick('slickPause');
                        controlLine.classList.remove('isAutoPlaying');
                        controlLine.classList.add('isPaused');
                        if (playIcon) playIcon.style.display = 'block';
                        if (pauseIcon) pauseIcon.style.display = 'none';
                    }
                });
                
                // Initially show pause icon since autoplay is on
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'block';

                // Update progress bar and slide number on slide change
                $slider.on('afterChange', function(event, slick, currentSlide) {
                    const progressBar = controlLine.querySelector('span');
                    const currentNum = document.querySelector('.mainvisual__controlNum01');
                    
                    if (progressBar) {
                        progressBar.style.animation = 'none';
                        setTimeout(() => {
                            if (controlLine.classList.contains('isAutoPlaying')) {
                                progressBar.style.animation = 'progressBar 5s linear infinite';
                            }
                        }, 10);
                    }
                    
                    // Update current slide number (1-indexed)
                    if (currentNum) {
                        const slideNumber = String(currentSlide + 1).padStart(2, '0');
                        currentNum.textContent = slideNumber;
                    }
                });
                
                // Initialize slide number
                const currentNum = document.querySelector('.mainvisual__controlNum01');
                if (currentNum) {
                    currentNum.textContent = '01';
                }
            }
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            // For now, we'll just show an alert
            alert('お問い合わせありがとうございます。\n担当者より折り返しご連絡いたします。');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .service-item, .review-card, .sales-point-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
