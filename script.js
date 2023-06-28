(function () {
  // ------- Imports -----------------------
  const slideItems = document.querySelectorAll(".form__item"),
    sliderContainer = document.querySelector(".form__wrapper"),
    dotsContainer = document.querySelector(".dots__group"),
    itemContents = document.querySelectorAll(".form__item__content"),
    radioButtons = document.querySelectorAll('input[type="radio"]'),
    selects = document.querySelectorAll("details"),
    prev = document.querySelector("#prev-slide"),
    start = document.querySelector("#start-btn"),
    next = document.querySelector("#next-slide");

  let slideIndex = 0;
  let total = slideItems.length;
  let errorName = "";
  let errorMessage = "";

  // ------- Main functions -----------------------

  itemContents.forEach((item, i) => {
    item.addEventListener("click", () => {
      itemContents[i].classList.add("form__item__content_active");
      // selects[i].open = true;
    });
  });
  radioButtons.forEach((item, i) => {
    item.addEventListener("click", () => {
      closeSelect();
    });
  });
  function closeSelect() {
    selects.forEach((item) => {
      item.open = false;
    });
  }
  for (let i = 0; i < total; i++) {
    dotsContainer.innerHTML += `<div id=${i} class='dot'></div>`;
  }
  // ------- Slider -----------------------

  showSlide(slideIndex);
  function showSlide(n) {
    if (n === 0) {
      prev.disabled = true;
    } else if (n === total - 1) {
      next.style.display = "none";
      start.style.display = "flex";
    } else {
      prev.disabled = false;
      next.style.display = "flex";
      start.style.display = "none";
    }
    sliderContainer.style.transform = `translateX(calc(-380px * ${n})`;
    showDots();
  }
  function changeSlide(n) {
    errorName = "";
    closeSelect();
    validationForm(slideIndex);
    clearError();
    errorName == "" ? showSlide((slideIndex += n)) : getErrorMessage(errorName);
  }

  prev.addEventListener("click", () => {
    changeSlide(-1);
  });

  next.addEventListener("click", () => {
    changeSlide(1);
  });

  // ------- Dots -----------------------

  function showDots() {
    const dots = document.querySelectorAll(".dot");
    dots[0].classList.add("dot_active");
    for (let i = 0; i < slideIndex; i++) {
      dots[i].classList.add("dot_active");
    }
    dots.forEach((dot) => {
      if (dot.classList.contains("dot_active")) {
        dot.classList.remove("dot_active");
      }
      if (dot.id <= slideIndex) {
        dot.classList.add("dot_active");
      }
    });
  }

  // ------- Errors -----------------------
  function validationForm(val) {
    errorName = "";
    switch (val) {
      case 0:
        document.querySelector('input[name="job"]:checked').value !== "0"
          ? null
          : (errorName = "job");
        break;
      case 1:
        document.querySelector('input[name="age"]:checked').value !== "0"
          ? null
          : (errorName = "age");
        break;
      case 2:
        document.querySelector('input[name="location"]').value.trim().length > 3
          ? null
          : (errorName = "location");
        break;
      case 3:
        const email = document
          .querySelector('input[name="email"]')
          .value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailPattern.test(email) ? null : (errorName = "email");
        break;
      case 4:
        document.querySelector('input[name="password"]').value.trim().length > 3
          ? null
          : (errorName = "password");
        break;

      default:
        () => {};
    }
    console.log("errorName", errorName);
  }
  function getErrorMessage(error) {
    const url =
      "https://cors.io/?http://www.mocky.io/v2/5dfcef48310000ee0ed2c281";
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Error HTTP: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        if (error === "job") {
          errorMessage = "Please select your job";
        } else {
          errorMessage = data.errors.find((err) => err.name === error).message;
        }
        showError(errorMessage, slideIndex);
      })
      .catch(function (error) {
        console.log("Error: " + error.message);
      });
  }

  function showError(errMes, n) {
    const formError = document.querySelectorAll(".form__error__message__main")[
      n
    ];

    formError.style.display = "block";
    formError.textContent = errMes;
  }
  function clearError() {
    const formErrors = document.querySelectorAll(".form__error__message__main");
    formErrors.forEach((item) => (item.style.display = "none"));
  }

  // ------- Submit form -----------------------
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form result:");
    console.log("job: ", event.target.job.value);
    console.log("age: ", event.target.age.value);
    console.log("location: ", event.target.location.value);
    console.log("email: ", event.target.email.value);
    console.log("password: ", event.target.password.value);
  }

  var form = document.querySelector("#main-form");
  form.addEventListener("submit", handleSubmit);
})();
