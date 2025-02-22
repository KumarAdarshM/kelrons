document.addEventListener("DOMContentLoaded", function () {
    let banners = document.querySelectorAll(".card-banner");
    let bannerBackgrounds = document.querySelectorAll(".home-banner-img-bg");
    let currentIndex = 0;
    let totalBanners = banners.length;
  
    function showBanner(index) {
      banners.forEach((banner, i) => {
        if (i === index) {
          banner.style.visibility = "visible";
          banner.style.opacity = "1";
          banner.style.setProperty("--local-scale", "1");
          banner.style.setProperty("--local-rotation", "0deg");
        } else {
          banner.style.visibility = "hidden";
          banner.style.opacity = "0";
          banner.style.setProperty("--local-scale", "0");
          banner.style.setProperty("--local-rotation", "-180deg");
        }
      });
  
      bannerBackgrounds.forEach((bg, i) => {
        if (i === index) {
          bg.classList.add("fadein");
        } else {
          bg.classList.remove("fadein");
        }
      });
    }
  
    function nextBanner() {
      currentIndex = (currentIndex + 1) % totalBanners;
      showBanner(currentIndex);
    }
  
    showBanner(currentIndex);
    setInterval(nextBanner, 5000);
  
    // Lazy Load Elements Animation
    let lazyLoadObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
  
    document.querySelectorAll(".lazy-load").forEach(element => {
      lazyLoadObserver.observe(element);
    });
  
    // Lazy Load Images
    let lazyImages = document.querySelectorAll("img[data-src]");
    let imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let img = entry.target;
            img.src = img.getAttribute("data-src");
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "50px 0px", threshold: 0.01 }
    );
  
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  });
  