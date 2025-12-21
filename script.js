console.log("script.js yüklendi");

// ==========================
// 1) SOL SÜTUN BUTONLARI
// ==========================
document.addEventListener("click", function (e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const targetId = btn.dataset.target;
  if (!targetId) return;

  console.log("Sol menü butonu:", targetId);

  // tüm içerikleri gizle
  document.querySelectorAll(".content-box").forEach(el => {
    el.classList.add("gizli");
  });

  // seçilen içeriği göster
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.classList.remove("gizli");
  }
});

// ==========================
// 2) ARAMA KUTUSU (TEST)
// ==========================
const searchForm = document.querySelector(".arama-kutusu");
const searchInput = searchForm?.querySelector("input");

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const hisse = searchInput.value.trim().toUpperCase();
    if (!hisse) return;
    console.log("Aranan hisse:", hisse);
    alert("Arama çalışıyor: " + hisse);
  });
} else {
  console.warn("Arama formu bulunamadı");
}

// ==========================
// 3) JSON VERİ TESTİ (MANUEL)
// ==========================
async function loadTestJSON() {
  const url = "https://raw.githubusercontent.com/murat6492/my-fin-data/gh-pages/data/ASELS%20(TRY)__bilan%C3%A7o.json";
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("JSON başarıyla alındı", data);
  } catch (err) {
    console.error("JSON alınamadı", err);
  }
}

window.loadTestJSON = loadTestJSON;
