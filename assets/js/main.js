const initPhases = async () => {
  const wrapper = document.querySelector(".phase-wrapper");

  if (!wrapper) return;

  const phases = [
    {
      title: "Slab Surfacing & Preparation",
      phase: "Surface the slab",
      info: [
        {
          title: "Moisture verification",
          description:
            "Measure with a pin-type moisture meter. It must read under 12% (ideally 8–10% for indoor furniture) to prevent cracking, warping or joint failure after the build.",
        },
        {
          title: "Flattening",
          description:
            'Set up parallel guide rails and a router flattening sled with a surfacing bit. Surface side A in shallow passes, flip, and surface side B parallel to a uniform 1.5–2" thickness.',
        },
        {
          title: "Bark & edge treatment",
          description:
            "Remove loose cambium and dead bark with a drawknife or wire brush so the edge won't flake over time. Sand the edge with 150 grit to keep its natural contour.",
        },
      ],
      note: {
        title: "Why both faces",
        description:
          "A slab flattened on one face only will rock on its cleats. Both faces must be flat and parallel before layout.",
      },
      image: "assets/img/router-flattening-sled.svg",
    },
    {
      title: "Cutting the Tapered Legs",
      phase: "Taper the legs",
      info: [
        {
          title: "Rough dimensioning",
          description:
            'Crosscut 3 flat 1 × 4 boards to a rough 20–22", leaving extra length for trimming.',
        },
        {
          title: "Taper cutting",
          description:
            'Mark 3.5" at the hip and 1.5" at the foot. Lock each blank in a tapering jig against the rip fence (guard and riving knife on, push stick ready) or cut along a clamped track-saw rail. Never freehand a taper: the jig keeps the blank from twisting into the blade and kicking back.',
        },
        {
          title: "Dual 12° bevels",
          description:
            'Set the miter saw to 12°. Cut the tops of all 3 legs, mark identical centerline lengths (18.66" for a 20" table with a 1.75" slab; use the calculator below for yours) and cut the feet parallel to the tops.',
        },
      ],
      note: {
        title: "Why parallel bevels",
        description:
          "Cutting the foot parallel to the top keeps the foot flat on the floor once the leg is splayed 12°.",
      },
      image: "assets/img/taper-jig.svg",
    },
    {
      title: "The 120° Tripod Layout",
      phase: "Lay out 120°",
      info: [
        {
          title: "Find the center",
          description:
            "Mark the center of the slab underside with a compass or two crossing diameters.",
        },
        {
          title: "Draw three radial lines",
          description:
            "Draw one line from center to edge, then two more at 120° and 240° with a protractor or by stepping the radius around the rim six times and using every other mark.",
        },
        {
          title: "Place the cleats",
          description:
            'Center a cleat on each line, 2–3" in from the edge, square to the line. Dry-fit the legs and check that all three feet land the same distance from center.',
        },
      ],
      note: {
        title: "Three-point stability",
        description:
          "Three legs at equal 120° spacing always touch the floor, so the table won't rock even on an uneven surface.",
      },
      image: "assets/img/phase3.svg",
    },
    {
      title: "Joinery & Assembly (No End-Grain Glue)",
      phase: "Join & assemble",
      info: [
        {
          title: "Mill the cleats",
          description:
            'Mill 3 hardwood mounting cleats (1.5" × 2" × 6") and bevel one long edge of each to 12° on the table saw.',
        },
        {
          title: "Pre-drill every hole",
          description:
            "Drill a pilot hole and countersink for every screw, and drill insert holes to the size the insert maker specifies, so the hardwood legs, cleats and slab don't split along the grain.",
        },
        {
          title: "Attach the legs",
          description:
            'Fasten each leg to the beveled edge of its cleat with three #8 × 2" countersunk wood screws plus glue (a long-grain to long-grain joint).',
        },
        {
          title: "Mount to the slab",
          description:
            'Install 5/16" threaded inserts in the slab underside and bolt each cleat on with 5/16" × 2" machine bolts and washers, passing through <b>slotted holes</b> cut across the grain so the slab can move with the seasons. Snug the bolts but do not overtighten.',
        },
      ],
      note: {
        title: "Joinery note",
        description:
          "Never rely on an end-grain glue joint. The cleat, screws and bolts carry the load; glue only goes on long-grain faces.",
      },
      image: "assets/img/cleat-threaded-insert.svg",
    },
    {
      title: "Sanding & Finishing",
      phase: "Sand & finish",
      info: [
        {
          title: "Progressive sanding",
          description:
            "Random orbital sander with dust extraction: 80 → 120 → 180 grit to remove machining marks. Mist with water to raise the grain, then a final pass at 220.",
        },
        {
          title: "Balanced finishing",
          description:
            "Apply a hardwax oil (e.g. Rubio Monocoat or Osmo Polyx), Danish oil or wipe-on polyurethane. <b>Crucial:</b> apply the same number of coats to the top and the underside to equalize moisture exchange and stop cupping.",
        },
        {
          title: "Protect the floor",
          description:
            "Once cured, stick felt floor-protector pads on the feet or fit threaded leveling feet so the legs don't scratch the floor.",
        },
      ],
      note: {
        title: "Cure before use",
        description:
          "Let the finish cure fully (check the label) before loading the table or setting drinks on it.",
      },
      image: "assets/img/finishing.svg",
    },
  ];

  const phaseList = wrapper.querySelector(".phases");
  const slideImage = wrapper.querySelector(".phase-slide-image img");
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
        <button type="button" class="phase-item">
          <div class="phase-item-indicator hide-desktop"></div>
          <div class="flex align-middle phase-item-inner">
            <div class="phase-item-number">${index + 1}</div>
            <div>
              <div class="phase-item-title">PHASE ${index + 1}</div>
              <div class="phase-item-desc">${phase.phase}</div>
            </div>
          </div>
        </button>`,
    )
    .join("");

  const phaseItems = phaseList.querySelectorAll(".phase-item");

  const initPhase = () => {
    const phase = phases[activePhase];
    const nextPhase = phases[activePhase + 1];
    const noteTitle = wrapper.querySelector(".phase-slide .warn-title");
    const noteDesc = wrapper.querySelector(".phase-slide .warn-desc");

    phaseItems.forEach((item, index) => {
      item.classList.toggle("passed", index < activePhase);
      item.classList.toggle("active", index === activePhase);
      item.classList.toggle("disabled", index > activePhase);
      item.querySelector(".phase-item-number").textContent =
        index < activePhase ? "✓" : index + 1;
    });

    slideImage.src = phase.image;
    slideImage.alt = `Phase ${activePhase + 1}: ${phase.phase}`;
    slideTitle.textContent = `Phase ${activePhase + 1}: ${phase.title}`;

    if (noteTitle && phase.note) noteTitle.textContent = phase.note.title;
    if (noteDesc && phase.note) noteDesc.textContent = phase.note.description;

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

  phaseItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      activePhase = index;

      initPhase();
    });
  });

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

  const title = document.querySelector(".calc-assembly-title");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        const isActive = item === button;

        item.classList.toggle("btn-primary", isActive);
        item.classList.toggle("btn-secondary", !isActive);
      });

      const isProfile = button.dataset.view === "profile";

      assembly.classList.toggle("is-profile", isProfile);

      if (title)
        title.textContent = isProfile ? "Side profile" : "Exploded assembly";
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

  document.querySelectorAll(".scroll-nav").forEach((link) => {
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

  document.querySelector(".print-button").addEventListener("click", () => {
    window.print();
  });

  initCalculator();
  initAssemblyView();
});
