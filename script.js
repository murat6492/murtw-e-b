console.log("JS yüklendi");

// ========== GENEL SAYFA GEÇİŞİ ==========
function showPage(id) {
  document.querySelectorAll(".content-box").forEach(el =>
    el.classList.add("gizli")
  );
  const page = document.getElementById(id);
  if (page) page.classList.remove("gizli");
}

// İlk açılışta anasayfa
document.addEventListener("DOMContentLoaded", () => {
  showPage("anasayfa-icerik");
});

// Sol menü
document.querySelectorAll("[data-sekme-target]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showPage(link.dataset.sekmeTarget);
  });
});

// ========== HİSSE DETAY SEKME ==========
const sekmeler = document.querySelectorAll(".sekme-baslik");
const icerikler = document.querySelectorAll(".sekme-icerik");

sekmeler.forEach(sekme => {
  sekme.addEventListener("click", () => {
    const hedef = sekme.dataset.sekme;

    sekmeler.forEach(s => s.classList.remove("aktif"));
    sekme.classList.add("aktif");

    icerikler.forEach(i => i.classList.add("gizli"));
    const aktif = document.getElementById(hedef + "-icerik");
    if (aktif) aktif.classList.remove("gizli");
  });
});
