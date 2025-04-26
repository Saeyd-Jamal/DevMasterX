// قائمة التنقل المتنقلة
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // تغيير أيقونة القائمة
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// إغلاق القائمة عند النقر على رابط
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// تفعيل الفصول في قسم محتوى الكتاب
const chapters = document.querySelectorAll('.chapter');

chapters.forEach(chapter => {
    chapter.addEventListener('click', () => {
        // إزالة الحالة النشطة من جميع الفصول
        chapters.forEach(ch => ch.classList.remove('active'));
        // تفعيل الفصل الحالي
        chapter.classList.add('active');
    });
});

// التبديل بين الأسئلة في قسم الأسئلة الشائعة
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // قم بإغلاق جميع الأسئلة الأخرى
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // تبديل حالة السؤال الحالي
        item.classList.toggle('active');
    });
});

// تأثيرات التمرير وظهور العناصر
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    // بطاقات المزايا
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        if (isElementInViewport(card)) {
            // تأخير تدريجي للظهور
            setTimeout(() => {
                card.classList.add('animate');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
    
    // بطاقات آراء العملاء
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        if (isElementInViewport(card)) {
            setTimeout(() => {
                card.classList.add('animate');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}

// تحميل تأثيرات التمرير عند تحميل الصفحة وأثناء التمرير
window.addEventListener('load', handleScrollAnimations);
window.addEventListener('scroll', handleScrollAnimations);

// كشف الوصف عند تحريك المؤشر فوق الفصول
chapters.forEach(chapter => {
    chapter.addEventListener('mouseenter', () => {
        const description = chapter.getAttribute('data-description');
        if (description) {
            const descriptionElement = chapter.querySelector('.chapter-description p');
            if (descriptionElement) {
                descriptionElement.textContent = description;
            }
        }
    });
});

// تنعيم التمرير للروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // تعديل للقائمة العلوية
                behavior: 'smooth'
            });
        }
    });
});

// تأثير زر الشراء - نبضات
const buyButton = document.querySelector('.buy-button');
if (buyButton) {
    // تأثير النبض عند تحميل الصفحة
    setTimeout(() => {
        buyButton.classList.add('pulse');
        setTimeout(() => {
            buyButton.classList.remove('pulse');
        }, 1000);
    }, 2000);
    
    // تأثير النبض كل دقيقة
    setInterval(() => {
        buyButton.classList.add('pulse');
        setTimeout(() => {
            buyButton.classList.remove('pulse');
        }, 1000);
    }, 60000);
}

// تفعيل الفصل الأول افتراضيًا
if (chapters.length > 0) {
    chapters[0].classList.add('active');
}

// إضافة تأثير التثبيت للقائمة العلوية عند التمرير
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});


document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = this;
    const statusMsg = document.getElementById("status-message");

    emailjs.sendForm('service_hzg0z3d', 'template_n6h2ywe', form)
      .then(() => {
        form.reset();
        showSuccessMessage();
      }, () => {
        statusMsg.innerText = "❌ حدث خطأ، حاول لاحقًا.";
        statusMsg.style.color = "crimson";
      });
  });

  function showSuccessMessage() {
    const statusMsg = document.getElementById("status-message");
    statusMsg.innerText = "✔️ تم الإرسال بنجاح!";
    statusMsg.style.color = "#4CAF50";
    statusMsg.classList.add("success-badge");
    setTimeout(() => {
      statusMsg.innerText = "";
      statusMsg.classList.remove("success-badge");
    }, 4000);
  }