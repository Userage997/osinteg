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
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    
    // Инициализация анимации текста
    animateWelcomeText();
    
    // Переход на второй экран
    aboutOwnerBtn.addEventListener('click', function() {
        // Плавное скрытие первого экрана
        screen1.style.opacity = '0';
        screen1.style.visibility = 'hidden';
        
        setTimeout(() => {
            // Показываем второй экран
            screen2.style.opacity = '1';
            screen2.style.visibility = 'visible';
            screen2.classList.add('active');
            
            // Прокрутка к верху
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    });
    
    // Возврат на первый экран
    backBtn.addEventListener('click', function() {
        // Плавное скрытие второго экрана
        screen2.style.opacity = '0';
        screen2.style.visibility = 'hidden';
        
        setTimeout(() => {
            // Показываем первый экран
            screen1.style.opacity = '1';
            screen1.style.visibility = 'visible';
            screen1.classList.add('active');
            
            // Прокрутка к верху
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    });
    
    // Плавная анимация для всех кнопок
    const buttons = document.querySelectorAll('.btn, .back-btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
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
            const delay = Math.random() * 10;
            circle.style.animationDelay = `${delay}s`;
            
            const duration = 10 + Math.random() * 10;
            circle.style.animationDuration = `${duration}s`;
        });
    }
    
    initCircleAnimations();
    
    // Предзагрузка иконок
    function preloadIcons() {
        const icons = [
            'fa-shield-alt',
            'fa-user',
            'fa-telegram',
            'fa-arrow-left',
            'fa-user-secret',
            'fa-user-tie',
            'fa-bullseye',
            'fa-search',
            'fa-network-wired',
            'fa-shield-alt',
            'fa-chart-line',
            'fa-user-shield',
            'fa-clipboard-check',
            'fa-handshake',
            'fa-star',
            'fa-tags',
            'fa-github'
        ];
        
        const preloadContainer = document.createElement('div');
        preloadContainer.style.display = 'none';
        
        icons.forEach(iconClass => {
            const icon = document.createElement('i');
            icon.className = `fas ${iconClass}`;
            preloadContainer.appendChild(icon);
        });
        
        document.body.appendChild(preloadContainer);
        
        setTimeout(() => {
            document.body.removeChild(preloadContainer);
        }, 1000);
    }
    
    preloadIcons();
});
