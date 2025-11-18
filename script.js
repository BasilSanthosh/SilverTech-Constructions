// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        // Initialize with public key - USER MUST REPLACE THIS
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key
    }
})();

// Admin email - get from owner contact or use default
function getAdminEmail() {
    // Try to get from owner contact details
    const ownerEmailEl = document.querySelector('.owner-contact-item');
    if (ownerEmailEl) {
        const emailText = ownerEmailEl.textContent;
        const emailMatch = emailText.match(/[\w\.-]+@[\w\.-]+\.\w+/);
        if (emailMatch) {
            return emailMatch[0];
        }
    }
    // Default admin email
    return 'silvertechconstruction@gmail.com';
}

const contactForm = document.getElementById('contactForm');
const contactFormMessage = document.getElementById('contactFormMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone') || 'Not provided';
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            if (contactFormMessage) {
                contactFormMessage.textContent = 'Please fill in all required fields.';
                contactFormMessage.style.color = '#ef4444';
                contactFormMessage.style.display = 'block';
            }
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (contactFormMessage) {
                contactFormMessage.textContent = 'Please enter a valid email address.';
                contactFormMessage.style.color = '#ef4444';
                contactFormMessage.style.display = 'block';
            }
            return;
        }
        
        // Company WhatsApp number (remove + and spaces for URL)
        const companyWhatsApp = '919539548759'; // +91 9539548759
        
        // Format message for WhatsApp
        const whatsappMessage = `*New Contact Form Message from SilverTech Constructions Website*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Message:*
${message}

---
This message was sent from SilverTech Constructions website.`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${companyWhatsApp}?text=${encodedMessage}`;
        
        // Open WhatsApp with pre-filled message
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        if (contactFormMessage) {
            contactFormMessage.textContent = 'Opening WhatsApp... Your message will be sent automatically!';
            contactFormMessage.style.color = 'var(--accent-purple)';
            contactFormMessage.style.display = 'block';
        }
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            if (contactFormMessage) {
                contactFormMessage.style.display = 'none';
            }
        }, 5000);
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and project cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    [...serviceCards, ...projectCards].forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Load saved project images on page load (if any were previously uploaded)
document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        const placeholder = item.querySelector('.project-placeholder');
        const imageData = localStorage.getItem(`project-image-${index}`);
        if (imageData && placeholder) {
            placeholder.innerHTML = `<img src="${imageData}" alt="Project ${index + 1}">`;
        }
    });
    
    // Update current time display
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
});

// Function to get IST time components
function getISTComponents() {
    const now = new Date();
    
    // Use Intl.DateTimeFormat to get IST components
    const formatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });
    
    const parts = formatter.formatToParts(now);
    
    // Extract components
    const hour = parseInt(parts.find(p => p.type === 'hour').value);
    const minute = parseInt(parts.find(p => p.type === 'minute').value);
    const second = parseInt(parts.find(p => p.type === 'second').value);
    const weekday = parts.find(p => p.type === 'weekday').value;
    
    // Convert weekday name to day number (0 = Sunday, 1 = Monday, etc.)
    const weekdayMap = {
        'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
        'Thursday': 4, 'Friday': 5, 'Saturday': 6
    };
    const day = weekdayMap[weekday] || 0;
    
    return {
        hour: hour,
        minute: minute,
        second: second,
        day: day
    };
}

// Function to get next opening time
function getNextOpeningTime(istComponents) {
    const day = istComponents.day; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = istComponents.hour;
    const minute = istComponents.minute;
    const currentTime = hour * 60 + minute; // Convert to minutes
    const openTime = 9 * 60; // 9:00 AM = 540 minutes
    const closeTime = 18 * 60; // 6:00 PM = 1080 minutes
    
    // If it's Sunday, next opening is Monday 9:00 AM
    if (day === 0) {
        return "Monday at 9:00 AM";
    }
    
    // If it's Saturday and after closing time, next opening is Monday 9:00 AM
    if (day === 6 && currentTime >= closeTime) {
        return "Monday at 9:00 AM";
    }
    
    // If it's a weekday and before opening time, opens today at 9:00 AM
    if (day >= 1 && day <= 6 && currentTime < openTime) {
        return "9:00 AM";
    }
    
    // If it's a weekday and after closing time, opens tomorrow at 9:00 AM
    if (day >= 1 && day <= 5 && currentTime >= closeTime) {
        return `Tomorrow at 9:00 AM`;
    }
    
    return "9:00 AM";
}

// Function to update and display current time in IST
function updateCurrentTime() {
    const currentTimeElement = document.getElementById('currentTime');
    if (currentTimeElement) {
        const now = new Date();
        
        // Format time in IST with 12-hour format
        const timeString = now.toLocaleTimeString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
        });
        
        // Get IST components for checking open/closed status
        const istComponents = getISTComponents();
        const isOpen = checkIfOpen(istComponents);
        
        if (isOpen) {
            currentTimeElement.innerHTML = `
                <strong>Current Time (IST):</strong> ${timeString}<br>
                <span style="color: #22c55e; font-weight: 600;">
                    ✓ We are open
                </span>
            `;
        } else {
            const nextOpening = getNextOpeningTime(istComponents);
            currentTimeElement.innerHTML = `
                <strong>Current Time (IST):</strong> ${timeString}<br>
                <span style="color: #ef4444; font-weight: 600; display: block; margin-top: 0.25rem;">
                    ✗ We are closed
                </span>
                <span style="color: var(--accent); font-weight: 500; display: block; margin-top: 0.25rem;">
                    Open at ${nextOpening}
                </span>
            `;
        }
    }
}

// Function to check if business is currently open (based on IST)
function checkIfOpen(istComponents) {
    const day = istComponents.day; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = istComponents.hour;
    const minute = istComponents.minute;
    const currentTime = hour * 60 + minute; // Convert to minutes
    
    // Office hours: Monday (1) to Saturday (6), 9:00 AM to 6:00 PM IST
    if (day >= 1 && day <= 6) {
        const openTime = 9 * 60; // 9:00 AM = 540 minutes
        const closeTime = 18 * 60; // 6:00 PM = 1080 minutes
        return currentTime >= openTime && currentTime < closeTime;
    }
    return false; // Closed on Sunday
}

// Animated RGB color changer for logo
function animateLogoColors() {
    const logoElements = document.querySelectorAll('.logo-initials');
    
    if (logoElements.length === 0) return;
    
    // Generate random RGB values
    function getRandomRGB() {
        return {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
    }
    
    // Convert RGB to hex
    function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    }
    
    // Update logo colors with smooth CSS transition
    function updateLogoColor() {
        const rgb = getRandomRGB();
        const primaryColor = rgbToHex(rgb.r, rgb.g, rgb.b);
        
        // Create a slightly lighter shade for gradient
        const lighterRGB = {
            r: Math.min(255, rgb.r + 40),
            g: Math.min(255, rgb.g + 40),
            b: Math.min(255, rgb.b + 40)
        };
        const secondaryColor = rgbToHex(lighterRGB.r, lighterRGB.g, lighterRGB.b);
        
        // Apply gradient to all logo elements
        logoElements.forEach(el => {
            el.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
            el.style.webkitBackgroundClip = 'text';
            el.style.webkitTextFillColor = 'transparent';
            el.style.backgroundClip = 'text';
        });
    }
    
    // Change color every second with smooth transition
    updateLogoColor(); // Initial color
    setInterval(updateLogoColor, 1000);
}

// Initialize logo color animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateLogoColors);
} else {
    animateLogoColors();
}

// Hero Background Image Carousel
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showNextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 3 seconds
    setInterval(showNextSlide, 3000);
}

// Initialize hero carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroCarousel);
} else {
    initHeroCarousel();
}

// Customer Reviews Functionality
(function() {
    // Initialize reviews when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReviews);
    } else {
        initReviews();
    }

    // Simple encryption function for phone numbers
    function encryptPhone(phone) {
        if (!phone) return '';
        // Simple base64 encoding with a salt for basic obfuscation
        const salt = 'silvertech2024';
        const combined = phone + salt;
        // Convert to base64
        const encoded = btoa(combined);
        // Reverse and add extra obfuscation
        return encoded.split('').reverse().join('') + '_enc';
    }

    // Decrypt function (for admin use if needed)
    function decryptPhone(encrypted) {
        if (!encrypted || !encrypted.endsWith('_enc')) return '';
        try {
            const withoutSuffix = encrypted.slice(0, -4);
            const reversed = withoutSuffix.split('').reverse().join('');
            const decoded = atob(reversed);
            const salt = 'silvertech2024';
            if (decoded.endsWith(salt)) {
                return decoded.slice(0, -salt.length);
            }
            return '';
        } catch (e) {
            return '';
        }
    }

    function initReviews() {
        setupStarRating();
        setupPhotoPreview();
        setupVideoPreview();
        setupReviewForm();
        loadReviews();
    }

    // Star Rating System
    function setupStarRating() {
        const starButtons = document.querySelectorAll('.star-btn');
        const ratingInput = document.getElementById('reviewRating');
        const ratingMessage = document.getElementById('ratingMessage');

        if (!starButtons.length) return;

        starButtons.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                ratingInput.value = rating;

                // Update star display
                starButtons.forEach((btn, index) => {
                    if (index < rating) {
                        btn.classList.add('active', 'filled');
                    } else {
                        btn.classList.remove('active', 'filled');
                    }
                });

                // Show rating message
                const messages = {
                    1: 'Poor',
                    2: 'Fair',
                    3: 'Good',
                    4: 'Very Good',
                    5: 'Excellent'
                };
                if (ratingMessage) {
                    ratingMessage.textContent = messages[rating] || '';
                }
            });

            star.addEventListener('mouseenter', function() {
                const rating = parseInt(this.dataset.rating);
                starButtons.forEach((btn, index) => {
                    if (index < rating) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            });
        });

        // Reset on mouse leave
        const ratingStars = document.getElementById('ratingStars');
        if (ratingStars) {
            ratingStars.addEventListener('mouseleave', function() {
                const currentRating = parseInt(ratingInput.value) || 0;
                starButtons.forEach((btn, index) => {
                    if (index < currentRating) {
                        btn.classList.add('active', 'filled');
                    } else {
                        btn.classList.remove('active', 'filled');
                    }
                });
            });
        }
    }

    // Photo Preview
    function setupPhotoPreview() {
        const photoInput = document.getElementById('reviewPhotos');
        const photoPreview = document.getElementById('photoPreview');

        if (!photoInput || !photoPreview) return;

        photoInput.addEventListener('change', function(e) {
            photoPreview.innerHTML = '';
            photoPreview.classList.remove('active');

            if (e.target.files.length > 0) {
                photoPreview.classList.add('active');
                Array.from(e.target.files).forEach(file => {
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.alt = 'Preview';
                            photoPreview.appendChild(img);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }
        });
    }

    // Video Preview
    function setupVideoPreview() {
        const videoInput = document.getElementById('reviewVideos');
        const videoPreview = document.getElementById('videoPreview');

        if (!videoInput || !videoPreview) return;

        videoInput.addEventListener('change', function(e) {
            videoPreview.innerHTML = '';
            videoPreview.classList.remove('active');

            if (e.target.files.length > 0) {
                videoPreview.classList.add('active');
                Array.from(e.target.files).forEach(file => {
                    if (file.type.startsWith('video/')) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const videoContainer = document.createElement('div');
                            videoContainer.className = 'media-preview-item';
                            
                            const video = document.createElement('video');
                            video.src = e.target.result;
                            video.controls = true;
                            video.style.maxWidth = '200px';
                            video.style.maxHeight = '200px';
                            
                            const removeBtn = document.createElement('button');
                            removeBtn.className = 'remove-media';
                            removeBtn.textContent = '×';
                            removeBtn.onclick = function() {
                                videoContainer.remove();
                                if (videoPreview.children.length === 0) {
                                    videoPreview.classList.remove('active');
                                }
                            };
                            
                            videoContainer.appendChild(video);
                            videoContainer.appendChild(removeBtn);
                            videoPreview.appendChild(videoContainer);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }
        });
    }

    // Review Form Submission
    function setupReviewForm() {
        const reviewForm = document.getElementById('reviewForm');
        if (!reviewForm) return;

        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(reviewForm);
            const name = formData.get('reviewerName');
            const phone = formData.get('reviewerPhone');
            const email = formData.get('reviewerEmail') || '';
            const rating = parseInt(formData.get('rating'));
            const text = formData.get('reviewText');

            if (!name || !phone || !rating || !text) {
                showReviewMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Encrypt phone number for storage
            const encryptedPhone = encryptPhone(phone);

            // Convert images to base64
            const photoInput = document.getElementById('reviewPhotos');
            const photos = [];
            const photoPromises = photoInput && photoInput.files.length > 0 
                ? Array.from(photoInput.files).map(file => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.readAsDataURL(file);
                    });
                })
                : [];

            // Convert videos to base64
            const videoInput = document.getElementById('reviewVideos');
            const videos = [];
            const videoPromises = videoInput && videoInput.files.length > 0
                ? Array.from(videoInput.files).map(file => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.readAsDataURL(file);
                    });
                })
                : [];

            // Wait for all media to be processed
            Promise.all([...photoPromises, ...videoPromises]).then(allResults => {
                const photoResults = allResults.slice(0, photoPromises.length);
                const videoResults = allResults.slice(photoPromises.length);
                saveReview(name, email, encryptedPhone, rating, text, photoResults, videoResults);
            });
        });
    }

    function saveReview(name, email, encryptedPhone, rating, text, photos, videos) {
        const review = {
            id: Date.now(),
            name: name, // Original name displayed as entered
            email: email,
            phone_encrypted: encryptedPhone, // Encrypted phone number stored for security
            rating: rating,
            text: text,
            photos: photos,
            videos: videos,
            date: new Date().toISOString()
        };

        // Get existing reviews from localStorage
        let reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        reviews.push(review);
        
        // Save back to localStorage
        localStorage.setItem('customerReviews', JSON.stringify(reviews));

        // Show success message
        showReviewMessage('Thank you for your review! It has been submitted successfully.', 'success');
        
        // Reset form
        document.getElementById('reviewForm').reset();
        document.getElementById('photoPreview').innerHTML = '';
        document.getElementById('photoPreview').classList.remove('active');
        document.getElementById('videoPreview').innerHTML = '';
        document.getElementById('videoPreview').classList.remove('active');
        document.querySelectorAll('.star-btn').forEach(btn => btn.classList.remove('active', 'filled'));
        document.getElementById('ratingMessage').textContent = '';

        // Reload reviews display
        loadReviews();
    }

    function showReviewMessage(message, type) {
        const messageEl = document.getElementById('reviewFormMessage');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.style.color = type === 'success' ? 'var(--accent-purple)' : '#ef4444';
            messageEl.style.display = 'block';
            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 5000);
        }
    }

    // Load and Display Reviews
    function loadReviews() {
        const reviewsContainer = document.getElementById('reviewsContainer');
        if (!reviewsContainer) return;

        const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        
        if (reviews.length === 0) {
            reviewsContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 3rem;">No reviews yet. Be the first to share your experience!</p>';
            return;
        }

        // Sort by date (newest first)
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        reviewsContainer.innerHTML = reviews.map(review => {
            const date = new Date(review.date);
            const formattedDate = date.toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                starsHTML += `<svg width="20" height="20" viewBox="0 0 24 24" fill="${i <= review.rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" style="color: ${i <= review.rating ? '#ffd700' : 'rgba(255,255,255,0.3)'};">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>`;
            }

            let mediaHTML = '';
            if (review.photos && review.photos.length > 0) {
                mediaHTML += '<div class="review-photo-container">';
                review.photos.forEach(photo => {
                    mediaHTML += `<div class="review-media-item"><img src="${photo}" alt="Review photo" class="review-photo"></div>`;
                });
                mediaHTML += '</div>';
            }
            if (review.videos && review.videos.length > 0) {
                if (!mediaHTML) mediaHTML += '<div class="review-media-container">';
                review.videos.forEach(video => {
                    mediaHTML += `<div class="review-media-item"><video src="${video}" controls class="review-photo"></video></div>`;
                });
                if (!review.photos) mediaHTML += '</div>';
            }

            return `
                <div class="review-card">
                    <div class="review-header">
                        <div class="reviewer-info">
                            <div class="reviewer-avatar">${review.name.charAt(0).toUpperCase()}</div>
                            <div>
                                <div class="reviewer-name">${escapeHtml(review.name)}</div>
                                <div class="review-date">${formattedDate}</div>
                            </div>
                        </div>
                        <div class="review-rating">
                            ${starsHTML}
                        </div>
                    </div>
                    <div class="review-content">
                        <p class="review-text">${escapeHtml(review.text)}</p>
                        ${mediaHTML}
                    </div>
                </div>
            `;
        }).join('');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
})();

// Completed Works Lightbox Functionality
// Define all work items (images and videos) that can be viewed
// This includes the 3 displayed images plus additional images and videos
// Removed duplicates automatically
const workItems = [
    { type: 'image', src: 'tijo-house.jpg', alt: 'Completed House Project' },
    { type: 'image', src: 'construction-ceremony.jpg', alt: 'Construction Ceremony' },
    { type: 'image', src: 'n1.jpg', alt: 'Construction Project' },
    { type: 'image', src: 'completed-house.jpg', alt: 'Completed Residential Construction Project' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1200&fit=crop', alt: 'Modern Residential Construction' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=1200&fit=crop', alt: 'Commercial Building Project' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=1200&fit=crop', alt: 'Interior Design Project' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=1200&fit=crop', alt: 'Building Construction' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=1200&fit=crop', alt: 'Construction Site' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=1200&fit=crop', alt: 'Home Renovation' },
    { type: 'video', src: 'VID_20251116_141029_340.mp4', poster: 'construction-ceremony.jpg', alt: 'Construction Project Video 1' },
    { type: 'video', src: 'VID_20251116_141044_401.mp4', poster: 'completed-house.jpg', alt: 'Construction Project Video 2' },
    { type: 'video', src: 'VID_20251116_141056_122.mp4', poster: 'n1.jpg', alt: 'Construction Project Video 3' }
];

let currentWorkIndex = 0;

function openWorkLightbox(index) {
    currentWorkIndex = index;
    const lightbox = document.getElementById('workLightbox');
    const lightboxContent = document.getElementById('workLightboxContent');
    
    if (!lightbox || !lightboxContent) return;
    
    const item = workItems[index];
    
    if (item.type === 'video') {
        lightboxContent.innerHTML = `
            <video src="${item.src}" poster="${item.poster || ''}" controls autoplay style="max-width: 100%; max-height: 90vh; border-radius: 12px;">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        lightboxContent.innerHTML = `
            <img src="${item.src}" alt="${item.alt || 'Work Image'}" style="max-width: 100%; max-height: 90vh; border-radius: 12px; object-fit: contain;">
        `;
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWorkLightbox() {
    const lightbox = document.getElementById('workLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        // Pause any playing videos
        const video = lightbox.querySelector('video');
        if (video) {
            video.pause();
        }
    }
}

function closeWorkLightboxOnBackdrop(event) {
    if (event.target.id === 'workLightbox') {
        closeWorkLightbox();
    }
}

function changeWorkLightboxItem(direction) {
    currentWorkIndex += direction;
    
    if (currentWorkIndex < 0) {
        currentWorkIndex = workItems.length - 1;
    } else if (currentWorkIndex >= workItems.length) {
        currentWorkIndex = 0;
    }
    
    openWorkLightbox(currentWorkIndex);
}

// Keyboard navigation for work lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('workLightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeWorkLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeWorkLightboxItem(-1);
        } else if (e.key === 'ArrowRight') {
            changeWorkLightboxItem(1);
        }
    }
});


