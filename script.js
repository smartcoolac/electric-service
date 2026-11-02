
"use strict";

document.addEventListener("DOMContentLoaded", function () {

  const WHATSAPP_NUMBER = "918002911332";

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  const bookingForm = document.getElementById("bookingForm");
  const serviceSelect = document.getElementById("serviceSelect");
  const dateInput = document.getElementById("bookingDate");

  // MOBILE MENU
  function openMenu() {
    navLinks.classList.add("open");
    menuBtn.classList.add("active");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Close navigation");
  }

  function closeMenu() {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation");
  }

  menuBtn.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (navLinks.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // CLOSE AFTER CLICKING A LINK
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // CLOSE WHEN CLICKING OUTSIDE
  document.addEventListener("click", function (event) {
    if (
      !menuBtn.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // CLOSE WITH ESCAPE
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // CLOSE ON DESKTOP RESIZE
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  // CURRENT YEAR
  document.getElementById("currentYear").textContent =
    new Date().getFullYear();

  // TODAY'S DATE
  function getToday() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
  }

  dateInput.min = getToday();

  // AUTO SELECT SERVICE
  document.querySelectorAll(".service-card").forEach(function (card) {

    card.addEventListener("click", function () {
      const selectedService = card.dataset.service;

      const matchingOption = Array.from(serviceSelect.options)
        .find(function (option) {
          return option.value === selectedService ||
                 option.textContent === selectedService;
        });

      if (matchingOption) {
        serviceSelect.value = matchingOption.value;
      }
    });

  });

  // WHATSAPP FUNCTION
  function openWhatsApp(message) {

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.location.href = url;
  }

  // BOOKING FORM
  bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
      document.getElementById("customerName").value.trim();

    const phone =
      document.getElementById("customerPhone").value.trim();

    const service = serviceSelect.value;

    const address =
      document.getElementById("customerAddress").value.trim();

    const date = dateInput.value;

    const time =
      document.getElementById("bookingTime").value;

    const extra =
      document.getElementById("customerMessage").value.trim();

    if (name.length < 2) {
      alert("Please enter your full name.");
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!service || address.length < 8 || !date || !time) {
      alert("Please complete all required fields.");
      return;
    }

    if (date < getToday()) {
      alert("Please select today or a future date.");
      return;
    }

    const formattedDate = new Date(
      date + "T00:00:00"
    ).toLocaleDateString("en-IN");

    const message =
      "Hello Electric Service!\n\n" +
      "I want to book an electrical service.\n\n" +
      "Name: " + name + "\n" +
      "Mobile: " + phone + "\n" +
      "Service: " + service + "\n" +
      "Address: " + address + "\n" +
      "Date: " + formattedDate + "\n" +
      "Time: " + time + "\n" +
      "Message: " + (extra || "None") + "\n\n" +
      "Please confirm my booking. Thank you!";

    openWhatsApp(message);

  });

});
