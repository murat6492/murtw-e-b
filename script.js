Skip to content
Navigation Menu
murat6492
murtw-e-b

Type / to search
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
Commit 4a9e75a
murat6492
murat6492
authored
4 minutes ago
·
·
Verified
Update script.js
main
1 parent 
0361461
 commit 
4a9e75a
File tree
Filter files…
script.js
1 file changed
+102
-1
lines changed
Search within code
 
‎script.js‎
+102
-1
Lines changed: 102 additions & 1 deletion
Original file line number	Diff line number	Diff line change
@@ -1,26 +1,127 @@
console.log("script.js yüklendi");
onsole.log("script.js yüklendi");

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
// TÜM SAYFALARI GİZLE
function hideAllContent() {
  document.querySelectorAll(".content-box").forEach(el => {
    el.classList.add("gizli");
  });
}

// ==========================
// 3) HİSSE DETAY SEKME MENÜSÜ
// ==========================
document.querySelectorAll(".sekme-baslik").forEach(sekme => {
  sekme.addEventListener("click", function () {
    const target = this.dataset.sekme;
// SOL MENÜ TIKLAMA
document.addEventListener("click", function (e) {
  const link = e.target.closest("a[data-target]");
  if (!link) return;

    console.log("Sekme tıklandı:", target);
  e.preventDefault();

    // başlık aktif class
    document.querySelectorAll(".sekme-baslik").forEach(s => {
      s.classList.remove("aktif");
    });
    this.classList.add("aktif");
  const targetId = link.dataset.target;
  console.log("Menü tıklandı →", targetId);

    // tüm sekme içeriklerini gizle
    document.querySelectorAll(".sekme-icerik").forEach(box => {
      box.classList.add("gizli");
    });
  hideAllContent();

    // hedef içeriği aç
    const targetBox = document.getElementById(target);
    if (targetBox) {
      targetBox.classList.remove("gizli");
    } else {
      console.warn("Sekme içeriği bulunamadı:", target);
    }
  });
  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove("gizli");
  }
});
// SAYFA YÜKLENİNCE TEST ÇALIŞSIN
loadTestJSON();
0 commit comments
Comments
0
 (0)
Comment
You're not receiving notifications from this thread.

 
Copied!
