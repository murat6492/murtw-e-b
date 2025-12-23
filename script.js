console.log("Sekme sistemi yüklendi");

// ORTA SEKMELER
document.querySelectorAll(".sekme-baslik").forEach(btn => {
  btn.addEventListener("click", () => {
    const hedef = btn.dataset.sekme;

    // başlıkları pasif yap
    document.querySelectorAll(".sekme-baslik").forEach(b =>
      b.classList.remove("aktif")
    );
    btn.classList.add("aktif");

    // içerikleri gizle
    document.querySelectorAll(".sekme-icerik").forEach(icerik =>
      icerik.classList.add("gizli")
    );

    // hedef içeriği aç
    const aktifIcerik = document.getElementById(hedef);
    if (aktifIcerik) {
      aktifIcerik.classList.remove("gizli");
    } else {
      console.warn("İçerik bulunamadı:", hedef);
    }
  });
});

document.querySelectorAll("[data-sekme-target]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const hedef = link.dataset.sekmeTarget;

    document.querySelectorAll(".content-box").forEach(box =>
      box.classList.add("gizli")
    );

    document.getElementById(hedef)?.classList.remove("gizli");
  });
});
