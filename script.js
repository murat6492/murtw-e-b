document.addEventListener('DOMContentLoaded', () => {
    // 1. ANA MENÜ GEZİNTİSİ (Sidebar)
    const menuLinks = document.querySelectorAll('.yan-menü a');
    const contentBoxes = document.querySelectorAll('.content-box');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                e.preventDefault();
                // Tüm kutuları gizle
                contentBoxes.forEach(box => box.classList.add('gizli'));
                // Hedef kutuyu göster
                document.getElementById(`${targetId}-icerik`).classList.remove('gizli');
            }
        });
    });

    // 2. HİSSE DETAY SEKME GEZİNTİSİ
    const sekmeBasliklari = document.querySelectorAll('.sekme-baslik');
    const sekmeIcerikleri = document.querySelectorAll('.sekme-icerik');

    sekmeBasliklari.forEach(sekme => {
        sekme.addEventListener('click', () => {
            const hedefSekme = sekme.getAttribute('data-sekme');

            // Aktif başlığı değiştir
            sekmeBasliklari.forEach(s => s.classList.remove('aktif'));
            sekme.classList.add('aktif');

            // İçerikleri değiştir
            sekmeIcerikleri.forEach(icerik => icerik.classList.add('gizli'));
            document.getElementById(`${hedefSekme}-icerik`).classList.remove('gizli');
        });
    });

    // 3. BİLGİ (INFO) BUTONLARI
    const infoBtns = document.querySelectorAll('.info-btn');
    infoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-info-target');
            const targetDiv = document.getElementById(targetId);
            if (targetDiv) {
                targetDiv.classList.toggle('gizli');
            }
        });
    });
});
