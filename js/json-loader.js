document.addEventListener("DOMContentLoaded", () => {
  console.log("json-loader yüklendi");

  const input = document.getElementById("hisseInput");
  const button = document.getElementById("hisseAraBtn");

  if (!input || !button) {
    console.error("Arama kutusu elemanları bulunamadı");
    return;
  }

  button.addEventListener("click", () => {
    const hisse = input.value.trim().toUpperCase();
    if (!hisse) return;

    loadPrice(hisse);
    loadFinancial(hisse);
  });
});

function loadPrice(hisse) {
  fetch("https://raw.githubusercontent.com/murat6492/my-fin-data/gh-pages/data/tumhisse.json")
    .then(r => r.json())
    .then(list => {
      const row = list.find(x => x.Hisse === hisse);
      if (!row) {
        alert("Fiyat verisi yok");
        return;
      }

      document.getElementById("hisse-kodu").textContent = row.Hisse;
      document.getElementById("hisse-fiyat").textContent = row["Son Fiyat (TL)"];
      document.getElementById("hisse-yuzde").textContent = row["Değişim (%)"];
    });
}

function loadFinancial(hisse) {
  const url = `https://raw.githubusercontent.com/murat6492/my-fin-data/gh-pages/data/${hisse} (TRY)__bilanço.json`;

  fetch(url)
    .then(r => r.json())
    .then(data => {
      console.log("Bilanço geldi:", data.length);
    });
}
