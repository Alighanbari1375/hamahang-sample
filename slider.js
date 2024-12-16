const slider = document.getElementById("slider");
const slides = slider.children.length;
let currentIndex = 0;

// تایمر برای اسلاید خودکار
let autoSlideInterval = setInterval(nextSlide, 1000);

// متغیرهای مورد نیاز برای درگ کردن
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// تغییر به اسلاید بعدی
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides;
    updateSlidePosition();
}

// به‌روزرسانی موقعیت اسلایدر
function updateSlidePosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// شروع درگ
slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    slider.style.cursor = "grabbing";
    clearInterval(autoSlideInterval); // توقف اسلاید خودکار
});

// درگ در حال حرکت
slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const distance = currentX - startX;
    currentTranslate = prevTranslate + distance;
    slider.style.transform = `translateX(${currentTranslate}px)`;
});

// پایان درگ
slider.addEventListener("mouseup", () => {
    isDragging = false;
    slider.style.cursor = "grab";

    // محاسبه اسلاید فعلی پس از درگ
    const threshold = 50; // حد آستانه تغییر اسلاید
    const draggedSlide = Math.round(-currentTranslate / slider.offsetWidth);
    currentIndex = Math.min(
        Math.max(draggedSlide, 0),
        slides - 1
    );

    // بازگشت به موقعیت اسلاید مناسب
    updateSlidePosition();
    prevTranslate = -currentIndex * slider.offsetWidth;

    // ادامه اسلاید خودکار
    autoSlideInterval = setInterval(nextSlide, 3000);
});

// جلوگیری از رفتارهای پیش‌فرض مرورگر در حین درگ
slider.addEventListener("mouseleave", () => {
    if (isDragging) slider.dispatchEvent(new MouseEvent("mouseup"));
});

// پیشگیری از درگ تصویر
slider.addEventListener("dragstart", (e) => e.preventDefault());