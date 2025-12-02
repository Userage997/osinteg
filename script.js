document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const aboutOwnerBtn = document.getElementById('aboutOwner');
    const backBtn = document.getElementById('backBtn');
    const animatedText = document.getElementById('animated-text');
    
    // Анимация текста при загрузке
    function animateWelcomeText() {
        const text = animatedText.textContent;
        animatedText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                animatedText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Скорость печати
            } else {
                // После завершения анимации текста, показываем индикатор прокрутки
                document.querySelector('.scroll-indicator').style.opacity = '1';
            }
        };
        
        // Задержка перед началом анимации
        setTimeout(typeWriter, 500);
    }
    
    // Инициализация анимации текста
    animateWelcomeText();
    
    // Переход на второй экран
    aboutOwnerBtn.addEventListener('click', function() {
        // Анимация перехода
        screen1.classList.remove('active');
        setTimeout(() => {
            screen2.classList.add('active');
            // Прокрутка к верху второго экрана
            window.scrollTo(0, 0);
        }, 500);
        
        // Анимация кнопки
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });
    
    // Возврат на первый экран
    backBtn.addEventListener('click', function() {
        screen2.classList.remove('active');
        setTimeout(() => {
            screen1.classList.add('active');
            // Прокрутка к верху первого экрана
            window.scrollTo(0, 0);
        }, 500);
        
        // Анимация кнопки
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });
    
    // Плавная анимация для всех кнопок при наведении
    const buttons = document.querySelectorAll('.btn, .contact-btn, .back-btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('clicked')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        // Эффект волны при клике
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Добавляем стили для эффекта волны
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: 20px;
            height: 20px;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(10);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);
    
    // Параллакс эффект для фона при прокрутке
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const circles = document.querySelectorAll('.circle');
        
        circles.forEach((circle, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            circle.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
    
    // Обработка нажатия клавиши Escape для возврата
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && screen2.classList.contains('active')) {
            backBtn.click();
        }
    });
    
    // Инициализация анимации кругов
    function initCircleAnimations() {
        const circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
            // Случайная задержка для каждого круга
            const delay = Math.random() * 10;
            circle.style.animationDelay = `${delay}s`;
            
            // Случайная продолжительность анимации
            const duration = 10 + Math.random() * 10;
            circle.style.animationDuration = `${duration}s`;
        });
    }
    
    initCircleAnimations();
    
    // Предзагрузка иконок для плавного отображения
    function preloadIcons() {
        const icons = [
            'fa-shield-alt',
            'fa-user',
            'fa-telegram',
            'fa-chevron-down',
            'fa-arrow-left',
            'fa-user-secret',
            'fa-bullseye',
            'fa-tasks',
            'fa-search',
            'fa-network-wired',
            'fa-shield-alt',
            'fa-check-circle',
            'fa-user-shield',
            'fa-file-investigation',
            'fa-cogs',
            'fa-star',
            'fa-tags',
            'fa-github'
        ];
        
        // Создаем невидимый контейнер для предзагрузки
        const preloadContainer = document.createElement('div');
        preloadContainer.style.display = 'none';
        
        icons.forEach(iconClass => {
            const icon = document.createElement('i');
            icon.className = `fas ${iconClass}`;
            preloadContainer.appendChild(icon);
        });
        
        document.body.appendChild(preloadContainer);
        
        // Удаляем после загрузки
        setTimeout(() => {
            document.body.removeChild(preloadContainer);
        }, 1000);
    }
    
    preloadIcons();
    
    // Добавляем эффект появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации появления
    const animatedElements = document.querySelectorAll('.description-section, .contact-card, .skills-list li');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Добавляем дополнительные стили для анимации появления
    const fadeStyles = document.createElement('style');
    fadeStyles.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(fadeStyles);
});
