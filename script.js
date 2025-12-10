$(document).ready(function() {
    // Mobile Navigation Toggle
    $('.burger').click(function() {
        $('.nav-links').toggleClass('active');
        $(this).toggleClass('toggle');
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $($(this).attr('href'));
        
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Form submission handling
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        // Simple validation
        if (name && email && subject && message) {
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            
            // Reset form
            $('#contactForm')[0].reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Add animation to feature cards on scroll
    $(window).scroll(function() {
        $('.feature-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated');
            }
        });
    });

    // Initialize animations on page load
    $(window).trigger('scroll');

    // Add hover effect to buttons
    $('.btn').hover(
        function() {
            $(this).css('transform', 'scale(1.05)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    // Add animation to resume sections when they come into view
    function animateOnScroll() {
        $('.resume-section, .bio-section, .contact-method').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('fade-in');
            }
        });
    }

    // Run on scroll and page load
    $(window).on('scroll', animateOnScroll);
    animateOnScroll();

    // Add typing effect to hero section
    const heroText = "Welcome to My Personal Portfolio";
    let i = 0;
    const speed = 50;
    
    function typeWriter() {
        if (i < heroText.length) {
            $('.hero-content h1').text(heroText.substring(0, i + 1));
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Only run typing effect on homepage
    if ($('.hero').length) {
        $('.hero-content h1').text('');
        setTimeout(typeWriter, 1000);
    }
});

// Additional utility functions
function scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 500);
}

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}