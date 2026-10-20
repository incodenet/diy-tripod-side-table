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

  const phaseItems = document.querySelectorAll(
    ".phase-wrapper .phases .phase-item",
  );
  const phaseButtons = document.querySelector(".phase-slide-buttons");

  if (phaseItems.length && phaseButtons) {
    const previousButton = phaseButtons.querySelector(".btn-secondary");
    const nextButton = phaseButtons.querySelector(".btn-primary");
    
    let activePhase = Array.from(phaseItems).findIndex((item) =>
      item.classList.contains("active"),
    );

    if (activePhase < 0) {
      activePhase = 0;
    }

    const getPhaseTitle = (item) =>
      item.querySelector(".phase-item-title").textContent.trim();
    const getButtonTitle = (title) =>
      title.replace(/^PHASE\s+/i, "Phase ");

    const updatePhases = () => {
      phaseItems.forEach((item, index) => {
        const number = item.querySelector(".phase-item-number");

        item.classList.toggle("passed", index < activePhase);
        item.classList.toggle("active", index === activePhase);
        item.classList.toggle("disabled", index > activePhase);
        number.textContent = index < activePhase ? "✓" : String(index + 1);
      });

      previousButton.disabled = activePhase === 0;
      nextButton.disabled = activePhase === phaseItems.length - 1;

      if (activePhase > 0) {
        previousButton.textContent = `← ${getButtonTitle(
          getPhaseTitle(phaseItems[activePhase - 1]),
        )}`;
      } else {
        previousButton.textContent = "← Previous phase";
      }

      if (activePhase < phaseItems.length - 1) {
        const nextPhase = phaseItems[activePhase + 1];
        const nextTitle = getButtonTitle(getPhaseTitle(nextPhase));
        const nextStep = nextPhase
          .querySelector(".phase-item-desc")
          .textContent.trim();

        nextButton.textContent = `${nextTitle}: ${nextStep} →`;
      } else {
        nextButton.textContent = "Next phase →";
      }
    };

    previousButton.addEventListener("click", () => {
      if (activePhase > 0) {
        activePhase -= 1;
        updatePhases();
      }
    });

    nextButton.addEventListener("click", () => {
      if (activePhase < phaseItems.length - 1) {
        activePhase += 1;
        updatePhases();
      }
    });

    updatePhases();
  }
});
