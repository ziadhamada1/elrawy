const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const menuLinks = sideMenu.querySelectorAll('a');

// Toggle القائمة عند الضغط على الزر
menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

// إخفاء القائمة عند الضغط على أي رابط
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});




  (function() {
    emailjs.init("aLcwgRiZpco_X6_49"); // ← Public Key
  })();

  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_48n1h2l", "template_t2v57pw", this)
      .then(function(response) {
        alert("✅ تم إرسال رسالتك بنجاح");
        document.getElementById("contact-form").reset();
      }, function(error) {
        alert("❌ حصل خطأ أثناء الإرسال");
        console.error("EmailJS error:", error);
      });
  });


  




  const btn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      btn.style.display = "block";
      btn.classList.add("animate"); // شغّل الأنيميشن
    } else {
      btn.style.display = "none";
      btn.classList.remove("animate"); // وقف الأنيميشن
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

// /////////////////////////////////////////////////////////
  var typed = new Typed(".text", {
  strings: ["الطحينة", "الحلاوة" ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

// ////////////////////////////////////////////////////////////////

  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // ابدأ العرض التلقائي كل 5 ثواني
  setInterval(nextSlide, 2000);

  // عرض أول شريحة عند التحميل
  showSlide(currentIndex);



  // ////////////////////////////////////////////////////////////////


    window.addEventListener('load', () => {
    const logo = document.querySelector('.logo img');

    // انسخ اللوجو
    const flyLogo = logo.cloneNode(true);
    flyLogo.classList.add('logo-fly');

    // أنشئ طبقة التحميل
    const overlay = document.createElement('div');
    overlay.classList.add('page-overlay');
    overlay.appendChild(flyLogo);
    document.body.appendChild(overlay);

    // اختفاء الأوفرلاي بعد الانيميشن
    setTimeout(() => {
      overlay.style.opacity = '0';
    }, 3500); // بعد حركة الدخول والخروج

    setTimeout(() => {
      overlay.remove();
    }, 4000);
  });


  // /////////////////////////////////////////////////////////////
let testimonials = [];
let currentPage = 0;
let pageSize = 4;

const container = document.getElementById("testimonial-container");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// تحديد عدد الكروت حسب حجم الشاشة
function updatePageSize() {
  if (window.innerWidth <= 768) {
    pageSize = 2;
  } else {
    pageSize = 4;
  }
}

// أول مرة
updatePageSize();

// ولو المستخدم غير حجم الشاشة
window.addEventListener("resize", () => {
  const oldPageSize = pageSize;
  updatePageSize();
  if (oldPageSize !== pageSize) {
    currentPage = 0; // نرجع لأول صفحة
    renderPage();
  }
});

fetch('testimonials.json')
  .then(res => res.json())
  .then(data => {
    testimonials = data;
    renderPage();
    startAutoSlide(); // نشغل السلايدر الأوتوماتيك
  });

function renderPage() {
  container.innerHTML = "";

  const start = currentPage * pageSize;
  const end = start + pageSize;
  const currentItems = testimonials.slice(start, end);

  currentItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.innerHTML = `
      <div class="testimonial-icon"><i class="fas fa-user"></i></div>
      <div class="testimonial-name">${item.name}</div>
      <div class="testimonial-text">${item.review}</div>
    `;
    container.appendChild(card);
  });

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = end >= testimonials.length;
}

nextBtn.addEventListener("click", () => {
  goToNextPage();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
  }
});

// 👉 دالة للتنقل التلقائي أو بزر "التالي"
function goToNextPage() {
  if ((currentPage + 1) * pageSize < testimonials.length) {
    currentPage++;
  } else {
    currentPage = 0; // رجوع لأول صفحة
  }
  renderPage();
}

// ⏱️ تشغيل السلايدر الأوتوماتيك كل 2 ثانية
let autoSlideInterval;
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    goToNextPage();
  }, 3000); // كل ثانيتين
}
