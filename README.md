# Re:Vitalize — Hybrid Mobile Application

Aplikasi mobile pendamping kesehatan dan gaya hidup (*lifestyle & wellness companion*) yang berfokus pada pemantauan kesehatan sirkulasi darah serta skrining risiko kardiovaskular. Dibangun menggunakan React Native dan Expo Router untuk membantu pengguna memantau indikator vital harian, mengestimasi risiko kesehatan jantung secara mandiri melalui formulir interaktif, serta memperoleh edukasi medis dan layanan gaya hidup sehat dalam satu aplikasi terpadu.

---

## Developer
- **Nama**: Lawrence Nathaniel
- **NIM**: 2702348934
- **Kelas**: LA95
- **Program Studi**: Computer Science, BINUS University Semarang
- **Mata Kuliah**: Hybrid Application Development
- **Tema Proyek**: Health

---

## Link Video Demo
- https://drive.google.com/drive/folders/1mS8u6ryojojXFiRdZdrj7DXbx0bgnXEZ?usp=sharing

---

## Cara Menjalankan Aplikasi

Pastikan Node.js (versi 18 ke atas) sudah terpasang di komputer Anda.

1. **Clone repositori dan masuk ke direktori proyek**:
   ```bash
   git clone https://github.com/AllenGTx/HybridAppsProject.git
   cd HybridAppsProject
   ```

2. **Instal seluruh dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan aplikasi dengan Expo**:
   ```bash
   # Menjalankan di browser web
   npx expo start --web

   # Atau menjalankan server Metro untuk Android / iOS
   npx expo start
   ```

4. **Buka aplikasi**:
   - Web: Buka tautan `http://localhost:8081` di browser.
   - Android / iOS: Pindai kode QR menggunakan aplikasi **Expo Go** di ponsel.

---

## Penjelasan Konsep

### Cara Kerja React Native
React Native adalah framework buatan Meta yang memungkinkan pembuatan aplikasi Android dan iOS menggunakan satu basis kode JavaScript atau TypeScript. Berbeda dengan pendekatan hybrid berbasis WebView yang menjalankan HTML di dalam browser mini, React Native merender antarmuka langsung ke komponen asli platform (seperti `android.widget` pada Android dan `UIView` pada iOS).

Aplikasi berjalan di dua ruang utama, yaitu JavaScript Thread dan Native Thread (UI Thread). JavaScript Thread menangani logika aplikasi, state, pemanggilan hooks, dan respon terhadap aksi pengguna. Native Thread bertugas menampilkan elemen visual dan memproses gesture sentuhan di layar. Keduanya berkomunikasi melalui arsitektur bridge atau JavaScript Interface (JSI). Arsitektur ini mengirim pesan perintah secara asinkron sehingga kalkulasi logika tidak membuat tampilan antarmuka tersendat atau patah-patah.

### Tiga Keunggulan React Native
1. **Cross Platform**: Pengembang cukup menulis satu proyek kode untuk menghasilkan aplikasi di Android dan iOS sekaligus. Logika bisnis, tampilan, dan integrasi data dipakai bersama, sehingga waktu pembuatan jauh lebih efisien dibanding membuat dua aplikasi terpisah.
2. **Kinerja Mendekati Native**: Karena tampilan dirender menggunakan view asli sistem operasi dan bukan halaman web tiruan, responsivitas tombol, animasi, dan pergerakan scroll terasa cepat dan konsisten dengan antarmuka bawaan perangkat.
3. **Ekosistem dan Fitur Fast Refresh**: Fitur Fast Refresh memungkinkan perubahan kode di editor langsung terlihat di emulator atau perangkat fisik dalam hitungan detik tanpa perlu melakukan build ulang proyek dari nol.

### Komponen, Props, State, dan Navigasi

#### 1. Komponen (Component)
Fungsi independen yang mengembalikan elemen tampilan untuk membentuk bagian antarmuka aplikasi. Pada proyek ini, tampilan kartu metrik kesehatan dipisahkan menjadi komponen tersendiri agar dapat digunakan berulang kali.  
Contoh pada `src/components/VitalCard.tsx`:
```tsx
export const VitalCard: React.FC<VitalCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </TouchableOpacity>
  );
};
```

#### 2. Props
Nilai masukan yang dikirim dari komponen induk ke komponen anak. Sifatnya hanya dapat dibaca (read-only) oleh komponen penerima.  
Contoh pemanggilan di `src/app/home.tsx`:
```tsx
<VitalCard
  item={vitalItem}
  onPress={() => router.push("/check")}
/>
```

#### 3. State
Penyimpan data lokal di dalam komponen yang dapat berubah sewaktu-waktu akibat input pengguna atau proses komputasi. Ketika nilai state berubah lewat fungsi pengubahnya, React Native akan merender ulang bagian antarmuka yang bersangkutan.  
Contoh input data fisik di `src/app/check.tsx`:
```tsx
const [height, setHeight] = useState<string>("172");
const [weight, setWeight] = useState<string>("68");
```

#### 4. Navigasi
Mekanisme untuk berpindah antar layar. Proyek ini menggunakan Expo Router yang bekerja berdasarkan struktur file di folder `src/app`. Setiap file di folder tersebut otomatis menjadi satu rute halaman.  
Contoh navigasi dari beranda ke halaman detail dengan membawa parameter data:
```tsx
import { router } from "expo-router";

router.push({
  pathname: "/detail",
  params: { id: "tips-1" },
});
```

---

## Analisis Kebutuhan

### Latar Belakang
Penyakit sirkulasi darah dan kardiovaskular, seperti hipertensi dan kolesterol tinggi, kerap terlambat disadari karena gejalanya jarang dirasakan langsung pada tahap awal. Di sisi lain, masyarakat sering kesulitan mengetahui status kesehatan fisik secara cepat, bingung mencari rujukan makanan yang aman untuk jantung, serta membutuhkan akses mudah untuk berkonsultasi dengan tenaga medis.

### Target Pengguna
1. Individu usia 20 sampai 45 tahun yang ingin memantau kondisi sirkulasi darah dan detak jantung harian.
2. Orang dengan riwayat hipertensi atau kolesterol di keluarganya yang membutuhkan panduan gaya hidup sehat.
3. Pengguna yang mencari layanan katering rendah kolesterol dan kontak dokter spesialis.

### Kebutuhan Pengguna
1. **Pendaftaran dan Keamanan Akun**: Pengguna dapat membuat akun baru dengan validasi format masukan, fitur sembunyikan atau tampilkan password, serta verifikasi kode OTP.
2. **Ringkasan Indikator Harian**: Pengguna dapat memantau detak jantung (BPM), tekanan darah, asupan air, dan kalori harian langsung dari layar utama.
3. **Pemeriksaan Risiko Mandiri**: Pengguna dapat mengisi data fisik dan kebiasaan hidup secara bertahap untuk menghitung nilai BMI otomatis dan melihat perkiraan risiko kesehatan jantung.
4. **Artikel Medis Terkurasi**: Pengguna dapat membaca ringkasan tips kesehatan yang merujuk pada pedoman medis resmi seperti American Heart Association.
5. **Kartu Identitas Medis (Medical ID)**: Pengguna dapat menyimpan dan melihat data biologis penting seperti golongan darah, tensi terakhir, dan nomor kontak darurat keluarga di halaman profil.

### Tabel Pemetaan Kebutuhan ke Layar dan Komponen

| Kebutuhan Pengguna | Layar (`src/app/`) | Komponen dan Modul Teknis | Fungsi pada Aplikasi |
| :--- | :--- | :--- | :--- |
| Pendaftaran dan Keamanan Akun | `login.tsx`, `register.tsx`, `welcome.tsx` | `AuthHeader.tsx`, `MobileFrame.tsx` | Form registrasi dengan validasi regex, tombol sembunyikan password, dan pop-up OTP 6 digit. |
| Ringkasan Indikator Harian | `home.tsx` | `VitalCard.tsx`, data statis di `vitalsData.ts` | Empat kartu metrik vital harian dengan indikator status normal. |
| Pemeriksaan Risiko Mandiri | `check.tsx` | Komponen animasi transisi bertahap | Form 4 langkah untuk input fisik, gaya hidup, riwayat penyakit, dan kalkulasi BMI real-time. |
| Artikel Medis Terkurasi | `home.tsx`, `detail.tsx` | `TipCard.tsx`, data statis di `healthTipsData.ts` | Daftar artikel di beranda yang dapat diklik menuju layar detail menggunakan `useLocalSearchParams`. |
| Kartu Identitas Medis | `profile.tsx` | Modul `react-native-svg` untuk grafik skor | Kartu data biologis, kontak darurat, ringkasan BMI, dan grafik tren kesehatan mingguan. |
| Layar Pendukung Tambahan | `catering.tsx`, `history.tsx` | Banner interaktif di `home.tsx` | Navigasi kartu katering makanan sehat dan konsultasi dokter dengan animasi rotasi serta spring. |

### Alasan Keputusan Desain
- **Desain Modern Organic Minimalist**: Berfungsi sebagai terapi visual yang menenangkan pengguna. Melalui perpaduan warna hijau sage yang meredakan ketegangan mata, sudut kartu melengkung alami (*biophilic curves*) yang ramah di otak, serta tata letak berbasis kartu yang lapang, antarmuka ini secara psikologis mampu menurunkan kecemasan medis (*health anxiety*) dan menstimulasi saraf parasimpatik untuk membantu menstabilkan detak jantung saat memantau kesehatan.
- **Warna Dominan Hijau Medis**: Menggunakan warna hijau daun dan hijau tua (`#006a43`, `#10b981`) untuk memberikan kesan kesehatan, ketenangan, dan kesegaran, sekaligus menghindari warna merah yang kerap menimbulkan kesan tegang atau bahaya.
- **Tata Letak Kartu dan Sudut Membulat**: Komponen disusun menggunakan kartu dengan sudut lengkung 16–22 piksel agar informasi terbagi rapi per bagian dan mudah dibaca di layar ponsel.
- **Animasi Sederhana pada Interaksi**: Menambahkan animasi halus saat membuka halaman form bertahap dan animasi saat menyentuh banner promosi agar aplikasi terasa responsif tanpa membebani performa perangkat.

### Rencana Pengembangan
- **Integrasi Backend dan Model Prediksi**: Menyambungkan aplikasi ke server backend untuk memproses data skrining menggunakan model Machine Learning yang telah dilatih sebelumnya.
- **Fitur Re:Vit Catering**: Menambahkan menu katering sehat siap kirim dan jadwal telekonsultasi dokter secara langsung di dalam aplikasi.
- **JIKA MEMUNGKINKAN - Koneksi Sensor Perangkat / IoT**: Menghubungkan pembacaan detak jantung dan langkah kaki langsung dari sensor jam tangan pintar atau Google Fit / Apple Health.
