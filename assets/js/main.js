const initPhases = async () => {
  const wrapper = document.querySelector(".phase-wrapper");

  if (!wrapper) return;

  const phases = [
    {
      id: 1,
      title: "Slab Surfacing & Preparation",
      phase: "Slab Surfacing & Live Edge Prep",
      info: [
        {
          title: "Moisture Verification",
          description:
            "Measure with a pin-type moisture meter. Must be <12% (ideally 8–10% for indoor furniture) to prevent post-build warping or cracking.",
        },
        {
          title: "Flattening",
          description:
            'Set up parallel guide rails and a router flattening sled with a 1.5"–2" surfacing bit. Surface side A, flip, and plane side B parallel until a uniform thickness (1.5"–2") is achieved.',
        },
        {
          title: "Bark/Edge Treatment",
          description:
            "Remove loose cambium and dead bark with a drawknife or wire wheel. Sand edge with 150-grit paper to preserve the organic live edge contour.",
        },
      ],
      image: "assets/img/router-flattening-sled.svg",
    },

    {
      id: 2,
      title: "Cutting the Tapered Legs",
      phase: "Precision Leg Tapering & Compound Bevels",
      info: [
        {
          title: "Rough Dimensioning",
          description: 'Crosscut 3 flat boards to rough length (20"–22").',
        },
        {
          title: "Taper Cutting",
          description:
            'Mark top width (3"–3.5") and bottom width (1.5"). Lock into a tapering jig and pass through a table saw or cut along a clamped track-saw rail.',
        },
        {
          title: "Dual Bevels",
          description:
            'Set miter saw to 12°. Cut the top of all 3 legs. Measure exact identical lengths (18.5") and cut the bottom feet parallel to the top cuts.',
        },
      ],
      image: "assets/img/taper-jig.svg",
    },
    {
      id: 3,
      title: "Structural Joinery (No End-Grain Glue!)",
      phase: "The 120° Tripod Geometric Layout",
      info: [
        {
          description: 'Mill 3 hardwood mounting cleats (1.5" × 2" × 6")',
        },
        {
          description:
            "Bevel one long edge of each cleat to 12° on the table saw.",
        },
        {
          description:
            'Fasten legs to the beveled edge of the cleats using three #8 × 2" countersunk wood screws + wood glue (long-grain to long-grain joint).',
        },
        {
          description:
            'Fasten cleats to the underside of the slab using 5/16" brass threaded inserts and machine bolts, passing through <b>slotted holes</b> in the cleats to permit cross-grain seasonal wood movement.',
        },
      ],
      image: "assets/img/phase3.svg",
    },
    {
      id: 4,
      title: "Sanding & Finishing",
      phase: "Joinery & Mechanical Assembly",
      info: [
        {
          title: "Progressive Sanding",
          description:
            "Random orbital sander with vacuum extraction: 80 grit → 120 grit → 180 grit. Water pop with fine mist to raise grain, final sand with 220 grit.",
        },
        {
          title: "Balanced Finishing",
          description:
            "Apply Hardwax Oil (e.g., Rubio Monocoat or Osmo Polyx) or wipe-on polyurethane. <b>Crucial:</b> Apply identical coat counts to both the top surface and the underside to equalize moisture exchange and stop cupping.",
        },
      ],
      image: "assets/img/phase4.svg",
    },
  ];

  const phaseList = wrapper.querySelector(".phases");
  const slideImage = wrapper.querySelector(".phase-slide-image img");
  const slideCaption = wrapper.querySelector(".phase-slide-caption");
  const slideName = wrapper.querySelector(".phase-slide-name");
  const slideTitle = wrapper.querySelector(".phase-slide-title");
  const info = wrapper.querySelector(".phase-info");
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
    slideCaption.textContent = `Figure · ${activePhase + 1} ${phase.phase}`;
    slideName.textContent = `PHASE ${activePhase + 1} OF ${phases.length}`;
    slideTitle.textContent = `Phase ${activePhase + 1}: ${phase.title}`;

    info.innerHTML = phase.info
      .map(
        (item, index) => `
          <li>
            <div class="phase-info-number">${index + 1}</div>
            <div>
              ${item.title ? '<div class="phase-info-title">' + item.title + "</div>" : ""}
              <div class="phase-info-desc">${item.description}</div>
            </div>
          </li>`,
      )
      .join("");

    previousButton.disabled = activePhase === 0;
    nextButton.disabled = !nextPhase;
    previousButton.textContent =
      activePhase > 0 ? `← Phase ${activePhase}` : "← Previous phase";
    nextButton.textContent = nextPhase
      ? `Next: Phase ${activePhase + 2} →`
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

const calculateLeg = ({ height, splay, thickness }) => {
  const rise = height - thickness;
  const radians = (splay * Math.PI) / 180;

  return {
    rise,
    length: rise / Math.cos(radians),
    offset: rise * Math.tan(radians),
    miter: splay,
  };
};

const ASSEMBLY_SCALE = 6.2;

const drawAssemblyLegs = (svg, { rise, offset }) => {
  const drop = rise * ASSEMBLY_SCALE;
  const shift = offset * ASSEMBLY_SCALE;

  const sideTop = 214;
  const sideBottom = sideTop + drop;
  const centerTop = 224;
  const centerBottom = sideBottom + 8;

  const sideLeg = (hip, foot) =>
    `M${hip - 17} ${sideTop}H${hip + 17}` +
    `L${(foot + 9).toFixed(2)} ${sideBottom.toFixed(2)}` +
    `H${(foot - 9).toFixed(2)}Z`;

  svg
    .querySelector('[data-leg="left"]')
    .setAttribute("d", sideLeg(197, 197 - shift));
  svg
    .querySelector('[data-leg="right"]')
    .setAttribute("d", sideLeg(363, 363 + shift));

  svg
    .querySelector('[data-leg="center"]')
    .setAttribute(
      "d",
      `M266 ${centerTop}H294L290 ${centerBottom.toFixed(2)}H270Z`,
    );
};

const initCalculator = () => {
  const form = document.querySelector(".calc-form");
  const results = document.querySelector(".calc-results");

  if (!form || !results) return;

  const heightInput = form.querySelector("#height");
  const splayInput = form.querySelector("#splay");
  const thicknessInput = form.querySelector("#thickness");
  const lengthValue = results.querySelector('[data-result="length"]');
  const offsetValue = results.querySelector('[data-result="offset"]');
  const miterValue = results.querySelector('[data-result="miter"]');
  const assembly = document.querySelector(".calc-assembly-image svg");

  const onCalcUpdate = () => {
    const { rise, length, offset, miter } = calculateLeg({
      height: Number(heightInput.value),
      splay: Number(splayInput.value),
      thickness: Number(thicknessInput.value),
    });

    lengthValue.textContent = `${length.toFixed(2)}″`;
    offsetValue.textContent = `+${offset.toFixed(2)}″`;
    miterValue.textContent = `${miter.toFixed(1)}°`;

    if (assembly) drawAssemblyLegs(assembly, { rise, offset });
  };

  form.addEventListener("input", onCalcUpdate);

  onCalcUpdate();
};

const initAssemblyView = () => {
  const assembly = document.querySelector(".calc-assembly-image svg");
  const buttons = document.querySelectorAll(
    ".calc-assembly-togglers [data-view]",
  );

  if (!assembly || !buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        const isActive = item === button;

        item.classList.toggle("btn-primary", isActive);
        item.classList.toggle("btn-secondary", !isActive);
      });

      assembly.classList.toggle(
        "is-profile",
        button.dataset.view === "profile",
      );
    });
  });
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

  initCalculator();
  initAssemblyView();
});
