document.addEventListener('DOMContentLoaded', () => {
    // Nav Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3D Tilt Effect for Mockup
    const mockupContainer = document.getElementById('mockupContainer');
    const heroSection = document.querySelector('.hero');
    
    if (window.innerWidth > 992) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            mockupContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            mockupContainer.style.transform = `rotateY(-15deg) rotateX(5deg)`;
        });
    }

    // Scroll Reveal Elements
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Download Button Logic with Ad and Countdown
    const downloadBtn = document.getElementById('downloadBtn');
    const countdownContainer = document.getElementById('countdownContainer');
    const timerElement = document.getElementById('timer');
    const finalDownloadBtn = document.getElementById('finalDownloadBtn');

    // The destination URL for the ad to open in a new tab
    const adUrl = 'https://www.example.com/ad-sponsor'; 

    let countdownTime = 20;
    let timerInterval = null;

    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Open the ad in a new tab
        window.open(adUrl, '_blank');

        // 2. Hide the initial download button and show the countdown
        downloadBtn.classList.add('hidden');
        countdownContainer.classList.remove('hidden');

        // 3. Start the countdown
        timerInterval = setInterval(() => {
            countdownTime--;
            timerElement.textContent = countdownTime;

            if (countdownTime <= 0) {
                // 4. When countdown finishes, hide countdown and show final download button
                clearInterval(timerInterval);
                countdownContainer.classList.add('hidden');
                finalDownloadBtn.classList.remove('hidden');
            }
        }, 1000);
    });
});
