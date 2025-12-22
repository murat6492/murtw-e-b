console.log("script.js yüklendi");

// TÜM SAYFALARI GİZLE
function hideAllContent() {
  document.querySelectorAll(".content-box").forEach(el => {
    el.classList.add("gizli");
  });
}

// SOL MENÜ TIKLAMA
document.addEventListener("click", function (e) {
  const link = e.target.closest("a[data-target]");
  if (!link) return;

  e.preventDefault();

  const targetId = link.dataset.target;
  console.log("Menü tıklandı →", targetId);

  hideAllContent();

  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove("gizli");
  }
});
