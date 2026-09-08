# 📚 Daftar Topik Silabus — Target Nilai 100 & Medali Kompetisi

> **Status Indikator Progres Belajar:**  
> - 🟢 `[x]` **Dikuasai** *(Akurasi 100% soal analitis / zero-bug clean code lolos uji)*  
> - 🟡 `[-]` **Sedang Dipelajari** *(Teori & latihan dasar tuntas, masuk tahap soal HOTS/proyek)*  
> - ⚪ `[ ]` **Belum Mulai** *(Materi belum dibuka)*  

---

## 📊 Ringkasan Dashboard Silabus

| # | Mata Pelajaran / Bidang Keahlian | Total Topik | Target Dikuasai | Subkategori | Standar Acuan & Target Kompetisi |
|:-:|:---|:---:|:---:|:---:|:---|
| **1** | **Matematika OSN & Sinarmas Math Genius** | 16 Topik | `0/16 dikuasai` | 5 Subkategori | Puspresnas Kemdikbudristek, SEAMO/SWA, IMO |
| **2** | **TKA Wajib: Matematika** | 18 Topik | `0/18 dikuasai` | 6 Subkategori | Kerangka Asesmen Pusmendik Kemendikdasmen |
| **3** | **TKA Wajib: Bahasa Indonesia** | 18 Topik | `0/18 dikuasai` | 6 Subkategori | Literasi Membaca Pusmendik, PUEBI/EYD V |
| **4** | **TKA Wajib: Bahasa Inggris** | 18 Topik | `0/18 dikuasai` | 6 Subkategori | CEFR Level B1/A2, Reading & Applied Grammar |
| **5** | **Serkom JWD (BNSP) & LKS RPL Laravel** | 18 Topik | `0/18 dikuasai` | 6 Subkategori | SKKNI J.620100 (BNSP), WorldSkills Web Tech |

---

## 🏆 Bagian 1: Matematika OSN & Sinarmas Math Genius
**Fokus Kompetisi**: Olimpiade Sains Nasional (OSN-K, OSN-P, OSN Nasional), Sinarmas World Academy Math Genius, SEAMO, SASMO.  
**Target Nilai**: 100 / Gold Medal Standard (Pembuktian matematis rigor, tanpa celah logika).

```
Daftar Topik Silabus — Matematika OSN & Sinarmas Math Genius
├── ⚪ Aljabar (Algebra)                     [0/4 dikuasai • 4 unit materi]
├── ⚪ Geometri (Geometry)                   [0/3 dikuasai • 3 unit materi]
├── ⚪ Teori Bilangan (Number Theory)        [0/4 dikuasai • 4 unit materi]
├── ⚪ Kombinatorika (Combinatorics)         [0/3 dikuasai • 3 unit materi]
└── ⚪ Analisis / Kalkulus & Logika          [0/2 dikuasai • 2 unit materi]
```

### 1.1 Aljabar (Algebra) — `0/4 dikuasai • 4 unit materi`

#### ⚪ Topik 1.1.1: Polinomial Tingkat Lanjut & Teorema Vieta
- **Cakupan Materi**: Pembagian suku banyak, Teorema Sisa, Teorema Faktor, Teorema Vieta untuk derajat $n \ge 3$, transformasi akar, akar-akar simetris ($s_1, s_2, s_3$), faktorisasi bentuk siklik dan homogen.
- **Kriteria Nilai 100**: Mampu menyelesaikan sistem persamaan berderajat tinggi dalam waktu $< 6$ menit, mampu mengkonstruksi polinomial dari sifat akar tanpa trial-error.
- **Checklist Penguasaan**:
  - [ ] Memahami bukti formal Teorema Vieta dan Teorema Sisa.
  - [ ] Menguasai teknik substitusi simetris ($a+b+c=p, ab+bc+ca=q, abc=r$).
  - [ ] Mampu menyelesaikan soal identitas polinomial identik $P(x) \equiv Q(x)$.
  - [ ] Latihan 10 soal OSN-P/Nasional materi polinomial.
  - [ ] Uji mandiri 1 set soal essay OSN (target 100% langkah valid).
- **Pemantik Ingatan**:
  $$x^3 - s_1 x^2 + s_2 x - s_3 = 0, \quad \sum x_i = s_1, \quad \sum x_i x_j = s_2, \quad \prod x_i = s_3$$
- **Prompt AI Tutor**:
  > *"Bertindaklah sebagai pelatih Olimpiade Matematika OSN/IMO. Berikan penjelasan mendalam mengenai Teorema Vieta derajat tinggi dan teknik faktorisasi bentuk simetris, diikuti 2 soal setara OSN-P beserta pembahasan langkah per langkah dengan penulisan pembuktian yang ketat."*

#### ⚪ Topik 1.1.2: Pertidaksamaan Klasik (Inequalities)
- **Cakupan Materi**: AM-GM (Arithmetic Mean - Geometric Mean), Cauchy-Schwarz Inequality (bentuk aljabar & bentuk Engel / Cauchy-Schwarz Sedrakyan), Chebyshev, Jensen, Rearrangement Inequality, teknik homogenisasi & normalisasi.
- **Kriteria Nilai 100**: Mampu menentukan equality condition (kondisi kesamaan) secara presisi dan memilih pertidaksamaan pembanding tanpa trial berkepanjangan.
- **Checklist Penguasaan**:
  - [ ] Membuktikan pertidaksamaan dasar $x^2 + y^2 \ge 2xy$.
  - [ ] Menguasai Cauchy-Schwarz bentuk pecahan (Titu's Lemma / Engel Form): $\sum \frac{a_i^2}{b_i} \ge \frac{(\sum a_i)^2}{\sum b_i}$.
  - [ ] Memahami konsep fungsi konveks/konkaf dan syarat Teorema Jensen.
  - [ ] Melatih teknik substitusi sudut trigonometri pada pertidaksamaan aljabar.
  - [ ] Latihan 15 variasi soal pertidaksamaan olimpiade bertaraf nasional.
- **Pemantik Ingatan**:
  $$\frac{a_1 + a_2 + \dots + a_n}{n} \ge \sqrt[n]{a_1 a_2 \dots a_n} \quad (\text{Equality iff } a_1 = a_2 = \dots = a_n)$$
- **Prompt AI Tutor**:
  > *"Jelaskan penerapan Titu's Lemma (Engel's form of Cauchy-Schwarz) untuk membuktikan pertidaksamaan pecahan simetris 3 variabel. Berikan contoh soal yang sering muncul di seleksi OSN provinsi dan trik mengidentifikasi kapan harus menggunakan AM-GM vs Cauchy-Schwarz."*

#### ⚪ Topik 1.1.3: Persamaan Fungsional (Functional Equations)
- **Cakupan Materi**: Sifat fungsi (injektif, surjektif, bijektif), Persamaan Cauchy $f(x+y) = f(x) + f(y)$ pada domain $\mathbb{Q}$ dan $\mathbb{R}$, teknik substitusi variabel nol/khusus, invarian, fungsi periodik dan titik tetap (*fixed point*).
- **Kriteria Nilai 100**: Mampu menemukan seluruh solusi fungsi yang memenuhi tanpa ada solusi yang terlewat, serta menguji kembali (*check back*) setiap solusi yang didapat ke persamaan awal.
- **Checklist Penguasaan**:
  - [ ] Memahami bukti langkah demi langkah penyelesaian persamaan Cauchy standar.
  - [ ] Menguasai teknik membuktikan sifat injektif: $f(a)=f(b) \implies a=b$.
  - [ ] Menguasai teknik membuktikan sifat surjektif: mencari pre-image untuk setiap $y$.
  - [ ] Menganalisis kondisi involusi $f(f(x)) = x$.
  - [ ] Latihan 10 soal essay persamaan fungsional tingkat nasional.
- **Pemantik Ingatan**:
  $$f(x+y)=f(x)+f(y) \implies f(x)=cx \quad (\forall x \in \mathbb{Q}, \text{atau dengan kontinuitas/monotonisitas di } \mathbb{R})$$
- **Prompt AI Tutor**:
  > *"Ajarkan saya strategi sistematis menyelesaikan persamaan fungsional untuk olimpiade matematika. Mulai dari substitusi titik $x=0, y=0$, membuktikan injektivitas/surjektivitas, hingga menguji kemungkinan solusi linear $f(x)=kx$ atau nol."*

#### ⚪ Topik 1.1.4: Barisan, Deret & Relasi Rekurensi
- **Cakupan Materi**: Barisan aritmatika & geometri bertingkat, relasi rekurensi linear homogen berderajat dua ($a_n = p a_{n-1} + q a_{n-2}$) via persamaan karakteristik, rekurensi non-homogen, deret teleskopik, fungsi pembangkit (*generating function*) dasar.
- **Kriteria Nilai 100**: Mampu menurunkan rumus eksplisit (closed-form formula) dari relasi rekurensi sembarang secara analitis tanpa tebak-tebakan induksi.
- **Checklist Penguasaan**:
  - [ ] Menyelesaikan relasi rekurensi Fibonacci dan variasinya via akar karakteristik.
  - [ ] Menguasai manipulasi deret teleskopik pecahan parsial: $\frac{1}{k(k+1)} = \frac{1}{k} - \frac{1}{k+1}$.
  - [ ] Menghitung jumlah deret aritmatika-geometri ($S = a + (a+d)r + (a+2d)r^2 + \dots$).
  - [ ] Latihan soal barisan bilangan bulat yang berkaitan dengan sifat keterbagian.
  - [ ] Latihan 10 soal rekurensi kombinatorik.
- **Pemantik Ingatan**:
  $$a_n = A r_1^n + B r_2^n \quad (\text{di mana } r_1, r_2 \text{ adalah akar dari } r^2 - pr - q = 0)$$
- **Prompt AI Tutor**:
  > *"Berikan panduan menurunkan rumus eksplisit relasi rekurensi tingkat 2 baik yang memiliki 2 akar real berbeda, akar kembar, maupun kasus non-homogen. Sertakan 2 contoh soal aplikasi di OSN matematika."*

---

### 1.2 Geometri (Geometry) — `0/3 dikuasai • 3 unit materi`

#### ⚪ Topik 1.2.1: Geometri Segitiga Tingkat Lanjut & Teorema Garis
- **Cakupan Materi**: 4 Titik Istimewa Segitiga (Incenter $I$, Circumcenter $O$, Orthocenter $H$, Centroid $G$), Garis Euler ($O, G, H$ segaris dengan $HG:GO = 2:1$), Lingkaran 9 Titik Euler, Teorema Ceva (bentuk trigonometri & panjang segmen), Teorema Menelaus, Teorema Stewart.
- **Kriteria Nilai 100**: Mampu membuktikan kesegaran (*collinearity*) dan kebertitikpusatan (*concurrency*) menggunakan Ceva/Menelaus secara formal tanpa asumsi visual.
- **Checklist Penguasaan**:
  - [ ] Menghafal dan membuktikan Teorema Stewart: $b^2 m + c^2 n = a(d^2 + mn)$.
  - [ ] Memahami Teorema Ceva untuk pembuktian konkurensi garis berat, garis tinggi, garis bagi.
  - [ ] Menerapkan Teorema Menelaus pada konfigurasi garis potong segitiga.
  - [ ] Menguasai relasi jari-jari lingkaran dalam ($r = L/s$) dan luar ($R = \frac{abc}{4L}$).
  - [ ] Latihan 12 soal geometri segitiga tingkat OSN-P.
- **Pemantik Ingatan**:
  $$\text{Ceva: } \frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1, \quad \text{Menelaus: } \frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = -1$$
- **Prompt AI Tutor**:
  > *"Jelaskan cara penggunaan Teorema Ceva dan Teorema Menelaus beserta diagram relasionalnya. Berikan contoh pembuktian konkurensi 3 cevian dalam segitiga sembarang untuk soal kompetisi Sinarmas Math Genius / OSN."*

#### ⚪ Topik 1.2.2: Lingkaran, Kuasa & Segiempat Tali Busur (Cyclic Quadrilateral)
- **Cakupan Materi**: Sifat segiempat tali busur (sudut berseberangan $180^\circ$, sudut luar sama dengan sudut dalam sehadap), Teorema Ptolemy ($AC \cdot BD = AB \cdot CD + BC \cdot AD$), Power of a Point (Teorema Secant-Tangent), Garis Kuasa (*Radical Axis*), Titik Kuasa (*Radical Center*), Garis Simson.
- **Kriteria Nilai 100**: Cepat mengenali titik-titik konsiklis (*concyclic points*) baru dalam diagram yang kompleks dan melakukan *angle-chasing* dengan presisi mutlak.
- **Checklist Penguasaan**:
  - [ ] Melakukan teknik *angle chasing* dasar hingga intermediate.
  - [ ] Menerapkan Teorema Power of a Point: $PA \cdot PB = PC \cdot PD = PT^2$.
  - [ ] Menggunakan sifat Garis Kuasa dari dua lingkaran yang berpotongan/terpisah.
  - [ ] Membuktikan Teorema Ptolemy menggunakan segitiga sebangun.
  - [ ] Latihan 15 soal olimpiade tentang *cyclic quadrilaterals*.
- **Pemantik Ingatan**:
  $$\text{Power of Point } P \text{ thd lingkaran } (O, R): \text{Pow}(P) = d^2 - R^2 = PA \cdot PB$$
- **Prompt AI Tutor**:
  > *"Berikan modul intensif teknik 'Angle Chasing' dan 'Power of a Point' untuk membuktikan 4 titik terletak pada satu lingkaran (cyclic). Berikan 1 soal geometri OSN yang diselesaikan dengan mencari titik konsiklis tersembunyi."*

#### ⚪ Topik 1.2.3: Geometri Transformasi & Trigonometri Lanjut
- **Cakupan Materi**: Homoteti (dilatasi dengan pusat sembarang), Inversi lingkaran, Aturan Sinus & Cosinus dalam pembuktian geometri, rumus luas segitiga Heron & Luas Brahmagupta (segiempat siklik), koordinat Kartesius & Vektor untuk soal geometri (analytic geometry as fallback).
- **Kriteria Nilai 100**: Mampu menggunakan metode analitis/vektor ketika pendekatan sintetis menemui jalan buntu tanpa membuat kesalahan aljabar.
- **Checklist Penguasaan**:
  - [ ] Menguasai sifat homoteti yang memetakan lingkaran dalam ke lingkaran singgung luar.
  - [ ] Menghafal dan membuktikan Rumus Brahmagupta: $L = \sqrt{(s-a)(s-b)(s-c)(s-d)}$.
  - [ ] Menyelesaikan soal geometri dengan metode koordinat analitis (*cartesian bashing*).
  - [ ] Latihan 10 soal geometri tingkat nasional/internasional (SEAMO/SASMO/OSN).
- **Pemantik Ingatan**:
  $$\text{Brahmagupta: } K_{\text{cyclic}} = \sqrt{(s-a)(s-b)(s-c)(s-d)}, \quad s = \frac{a+b+c+d}{2}$$
- **Prompt AI Tutor**:
  > *"Bagaimana cara memutuskan kapan harus menggunakan geometri sintetis murni vs koordinat analitis (Cartesian Bashing) pada soal OSN matematika? Berikan contoh perbandingan efisiensi keduanya."*

---

### 1.3 Teori Bilangan (Number Theory) — `0/4 dikuasai • 4 unit materi`

#### ⚪ Topik 1.3.1: Keterbagian, FPB, KPK & Algoritma Euclidean
- **Cakupan Materi**: Relasi keterbagian $a \mid b$, sifat-sifat keterbagian, Algoritma Pembagian Euclid, Identitas Bezout ($ax + by = \gcd(a,b)$), Lemma Euclid ($p \mid ab \implies p \mid a \lor p \mid b$), Faktorisasi Prima Unik (Teorema Fundamental Aritmatika).
- **Kriteria Nilai 100**: Mampu membuktikan klaim keterbagian untuk semua bilangan bulat positif $n$ dan mencari FPB polinomial variabel $n$.
- **Checklist Penguasaan**:
  - [ ] Menjalankan Algoritma Euclidean mundur (*Extended Euclidean Algorithm*) untuk mencari koefisien Bezout.
  - [ ] Membuktikan sifat $\gcd(a^m-1, a^n-1) = a^{\gcd(m,n)} - 1$.
  - [ ] Menyelesaikan soal pembuktian pecahan $\frac{an+b}{cn+d}$ berbentuk pecahan tak tersederhanakan.
  - [ ] Latihan 10 soal dasar keterbagian OSN.
- **Pemantik Ingatan**:
  $$\gcd(a, b) = \gcd(b, a \pmod b), \quad \exists x,y \in \mathbb{Z} : ax + by = \gcd(a, b)$$
- **Prompt AI Tutor**:
  > *"Jelaskan penerapan Identitas Bezout dan Algoritma Euclidean Lanjutan untuk membuktikan bahwa dua bentuk aljabar selalu relatif prima. Berikan 2 contoh soal OSN tingkat kabupaten dan provinsi."*

#### ⚪ Topik 1.3.2: Modulo, Kongruensi & Teorema Sisa Cina (CRT)
- **Cakupan Materi**: Aritmatika modulo, invers modulo, Teorema Kecil Fermat ($a^{p-1} \equiv 1 \pmod p$), Teorema Euler ($a^{\phi(m)} \equiv 1 \pmod m$), Teorema Wilson ($(p-1)! \equiv -1 \pmod p$), Chinese Remainder Theorem (CRT) untuk modulus relatif prima dan non-relatif prima.
- **Kriteria Nilai 100**: Mampu menghitung digit satuan, digit puluhan, serta menyelesaikan sistem kongruensi serentak dalam hitungan menit tanpa kesalahan aritmatika.
- **Checklist Penguasaan**:
  - [ ] Menguasai kalkulasi eksponen besar modulo $m$ menggunakan Teorema Euler/Fermat.
  - [ ] Memecahkan sistem kongruensi linear menggunakan konstruksi CRT.
  - [ ] Menggunakan Teorema Wilson untuk membuktikan sifat bilangan prima.
  - [ ] Menganalisis nilai modulo pada persamaan aljabar untuk membuktikan tidak ada solusi bulat.
  - [ ] Latihan 15 soal kongruensi olimpiade.
- **Pemantik Ingatan**:
  $$a^p \equiv a \pmod p, \quad a^{\phi(m)} \equiv 1 \pmod m \quad (\gcd(a, m) = 1)$$
- **Prompt AI Tutor**:
  > *"Jelaskan cara menyelesaikan sistem persamaan kongruensi menggunakan Chinese Remainder Theorem (CRT) langkah demi langkah, termasuk cara menangani kondisi ketika modulo tidak saling prima. Berikan contoh soal konkret."*

#### ⚪ Topik 1.3.3: Persamaan Diophantine
- **Cakupan Materi**: Persamaan linear Diophantine $ax + by = c$, Persamaan Pythagoras ($x^2 + y^2 = z^2$ dengan parameter primitif), Faktorisasi Diophantine (Simon's Favorite Factoring Trick - SFFT), Persamaan Pell $x^2 - d y^2 = 1$, metode pembatasan (*bounding*) dan modulo penolakan.
- **Kriteria Nilai 100**: Cermat memilih modulus yang tepat untuk membuktikan ketidakmungkinan solusi (*no integer solution proof*) dan mampu melakukan faktorisasi aljabar non-trivial.
- **Checklist Penguasaan**:
  - [ ] Menguasai SFFT: $xy + ax + by = c \iff (x+b)(y+a) = c + ab$.
  - [ ] Menentukan syarat eksistensi solusi linear Diophantine: $\gcd(a,b) \mid c$.
  - [ ] Memahami rumus parameterisasi Tripel Pythagoras primitif: $x=m^2-n^2, y=2mn, z=m^2+n^2$.
  - [ ] Mempelajari struktur solusi fundamental Persamaan Pell.
  - [ ] Latihan 15 soal persamaan Diophantine olimpiade.
- **Pemantik Ingatan**:
  $$x^2 + y^2 = z^2 \iff x = k(m^2 - n^2), \quad y = k(2mn), \quad z = k(m^2 + n^2)$$
- **Prompt AI Tutor**:
  > *"Ajarkan metode 'Modular Bounding' dan faktorisasi SFFT untuk menyelesaikan persamaan Diophantine non-linear. Berikan 3 soal olimpiade dari tingkat dasar hingga tingkat provinsi."*

#### ⚪ Topik 1.3.4: Fungsi Teori Bilangan & Ordo Modulo
- **Cakupan Materi**: Fungsi Totient Euler $\phi(n)$, Jumlah Pembagi $\sigma(n)$, Banyak Pembagi $    au(n)$ atau $d(n)$, sifat multiplikatif fungsi, Ordo bilangan bulat modulo $m$ ($\text{ord}_m(a)$), Akar Primitif (*Primitive Roots*), Teorema Lifting The Exponent Lemma (LTE).
- **Kriteria Nilai 100**: Mampu menerapkan LTE pada soal bernilai eksponensial tinggi yang melibatkan $v_p(x^n \pm y^n)$ tanpa keraguan.
- **Checklist Penguasaan**:
  - [ ] Menghafal rumus $\phi(n) = n \prod_{p \mid n} (1 - 1/p)$.
  - [ ] Menghitung banyak dan jumlah pembagi dari faktorisasi prima $n = p_1^{a_1} \dots p_k^{a_k}$.
  - [ ] Memahami definisi dan sifat ordo modulo: $\text{ord}_m(a) \mid \phi(m)$.
  - [ ] Mempelajari syarat dan aplikasi Lifting The Exponent Lemma (LTE).
  - [ ] Latihan 10 soal tingkat lanjutan OSN Nasional.
- **Pemantik Ingatan**:
  $$v_p(x^n - y^n) = v_p(x - y) + v_p(n) \quad (\text{LTE untuk } p > 2, p \mid x - y, p 
mid x, y)$$
- **Prompt AI Tutor**:
  > *"Jelaskan konsep Lifting The Exponent Lemma (LTE) secara lengkap, syarat-syarat berlakunya untuk bilangan prima ganjil dan prima genap ($p=2$), serta contoh soal OSN yang dapat diselesaikan seketika dengan LTE."*

---

### 1.4 Kombinatorika (Combinatorics) — `0/3 dikuasai • 3 unit materi`

#### ⚪ Topik 1.4.1: Prinsip Pencacahan, Bijeksi & Koefisien Binomial
- **Cakupan Materi**: Kaidah Penjumlahan & Perkalian, Permutasi, Kombinasi, Permutasi dengan Unsur Sama, Permutasi Siklis, Metode Bintang dan Batang (*Stars and Bars*), Koefisien Multinomial, Prinsip Penghitungan Ganda (*Double Counting*), Pembuktian Kombinatorik Indentitas Aljabar.
- **Kriteria Nilai 100**: Mampu mengidentifikasi pemodelan *Stars and Bars* pada soal pembagian barang/solusi bilangan bulat dan melakukan pembuktian identitas binomial dengan argumen kombinatorik.
- **Checklist Penguasaan**:
  - [ ] Menguasai rumus *Stars and Bars* untuk solusi non-negatif $\binom{n+k-1}{k-1}$ dan positif $\binom{n-1}{k-1}$.
  - [ ] Membuktikan Identitas Pascal $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$ dan Identitas Vandermonde.
  - [ ] Menyelesaikan soal permutasi siklis dengan batasan posisi berdampingan/berpisah.
  - [ ] Menerapkan teknik *Double Counting* untuk membuktikan kesamaan dua ekspresi.
  - [ ] Latihan 15 soal pencacahan tingkat kompetisi.
- **Pemantik Ingatan**:
  $$x_1 + x_2 + \dots + x_k = n, \quad x_i \ge 0 \implies \binom{n+k-1}{k-1} \text{ cara}$$
- **Prompt AI Tutor**:
  > *"Jelaskan teknik 'Stars and Bars' (Bintang dan Batang) untuk menyelesaikan masalah pembagian objek identik ke dalam wadah berbeda dengan berbagai batasan. Berikan 3 variasi soal dan pembahasannya."*

#### ⚪ Topik 1.4.2: Prinsip Sarang Burung Merpati (Pigeonhole Principle / PHP)
- **Cakupan Materi**: Prinsip Dasar PHP (jika $n$ objek dimasukkan ke $k$ wadah dengan $n > k$, minimal ada 1 wadah berisi $\ge 2$ objek), Generalized PHP ($\lceil n/k 
ceil$), aplikasi PHP pada geometri (jarak titik dalam bidang/ruang), aplikasi PHP pada keterbagian dan barisan bilangan bulat, Teorema Erdős-Szekeres.
- **Kriteria Nilai 100**: Mampu menentukan dengan tepat apa yang menjadi "merpati" (*pigeons*) dan apa yang menjadi "sarang" (*holes*) dalam soal yang tidak eksplisit.
- **Checklist Penguasaan**:
  - [ ] Mengidentifikasi definisi merpati dan sarang pada soal keterbagian.
  - [ ] Menyelesaikan masalah titik-titik dalam bangun geometri (segitiga/persegi) dengan partisi luas.
  - [ ] Membuktikan eksistensi sub-barisan monoton menggunakan PHP / Erdős-Szekeres.
  - [ ] Latihan 10 soal esai PHP bertaraf OSN.
- **Pemantik Ingatan**:
  $$\text{Jika } n \text{ objek dimasukkan ke } k \text{ kotak, terdapat setidaknya satu kotak dengan } \ge \left\lceil \frac{n}{k} 
ight
ceil \text{ objek.}$$
- **Prompt AI Tutor**:
  > *"Bagaimana cara melatih intuisi untuk menemukan 'pigeon' dan 'hole' pada soal-soal olimpiade matematika yang tampaknya tidak berkaitan dengan pengelompokan? Berikan contoh kasus geometri dan kasus barisan bilangan."*

#### ⚪ Topik 1.4.3: Prinsip Inklusi-Eksklusi (PIE) & Invarian / Teori Permainan
- **Cakupan Materi**: Prinsip Inklusi-Eksklusi untuk $n$ himpunan, Derangement / Pengacakan Total (!n), Konsep Invarian (nilai yang tetap sepanjang operasi), Konsep Monovarian (nilai yang selalu naik/turun), Pewarnaan Papan Catur / Grid, Teori Permainan Kombinatorik (Nim Game, Nim-Sum $\oplus$, Posisi P dan N).
- **Kriteria Nilai 100**: Mampu membuktikan ketidakmungkinan suatu konfigurasi menggunakan argumen paritas/invarian dan menentukan strategi menang (*winning strategy*) permainan matematika.
- **Checklist Penguasaan**:
  - [ ] Menghafal dan menurunkan rumus derangement: $!n = n! \sum_{k=0}^n \frac{(-1)^k}{k!}$.
  - [ ] Menggunakan pewarnaan grid untuk membuktikan lantai tidak bisa ditutupi domino/tetromino tertentu.
  - [ ] Menganalisis operasi invarian modulo 2 (paritas).
  - [ ] Menghitung Nim-sum (operasi XOR) untuk menentukan posisi menang permainan Nim.
  - [ ] Latihan 12 soal invarian dan permainan kombinatorik.
- **Pemantik Ingatan**:
  $$!n \approx \left[ \frac{n!}{e} 
ight], \quad \text{Nim-Sum: } x_1 \oplus x_2 \oplus \dots \oplus x_k = 0 \iff \text{P-position (pemain kedua menang)}$$
- **Prompt AI Tutor**:
  > *"Ajarkan konsep 'Invariant Principle' dan 'Coloring Proofs' pada grid papan catur. Sertakan studi kasus pemecahan soal tetromino/tromino yang sering keluar di olimpiade matematika internasional."*

---

### 1.5 Analisis / Kalkulus & Logika — `0/2 dikuasai • 2 unit materi`

#### ⚪ Topik 1.5.1: Ekstremum Kontinu & Aplikasi Turunan pada Aljabar
- **Cakupan Materi**: Limit fungsi aljabar & trigonometri tingkat tinggi, konsep turunan untuk analisis kecekungan (*convexity*) fungsi, menemukan nilai maksimum/minimum fungsi multivariabel pada interval tertutup, Teorema Nilai Rata-rata (*Mean Value Theorem*), titik belok.
- **Kriteria Nilai 100**: Mampu memanfaatkan turunan sebagai alat verifikasi ekstremum pada pertidaksamaan dan menyelesaikan optimasi aljabar dengan efisien.
- **Checklist Penguasaan**:
  - [ ] Menganalisis tanda turunan kedua ($f''(x) \ge 0$) untuk menguji konveksitas sebelum menggunakan Teorema Jensen.
  - [ ] Menyelesaikan soal optimasi geometri dengan diferensial.
  - [ ] Latihan 10 soal kalkulus untuk kompetisi matematika.
- **Pemantik Ingatan**:
  $$f''(x) > 0 \implies \text{Konveks (Cekung ke atas)} \implies f\left(\frac{x_1+\dots+x_n}{n}
ight) \le \frac{f(x_1)+\dots+f(x_n)}{n}$$
- **Prompt AI Tutor**:
  > *"Bagaimana cara mengombinasikan konsep turunan dan kecekungan kurva (konveksitas) untuk membuktikan ketidaksamaan aljabar tingkat olimpiade? Jelaskan kaitan antara turunan kedua dan Teorema Jensen."*

#### ⚪ Topik 1.5.2: Induksi Matematika Lanjut & Well-Ordering Principle
- **Cakupan Materi**: Induksi Matematika Lemah (Biasa), Induksi Matematika Kuat (*Strong Induction*), Induksi Cauchy (maju-mundur), Prinsip Terurut Rapi (*Well-Ordering Principle* pada $\mathbb{N}$), Metode Penurunan Tak Hingga Fermat (*Infinite Descent*).
- **Kriteria Nilai 100**: Mampu menyusun pembuktian induktif yang rapi tanpa kesalahan melingkar (*circular reasoning*), serta mampu menerapkan metode penurunan tak hingga untuk Diophantine.
- **Checklist Penguasaan**:
  - [ ] Memahami struktur basis induksi, hipotesis induksi, dan langkah induksi.
  - [ ] Menerapkan Induksi Kuat pada relasi rekurensi bertingkat.
  - [ ] Menguasai metode *Infinite Descent* Fermat untuk membuktikan $x^4 + y^4 = z^2$ tidak memiliki solusi bulat positif non-nol.
  - [ ] Latihan 10 soal pembuktian formal berbasis induksi.
- **Pemantik Ingatan**:
  $$\text{Infinite Descent: } \text{Jika ada solusi positif } s_0, \text{ lalu dapat dikonstruksi solusi lebih kecil } s_1 < s_0, \text{ terjadi kontradiksi dengan WOP!}$$
- **Prompt AI Tutor**:
  > *"Jelaskan metode pembuktian 'Fermat's Method of Infinite Descent' dan hubungannya dengan Well-Ordering Principle. Tunjukkan contoh pembuktian klasiknya pada persamaan Diophantine."*

---

## 📝 Bagian 2: TKA Wajib — Matematika
**Standar Ujian**: Kerangka Asesmen Pusmendik Kemendikdasmen, Seleksi PTN & Kedinasan, Ujian Kemampuan Akademik SMA/SMK.  
**Target Nilai**: 100 / Skor Sempurna (100% Akurasi, waktu pengerjaan rata-rata $\le 80$ detik per soal, zero miskalkulasi).

```
Daftar Topik Silabus — TKA Wajib Matematika
├── ⚪ Bilangan & Operasi Lanjut             [0/3 dikuasai • 3 unit materi]
├── ⚪ Aljabar & Pemodelan                   [0/4 dikuasai • 4 unit materi]
├── ⚪ Geometri, Pengukuran & Dimensi Tiga   [0/3 dikuasai • 3 unit materi]
├── ⚪ Trigonometri                          [0/3 dikuasai • 3 unit materi]
├── ⚪ Kalkulus Dasar                        [0/3 dikuasai • 3 unit materi]
└── ⚪ Data, Statistika & Peluang            [0/2 dikuasai • 2 unit materi]
```

### 2.1 Bilangan & Operasi Lanjut — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 2.1.1: Eksponen & Bentuk Akar**  
  *Materi*: Sifat perkalian/pembagian pangkat, eksponen rasional, merasionalkan penyebut pecahan akar, persamaan eksponen ($a^{f(x)} = a^{g(x)}$, $a^{f(x)} = b^{f(x)}$, bentuk kuadrat eksponen).  
  *Kunci Skor 100*: Perhatikan syarat basis $a=1, a=-1, a=0$ pada persamaan $[h(x)]^{f(x)} = [h(x)]^{g(x)}$.  
  *Prompt*: *"Berikan rangkuman komprehensif persamaan eksponen dengan basis fungsi beserta jebakan kasus khusus basis sama dengan 1, 0, atau -1, disertai 3 soal tipe HOTS TKA Matematika."*
- [ ] **Topik 2.1.2: Logaritma & Sifat-Sifatnya**  
  *Materi*: Definisi logaritma, sifat penjumlahan/pengurangan logaritma, sifat pergantian basis ($^a\log b = \frac{\log b}{\log a}$), persamaan dan pertidaksamaan logaritma, syarat numerus ($f(x) > 0$) dan syarat basis ($a > 0, a 
e 1$).  
  *Kunci Skor 100*: Jangan pernah lupa mengiris himpunan penyelesaian dengan syarat numerus!  
  *Prompt*: *"Jelaskan seluruh sifat logaritma yang sering diuji pada TKA dan tunjukkan contoh kesalahan umum siswa saat lupa menguji syarat numerus pada pertidaksamaan logaritma."*
- [ ] **Topik 2.1.3: Barisan & Deret (Aritmatika, Geometri, Tak Hingga, Finansial)**  
  *Materi*: Suku ke-$n$ ($U_n$), jumlah $n$ suku pertama ($S_n$), beda dan rasio, deret geometri tak hingga konvergen ($-1 < r < 1$, $S_\infty = \frac{a}{1-r}$), aplikasi finansial: bunga majemuk, pertumbuhan, peluruhan, anuitas sederhana.  
  *Kunci Skor 100*: Kuasai relasi $U_n = S_n - S_{n-1}$ dan konsep deret tak hingga lintasan pantulan bola ($S = \frac{h(1+r)}{1-r}$).  
  *Prompt*: *"Berikan formula cepat dan konsep dasar untuk soal barisan deret kontekstual TKA: pantulan bola, pertumbuhan bakteri, dan perhitungan bunga majemuk anuitas."*

### 2.2 Aljabar & Pemodelan — `0/4 dikuasai • 4 unit materi`
- [ ] **Topik 2.2.1: Sistem Persamaan Linear (SPLDV & SPLTV)**  
  *Materi*: Metode eliminasi, substitusi, determinan matriks (Aturan Cramer), jenis solusi (solusi tunggal, banyak solusi/tak terhingga, tidak ada solusi/inkonsisten), pemodelan masalah cerita ekonomi dan produksi.  
  *Kunci Skor 100*: Gunakan substitusi cepat dan periksa kondisi rasio koefisien $\frac{a_1}{a_2} = \frac{b_1}{b_2} 
e \frac{c_1}{c_2}$ (tidak ada solusi).  
  *Prompt*: *"Bagaimana cara cepat menganalisis jumlah solusi pada SPLTV tanpa harus menghitung tuntas seluruh nilai variabel? Jelaskan kondisi determinan nol beserta contoh soal."*
- [ ] **Topik 2.2.2: Persamaan, Pertidaksamaan Kuadrat & Nilai Mutlak**  
  *Materi*: Diskriminan ($D = b^2 - 4ac$), jenis-jenis akar (real berbeda, kembar, imajiner), rumus jumlah dan hasil kali akar Vieta ($x_1+x_2 = -b/a, x_1 x_2 = c/a$), pertidaksamaan pecahan dan bentuk akar, pertidaksamaan nilai mutlak ($|x| < a \iff -a < x < a$).  
  *Kunci Skor 100*: Gunakan garis bilangan dengan titik uji dan perhatikan tanda bulat kosong vs bulat penuh pada penyebut pecahan (penyebut tidak boleh nol).  
  *Prompt*: *"Berikan panduan menyelesaikan pertidaksamaan rasional dan irasional bertingkat beserta aturan garis bilangan dan syarat akar pada TKA Matematika."*
- [ ] **Topik 2.2.3: Fungsi, Komposisi Fungsi & Fungsi Invers**  
  *Materi*: Domain, kodomain, range fungsi, operasi aljabar fungsi, fungsi komposisi $(f \circ g)(x)$, sifat tidak komutatif, fungsi invers $f^{-1}(x)$, invers dari pecahan linear $f(x) = \frac{ax+b}{cx+d} \implies f^{-1}(x) = \frac{-dx+b}{cx-a}$, invers fungsi komposisi $(f \circ g)^{-1} = g^{-1} \circ f^{-1}$.  
  *Kunci Skor 100*: Hafal formula invers pecahan linear di luar kepala; selesaikan soal invers komposisi dalam $< 30$ detik.  
  *Prompt*: *"Tunjukkan trik cepat menentukan rumus invers fungsi aljabar dan pecahan linear, serta strategi menyelesaikan persamaan komposisi $(f \circ g)(x) = h(x)$."*
- [ ] **Topik 2.2.4: Matriks & Sistem Persamaan Matriks**  
  *Materi*: Ordo matriks, perkalian matriks, transpos matriks, determinan matriks $2     imes 2$ dan $3     imes 3$ (Metode Sarrus), sifat determinan ($\det(AB) = \det(A)\det(B), \det(A^T) = \det(A), \det(A^{-1}) = 1/\det(A)$), invers matriks $2     imes 2$, persamaan matriks $AX = B \implies X = A^{-1}B$.  
  *Kunci Skor 100*: Manfaatkan sifat-sifat determinan untuk menghindari perkalian matriks yang memakan waktu.  
  *Prompt*: *"Rangkum seluruh sifat determinan dan invers matriks yang paling sering menjadi jalan pintas menyelesaikan soal TKA Matematika."*

### 2.3 Geometri, Pengukuran & Dimensi Tiga — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 2.3.1: Dimensi Tiga — Jarak Titik, Garis, dan Bidang**  
  *Materi*: Geometri kubus dan balok, proyeksi tegak lurus, jarak titik ke titik, titik ke garis (menggunakan luas segitiga), jarak titik ke bidang (proyeksi atau perbandingan volume prisma/limas), jarak dua garis bersilangan.  
  *Kunci Skor 100*: Visualisasikan bidang irisan 2 dimensi di dalam ruang 3 dimensi; gunakan perbandingan luas segitiga $\frac{1}{2} a t_1 = \frac{1}{2} b t_2$.  
  *Prompt*: *"Berikan metode sistematis menentukan jarak titik ke bidang pada kubus/limas menggunakan pendekatan proyeksi segitiga dan metode volume."*
- [ ] **Topik 2.3.2: Dimensi Tiga — Sudut Antara Dua Elemen Ruang**  
  *Materi*: Sudut antara garis dan garis (menggeser garis hingga berpotongan), sudut antara garis dan bidang (sudut antara garis dengan proyeksinya pada bidang), sudut antara dua bidang (sudut tumpuan pada garis persekutuan), aturan cosinus pada segitiga sudut.  
  *Kunci Skor 100*: Buat segitiga bantuan yang memuat sudut target, lalu gunakan Aturan Cosinus: $\cos     heta = \frac{a^2+b^2-c^2}{2ab}$.  
  *Prompt*: *"Bagaimana menentukan garis proyeksi yang tepat saat mencari sudut antara garis dan bidang pada bangun ruang kubus dan limas segi empat beraturan?"*
- [ ] **Topik 2.3.3: Transformasi Geometri**  
  *Materi*: Translasi $T(a,b)$, Refleksi (terhadap sumbu X, sumbu Y, garis $y=x$, $y=-x$, titik asal $(0,0)$, garis $x=h, y=k$), Rotasi terhadap pusat $(0,0)$ dan $(a,b)$ sebesar $    heta$, Dilatasi $[P(a,b), k]$, komposisi transformasi menggunakan matriks transformasi.  
  *Kunci Skor 100*: Ingat bahwa komposisi transformasi $T_2 \circ T_1$ menggunakan perkalian matriks $M_2 \cdot M_1$ (dikalikan dari kanan ke kiri).  
  *Prompt*: *"Buat tabel ringkas matriks transformasi geometri untuk refleksi, rotasi, dan dilatasi, beserta contoh soal menentukan bayangan kurva parabola setelah ditransformasikan bertingkat."*

### 2.4 Trigonometri — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 2.4.1: Perbandingan Trigonometri Sudut Istimewa & Sudut Berelasi**  
  *Materi*: Definisi $\sin, \cos,     an, \csc, \sec, \cot$ pada segitiga siku-siku (demi, sami, desa), nilai sudut istimewa ($0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ$), tanda trigonometri di kuadran I s.d. IV (ASTC: All - Sin - Tan - Cos), relasi sudut $(90^\circ \pm \alpha), (180^\circ \pm \alpha), (360^\circ - \alpha)$.  
  *Kunci Skor 100*: Perhatikan perubahan fungsi pada sudut $(90^\circ \pm \alpha)$ dan $(270^\circ \pm \alpha)$ di mana $\sin \leftrightarrow \cos,     an \leftrightarrow \cot$.  
  *Prompt*: *"Jelaskan konsep relasi sudut 4 kuadran dan mnemonic ASTC (All Students Take Calculus) beserta latihan konversi sudut tumpul/refleks ke sudut lancip."*
- [ ] **Topik 2.4.2: Identitas & Rumus Jumlah/Selisih Sudut Trigonometri**  
  *Materi*: Identitas Pythagoras ($\sin^2 x + \cos^2 x = 1, 1+    an^2 x = \sec^2 x$), rumus $\sin(A \pm B), \cos(A \pm B),     an(A \pm B)$, rumus sudut ganda ($\sin 2A, \cos 2A = \cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A$), rumus konversi perkalian ke penjumlahan.  
  *Kunci Skor 100*: Hafal 3 variasi rumus $\cos 2A$ untuk substitusi eliminasi angka 1: $1 - \cos 2A = 2\sin^2 A$.  
  *Prompt*: *"Berikan cheatsheet lengkap rumus trigonometri analitis (jumlah/selisih, sudut ganda, perkalian ke jumlah) yang wajib dihafal untuk mendapatkan nilai 100 di TKA Matematika."*
- [ ] **Topik 2.4.3: Aturan Sinus, Aturan Cosinus & Persamaan Trigonometri**  
  *Materi*: Aturan Sinus ($\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$), Aturan Cosinus ($a^2 = b^2 + c^2 - 2bc \cos A$), Luas Segitiga ($L = \frac{1}{2}ab \sin C$), persamaan dasar $\sin x = \sin \alpha, \cos x = \cos \alpha,     an x =     an \alpha$ pada interval tertentu.  
  *Kunci Skor 100*: Ingat periodisitas solusi persamaan trigonometri ($+ k \cdot 360^\circ$ atau $+ k \cdot 180^\circ$).  
  *Prompt*: *"Kapan kita harus memakai aturan sinus vs aturan cosinus pada soal cerita navigasi/sudut elevasi? Berikan tips menentukan semua himpunan penyelesaian persamaan trigonometri dalam interval $[0, 2\pi]$."*

### 2.5 Kalkulus Dasar — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 2.5.1: Limit Fungsi Aljabar**  
  *Materi*: Konsep limit, metode substitusi langsung, faktorisasi, perkalian sekawan akar, Teorema L'Hôpital untuk bentuk tak tentu $\frac{0}{0}$ dan $\frac{\infty}{\infty}$, limit menuju tak hingga fungsi rasional (derajat pembilang vs penyebut).  
  *Kunci Skor 100*: Gunakan Teorema L'Hôpital (turunkan pembilang dan penyebut secara terpisah) untuk menyelesaikan soal limit bentuk $\frac{0}{0}$ dalam $< 20$ detik.  
  *Prompt*: *"Bandingkan penyelesaian limit aljabar menggunakan metode aljabar murni (kali sekawan/faktorisasi) vs Teorema L'Hôpital. Berikan contoh soal di mana L'Hôpital jauh lebih efisien."*
- [ ] **Topik 2.5.2: Turunan Fungsi Aljabar & Aplikasinya**  
  *Materi*: Rumus turunan fungsi aljabar, aturan perkalian $(uv)' = u'v + uv'$, aturan pembagian $(u/v)' = \frac{u'v - uv'}{v^2}$, aturan rantai, persamaan garis singgung kurva ($y - y_1 = m(x - x_1)$ dengan $m = f'(x_1)$), fungsi naik ($f'(x) > 0$), fungsi turun ($f'(x) < 0$), titik stasioner dan nilai maksimum/minimum lokal.  
  *Kunci Skor 100*: Pada soal cerita optimasi (luas/biaya minimum), tentukan fungsi 1 variabel lalu turunkan sama dengan nol ($f'(x) = 0$).  
  *Prompt*: *"Jelaskan langkah sistematis menyelesaikan soal cerita optimasi aplikasi turunan (keuntungan maksimum, luas maksimum bahan kemasan) pada TKA Matematika."*
- [ ] **Topik 2.5.3: Integral Tak Tentu & Integral Tentu Sederhana**  
  *Materi*: Anti-turunan (integral tak tentu) fungsi aljabar $\int a x^n dx = \frac{a}{n+1}x^{n+1} + C$, integral tentu Teorema Dasar Kalkulus $\int_a^b f(x) dx = F(b) - F(a)$, teknik substitusi aljabar, menghitung luas daerah di bawah kurva dan antara dua kurva.  
  *Kunci Skor 100*: Rumus cepat luas daerah antara kurva parabola dan garis: $L = \frac{D\sqrt{D}}{6a^2}$ di mana $D$ adalah diskriminan dari persamaan gabungan.  
  *Prompt*: *"Tunjukkan penurunan dan pembuktian rumus jalan pintas luas daerah kurva parabola $L = \frac{D\sqrt{D}}{6a^2}$ serta batasan kapan rumus ini boleh digunakan."*

### 2.6 Data, Statistika & Peluang — `0/2 dikuasai • 2 unit materi`
- [ ] **Topik 2.6.1: Statistika Deskriptif (Pemusatan & Penyebaran Data)**  
  *Materi*: Rata-rata hitung (mean), median, modus, data tunggal dan berkelompok, kuartil bawah ($Q_1$), kuartil atas ($Q_3$), jangkauan interkuartil ($IQR = Q_3 - Q_1$), variansi (ragam) dan simpangan baku (standar deviasi), efek transformasi data (jika setiap data ditambah $a$ atau dikali $b$).  
  *Kunci Skor 100*: Pahami kaidah transformasi data: operasi penjumlahan/pengurangan mengubah ukuran pemusatan (mean, median) TETAPI TIDAK mengubah ukuran penyebaran (simpangan baku, ragam). Operasi perkalian mengubah keduanya!  
  *Prompt*: *"Jelaskan efek operasi aritmatika (penambahan dan perkalian konstanta) terhadap ukuran pemusatan dan ukuran penyebaran data, sertakan 2 variasi soal jebakan TKA."*
- [ ] **Topik 2.6.2: Kaidah Pencacahan & Peluang Kejadian**  
  *Materi*: Aturan pengisian tempat (filling slots), permutasi ($nPr$), kombinasi ($nCr$), peluang teoritis kejadian tunggal, komplemen peluang ($P(A') = 1 - P(A)$), peluang kejadian majemuk: saling lepas ($P(A \cup B) = P(A) + P(B)$), bebas ($P(A \cap B) = P(A) \cdot P(B)$), dan peluang bersyarat ($P(A|B) = \frac{P(A \cap B)}{P(B)}$).  
  *Kunci Skor 100*: Gunakan pendekatan komplemen "setidaknya satu" ($P(\text{minimal 1}) = 1 - P(\text{tidak ada sama sekali})$) untuk memotong perhitungan panjang.  
  *Prompt*: *"Kapan kita harus memakai aturan kombinasi vs permutasi pada soal pengambilan bola/pemilihan delegasi? Berikan strategi menghitung peluang komplemen 'paling sedikit satu'."*

---

## 📖 Bagian 3: TKA Wajib — Bahasa Indonesia
**Standar Ujian**: Kerangka Asesmen Pusmendik Kemendikdasmen, Standar PUEBI / EYD Edisi V, Literasi Membaca Kritis & Analitis.  
**Target Nilai**: 100 / Skor Sempurna (Ketelitian membaca wacana panjang, pemahaman 100% kaidah EYD V, eliminasi distractor logis).

```
Daftar Topik Silabus — TKA Wajib Bahasa Indonesia
├── ⚪ Keterampilan Membaca Teks Informasi    [0/3 dikuasai • 3 unit materi]
├── ⚪ Refleksi & Evaluasi Kritis Wacana      [0/3 dikuasai • 3 unit materi]
├── ⚪ Keterampilan Membaca Teks Sastra       [0/3 dikuasai • 3 unit materi]
├── ⚪ Tata Kalimat & Kaidah Kalimat Efektif  [0/3 dikuasai • 3 unit materi]
├── ⚪ Pedoman Ejaan Bahasa Indonesia (EYD V) [0/3 dikuasai • 3 unit materi]
└── ⚪ Keterpaduan Paragraf & Wacana          [0/3 dikuasai • 3 unit materi]
```

### 3.1 Keterampilan Membaca Teks Informasi — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 3.1.1: Menemukan Informasi Tersurat (Skimming & Scanning)**  
  *Materi*: Teknik membaca memindai (*scanning*) kata kunci, teknik membaca sekilas (*skimming*) untuk garis besar, menjawab pertanyaan literal 5W+1H (Apa, Siapa, Kapan, Di mana, Mengapa, Bagaimana) tanpa distorsi makna teks.  
  *Kunci Skor 100*: Jangan membaca seluruh teks kata-per-kata terlebih dahulu. Baca pertanyaan dulu, tandai kata kunci unik (nama, tahun, istilah), lalu lakukan scanning ke paragraf target.  
  *Prompt*: *"Berikan panduan teknik scanning dan skimming teks bacaan panjang (250-350 kata) untuk menemukan informasi faktual dalam waktu kurang dari 40 detik."*
- [ ] **Topik 3.1.2: Menentukan Ide Pokok, Kalimat Utama & Gagasan Pendukung**  
  *Materi*: Paragraf deduktif (ide pokok di awal), paragraf induktif (di akhir), paragraf campuran, paragraf ineratif; membedakan gagasan utama dengan kalimat utama; mengeliminasi kalimat penjelas yang terlalu spesifik.  
  *Kunci Skor 100*: Ide pokok tidak boleh terlalu sempit (hanya mencakup 1 kalimat) dan tidak boleh terlalu luas (melebihi bahasan paragraf).  
  *Prompt*: *"Bagaimana membedakan antara 'Gagasan Utama', 'Kalimat Utama', dan 'Simpulan Paragraf'? Tunjukkan cara mengeliminasi pilihan jawaban yang terlalu luas atau terlalu sempit."*
- [ ] **Topik 3.1.3: Membaca & Menginterpretasi Data Grafik, Tabel, dan Infografis**  
  *Materi*: Membaca sumbu horizontal dan vertikal grafik, tren kenaikan/penurunan data, memvalidasi pernyataan yang sesuai vs tidak sesuai dengan isi tabel/infografis, menyintesis simpulan numerik dan teks.  
  *Kunci Skor 100*: Perhatikan satuan pada grafik (misal: "dalam ribuan ton", "persentase") dan hindari asumsi yang tidak tercantum dalam data visual.  
  *Prompt*: *"Berikan tips menganalisis pernyataan yang 'paling sesuai' dengan data tabel/grafik pada soal literasi membaca Bahasa Indonesia."*

### 3.2 Refleksi & Evaluasi Kritis Wacana — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 3.2.1: Membedakan Fakta, Opini, dan Asumsi Penulis**  
  *Materi*: Ciri kalimat fakta (objektif, terverifikasi, angka/data pasti, peristiwa nyata), ciri kalimat opini (subjektif, kata sifat relatif: *sangat, cukup, dirasa*, kata modalitas: *mungkin, sebaiknya, tampaknya*), asumsi yang mendasari argumen teks.  
  *Kunci Skor 100*: Kalimat yang memuat kutipan pendapat seseorang tetap berstatus sebagai fakta bahwa orang tersebut berpendapat demikian, tetapi isi pendapatnya adalah opini.  
  *Prompt*: *"Jelaskan perbedaan mendasar antara Fakta, Opini, dan Asumsi implisit dalam sebuah artikel opini surat kabar, berikan 3 contoh soal evaluasi kritis."*
- [ ] **Topik 3.2.2: Menilai Validitas Argumen, Bias Penulis & Kredibilitas**  
  *Materi*: Mengidentifikasi kekeliruan berpikir (*logical fallacies* dalam teks: ad hominem, false dilemma, overgeneralization), mendeteksi nada/sikap penulis (*author's stance*: netral, kritis, mendukung, pesimistis), tujuan penulisan artikel.  
  *Kunci Skor 100*: Perhatikan pemilihan diksi konotatif penulis yang mencerminkan kecenderungan memihak atau menyudutkan salah satu pihak.  
  *Prompt*: *"Bagaimana cara mendeteksi sikap (stance/bias) penulis dan tujuan penulisan pada teks editorial bahasa Indonesia? Berikan contoh analisis diksi."*
- [ ] **Topik 3.2.3: Menarik Simpulan yang Sah (Penalaran Induktif & Deduktif)**  
  *Materi*: Simpulan silogisme kategorial (Premis Mayor, Premis Minor, Konklusi), Modus Ponens, Modus Tollens, generalisasi induktif, kausalitas (sebab-akibat langsung vs korelasi kebetulan).  
  *Kunci Skor 100*: Simpulan yang benar HARUS mencakup keseluruhan inti wacana dan tidak boleh memasukkan klausa eksternal yang tidak ada di teks.  
  *Prompt*: *"Berikan aturan baku penarikan simpulan paragraf yang valid secara logika dan sesuai dengan standar tes Pusmendik Kemdikbud."*

### 3.3 Keterampilan Membaca Teks Sastra / Fiksi — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 3.3.1: Analisis Unsur Intrinsik Cerpen & Prosa**  
  *Materi*: Tema, tokoh dan penokohan (karakterisasi langsung/analitik vs tidak langsung/dramatik via dialog/tindakan), alur/plot (tahapan: orientasi, komplikasi, klimaks, resolusi), latar (tempat, waktu, suasana/sosial), sudut pandang (*point of view*: orang pertama "aku", orang ketiga serbatahu).  
  *Kunci Skor 100*: Buktikan watak tokoh selalu berdasarkan bukti kutipan kalimat pada teks, bukan sekadar tebakan perasaan.  
  *Prompt*: *"Bagaimana menganalisis watak tokoh melalui metode dramatik (dialog, reaksi tokoh lain, tingkah laku) dalam kutipan novel/cerpen?"*
- [ ] **Topik 3.3.2: Interpretasi Makna Simbolik, Majas & Nilai Moral (Amanat)**  
  *Materi*: Majas perbandingan (metafora, personifikasi, asosiasi, hiperbola), majas sindiran (ironi, sinisme, sarkasme), makna konotatif kata/frasa simbolik dalam karya sastra, pesan moral/amanat tersurat dan tersirat.  
  *Kunci Skor 100*: Amanat selalu berupa kalimat saran/anjuran positif yang relevan dengan penyelesaian konflik utama cerita.  
  *Prompt*: *"Berikan daftar majas yang paling sering keluar di ujian bahasa Indonesia dan cara mengidentifikasi pesan moral/amanat dari resolusi konflik cerpen."*
- [ ] **Topik 3.3.3: Nilai-Nilai Kehidupan dalam Karya Sastra**  
  *Materi*: Nilai moral (akhlak/budi pekerti), nilai sosial (interaksi antarmanusia/kepedulian), nilai budaya (adat istiadat/tradisi), nilai religius (keagamaan/ketuhanan), nilai edukasi/pendidikan; kaitan nilai sastra dengan kehidupan masa kini.  
  *Kunci Skor 100*: Hubungkan tindakan konkret tokoh dengan definisi nilai sosial/moral yang relevan.  
  *Prompt*: *"Jelaskan perbedaan antara nilai moral, nilai sosial, dan nilai budaya dalam teks sastra beserta contoh kasus analisis kutipan cerpen."*

### 3.4 Tata Kalimat & Kaidah Kalimat Efektif — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 3.4.1: Pola Struktur Kalimat Dasar Bahasa Indonesia**  
  *Materi*: Unsur kalimat: Subjek (S), Predikat (P), Objek (O), Pelengkap (Pel), Keterangan (Ket); membedakan Objek (bisa dipasifkan) dan Pelengkap (tidak bisa dipasifkan); pola dasar kalimat tunggal (S-P, S-P-O, S-P-Pel, S-P-O-Pel, S-P-O-K); kalimat inversi (P mendahului S).  
  *Kunci Skor 100*: Pastikan kalimat memiliki minimal Subjek dan Predikat yang jelas tanpa didahului preposisi/kata depan di awal subjek (kesalahan: *"Dalam rapat itu membicarakan..."* $    o$ S hilang!).  
  *Prompt*: *"Bagaimana cara membedakan Objek dan Pelengkap pada struktur kalimat bahasa Indonesia? Berikan contoh uji pasif dan analisis jabatan fungsi kalimat."*
- [ ] **Topik 3.4.2: Ciri-Ciri & Syarat Kalimat Efektif**  
  *Materi*: 5 Syarat kalimat efektif: (1) Kesepadanan struktur (jelas S dan P), (2) Keparalelan bentuk imbuhan (*me-* sejajar dengan *me-*, *di-* sejajar dengan *di-*), (3) Kehematan kata (menghindari pleonasme: *"adalah merupakan"*, *"sangat luas sekali"*, *"para hadirin"*), (4) Kecermatan dan ketegasan, (5) Kelogisan makna (*"Waktu dan tempat kami persilakan"* $    o$ tidak logis!).  
  *Kunci Skor 100*: Cek langsung keparalelan imbuhan pada perincian dan buang kata-kata mubazir/pleonasme.  
  *Prompt*: *"Buat ringkasan 5 pilar kalimat efektif beserta 10 contoh kalimat rancu/tidak efektif yang paling sering diujikan beserta perbaikannya."*
- [ ] **Topik 3.4.3: Konjungsi Antarklausa, Antarkalimat, dan Antarparagraf**  
  *Materi*: Konjungsi koordinatif (*dan, serta, tetapi, atau*), konjungsi subordinatif (*karena, jika, sehingga, meskipun*), konjungsi korelatif (*tidak hanya... tetapi juga*, *baik... maupun*), konjungsi antarkalimat (wajib diikuti tanda koma: *Oleh karena itu, Namun, Selain itu, Akan tetapi*).  
  *Kunci Skor 100*: Jangan pernah menggunakan konjungsi intrakalimat (*sehingga, karena, sedangkan*) di awal kalimat mandiri!  
  *Prompt*: *"Jelaskan aturan penulisan dan fungsi konjungsi antarkalimat vs intrakalimat dalam PUEBI/EYD V, serta daftar konjungsi berpasangan yang baku."*

### 3.5 Pedoman Ejaan Bahasa Indonesia (EYD V / PUEBI) — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 3.5.1: Penulisan Huruf Kapital, Miring, dan Tebal**  
  *Materi*: Huruf kapital: awal kalimat, nama orang/gelar kehormatan yang diikuti nama, nama geografi spesifik (*Sungai Mahakam*, *Pulau Jawa* vs *pergi ke pulau*), nama bangsa/suku/bahasa (*bahasa Indonesia* vs *diindonesiakan*), nama tahun/bulan/hari/hari raya; Huruf miring: judul buku/majalah/surat kabar dalam teks, kata bahasa asing/daerah yang belum diserap, huruf/kata yang ditegaskan.  
  *Kunci Skor 100*: Ingat nama jenis tidak memakai kapital (*jeruk bali*, *kunci inggris*), sedangkan nama asal geografi memakai kapital (*batik Cirebon*, *gudeg Yogya*).  
  *Prompt*: *"Rangkum seluruh aturan penulisan huruf kapital dan miring pada EYD V, terutama kasus nama jenis vs nama geografi dan penulisan kata bahasa asing."*
- [ ] **Topik 3.5.2: Penggunaan Tanda Baca Baku (Koma, Titik Dua, Petik)**  
  *Materi*: Tanda koma (,) untuk perincian $\ge 3$ unsur, sebelum konjungsi pertentangan (*tetapi, melainkan*), setelah anak kalimat yang mendahului induk kalimat, setelah konjungsi antarkalimat; Tanda titik dua (:) untuk perincian yang diakhiri penjelasan; Tanda titik koma (;) pengganti kata hubung setara; Tanda petik ("...") untuk petikan langsung dan judul puisi/artikel.  
  *Kunci Skor 100*: Anak kalimat di belakang induk kalimat TIDAK boleh didahului koma (*"Saya belajar giat karena ingin juara"* $    o$ tanpa koma!).  
  *Prompt*: *"Berikan panduan penggunaan tanda koma (,), titik koma (;), dan titik dua (:) berdasarkan EYD Edisi Kelima beserta contoh kesalahan yang paling umum terjadi."*
- [ ] **Topik 3.5.3: Penulisan Kata Berimbuhan, Bentuk Terikat & Kata Serapan**  
  *Materi*: Penulisan bentuk terikat serangkai (*pascasarjana, antarkota, subsektor, tunawisma, nonformal*), aturan peluluhan bunyi $K, T, S, P$ pada awalan *meng-* dan *peng-*, penulisan gabungan kata yang mendapat awalan dan akhiran sekaligus (*mempertanggungjawabkan* vs *tanggung jawab*), penulisan partikel *pun* (terpisah kecuali 12 kata klise: *meskipun, walaupun, adapun, bagaimanapun, maupun, dll.*).  
  *Kunci Skor 100*: Peluluhan KTSP berlaku jika huruf kedua adalah vokal (*memesona*, bukan *mempesona*; *memengaruhi*, bukan *mempengaruhi*).  
  *Prompt*: *"Jelaskan kaidah peluluhan fonem KTSP pada imbuhan meN-, aturan penulisan bentuk terikat (antar-, pasca-, pra-), dan daftar 12 kata penulisan 'pun' yang digabung."*

### 3.6 Keterpaduan Paragraf & Wacana — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 3.6.1: Kohesi dan Koherensi Paragraf**  
  *Materi*: Kohesi gramatikal (referensi/pengacuan, substitusi, elipsis/pelesapan, konjungsi), kohesi leksikal (repetisi kata kunci, sinonim, antonim, hiponim), koherensi (kelogisan urutan gagasan antarparagraf).  
  *Kunci Skor 100*: Paragraf yang padu selalu memiliki satu kalimat topik dan kalimat penjelas yang saling mengikat tanpa melompat ke topik lain.  
  *Prompt*: *"Bagaimana cara menguji kohesi dan koherensi dalam sebuah paragraf? Jelaskan teknik memeriksa kata kunci berulang dan piranti penghubung kalimat."*
- [ ] **Topik 3.6.2: Mengidentifikasi Kalimat Sumbang / Tidak Padu**  
  *Materi*: Definisi kalimat sumbang (kalimat yang melenceng dari ide pokok paragraf), mendeteksi kalimat yang merusak kepaduan wacana, menghapus atau mengganti kalimat tidak padu agar teks utuh.  
  *Kunci Skor 100*: Tentukan dulu kalimat utama paragraf, lalu uji setiap kalimat apakah masih mendukung kalimat utama tersebut.  
  *Prompt*: *"Tunjukkan metode praktis menemukan 'kalimat sumbang' dalam paragraf soal bahasa Indonesia dengan teknik membaca kalimat utama terlebih dahulu."*
- [ ] **Topik 3.6.3: Menyusun Kalimat Acak & Melengkapi Paragraf Rumpang**  
  *Materi*: Menganalisis kata rujukan (*hal ini, tersebut, mereka*) untuk menentukan urutan kronologis/logis kalimat acak, memilih konjungsi dan kalimat yang tepat untuk mengisi bagian rumpang wacana.  
  *Kunci Skor 100*: Cari kalimat pembuka yang tidak memuat kata rujukan atau konjungsi pengait; perhatikan kata transisi pada kalimat sebelum dan sesudah bagian rumpang.  
  *Prompt*: *"Berikan trik mengurutkan kalimat acak menjadi paragraf padu dengan memperhatikan kata rujukan demonstratif dan pengait leksikal."*

---

## 🌐 Bagian 4: TKA Wajib — Bahasa Inggris
**Standar Ujian**: Kerangka Asesmen Pusmendik Kemendikdasmen, Standar CEFR Level B1/A2, Academic & Vocational Reading, Applied English Mechanics.  
**Target Nilai**: 100 / Skor Sempurna (Reading speed 180-220 wpm, 100% akurasi inference & tone analysis, zero-error pada reference pronoun).

```
Daftar Topik Silabus — TKA Wajib Bahasa Inggris
├── ⚪ Reading Informational & Academic Texts  [0/3 dikuasai • 3 unit materi]
├── ⚪ Reading Vocational & Everyday Texts     [0/3 dikuasai • 3 unit materi]
├── ⚪ Vocabulary in Context & Lexical Nuance  [0/3 dikuasai • 3 unit materi]
├── ⚪ Author's Purpose, Tone & Critical Stance[0/3 dikuasai • 3 unit materi]
├── ⚪ Discourse Cohesion & Text Organization  [0/3 dikuasai • 3 unit materi]
└── ⚪ Applied Grammar & Sentence Mechanics    [0/3 dikuasai • 3 unit materi]
```

### 4.1 Reading Informational & Academic Texts — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 4.1.1: Main Idea, Topic Sentence, and Primary Purpose**  
  *Materi*: Locating thesis statement / topic sentences in expository, report, and analytical exposition texts (usually paragraph 1 or final concluding sentence), formulating the overall central theme, eliminating overly broad or narrow answer choices.  
  *Kunci Skor 100*: Check the first 2 sentences and the last sentence of each paragraph to construct the aggregate main idea.  
  *Prompt*: *"Explain the strategy to quickly determine the main idea and primary purpose of academic passages without reading every single word, including how to eliminate trick choices."*
- [ ] **Topik 4.1.2: Locating Explicit Information & Factual Details**  
  *Materi*: Scanning for proper nouns, numbers, dates, technical terms; answering "According to the passage, ...", True/False/Not Mentioned statements, paraphrasing verification.  
  *Kunci Skor 100*: Beware of the "Verbatim Trap" (options that copy exact words from the passage but distort the logical relationship or negate the statement).  
  *Prompt*: *"How to spot 'Verbatim Traps' in English reading comprehension tests where the answer choice uses words from the text but has an opposite meaning?"*
- [ ] **Topik 4.1.3: Drawing Logical Inferences & Implicit Conclusions**  
  *Materi*: Answering "It can be inferred that...", "The passage implies that..."; combining stated premises with contextual logic to deduce unstated facts; avoiding unwarranted extrapolation.  
  *Kunci Skor 100*: An inference must be 100% strictly supported by the text's clues — never rely on outside knowledge that contradicts or goes beyond the text.  
  *Prompt*: *"Teach me how to master 'Inference' questions in English proficiency exams: what distinguishes a valid inference from an overgeneralized assumption?"*

### 4.2 Reading Vocational & Everyday Texts — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 4.2.1: Technical Manuals, Procedures & Step-by-Step Instructions**  
  *Materi*: Sequential order connectors (*first, subsequently, prior to, finally*), imperative verb forms in user guides/troubleshooting steps, cause-and-effect in hardware/software manuals.  
  *Kunci Skor 100*: Pay close attention to conditional clauses (*"Unless the power light turns green, do not..."*) and precautionary warnings.  
  *Prompt*: *"Provide a guide on analyzing procedural and technical troubleshooting texts in English vocational assessments, focusing on sequencing and condition clauses."*
- [ ] **Topik 4.2.2: Business Letters, Formal Emails & Professional Inquiries**  
  *Materi*: Sender, recipient, formal salutations and sign-offs, purpose of communication (*"I am writing to inquire...", "We regret to inform you..."*), complaint handling, job application cover letters.  
  *Kunci Skor 100*: Identify the action required by the recipient at the end of the letter/email (*"Please RSVP by Friday"*).  
  *Prompt*: *"How to quickly extract key deliverables, deadlines, and intent from formal business correspondence and email threads in English exams?"*
- [ ] **Topik 4.2.3: Job Vacancies, Public Announcements & Visual Data**  
  *Materi*: Interpreting job qualification requirements (qualifications, experience, responsibilities), public notices, schedule tables, bar/pie charts paired with descriptive paragraphs.  
  *Kunci Skor 100*: Differentiate between mandatory requirements (*"must possess"*) and preferred qualifications (*"advantageous / preferred"*).  
  *Prompt*: *"Give strategies for reading English job ads, public announcements, and associated infographics with 100% accuracy."*

### 4.3 Vocabulary in Context & Lexical Nuance — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 4.3.1: Context Clues for Unfamiliar & Low-Frequency Words**  
  *Materi*: 4 Context clue types: (1) Definition/Restatement clues (*"or", "that is"*), (2) Synonym clues, (3) Contrast/Antonym clues (*"unlike", "whereas"*), (4) Example/Illustration clues (*"such as", "for instance"*).  
  *Kunci Skor 100*: Substitute the chosen answer choice back into the sentence to ensure both syntactic and semantic compatibility.  
  *Prompt*: *"Explain the 4 types of context clues in English reading passages and how to deduce the meaning of difficult technical terms without a dictionary."*
- [ ] **Topik 4.3.2: Word Families, Prefixes, Suffixes & Parts of Speech**  
  *Materi*: Roots, common prefixes (*un-, dis-, mis-, re-, pre-, post-, sub-, hyper-*), common noun/adjective/verb suffixes (*-tion, -ment, -able, -ive, -ize*), shifting word classes.  
  *Kunci Skor 100*: Master grammatical role prediction (e.g., after an article and before a noun, the missing slot MUST be an adjective).  
  *Prompt*: *"Provide a cheat sheet of high-frequency English prefixes and suffixes that change word class, along with examples from academic texts."*
- [ ] **Topik 4.3.3: High-Frequency Academic Vocabulary & Phrasal Verbs**  
  *Materi*: 3,000 Common Academic Word List (AWL) tokens (*indicate, significant, implement, subsequent, preliminary, comprehensive*), essential phrasal verbs in vocational/academic contexts (*carry out, point out, bring about, account for*).  
  *Kunci Skor 100*: Learn words in collocation pairs (e.g., *"conduct an experiment"*, *"account for the difference"*).  
  *Prompt*: *"List the top 50 academic vocabulary words and 25 phrasal verbs most commonly tested on Indonesian high school English standardized tests."*

### 4.4 Author's Purpose, Tone & Critical Stance — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 4.4.1: Identifying Author's Tone & Attitude**  
  *Materi*: Distinguishing tone categories: Objective / Neutral, Critical / Skeptical, Optimistic / Enthusiastic, Humorous / Sarcastic, Concerned / Urgent, Descriptive; identifying emotive and evaluative adjectives.  
  *Kunci Skor 100*: An objective scientific text has an *informative/neutral* tone; if the author uses words like *"surprisingly, unfortunately, questionable"*, the tone shifts to *critical/skeptical*.  
  *Prompt*: *"How to determine the author's tone (objective, cynical, cautious, optimistic) through word choice and rhetorical devices in English passages?"*
- [ ] **Topik 4.4.2: Determining Author's Purpose & Target Audience**  
  *Materi*: Verb infinitives denoting purpose: *to inform, to persuade, to criticize, to explain, to illustrate, to advocate, to entertain*; determining intended readership (general public, policymakers, students, engineers).  
  *Kunci Skor 100*: If the text presents both pros and cons evenly, the purpose is *to evaluate/inform*; if it advocates one side with persuasive arguments, it is *to persuade/convince*.  
  *Prompt*: *"Explain how to accurately choose between 'to inform', 'to persuade', 'to evaluate', and 'to criticize' as the author's primary intent."*
- [ ] **Topik 4.4.3: Fact vs Opinion & Detecting Subjective Bias**  
  *Materi*: Identifying statements of objective fact (empirical, measurable) vs opinion (value judgments, subjective assertions); recognizing emotional appeals and unsupported claims.  
  *Kunci Skor 100*: Sentences containing adjectives like *"the greatest", "unacceptable", "evidently"* indicate opinion rather than hard fact.  
  *Prompt*: *"How to differentiate factual statements from author bias and value judgments in analytical reading comprehension?"*

### 4.5 Discourse Cohesion & Text Organization — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 4.5.1: Discourse Markers & Transitional Linkers**  
  *Materi*: Contrast (*However, Nevertheless, In contrast, On the other hand, Whereas, Although*), Cause/Effect (*Therefore, Consequently, As a result, Due to, Owing to*), Addition (*Furthermore, Moreover, In addition*), Concession (*Despite, In spite of*).  
  *Kunci Skor 100*: Distinguish between conjunctions connecting clauses (*Although + Clause*) vs prepositions connecting nouns (*Despite + Noun Phrase*).  
  *Prompt*: *"Create a complete matrix of English transitional signals categorized by function (contrast, cause, addition, concession) with punctuation rules."*
- [ ] **Topik 4.5.2: Pronoun Reference & Demonstrative Substitution**  
  *Materi*: Identifying the exact referent of pronouns (*it, they, them, this, these, that, those, which, such*); resolving ambiguity when multiple candidate nouns exist in the prior sentence.  
  *Kunci Skor 100*: Match both singular/plural number and semantic agency (animate vs inanimate) with the preceding referent noun.  
  *Prompt*: *"Give a foolproof method to trace pronoun references ('it', 'they', 'the former', 'the latter') in dense multi-clause sentences."*
- [ ] **Topik 4.5.3: Paragraph Relationship & Sentence Insertion**  
  *Materi*: Relationship between paragraphs (e.g., paragraph 2 elaborates on an example introduced in paragraph 1, paragraph 3 offers an opposing viewpoint); inserting a sentence into the optimal location based on cohesion clues.  
  *Kunci Skor 100*: Look for bridging words (*"This phenomenon...", "Such measures..."*) to anchor sentence insertion questions.  
  *Prompt*: *"How to solve 'Which of the following best reflects the relationship between paragraph 1 and 2?' and sentence insertion questions efficiently."*

### 4.6 Applied Grammar & Sentence Mechanics — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 4.6.1: Tenses & Subject-Verb Agreement**  
  *Materi*: Simple Present/Past, Present/Past Perfect (*has/have/had + V3*), Future with *will* and *going to*; Subject-Verb agreement across intervening prepositional phrases (*"The collection of rare books WAS sold..."*), singular quantifiers (*every, each, neither*).  
  *Kunci Skor 100*: Ignore prepositional phrases between the subject and verb to correctly identify the real subject head noun!  
  *Prompt*: *"Summarize the 10 most common Subject-Verb Agreement traps in English exams, especially involving phrases like 'along with', 'as well as', and compound subjects."*
- [ ] **Topik 4.6.2: Passive Voice & Relative Clauses (Adjective Clauses)**  
  *Materi*: Active to passive transformation ($be + V3$ across all tenses), impersonal passive (*"It is believed that..."*); Defining vs non-defining relative clauses (*who, whom, which, whose, that, where*), reduced relative clauses (Active participle $-ing$ vs Passive participle $-ed$).  
  *Kunci Skor 100*: In reduced clauses, active verbs become $V\text{-ing}$ (*"The man sitting there"*), while passive verbs become $V3$ (*"The car repaired yesterday"*).  
  *Prompt*: *"Explain relative pronouns ('who' vs 'whom' vs 'whose') and how to master reduced relative clauses (participle clauses) in reading and grammar tests."*
- [ ] **Topik 4.6.3: Conditional Sentences & Modals**  
  *Materi*: Zero Conditional (General facts), Type 1 (Real future: *If + Present, Will + V1*), Type 2 (Unreal present: *If + Past Simple, Would + V1*), Type 3 (Unreal past regret: *If + Past Perfect, Would have + V3*); Modal verbs (*should, must, can, may, ought to, have to*), Modal perfect (*should have + V3, must have + V3*).  
  *Kunci Skor 100*: In Type 2 conditional, the verb *be* is always *were* (*"If I were you..."*); *must have + V3* means a logical certainty about the past.  
  *Prompt*: *"Provide a comprehensive table of Conditional Sentences Types 0, 1, 2, 3, and Mixed Conditionals, plus past modal deductions ('must have', 'should have')."*

---

## 💻 Bagian 5: Sertifikasi Kompetensi (BNSP) Junior Web Developer & LKS RPL Laravel
**Standar Kejuruan**: SKKNI No. 282 Tahun 2016 / No. 56 Tahun 2018 (Unit Kompetensi J.620100), Skema Okupasi Pengembang Web Pratama (Junior Web Developer), Modul LKS SMK Web Technologies (Modul Backend API & Frontend).  
**Target Nilai**: 100 / Medali Emas LKS & Status "Kompeten" Mutlak BNSP (Waktu pengerjaan CRUD & API auth $< 2.5$ jam, PSR-12 clean code, zero security vulnerabilities).

```
Daftar Topik Silabus — Serkom JWD BNSP & LKS RPL Laravel
├── ⚪ Standar Unit Kompetensi SKKNI BNSP     [0/3 dikuasai • 3 unit materi]
├── ⚪ Laravel Core, Routing & Request        [0/3 dikuasai • 3 unit materi]
├── ⚪ Database, Migrations & Eloquent ORM   [0/3 dikuasai • 3 unit materi]
├── ⚪ RESTful API & Sanctum Authentication  [0/3 dikuasai • 3 unit materi]
├── ⚪ Web Security Hardening (OWASP Top 10)  [0/3 dikuasai • 3 unit materi]
└── ⚪ Automated Testing, Git & Deployment    [0/3 dikuasai • 3 unit materi]
```

### 5.1 Standar Unit Kompetensi SKKNI BNSP — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 5.1.1: `J.620100.005.02` & `J.620100.010.01` — UI Implementation & Core Execution**  
  *Materi SKKNI*: Mengimplementasikan antarmuka web (HTML5 semantik, CSS3 Flexbox/Grid, Tailwind CSS, responsivitas mobile-first, Blade templating) dan mengeksekusi sintaks bahasa pemrograman modern (PHP 8.2+: types, match expression, nullsafe operator `?->`, array manipulation, handling text/media upload).  
  *Kriteria Asesor BNSP*: UI responsif tanpa overflow horizontal, form input memiliki validasi visual yang ramah pengguna, data tersaji dinamis dari controller.  
  *Prompt*: *"Bagaimana menyusun bukti portofolio dan demonstrasi live uji kompetensi untuk unit J.620100.005.02 (User Interface) dan J.620100.010.01 (Eksekusi Pemrograman) menggunakan Laravel dan Tailwind CSS?"*
- [ ] **Topik 5.1.2: `J.620100.015.01` & `J.620100.017.02` — Code Organization & Structured OOP**  
  *Materi SKKNI*: Menyusun struktur file dan direktori rapi sesuai arsitektur MVC (`app/Http/Controllers`, `app/Models`, `app/Http/Requests`, `resources/views`, `routes/web.php` dan `api.php`), menerapkan prinsip OOP terstruktur (Class, Encapsulation, Inheritance, Interface, Trait, Dependency Injection melalui Service Container Laravel).  
  *Kriteria Asesor BNSP*: Tidak ada kode SQL atau logika bisnis berat yang ditaruh di dalam file view/Blade; semua logika terisolasi di Controller/Service.  
  *Prompt*: *"Jelaskan implementasi Dependency Injection dan pemisahan arsitektur MVC yang bersih di Laravel 11 untuk memenuhi standar asesmen unit J.620100.015.01 dan J.620100.017.02."*
- [ ] **Topik 5.1.3: `J.620100.016.01` & `J.620100.019.02` — Best Practices & Pre-Existing Libraries**  
  *Materi SKKNI*: Menulis kode mematuhi standar PSR-12 (penamaan variabel camelCase, method camelCase, model PascalCase, tabel plural snake_case), Clean Code, prinsip DRY (*Don't Repeat Yourself*), mengintegrasikan pustaka siap pakai via Composer (Laravel Breeze, Sanctum, DomPDF untuk cetak laporan PDF, Spatie Permission untuk manajemen role).  
  *Kriteria Asesor BNSP*: Kode rapi ber-indentasi konsisten, bebas dari *hardcoded values* (menggunakan `.env`), pustaka eksternal terpasang resmi via `composer.json`.  
  *Prompt*: *"Buat checklist aturan koding PSR-12 dan rekomendasi package Composer wajib (DomPDF, Intervention Image, Spatie) untuk proyek uji kompetensi BNSP Junior Web Developer."*

### 5.2 Laravel Core, Routing & Request Handling — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 5.2.1: Routing Tingkat Lanjut & Resource Controllers**  
  *Materi*: Route definitions (`Route::get`, `post`, `put`, `patch`, `delete`), Resource Controllers (`Route::resource`), Route Model Binding implisit dan eksplisit, Route Grouping dengan prefix dan middleware, Named Routes (`route('posts.show', $post)`), penanganan 404 otomatis jika model tidak ditemukan.  
  *Kunci Skor 100 LKS*: Gunakan `Route::resource('posts', PostController::class)` dan Route Model Binding agar kode controller ringkas tanpa perlu manual `Post::findOrFail($id)`.  
  *Pemantik Ingatan*:
  ```php
  Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
      Route::resource('users', UserController::class);
  });
  ```
  *Prompt*: *"Berikan contoh konfigurasi Route Group, Named Routes, dan Route Model Binding di Laravel 11 yang bersih dan sesuai standar LKS Web Technologies."*
- [ ] **Topik 5.2.2: Form Request Validation & Error Handling**  
  *Materi*: Membuat custom Form Request (`php artisan make:request StorePostRequest`), menulis aturan validasi (`required, string, min, max, email, unique, exists, confirmed, image, mimes`), custom pesan error dalam bahasa Indonesia/Inggris, sanitasi data input, penanganan redirect kembali dengan pesan *flash session* (`with('success', 'Data berhasil disimpan')`).  
  *Kunci Skor 100 LKS*: Pisahkan semua validasi dari controller ke file Form Request tersendiri. Controller hanya menerima `$request->validated()`.  
  *Pemantik Ingatan*:
  ```php
  public function rules(): array {
      return [
          'title' => 'required|string|max:255|unique:posts,title',
          'category_id' => 'required|exists:categories,id',
          'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
      ];
  }
  ```
  *Prompt*: *"Tunjukkan cara membuat Custom Form Request di Laravel dengan aturan validasi kompleks (unique on update, conditional validation) dan kustomisasi pesan error."*
- [ ] **Topik 5.2.3: Middleware, Pipeline & State Management**  
  *Materi*: Peran middleware dalam siklus HTTP Request, default middleware Laravel, membuat custom middleware (`php artisan make:middleware EnsureUserIsAdmin`), memverifikasi hak akses pengguna, CORS handling, rate limiting (Throttle request), flash session data.  
  *Kunci Skor 100 LKS*: Terapkan middleware untuk membatasi akses URL admin sehingga pengguna biasa langsung di-redirect atau mendapat 403 Forbidden.  
  *Prompt*: *"Bagaimana cara membuat custom middleware proteksi role di Laravel 11 (bootstrap/app.php modern style) dan mendaftarkannya ke rute tertentu?"*

### 5.3 Database, Migrations & Eloquent ORM — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 5.3.1: Database Migrations, Blueprints & Schema Design**  
  *Materi*: Skema relasi database (1:1, 1:N, N:M), tipe kolom (`bigIncrements, string, text, integer, decimal, boolean, json, timestamps`), foreign key constraints (`constrained()->onDelete('cascade')`), indexing kolom pencarian, `softDeletes()`, rollback dan fresh migrations (`php artisan migrate:fresh --seed`).  
  *Kunci Skor 100 LKS*: Selalu gunakan `foreignId('user_id')->constrained()->cascadeOnDelete()` agar integritas referensial database terjaga otomatis.  
  *Pemantik Ingatan*:
  ```php
  Schema::create('posts', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->string('title');
      $table->string('slug')->unique();
      $table->text('body');
      $table->softDeletes();
      $table->timestamps();
  });
  ```
  *Prompt*: *"Jelaskan best practices penulisan migration di Laravel: penggunaan cascading delete, indexing untuk performa, dan implementasi soft delete."*
- [ ] **Topik 5.3.2: Eloquent Relationships & Query Optimization**  
  *Materi*: Relasi Eloquent: `hasOne`, `belongsTo`, `hasMany`, `belongsToMany` (pivot table), `hasManyThrough`; Eager Loading (`with(['author', 'comments'])`) untuk mematikan N+1 Query Problem; Query Scopes lokal (`scopeActive($query)`); Aggregate functions (`withCount('likes')`).  
  *Kunci Skor 100 LKS*: Juri LKS memeriksa query log! Penggunaan lazy loading dalam perulangan (`@foreach`) yang memicu N+1 query akan langsung mengurangi skor performa.  
  *Pemantik Ingatan*:
  ```php
  // Eager loading mencegah N+1
  $posts = Post::with(['category', 'author'])->latest()->paginate(10);
  ```
  *Prompt*: *"Apa itu N+1 Query Problem di Laravel Eloquent? Berikan contoh kode yang buruk dan cara memperbaikinya dengan Eager Loading (`with`) serta `withCount`."*
- [ ] **Topik 5.3.3: Model Factories & Database Seeding**  
  *Materi*: Database Seeder (`DatabaseSeeder.php`), Model Factories dengan pustaka Faker (`fake()->name()`, `fake()->unique()->safeEmail()`, `fake()->paragraph()`), membuat data testing awal (Akun Admin, Akun Petugas, Akun Siswa/User, 50 dummy records data transaksi).  
  *Kunci Skor 100 LKS*: Buat seeder yang langsung siap pakai dengan 1 perintah `php artisan migrate:fresh --seed` sehingga sistem langsung terisi user login dan dummy data tanpa perlu input manual saat dinilai asesor.  
  *Prompt*: *"Tuliskan contoh DatabaseSeeder dan Factory lengkap untuk aplikasi toko online/blog di Laravel yang langsung meng-generate akun Admin dan 20 data berelasi."*

### 5.4 RESTful API & Sanctum Authentication — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 5.4.1: Eloquent API Resources & Standard JSON Formatting**  
  *Materi*: Membuat API Resource (`php artisan make:resource PostResource`), Resource Collections, menyusun format respon JSON standar industri:
  ```json
  {
    "status": "success",
    "message": "Data retrieved successfully",
    "data": { ... }
  }
  ```
  Penanganan paginasi API (`PostResource::collection($posts)`), transformasi format tanggal dan URL gambar asset.  
  *Kunci Skor 100 LKS*: Format respon API harus konsisten di setiap endpoint (sukses maupun error) agar frontend developer mudah mengonsumsinya.  
  *Prompt*: *"Bagaimana cara membuat JsonResource di Laravel untuk memformat payload API secara konsisten dan menyembunyikan kolom sensitif seperti password/remember_token?"*
- [ ] **Topik 5.4.2: Autentikasi API via Laravel Sanctum**  
  *Materi*: Instalasi Laravel Sanctum, trait `HasApiTokens` pada model User, Endpoint Register (validasi, hashing password, issue token), Endpoint Login (verifikasi `Auth::attempt` atau `Hash::check`, generate Bearer Token via `$user->createToken('auth_token')->plainTextToken`), Endpoint Logout (revoke token via `$request->user()->currentAccessToken()->delete()`), proteksi rute via middleware `auth:sanctum`.  
  *Kunci Skor 100 LKS*: Kuasai alur pengerjaan autentikasi Sanctum ini secara reflek di bawah 15 menit!  
  *Pemantik Ingatan*:
  ```php
  // Login Endpoint
  $user = User::where('email', $request->email)->first();
  if (!$user || !Hash::check($request->password, $user->password)) {
      return response()->json(['message' => 'Invalid credentials'], 401);
  }
  $token = $user->createToken('api_token')->plainTextToken;
  return response()->json(['token' => $token, 'user' => $user], 200);
  ```
  *Prompt*: *"Buat tutorial kode lengkap AuthController (Register, Login, Logout) untuk RESTful API Laravel menggunakan Laravel Sanctum beserta penjelasan status code HTTP."*
- [ ] **Topik 5.4.3: HTTP Status Codes, Error Handling & File Uploads**  
  *Materi*: Kode status HTTP standar: 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 422 (Unprocessable Entity - validation failure), 500 (Internal Server Error); Multipart Form-Data upload gambar via API, penyimpanan di `Storage::disk('public')`, symlink `php artisan storage:link`, URL asset generator.  
  *Kunci Skor 100 LKS*: Bila validasi gagal, kirim status code 422 dengan rincian array error; jangan pernah mengembalikan status 200 jika request gagal!  
  *Prompt*: *"Jelaskan panduan penggunaan HTTP Status Codes yang tepat pada REST API Laravel dan cara menangani file upload avatar dengan validasi dimensi serta ukuran."*

### 5.5 Web Security Hardening (OWASP Top 10) — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 5.5.1: Proteksi CSRF, XSS, dan SQL Injection**  
  *Materi*: Cross-Site Request Forgery (CSRF) via directive `@csrf` pada setiap form Blade, Cross-Site Scripting (XSS) prevention via kurung kurawal ganda `{{ $data }}` (auto-escaping `htmlspecialchars`), bahaya `{!! $data !!}`, SQL Injection prevention via PDO Parameterized Queries di Eloquent/Query Builder (menghindari raw query tanpa parameter binding: `whereRaw('id = ?', [$id])`).  
  *Kunci Skor 100 LKS*: Juri kompetisi akan melakukan uji penetrasi sederhana (mengirim payload `<script>alert('XSS')</script>` atau `' OR '1'='1`). Sistem harus 100% kebal.  
  *Prompt*: *"Bagaimana Laravel secara bawaan menangani CSRF, XSS, dan SQL Injection? Tunjukkan kelemahan yang masih bisa muncul jika developer ceroboh (misal: raw query, blade unescaped)."*
- [ ] **Topik 5.5.2: Autentikasi Password & Proteksi Mass Assignment**  
  *Materi*: Hashing password menggunakan algoritma Bcrypt / Argon2id (`Hash::make($password)`), proteksi properti `$fillable` vs `$guarded` pada Eloquent Model untuk mencegah Mass Assignment vulnerability, verifikasi password lama saat ganti password, rate limiting pada form login untuk mencegah brute force attack.  
  *Kunci Skor 100 BNSP*: Jangan pernah gunakan `$guarded = []` di aplikasi produksi; selalu deklarasikan atribut yang diizinkan secara eksplisit pada array `$fillable`.  
  *Prompt*: *"Jelaskan bahaya celah keamanan Mass Assignment pada Laravel Model dan mengapa atribut $fillable wajib didefinisikan dengan teliti."*
- [ ] **Topik 5.5.3: Otorisasi Pengguna (Gates, Policies & RBAC)**  
  *Materi*: Perbedaan Autentikasi (siapa kamu) vs Otorisasi (apa yang boleh kamu lakukan), mendefinisikan Gate (`Gate::define('update-post', ...)`), membuat Policy (`php artisan make:policy PostPolicy --model=Post`), memanfaatkan method `authorize()` pada controller, integrasi direktif Blade `@can('update', $post)`.  
  *Kunci Skor 100 LKS*: Pastikan user A tidak bisa mengedit atau menghapus postingan milik user B meskipun user A mengetahui ID postingannya via URL.  
  *Pemantik Ingatan*:
  ```php
  // Policy Method
  public function update(User $user, Post $post): bool {
      return $user->id === $post->user_id;
  }
  // In Controller:
  $this->authorize('update', $post);
  ```
  *Prompt*: *"Tunjukkan cara mengimplementasikan Laravel Policies untuk melindungi operasi Update dan Delete data agar hanya pemilik data asli yang bisa mengaksesnya."*

### 5.6 Automated Testing, Git & Deployment Kompetisi — `0/3 dikuasai • 3 unit materi`
- [ ] **Topik 5.6.1: Automated Testing Dasar (Feature & Unit Tests)**  
  *Materi*: Pengenalan PHPUnit / Pest di Laravel, membuat Feature Test (`php artisan make:test PostApiTest`), menguji status code HTTP endpoint (`$response->assertStatus(200)`), menguji struktur JSON response (`assertJsonStructure`), menguji keberadaan data di database (`assertDatabaseHas('posts', [...])`), refresh database in-memory (`use RefreshDatabase`).  
  *Kunci Skor 100 LKS*: Memiliki automated test yang lulus hijau 100% memberikan poin keunggulan mutlak di mata juri LKS Nasional.  
  *Pemantik Ingatan*:
  ```php
  public function test_can_create_post(): void {
      $user = User::factory()->create();
      $response = $this->actingAs($user)->postJson('/api/posts', [
          'title' => 'Judul Uji',
          'body' => 'Konten uji coba aplikasi'
      ]);
      $response->assertStatus(201)->assertJson(['status' => 'success']);
      $this->assertDatabaseHas('posts', ['title' => 'Judul Uji']);
  }
  ```
  *Prompt*: *"Ajarkan cara menulis Feature Test sederhana di Laravel untuk menguji endpoint CRUD API (GET, POST, PUT, DELETE) menggunakan PHPUnit dan RefreshDatabase."*
- [ ] **Topik 5.6.2: Git Version Control & Standar Commit Kompetisi**  
  *Materi*: Inisialisasi repo Git, konfigurasi `.gitignore` untuk Laravel (mengabaikan folder `vendor/`, `node_modules/`, file `.env`), konvensi pesan commit standar industri (Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`), membuat branch fitur (`git checkout -b feature/auth`), menyelesaikan merge conflict sederhana.  
  *Kunci Skor 100 BNSP*: Menunjukkan riwayat commit Git yang runut dan bermakna membuktikan bahwa kode dibuat secara terstruktur oleh Anda sendiri.  
  *Prompt*: *"Berikan panduan Conventional Commits untuk proyek Laravel dan konfigurasi .gitignore standar agar file sensitif seperti .env tidak bocor ke Git repository."*
- [ ] **Topik 5.6.3: Optimasi Produksi & Persiapan Uji Kompetensi Asesor**  
  *Materi*: Perintah optimasi Laravel (`php artisan config:cache`, `php artisan route:cache`, `php artisan view:cache`), setting `APP_DEBUG=false` dan `APP_ENV=production`, setup Virtual Host di XAMPP/Apache/Nginx, pembuatan dokumentasi API (Postman Collection Export / Swagger OpenAPI), persiapan checklist asesmen mandiri (FR-APL.02 BNSP).  
  *Kunci Skor 100 BNSP*: Ekspor koleksi Postman lengkap dengan contoh *request body* dan *environment variables* sehingga asesor dapat langsung menguji seluruh endpoint dalam 5 menit.  
  *Prompt*: *"Bagaimana mempersiapkan berkas uji kompetensi BNSP Junior Web Developer: cara export Postman Collection lengkap dengan token Bearer otomatis dan optimasi server lokal."*

---

## 📅 Roadmap 6 Bulan Menuju Skor 100 & Medali

```
[Bulan 1 - 2] Fondasi Teori & Standar Ujian
  ├── Kuasai Teori Bilangan & Aljabar Dasar OSN (Vieta, AM-GM, Modulo)
  ├── Review Menyeluruh Kaidah EYD V & TKA Matematika (SPL, Matriks, Fungsi)
  └── Praktik Mandiri CRUD Dasar Laravel 11 + Autentikasi Breeze/Sanctum

[Bulan 3 - 4] Pemantapan HOTS & Pemrograman Arsitektural
  ├── Geometri Tingkat Lanjut (Power of a Point, Ceva/Menelaus) & Kombinatorika (PHP, Invarian)
  ├── Bedah Teks Panjang TKA Bahasa Indonesia & Bahasa Inggris (Reading Comprehension)
  └── Implementasi RESTful API Berstandar LKS + Middleware Otorisasi & Unit Testing

[Bulan 5] Simulasi Ujian Berbatas Waktu & Speed Drills
  ├── Tryout Mandiri TKA Wajib (Target: 50 soal dalam 60 menit, akurasi 100%)
  ├── Speed Run Live Coding Laravel: Aplikasi Full Stack selesai dalam < 120 menit
  └── Analisis Error Log: Catat setiap kesalahan kecil ke dalam jurnal belajar

[Bulan 6] Final Polish & Uji Asesmen
  ├── Simulasi Uji Kompetensi Asesor BNSP (Simulasi Wawancara Portofolio + Praktik)
  ├── Pengerjaan Paket Soal OSN-P Tahun Sebelumnya dengan Pembuktian Formal
  └── Hari-H: Eksekusi dengan tenang, presisi tinggi, dan zero-drift!
```

---

## 🔗 Referensi & Tautan Penting
- **Pusmendik Kemendikdasmen**: Kerangka Asesmen Tes Kemampuan Akademik (TKA) Wajib SMA/SMK.
- **Puspresnas (Pusat Prestasi Nasional)**: Panduan Teknis Olimpiade Sains Nasional (OSN) Matematika Jenjang SMA/MA.
- **BNSP & SKKNI**: Standar Kompetensi Kerja Nasional Indonesia Kategori Informasi dan Komunikasi Golongan Pokok Pemrograman Web (Junior Web Developer).
- **Laravel Documentation**: Official Laravel 11 Documentation ([laravel.com/docs](https://laravel.com/docs)).
- **Related Vault Notes**: [[01 - Projects]], [[02 - AI & Workflows]], [[Rencana Obsidian Vault Bari]]
