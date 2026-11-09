# BINUS UNIVERSITY
## ARTIFICIAL INTELLIGENCE USE DECLARATION FORM

I hereby:

| Field | Detail |
| :--- | :--- |
| **Name** | Lawrence Nathaniel |
| **Student ID** | 2702348934 |
| **Course Code** | COMP6923051 |
| **Course Title** | Hybrid Application Development |
| **Assignment Title** | Mid Exam |
| **Assignment Type** | Partial |

Declare that I have used AI in the completion and preparation of the assignment listed above.

If Yes, the AI tools used are as follows:

| ASSIGNMENT PART | USED AI TOOL? | TOOL(S) USED | KEY PROMPT |
| :--- | :---: | :--- | :--- |
| **Idea and content discussion** | No | - | - |
| **Text/Script generation** | No | - | - |
| **Image/Video/Graphics generation** | Yes | Gemini | • “Generate saya gambar makanan sehat seperti nasi merah, salad, di piring bulat, telur, daging, buah buahan seperti catering sehat gitu . PNG g ada backgroundnya. HD rasio nya 1:1”<br>• “Generate saya juga gambar PNG Dokter atau Nakes gt”<br>• “Generate Saya Logo untuk app Re:Vitalize saya dengan mengambil referensi gambar yang saya upload.”, “tambahkan hati ditengah”<br>• “Generate juga gambar PNG Dokter verrsi cowo” |
| **Translation, grammar, and spelling check** | Yes | Google Translate | No Prompt<br>(Hanya translate bbrp kalimat jika kalimat inggris saya tulis tidak enak didengar, misal “Ingin cari makanan yang sehat tapi tetap enak dan g hambar”, jika ditranslate saya secara manual “looking for healthy food but tasty and bland”)<br>(Serta beberapa kalimat di frontend karena kadang saya masih menulis pakai B Indo dan saya meminta bantuan translate) |
| **Others : Code assistance & Refactoring** | Yes | Gemini, Claude (Antigrav) | *(Saya taruh dibawah karena terlalu panjang)* |

**Approximate contribution of AI in the final submission of assignment is 40- 50 %**

I also declare that any use of AI/artificial intelligence for the course mentioned above has been disclosed in this letter.

Semarang, 11 November 2026

![Signature](assets/ai-proof/image1.png)

**Lawrence Nathaniel**  
2702348934  
Link Github : [https://github.com/AllenGTx/HybridAppsProject](https://github.com/AllenGTx/HybridAppsProject)

---

## Key Prompt dan History Log for Code :

*(Jadi disini saya design full tanpa AI, hanya minta saran ada perbaikan apa g?. Untuk codingan saya minta bantuan codingan dan merapikan jika task nya kompleks, task task mudah/ sederhana seperti ganti warna, geser posisi, bikin button sederhana dll tidak menggunakan AI)*

1. “Analisalah file figma diatas, figma diatas adalah rancangan blueprint app saya.Saya ingin membuat aplikasi bernama 'Re:Vitalize', yaitu aplikasi pendamping kesehatan & gaya hidup yang berfokus pada kesehatan sirkulasi darah, yang didasarkan pada projek saya di Machine Learning semester 4, kamu bisa cek di riwayat log chat dengan judul projek cardio-checker. Disini kita HANYA MEMBUAT FRONTEND nya dulu.  
Alur dan struktur aplikasi yang saya rancang adalah (dengan prioritas = jika 1 paling tinggi, 5 paling rendah) :
   - Splash Screen :Animasi Splash di tengah ada logo
   - Login Page : Email, pw, dengan google login
   - Home Page: Banner yang menghubungkan ke CardioCheck tab Dashboard ringkasan harian (Heart Rate, Steps, Water, Sleep) dan Artikel tips kesehatan begitu
   - CardioCheck-Page : Menggunakan Struktur app saya yang sudah ada yaitu input form melalui bbrp variabel dan menunjukkan hasil early screening
   - Profile Page : Page yang menunjukkan nama user email, keterangan/ data diri biologis, avg skor kesehatan
   - History Page : Menunjukkan history kesehatan user dr waktu ke waktu (per minggu)  
Tolong bertindak sebagai pair-programmer assistant saya. Jangan ubah konsep desain dan alur yang sudah saya tentukan di atas. Tugas kamu adalah membantu saya memeriksa bug, memberi saran penulisan TypeScript yang benar, optimasi animasi, dan memastikan kodingan saya tetap modular dan bersih. Jika ada yang ingin diubah jangan langsung mengubah codingan, tanya saya terlebih dahulu. Jika saya bertanya dan membutuhkan jawaban komprehensif kamu jangan langsung menjawab/ halusinasi melainkan harus melakukan research terlebih dahulu. Sekarang pahamilah konteksnya dulu. (Kalau bisa penjelasannya pelan pelan kayak pemula)”

2. “Bisakah kamu bantu apa yang harus saya kerjakan terlebih dahulu. Disini saya mau bikin splash screen”
3. “Cara menambahkan kayak hiasan background biar g sepi? Misal shape bulet seperti di figma?”
4. “Apakah warna hijau ini sudah cocok, menurut saya agak terlalu tua gmn?”
5. “Teks keluar dari box, cara menyesuaikan biar g keluar dr box?”
6. “Logo Google di Google login button amburadul, biar kayak logo biasa gimana?”
7. “Cara Import gambar ke foto profil? Pake foto lokal yang saya simpen di folder”
8. “Ikon ikon masih terasa terlalu jelek, ada library yang bisa dipake buat icon?”
9. “Bisa bantu saya routing dr splash ke login ke home?”
10. “Saya masih kurang suka login page ini. Coba kamu cek gambar yang saya upload dengan struktur welcome page->login/register (saya kelupaan register)-> lalu baru home. Cara penerapannya gimana?, bantu saya routing ulang juga”
11. “Header yang kamu saranakan miring doang, di gambar referensi harusnya shapenya kyk wavy gt gimana?”
12. “Cara menambahkan animasi dan transisi apa gimana, coba kamu research apakah ada library atau plugin tambahan yang bisa menggunakan transisi/ animasi? Kasi tau cara deploynya”
13. “Saya mau membuat fitur utama screening risiko kesehatan jantung di halaman check.tsx. Konsepnya adalah form bertahap (multi-step form 4 langkah), kamu check projek saya sebelumnya Cardio-Checker:
    - Langkah 1: Input data fisik (gender, umur, tinggi badan, berat badan).
    - Langkah 2: Kebiasaan gaya hidup (merokok, olahraga, alkohol).
    - Langkah 3: Riwayat penyakit medis.
    - Langkah 4: Hasil kalkulasi risiko kesehatan kardiovaskular.(Pastikan form sesuai desain figma)  
Tolong bantu saya: Codingan untuk formnya dan Logika kalkulasi BMI otomatis secara real-time dari input tinggi & berat badan beserta penentuan kategori statusnya (Underweight, Optimal, Overweight, Obese). Serta bagaimana routing navigasi ketika cek sekarang di home bisa lgsg ke page ini”
14. “CARA MENAMBAHKAN ANIMASI SEPERTI FADE DI FORM”
15. “Oke skrg lanjut ke profil gimana cara buatnya kyk di figma?”
16. “Saya mau membuat halaman profil dasar di file profile.tsx yang bisa diakses dari bottom nav. Tolong bantu struktur layout-nya: ada foto profil avatar, nama user, email, subscription, skor kesehatan, skor bmi (Prioritas 3 ini dulu : foto profil avatar, nama user, email)”
17. “Oya g ada button setting, cara buatnya gmn saya mau pake icon dr bawaan library expo aj, taruhnya atas foto profil”
18. “Gjd, saya pengen ngerubah desainya coba kamu cek gambar yg saya upload sebagai referensi, enaknya yg mana yg diganti”
19. “Ini saya ingin pake banner subs nya kyk di gambar referensi pertama gimana caranya, tapi saya ingin berubah jd hijau”
20. “Coba kamu lihat di figma ada chart skor kesehatan, coba kamu bantu saya buatnya”
21. “Cara routing tombol log out biar balik ke welcome page?”
22. "Di halaman profil di figma , saya mau menampilkan kartu ringkasan BMI yang ada info tinggi, berat badan, kategori berat badan, dan tombol edit. Tolong bantu routing tombolnya biar kalo diklik bisa lgsg ke form screening di halaman check."
23. “Saya mau menambahkan medical id kayak di gambar refernsi. Bantu saya”
24. “Profil kek kaku pas dibuka. Bantu saya Gunakan FadeSlideIn (yang di check) efek fade dan slide-up pelan yang punya prop delay bertingkat di setiap kartunya?"
25. “Kamu lihat gambar layout yang saya upload. Gunakan untuk di Home, saya mau menambahkan banner promosi 'Re:vit Catering' yang menarik dengan animasi piring makanan (saya juga udh upload gambar makanan dengan nama HealthyFood.webp)  berputar pelan saat kartu di-hover/di-press. Untuk tab Catering dan History biarin kosong aja (nanti abis UTS) Bantu saya routing ke sana aja"
26. “Di bawah kartu katering di Home, mau nambahin banner promosi konsultasi dokter spesialis yang menampilkan foto dua dokter bertumpuk (Dokter 1.webp dan Dokter 2.webp). Tolong bantu efek animasi spring-nya agar saat kartu ditekan/di-hover, dokter depan membesar sedikit dan dokter belakang bergeser halus. Layout ny pake yg kyk banner catering tp bedanya gambar di kiri"
27. “Tolong bantu buatkan fungsi validasi sederhana: nama minimal 3 karakter, email harus format blkg @gmail.com, dan password minimal 8 karakter dengan kombinasi 1 angka dan 1 simbol. Tolong tampilkan teks error merah di bawah masing-masing input jika belum valid, serta fitur Forgot Password."
28. “OYA LUPA JIR, lupa fitur lihat password dan verifikasi OTP di form auth. Tolong bantu cara pasang ikon mata (show/hide password) di input password login.tsx dan register.tsx. Lalu di register, setelah form valid, munculkan pop-up input OTP 6-digit dengan simulasi loading verifikasi sebelum dialihkan ke /home.”
29. “Bantu routing dr health tips ke detail. Jadi detail isinya artikel, artikel pertama : ‘https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/managing-stress-to-control-high-blood-pressure’, kedua : ‘https://pmc.ncbi.nlm.nih.gov/articles/PMC6751071’, ketiga : ‘https://nutritionsource.hsph.harvard.edu/carbohydrates/fiber’. Bantu saya ringkesin jg artikel nya.”
30. “Tolong batnu saya caranya pindahin teks tips sama angka vitals-nya ke file tersendiri (healthTipsData.ts sama vitalsData.ts). Terus bikin kartunya jadi komponen terpisah (TipCard sama VitalCard) biar rapi.”

---

## BUKTI CHAT :

![Bukti Chat 1](assets/ai-proof/image2.png)

![Bukti Chat 2](assets/ai-proof/image3.png)

![Bukti Chat 3](assets/ai-proof/image4.png)

![Bukti Chat 4](assets/ai-proof/image5.png)

![Bukti Chat 5](assets/ai-proof/image6.png)

![Bukti Chat 6](assets/ai-proof/image8.png)

![Bukti Chat 7](assets/ai-proof/image10.png)

![Bukti Chat 8](assets/ai-proof/image12.png)

![Bukti Chat 9](assets/ai-proof/image13.png)

![Bukti Chat 10](assets/ai-proof/image15.png)

![Bukti Chat 11](assets/ai-proof/image16.png)

![Bukti Chat 12](assets/ai-proof/image17.png)

![Bukti Chat 13](assets/ai-proof/image18.png)

![Bukti Chat 14](assets/ai-proof/image19.png)

![Bukti Chat 15](assets/ai-proof/image21.png)

![Bukti Chat 16](assets/ai-proof/image22.png)

![Bukti Chat 17](assets/ai-proof/image23.png)

![Bukti Chat 18](assets/ai-proof/image24.png)

![Bukti Chat 19](assets/ai-proof/image25.png)

![Bukti Chat 20](assets/ai-proof/image26.png)

![Bukti Chat 21](assets/ai-proof/image27.png)

![Bukti Chat 22](assets/ai-proof/image28.png)

![Bukti Chat 23](assets/ai-proof/image29.png)

![Bukti Chat 24](assets/ai-proof/image30.png)

![Bukti Chat 25](assets/ai-proof/image31.png)

![Bukti Chat 26](assets/ai-proof/image32.png)

![Bukti Chat 27](assets/ai-proof/image33.png)

![Bukti Chat 28](assets/ai-proof/image34.png)

![Bukti Chat 29](assets/ai-proof/image35.png)
