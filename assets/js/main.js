const initPhases = async () => {
  const wrapper = document.querySelector(".phase-wrapper");

  if (!wrapper) return;

  const phases = [
    {
      id: 1,
      title: "",
      phase: "Surface the slab",
      info: [],
      warn: null,
      image: "assets/img/router-flattening-sled.svg",
    },

    {
      id: 2,
      title: "Precision tapered leg cuts",
      phase: "Taper the legs",
      info: [
        {
          title: "Rough-cut three blanks",
          description:
            "Crosscut flat 1 × 4″ boards to 20–22″, leaving extra length for trimming.",
        },
        {
          title: "Mark the taper",
          description:
            "3.5″ wide at the hip, 1.5″ at the foot. Tapering one edge over 22″ is about 5.2°; tapering both edges equally is about 2.6° per side.",
        },
        {
          title: "Cut on a jig",
          description:
            "Lock each blank in a tapering jig against the rip fence, or use a clamped track-saw rail. Cut all three the same way.",
        },
        {
          title: "Cut the dual 12° bevels",
          description:
            "Set the miter saw to 12°. Cut the tops, mark identical lengths (18.5″ for a 20″ table) and cut the feet parallel to the tops.",
        },
      ],
      warn: {
        title: "Why parallel bevels",
        description:
          "Cutting the foot parallel to the top keeps the foot flat on the floor once the leg is splayed 12°.",
      },
      image: "assets/img/taper-jig.svg",
    },
    {
      id: 3,
      title: "",
      phase: "Lay out 120°",
      info: [],
      warn: null,
      image: "assets/img/phase3.svg",
    },
    {
      id: 4,
      title: "",
      phase: "Join & assemble",
      info: [],
      warn: null,
      image: "assets/img/phase4.svg",
    },
    {
      id: 5,
      title: "",
      phase: "Sand & finish",
      info: [],
      warn: null,
      image: "assets/img/taper-jig.svg",
    },
  ];

  const phaseList = wrapper.querySelector(".phases");
  const slideImage = wrapper.querySelector(".phase-slide-image img");
  const slideCaption = wrapper.querySelector(".phase-slide-caption");
  const slideName = wrapper.querySelector(".phase-slide-name");
  const slideTitle = wrapper.querySelector(".phase-slide-title");
  const info = wrapper.querySelector(".phase-info");
  const warn = wrapper.querySelector(".warn");
  const warnTitle = warn.querySelector(".warn-title");
  const warnDesc = warn.querySelector(".warn-desc");
  const previousButton = wrapper.querySelector(
    ".phase-slide-buttons .btn-secondary",
  );
  const nextButton = wrapper.querySelector(".phase-slide-buttons .btn-primary");

  let activePhase = 0;

  phaseList.innerHTML = phases
    .map(
      (phase, index) => `
        <div class="phase-item">
          <div class="phase-item-indicator hide-desktop"></div>
          <div class="flex align-middle phase-item-inner">
            <div class="phase-item-number">${index + 1}</div>
            <div>
              <div class="phase-item-title">PHASE ${index + 1}</div>
              <div class="phase-item-desc">${phase.phase}</div>
            </div>
          </div>
        </div>`,
    )
    .join("");

  const phaseItems = phaseList.querySelectorAll(".phase-item");

  const initPhase = () => {
    const phase = phases[activePhase];
    const nextPhase = phases[activePhase + 1];

    phaseItems.forEach((item, index) => {
      item.classList.toggle("passed", index < activePhase);
      item.classList.toggle("active", index === activePhase);
      item.classList.toggle("disabled", index > activePhase);
      item.querySelector(".phase-item-number").textContent =
        index < activePhase ? "✓" : index + 1;
    });

    slideImage.src = phase.image;
    slideCaption.textContent = `FIG. ${activePhase + 1} ${phase.phase}`;
    slideName.textContent = `PHASE ${activePhase + 1} OF ${phases.length}`;
    slideTitle.textContent = phase.title;

    info.innerHTML = phase.info
      .map(
        (item, index) => `
          <li>
            <div class="phase-info-number">${index + 1}</div>
            <div>
              <div class="phase-info-title">${item.title}</div>
              <div class="phase-info-desc">${item.description}</div>
            </div>
          </li>`,
      )
      .join("");

    warn.style.display = phase.warn ? "" : "none";
    warnTitle.textContent = phase.warn?.title ?? "";
    warnDesc.textContent = phase.warn?.description ?? "";

    previousButton.disabled = activePhase === 0;
    nextButton.disabled = !nextPhase;
    previousButton.textContent =
      activePhase > 0 ? `← Phase ${activePhase}` : "← Previous phase";
    nextButton.textContent = nextPhase
      ? `Phase ${activePhase + 2}: ${nextPhase.phase} →`
      : "Next phase →";
  };

  previousButton.addEventListener("click", () => {
    if (activePhase > 0) {
      activePhase -= 1;
      initPhase();
    }
  });

  nextButton.addEventListener("click", () => {
    if (activePhase < phases.length - 1) {
      activePhase += 1;
      initPhase();
    }
  });

  initPhase();
};

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

  initPhases();

  document.querySelectorAll(".range-slider").forEach((slider) => {
    const input = slider.querySelector('input[type="range"]');
    const output = slider.querySelector("output > .value");

    const onRangeUpdate = () => {
      const { min, max, value } = input;

      const progress =
        ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;

      input.style.setProperty("--progress", `${progress}%`);

      output.textContent = `${value}`;
    };

    input.addEventListener("input", onRangeUpdate);

    onRangeUpdate();
  });
});
