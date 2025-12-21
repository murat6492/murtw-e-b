console.log("script.js yüklendi");

// ==========================
// 1) SOL MENÜ & ALT MENÜ SEKMELERİ
// ==========================
document.addEventListener("click", function (e) {

  // ANA / ALT MENÜ LİNKLERİ
  const link = e.target.closest("a[data-sekme-target]");
  if (link) {
    e.preventDefault();

    const targetId = link.dataset.sekmeTarget;
    const internal = link.dataset.sekmeInternal || null;

    console.log("Menü tıklandı:", targetId, internal);

    // TÜM ANA İÇERİKLERİ GİZLE
    document.querySelectorAll(".content-box").forEach(box => {
      box.classList.add("gizli");
    });

    // SEÇİLEN ANA İÇERİĞİ GÖSTER
    const targetBox = document.getElementById(targetId);
    if (targetBox) {
      targetBox.classList.remove("gizli");
    }

    // HİSSE DETAY ALT SEKMELERİ
    if (internal) {
      document.querySelectorAll(".hisse-detay-sekme").forEach(el => {
        el.classList.add("gizli");
      });

      const internalEl = document.getElementById(internal);
      if (internalEl) {
        internalEl.classList.remove("gizli");
      }
    }

    // AKTİF MENÜ CLASS
    document.querySelectorAll(".sol-menü a, .alt-menü a").forEach(a => {
      a.classList.remove("aktif-sol-menü");
    });
    link.classList.add("aktif-sol-menü");

    return;
  }

  // ==========================
  // 2) FİNANSAL VERİLER AÇ / KAPA
  // ==========================
  const toggle = e.target.closest(".toggle-menu");
  if (toggle) {
    const submenu = document.getElementById(toggle.dataset.target);
    if (submenu) {
      submenu.classList.toggle("gizli");
    }
  }
});

// ==========================
// 3) TEST AMAÇLI JSON VERİ ÇEKME
// ==========================
async function loadTestJSON() {
  const url =
    "https://raw.githubusercontent.com/murat6492/my-fin-data/gh-pages/data/ASELS%20(TRY)__bilan%C3%A7o.json";

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("JSON başarıyla alındı:", data);
  } catch (err) {
    console.error("JSON alınamadı:", err);
  }
}

// SAYFA YÜKLENİNCE TEST ÇALIŞSIN
loadTestJSON();
