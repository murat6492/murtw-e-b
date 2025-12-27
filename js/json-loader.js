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
  fetch("https://raw.githubusercontent.com/murat6492/my-fin-data/main/uploaded_excels/tumhisse.json")
    .then(r => {
      if (!r.ok) throw new Error("Fiyat JSON bulunamadı");
      return r.json();
    })
    .then(list => {
      console.log("Tüm hisse listesi:", list);

      const row = list.find(x => x.Hisse === hisse);
      if (!row) {
        alert("Fiyat verisi yok");
        return;
      }

      document.getElementById("hisse-kodu").textContent = row.Hisse;
      document.getElementById("hisse-fiyat").textContent = row["Son Fiyat (TL)"];
      
      const yuzdeEl = document.getElementById("hisse-yuzde");
      yuzdeEl.textContent = row["Değişim (%)"];

      // artı/eksiye göre class
      yuzdeEl.classList.remove("artti", "dustu");
      yuzdeEl.classList.add(
        String(row["Değişim (%)"]).includes("-") ? "dustu" : "artti"
      );
    })
    .catch(err => {
      console.error("Fiyat yükleme hatası:", err);
    });
}


function loadFinancial(hisse) {
  const url = `https://raw.githubusercontent.com/murat6492/my-fin-data/main/uploaded_excels/tumhisse.json`;

  fetch(url)
    .then(r => r.json())
    .then(data => {
      console.log("Bilanço geldi:", data.length);
    });
}
