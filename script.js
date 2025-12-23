console.log("script.js yüklendi");

// ===============================
// SOL MENÜ – SAYFA GEÇİŞLERİ
// ===============================
document.querySelectorAll("[data-sekme-target]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const hedef = link.dataset.sekmeTarget;
    console.log("Sol menü tıklandı:", hedef);

    document.querySelectorAll(".content-box").forEach(box => {
      box.classList.add("gizli");
    });

    const hedefEl = document.getElementById(hedef);
    if (hedefEl) {
      hedefEl.classList.remove("gizli");
    }
  });
});

// ===============================
// ORTA SEKME SİSTEMİ
// ===============================
document.querySelectorAll(".sekme-baslik").forEach(sekme => {
  sekme.addEventListener("click", () => {
    const hedef = sekme.dataset.sekme;
    console.log("Sekme tıklandı:", hedef);

    document.querySelectorAll(".sekme-baslik")
      .forEach(s => s.classList.remove("aktif"));
    sekme.classList.add("aktif");

    document.querySelectorAll(".sekme-icerik")
      .forEach(i => i.classList.add("gizli"));

    const hedefIcerik = document.getElementById(hedef + "-icerik");
    if (hedefIcerik) {
      hedefIcerik.classList.remove("gizli");
    }
  });
});

console.log("Sekme sistemi yüklendi");

