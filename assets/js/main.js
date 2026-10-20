document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".burger-menu").addEventListener("click", function () {
    if (document.querySelector(".header-nav").classList.contains("active")) {
      document.querySelector(".header-nav").classList.remove("active");
    } else {
      document.querySelector(".header-nav").classList.add("active");
    }
  });

  const tabs = document.querySelectorAll("[data-tab-filter]");
  const items = document.querySelectorAll("[data-filter]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));

      tab.classList.add("active");

      const filter = tab.dataset.tabFilter;
      items.forEach((item) => {
        const filters = item.dataset.filter.split(/\s+/);

        item.style.display = filters.includes(filter) ? "" : "none";
      });
    });
  });

  document.querySelectorAll(".header-nav-item").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.getElementById(link.hash.slice(1));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
