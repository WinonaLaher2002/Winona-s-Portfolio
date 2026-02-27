        // Navigation functionality
        function showPage(pageId) {
            const pages = document.querySelectorAll(".page");
            pages.forEach((page) => {
                page.classList.remove("active");
            });

            const navButtons = document.querySelectorAll(".nav-btn");
            navButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            document.getElementById(pageId).classList.add("active");
            event.target.classList.add("active");

            // Scroll to top of content area
            document.querySelector(".content-area").scrollTop = 0;
        }

        // Header button functionality
 //       function downloadCV() {
 //           const button = event.target;
 //           const originalText = button.textContent;
  //          button.textContent = "Downloading...";
  //          button.disabled = true;
//
  //          setTimeout(() => {
   //             button.textContent = "Downloaded!";
   //             setTimeout(() => {
  //                  button.textContent = originalText;
    //                button.disabled = false;
    //            }, 1500);
    //        }, 1000);

    //        console.log("CV download initiated");
    //    }

            function downloadCV(event) {
            const button = event.target;
            const originalText = button.textContent;

            button.textContent = "Downloading...";
            button.disabled = true;

            // Create temporary download link
            const link = document.createElement("a");
            link.href = "assets/files/Winona_Laher_CV.pdf";  // <-- file name here
            link.download = "Winona_Laher_CV.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
                button.textContent = "Downloaded!";
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1500);
            }, 800);
        }


        function contactMe() {
            const navButtons = document.querySelectorAll(".nav-btn");
            navButtons.forEach((btn) => btn.classList.remove("active"));
            navButtons[3].classList.add("active");

            const pages = document.querySelectorAll(".page");
            pages.forEach((page) => page.classList.remove("active"));
            document.getElementById("contacts").classList.add("active");

            document.querySelector(".content-area").scrollTop = 0;
        }



        // Enhanced interactions
        document.addEventListener("DOMContentLoaded", function () {
            addProfileImageEffects();
            addButtonEffects();
            addKeyboardNavigation();
        });

        // Profile image effects
        function addProfileImageEffects() {
            const profileImg = document.querySelector(".profile-img");
            if (profileImg) {
                profileImg.addEventListener("mouseenter", function () {
                    this.style.transform = "scale(1.1) rotate(2deg)";
                    this.style.transition = "transform 0.3s ease";
                });

                profileImg.addEventListener("mouseleave", function () {
                    this.style.transform = "scale(1) rotate(0deg)";
                });

                profileImg.addEventListener("click", function () {
                    this.style.transform = "scale(0.95) rotate(-2deg)";
                    setTimeout(() => {
                        this.style.transform = "scale(1) rotate(0deg)";
                    }, 150);
                });
            }
        }

        // Enhanced button effects
        function addButtonEffects() {
            const buttons = document.querySelectorAll(".btn, .nav-btn");
            buttons.forEach((button) => {
                button.addEventListener("click", function (e) {
                    const rect = this.getBoundingClientRect();
                    const ripple = document.createElement("span");
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255,255,255,0.3);
                        border-radius: 50%;
                        pointer-events: none;
                        animation: ripple 0.6s ease-out;
                    `;

                    this.style.position = "relative";
                    this.style.overflow = "hidden";
                    this.appendChild(ripple);

                    setTimeout(() => {
                        if (ripple.parentNode) {
                            ripple.parentNode.removeChild(ripple);
                        }
                    }, 600);
                });
            });
        }

        // Keyboard navigation
        function addKeyboardNavigation() {
            document.addEventListener("keydown", function (e) {
                if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

                const currentActive = document.querySelector(".nav-btn.active");
                const navButtons = Array.from(document.querySelectorAll(".nav-btn"));
                const currentIndex = navButtons.indexOf(currentActive);

                switch (e.key) {
                    case "ArrowUp":
                    case "ArrowLeft":
                        e.preventDefault();
                        if (currentIndex > 0) {
                            navButtons[currentIndex - 1].click();
                        }
                        break;
                    case "ArrowDown":
                    case "ArrowRight":
                        e.preventDefault();
                        if (currentIndex < navButtons.length - 1) {
                            navButtons[currentIndex + 1].click();
                        }
                        break;
                    case "Home":
                        e.preventDefault();
                        navButtons[0].click();
                        break;
                    case "End":
                        e.preventDefault();
                        navButtons[navButtons.length - 1].click();
                        break;
                }
            });
        }

        // Easter egg
        let clickCount = 0;
        document.addEventListener("click", function (e) {
            if (e.target.classList.contains("profile-img")) {
                clickCount++;
                if (clickCount === 5) {
                    alert("🎉 You found the easter egg! Thanks for exploring!");
                    clickCount = 0;
                }
            }
        });

        // Loading animation
        window.addEventListener("load", function () {
            document.body.style.opacity = "0";
            document.body.style.transition = "opacity 0.8s ease-in";
            setTimeout(() => {
                document.body.style.opacity = "1";
            }, 100);
        });

// EMAILJS CONTACT FORM
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const button = document.querySelector(".contact-btn");
            const originalText = button.textContent;
            button.textContent = "Sending...";
            button.disabled = true;

            emailjs.sendForm(
                "service_s47cteb",
                "template_i2qrmmr",
                this
            )
            .then(function () {
                alert("Yay! Your letter is on its way to my mailbox. 📮✨");
                form.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, function (error) {
                alert("The postman got a bit lost! Could you try resending that? ☁️");
                console.log(error);
                button.textContent = originalText;
                button.disabled = false;
            });
        });
    }
});
