const assets = [
  {
    id: "image-1",
    type: "image",
    title: "Factory Floor",
    meta: "Photo • 4K",
    url: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "video-1",
    type: "video",
    title: "Training Clip",
    meta: "Video • 2:34",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "slides-1",
    type: "slides",
    title: "Assembly Deck",
    meta: "Slides • 18 frames",
    url: "https://docs.google.com/presentation/d/e/2PACX-1vR2bIfyqZ3JhWvCMiTGP31yJX4x2M1n9U9LylbU2T1P3r8jV9Xl-cKzQ6M8Wc7g5A/embed?start=false&loop=false&delayms=3000",
  },
  {
    id: "model-1",
    type: "model",
    title: "Exploded View",
    meta: "3D • GLB",
    url: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
  },
];

const stageView = document.getElementById("stageView");
const shelf = document.getElementById("assetShelf");
const filterTabs = document.querySelectorAll(".tab");
const attachmentCards = document.querySelectorAll(".asset-card");

function renderShelf(filter = "all") {
  shelf.innerHTML = "";
  assets
    .filter((asset) => filter === "all" || asset.type === filter)
    .forEach((asset) => {
      const card = document.createElement("div");
      card.className = "shelf-item";
      card.dataset.id = asset.id;

      const thumb = document.createElement("div");
      thumb.className = `thumb ${asset.type}`;

      const title = document.createElement("div");
      title.className = "asset-title";
      title.textContent = asset.title;

      const meta = document.createElement("div");
      meta.className = "asset-meta";
      meta.textContent = asset.meta;

      card.append(thumb, title, meta);
      card.addEventListener("click", () => showAsset(asset.id));
      shelf.appendChild(card);
    });
}

function showAsset(id) {
  const asset = assets.find((item) => item.id === id);
  if (!asset) return;

  stageView.innerHTML = "";

  if (asset.type === "image") {
    const img = document.createElement("img");
    img.src = asset.url;
    img.alt = asset.title;
    img.className = "stage-media";
    stageView.appendChild(img);
  }

  if (asset.type === "video") {
    const video = document.createElement("video");
    video.src = asset.url;
    video.controls = true;
    video.className = "stage-media";
    stageView.appendChild(video);
  }

  if (asset.type === "slides") {
    const frame = document.createElement("iframe");
    frame.src = asset.url;
    frame.className = "stage-iframe";
    frame.title = asset.title;
    stageView.appendChild(frame);
  }

  if (asset.type === "model") {
    const hint = document.createElement("div");
    hint.className = "stage-placeholder";
    hint.innerHTML = `
      <div class="stage-title">3D Model Ready</div>
      <div class="stage-sub">Load your GLB/GLTF in the viewer container.</div>
    `;

    const modelSlot = document.createElement("div");
    modelSlot.style.width = "90%";
    modelSlot.style.height = "70%";
    modelSlot.style.borderRadius = "18px";
    modelSlot.style.border = "1px solid rgba(9,16,27,0.2)";
    modelSlot.style.background = "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(15,23,42,0.08))";
    modelSlot.style.display = "grid";
    modelSlot.style.placeItems = "center";
    modelSlot.textContent = "3D viewer mount";

    const wrapper = document.createElement("div");
    wrapper.style.display = "grid";
    wrapper.style.placeItems = "center";
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    wrapper.style.gap = "14px";
    wrapper.append(modelSlot, hint);
    stageView.appendChild(wrapper);
  }
}

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((button) => button.classList.remove("is-active"));
    tab.classList.add("is-active");
    renderShelf(tab.dataset.filter);
  });
});

attachmentCards.forEach((card) => {
  card.addEventListener("click", () => showAsset(card.dataset.id));
});

renderShelf();
