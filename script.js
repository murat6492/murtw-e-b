document.addEventListener('DOMContentLoaded', () => {
    
    // --- SOL MENÜ (SIDEBAR) KONTROLÜ ---
    const menuLinks = document.querySelectorAll('.yan-menü a');
    const allContentBoxes = document.querySelectorAll('.content-box');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            // 1. Tüm ana içerik kutularını gizle
            allContentBoxes.forEach(box => box.classList.add('gizli'));
            
            // 2. Tıklanan menüye ait ID'yi bul ve göster
            // HTML'de data-target="hisseler" ise "hisseler-icerik" div'ini arar
            const targetContent = document.getElementById(`${targetId}-icerik`);
            
            if (targetContent) {
                targetContent.classList.remove('gizli');
                
                // Menüde aktiflik görselini değiştir (isteğe bağlı)
                menuLinks.forEach(l => l.parentElement.classList.remove('aktif'));
                link.parentElement.classList.add('aktif');
            }
        });
    });

    // --- HİSSE DETAY İÇİNDEKİ SEKMELER (Tab) KONTROLÜ ---
    const sekmeBasliklari = document.querySelectorAll('.sekme-baslik');
    const sekmeIcerikleri = document.querySelectorAll('.sekme-icerik');

    sekmeBasliklari.forEach(sekme => {
        sekme.addEventListener('click', () => {
            const hedefSekme = sekme.getAttribute('data-sekme');

            // Başlıklardaki aktif sınıfını temizle ve tıkılana ekle
            sekmeBasliklari.forEach(s => s.classList.remove('aktif'));
            sekme.classList.add('aktif');

            // Tüm sekme içeriklerini gizle ve hedefi göster
            sekmeIcerikleri.forEach(icerik => icerik.classList.add('gizli'));
            const targetTab = document.getElementById(`${hedefSekme}-icerik`);
            if (targetTab) {
                targetTab.classList.remove('gizli');
            }
        });
    });

    // --- BİLGİ BUTONLARI (Info Tooltips) ---
    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = btn.getAttribute('data-info-target');
            const targetDiv = document.getElementById(targetId);
            if (targetDiv) {
                targetDiv.classList.toggle('gizli');
            }
        });
    });
});
