# -*- coding: utf-8 -*-
"""
Practice Question Bank: TKA Wajib Bahasa Indonesia (Standar Pusmendik & PUEBI/EYD V)
6 Subcategories:
- Keterampilan Membaca Teks Informasi (20 questions)
- Refleksi & Evaluasi Kritis Wacana (20 questions)
- Keterampilan Membaca Teks Sastra (20 questions)
- Tata Kalimat & Kaidah Kalimat Efektif (20 questions)
- Pedoman Ejaan Bahasa Indonesia EYD V (20 questions)
- Keterpaduan Paragraf & Wacana (20 questions)
Total: 120 Questions with Detailed Solutions
"""

BAHASA_INDONESIA_DATA = {
    "subject_id": "bahasa_indonesia",
    "subject_name": "TKA Wajib: Bahasa Indonesia",
    "icon": "📝",
    "color": "#D9943B",
    "subcategories": [
        {
            "id": "teks_informasi",
            "title": "Keterampilan Membaca Teks Informasi",
            "description": "Menemukan Informasi Tersurat 5W+1H, Gagasan Utama Paragraf Deduktif/Induktif, Analisis Data Tabel/Grafik",
            "questions": [
                {
                    "num": 1,
                    "topic": "Ide Pokok Paragraf Deduktif",
                    "question": "Bacalah paragraf berikut!\n'Kecerdasan buatan (AI) telah membawa transformasi signifikan dalam sistem diagnostik medis modern. Melalui algoritma pembelajaran mendalam, sistem komputer kini mampu mendeteksi anomali pada citra rontgen dan MRI dengan tingkat akurasi yang melampaui rata-rata tenaga medis pemula. Selain itu, integrasi data rekam medis pasien mempercepat perumusan rencana terapi yang terpersonalisasi.'\n\nGagasan utama paragraf tersebut adalah...",
                    "options": {
                        "A": "Algoritma pembelajaran mendalam pada citra rontgen",
                        "B": "Transformasi signifikan kecerdasan buatan dalam diagnostik medis",
                        "C": "Keunggulan akurasi komputer atas tenaga medis pemula",
                        "D": "Perumusan rencana terapi yang terpersonalisasi",
                        "E": "Integrasi data rekam medis pasien di rumah sakit"
                    },
                    "answer": "B",
                    "solution": "Paragraf bersifat deduktif dengan kalimat utama terletak di awal kalimat: 'Kecerdasan buatan (AI) telah membawa transformasi signifikan dalam sistem diagnostik medis modern.' Kalimat berikutnya berfungsi sebagai penjelas pendukung."
                },
                {
                    "num": 2,
                    "topic": "Informasi Tersurat 5W+1H",
                    "question": "Bacalah kembali paragraf berikut!\n'Kecerdasan buatan (AI) telah membawa transformasi signifikan dalam sistem diagnostik medis modern. Melalui algoritma pembelajaran mendalam, sistem komputer kini mampu mendeteksi anomali pada citra rontgen dan MRI dengan tingkat akurasi yang melampaui rata-rata tenaga medis pemula. Selain itu, integrasi data rekam medis pasien mempercepat perumusan rencana terapi yang terpersonalisasi.'\n\nBerdasarkan kutipan teks tersebut, bagaimana kecerdasan buatan membantu mempercepat perumusan rencana terapi pasien?",
                    "options": {
                        "A": "Dengan menggantikan peran dokter spesialis sepenuhnya",
                        "B": "Melalui integrasi data rekam medis pasien secara sistematis",
                        "C": "Dengan menurunkan biaya operasional rumah sakit",
                        "D": "Melalui pemotongan prosedur administrasi rujukan",
                        "E": "Dengan melakukan pemindaian otomatis tanpa izin dokter"
                    },
                    "answer": "B",
                    "solution": "Informasi tersurat tertulis eksplisit di kalimat terakhir: 'Selain itu, integrasi data rekam medis pasien mempercepat perumusan rencana terapi yang terpersonalisasi.'"
                },
                {
                    "num": 3,
                    "topic": "Makna Istilah Teknis",
                    "question": "Perhatikan kutipan teks berikut!\n'Kecerdasan buatan (AI) telah membawa transformasi signifikan dalam sistem diagnostik medis modern. Melalui algoritma pembelajaran mendalam, sistem komputer kini mampu mendeteksi anomali pada citra rontgen dan MRI dengan tingkat akurasi yang melampaui rata-rata tenaga medis pemula. Selain itu, integrasi data rekam medis pasien mempercepat perumusan rencana terapi yang terpersonalisasi.'\n\nMakna istilah 'terpersonalisasi' pada kutipan teks di atas adalah...",
                    "options": {
                        "A": "Dibuat secara massal untuk semua orang",
                        "B": "Disesuaikan secara khusus dengan kondisi individu tertentu",
                        "C": "Dirahasiakan dari publik dan pihak luar",
                        "D": "Dikelola oleh tenaga pribadi secara mandiri",
                        "E": "Dibatasi hanya untuk kalangan terbatas"
                    },
                    "answer": "B",
                    "solution": "Terpersonalisasi berarti disesuaikan dengan kebutuhan, karakteristik, atau data spesifik dari masing-masing individu (personal)."
                },
                {
                    "num": 4,
                    "topic": "Simpulan Paragraf Induktif",
                    "question": "Bacalah teks berikut!\n'Laju emisi karbon global terus meningkat hingga menembus rekor baru tahun ini. Pola cuaca ekstrem seperti gelombang panas berkepanjangan dan banjir bandang kini melanda kawasan yang sebelumnya beriklim stabil. Kerusakan ekosistem terumbu karang tropis pun semakin masif. Jelaslah bahwa krisis iklim bukan lagi ancaman masa depan, melainkan darurat nyata yang tengah kita hadapi saat ini.'\n\nSimpulan paragraf tersebut adalah...",
                    "options": {
                        "A": "Emisi karbon global harus ditekan oleh negara industri",
                        "B": "Gelombang panas hanya terjadi di wilayah beriklim stabil",
                        "C": "Krisis iklim merupakan darurat nyata yang sedang terjadi saat ini",
                        "D": "Terumbu karang tropis tidak mampu bertahan dari banjir bandang",
                        "E": "Pola cuaca ekstrem dapat diprediksi secara tepat oleh ilmuwan"
                    },
                    "answer": "C",
                    "solution": "Paragraf berpola induktif (khusus ke umum) yang ditandai konjungsi penegas kesimpulan pada kalimat akhir: 'Jelaslah bahwa krisis iklim bukan lagi ancaman masa depan, melainkan darurat nyata yang tengah kita hadapi saat ini.'"
                },
                {
                    "num": 5,
                    "topic": "Analisis Tabel Data",
                    "question": "Tabel Persentase Pengguna Internet Berdasarkan Usia (2025):\n- 12 - 18 tahun: 92%\n- 19 - 34 tahun: 98%\n- 35 - 54 tahun: 84%\n- 55 tahun ke atas: 51%\n\nPernyataan yang PALING SESUAI dengan data tabel tersebut adalah...",
                    "options": {
                        "A": "Kelompok usia 12-18 tahun memiliki jumlah pengguna terendah",
                        "B": "Kelompok usia 19-34 tahun merupakan kelompok dengan penetrasi internet tertinggi",
                        "C": "Lebih dari separuh kelompok usia lansia tidak menggunakan internet",
                        "D": "Pengguna usia 35-54 tahun mengalami penurunan dibanding tahun sebelumnya",
                        "E": "Kelompok usia 12-18 tahun memiliki penetrasi lebih tinggi dari 19-34 tahun"
                    },
                    "answer": "B",
                    "solution": "Angka tertinggi pada tabel adalah 98% yang dimiliki oleh kelompok usia 19-34 tahun. Opsi C salah karena 51% (lebih dari separuh) justru MENGGUNAKAN internet."
                },
                {
                    "num": 6,
                    "topic": "Pertanyaan Sesuai Isi Teks",
                    "question": "Bacalah kembali paragraf berikut!\n'Kecerdasan buatan (AI) telah membawa transformasi signifikan dalam sistem diagnostik medis modern. Melalui algoritma pembelajaran mendalam, sistem komputer kini mampu mendeteksi anomali pada citra rontgen dan MRI dengan tingkat akurasi yang melampaui rata-rata tenaga medis pemula. Selain itu, integrasi data rekam medis pasien mempercepat perumusan rencana terapi yang terpersonalisasi.'\n\nKalimat tanya yang jawabannya TIDAK terdapat dalam paragraf tersebut adalah...",
                    "options": {
                        "A": "Bidang apa yang mengalami transformasi akibat kecerdasan buatan?",
                        "B": "Bagaimana AI mampu mendeteksi anomali pada citra rontgen?",
                        "C": "Siapa penemu pertama teknologi pembelajaran mendalam di bidang medis?",
                        "D": "Apa keunggulan akurasi deteksi AI dibanding tenaga medis pemula?",
                        "E": "Apa manfaat integrasi data rekam medis pasien?"
                    },
                    "answer": "C",
                    "solution": "Nama penemu pertama teknologi AI tidak pernah disebutkan dalam teks."
                },
                {
                    "num": 7,
                    "topic": "Gagasan Penjelas",
                    "question": "Pada sebuah paragraf tentang 'Manfaat Olahraga Kardio bagi Kesehatan Jantung', kalimat penjelas yang TIDAK padu adalah...",
                    "options": {
                        "A": "Olahraga lari pagi membantu melancarkan sirkulasi pembuluh darah",
                        "B": "Detak jantung menjadi lebih efisien dalam memompa darah ke seluruh tubuh",
                        "C": "Harga sepatu lari bermerek mengalami kenaikan signifikan di pusat perbelanjaan",
                        "D": "Aktivitas bersepeda rutin menurunkan risiko penyumbatan arteri",
                        "E": "Senam aerobik membantu menurunkan kadar kolesterol jahat (LDL)"
                    },
                    "answer": "C",
                    "solution": "Kalimat C membahas harga sepatu lari di toko (komersial), melenceng dari fokus manfaat kesehatan kardio bagi jantung."
                },
                {
                    "num": 8,
                    "topic": "Hubungan Sebab-Akibat Teks",
                    "question": "'Kurangnya asupan air putih menyebabkan penurunan konsentrasi belajar siswa di kelas.' Hubungan sebab-akibat kalimat tersebut dapat dibalik secara logis menjadi...",
                    "options": {
                        "A": "Siswa yang haus pasti tidak bisa menjawab ujian",
                        "B": "Penurunan konsentrasi belajar siswa di kelas diakibatkan oleh kurangnya asupan air putih",
                        "C": "Air putih hanya dibutuhkan saat siswa merasa lelah",
                        "D": "Konsentrasi belajar siswa selalu bergantung pada cuaca ruang kelas",
                        "E": "Asupan air putih berlebih membuat siswa mengantuk"
                    },
                    "answer": "B",
                    "solution": "Pola sebab -> akibat diubah menjadi akibat diakibatkan oleh sebab tanpa mengubah substansi informasi."
                },
                {
                    "num": 9,
                    "topic": "Tujuan Penulisan Teks Eksposisi",
                    "question": "Tujuan utama penulis menyajikan teks yang memuat data statistik kecelakaan lalu lintas beserta grafik pelanggaran helm adalah...",
                    "options": {
                        "A": "Menghibur pembaca dengan cerita pengalaman pengendara",
                        "B": "Memberikan informasi faktual dan meningkatkan kesadaran keselamatan berkendara",
                        "C": "Mempromosikan merek helm tertentu kepada masyarakat",
                        "D": "Mengkritik pihak kepolisian secara terbuka",
                        "E": "Menakut-nakuti pengendara sepeda motor di jalan raya"
                    },
                    "answer": "B",
                    "solution": "Teks eksposisi berbasis data statistik bertujuan mengedukasi, menginformasikan fakta objektif, dan membangun kesadaran pembaca."
                },
                {
                    "num": 10,
                    "topic": "Kalimat Fakta",
                    "question": "Di antara kalimat berikut, yang merupakan KALIMAT FAKTA adalah...",
                    "options": {
                        "A": "Pemandangan matahari terbit di Pantai Kuta sangat menakjubkan",
                        "B": "Badan Pusat Statistik mencatat inflasi Indonesia pada tahun 2024 sebesar 2,57 persen",
                        "C": "Masakan Padang adalah kuliner paling lezat di seluruh dunia",
                        "D": "Ujian nasional sebaiknya dihapuskan demi kenyamanan mental siswa",
                        "E": "Cuaca mendung hari ini tampaknya akan menimbulkan hujan deras"
                    },
                    "answer": "B",
                    "solution": "Kalimat B memuat lembaga pencatat resmi, waktu tertentu (2024), dan angka persentase terverifikasi (2,57%). Kalimat lainnya memuat opini subjektif (*sangat menakjubkan, paling lezat, sebaiknya, tampaknya*)."
                },
                {
                    "num": 11,
                    "topic": "Kalimat Opini",
                    "question": "Di antara kalimat berikut, manakah yang mengandung OPINI?",
                    "options": {
                        "A": "Monumen Nasional terletak di Jakarta Pusat",
                        "B": "Air mendidih pada suhu 100 derajat Celsius pada tekanan 1 atmosfer",
                        "C": "Sistem transportasi massal kereta cepat terasa jauh lebih nyaman dibandingkan moda lainnya",
                        "D": "Indonesia memproklamasikan kemerdekaan pada tanggal 17 Agustus 1945",
                        "E": "Bumi mengelilingi matahari dalam waktu sekitar 365 seperempat hari"
                    },
                    "answer": "C",
                    "solution": "Kata 'terasa jauh lebih nyaman' merupakan penilaian rasa subjektif (opini)."
                },
                {
                    "num": 12,
                    "topic": "Menentukan Topik Bacaan",
                    "question": "Sebuah wacana membahas teknik penanaman hidroponik, jenis nutrisi AB mix, efisiensi penggunaan lahan sempit di perkotaan, dan hasil panen sayuran organik. Topik yang paling tepat untuk wacana tersebut adalah...",
                    "options": {
                        "A": "Pemberantasan hama tanaman",
                        "B": "Budidaya tanaman sayuran dengan sistem hidroponik di perkotaan",
                        "C": "Harga sayuran organik di pasar tradisional",
                        "D": "Pemanfaatan pupuk kimia dalam pertanian modern",
                        "E": "Krisis pangan global di masa depan"
                    },
                    "answer": "B",
                    "solution": "Topik mencakup keseluruhan unsur: sistem hidroponik, nutrisi, lahan sempit perkotaan, dan sayuran."
                },
                {
                    "num": 13,
                    "topic": "Menemukan Makna Tersirat",
                    "question": "'Pabrik semen itu akhirnya menghentikan operasionalnya setelah warga sekitar mengajukan gugatan polusi udara dan hasil uji laboratorium menunjukkan kadar partikulat melampaui batas ambang aman.' Makna tersirat dari kalimat tersebut adalah...",
                    "options": {
                        "A": "Warga menolak kehadiran industri semen sejak awal pembangunan",
                        "B": "Aktivitas pabrik semen tersebut terbukti membahayakan kesehatan lingkungan warga sekitar",
                        "C": "Uji laboratorium sengaja direkayasa untuk merugikan pabrik",
                        "D": "Pabrik semen mengalami kebangkrutan finansial",
                        "E": "Pemerintah tidak peduli terhadap keluhan masyarakat"
                    },
                    "answer": "B",
                    "solution": "Tersirat dari gugatan warga yang diperkuat bukti ilmiah partikulat di atas ambang batas, menunjukkan operasi pabrik berbahaya bagi kesehatan lingkungan."
                },
                {
                    "num": 14,
                    "topic": "Perbedaan Dua Teks Informasi",
                    "question": "Teks 1 membahas dampak deforestasi terhadap punahnya habitat orangutan di Kalimantan. Teks 2 membahas upaya konservasi penanaman 10.000 bibit pohon di kawasan lindung Kalimantan. Perbedaan fokus kedua teks adalah...",
                    "options": {
                        "A": "Teks 1 fokus pada penyebab bencana; Teks 2 fokus pada dampak ekonomi",
                        "B": "Teks 1 mengulas ancaman kelestarian satwa; Teks 2 mengulas solusi pemulihan habitat",
                        "C": "Teks 1 menolak reboisasi; Teks 2 menolak industri sawit",
                        "D": "Teks 1 bersifat fiktif; Teks 2 bersifat faktual",
                        "E": "Teks 1 ditulis oleh peneliti; Teks 2 ditulis oleh penebang hutan"
                    },
                    "answer": "B",
                    "solution": "Teks 1 menyoroti masalah/ancaman kepunahan, sedangkan Teks 2 berfokus pada aksi restorasi/solusi konservasi."
                },
                {
                    "num": 15,
                    "topic": "Paragraf Ineratif",
                    "question": "Paragraf yang kalimat utamanya terletak di TENGAH-TENGAH paragraf diapit oleh kalimat penjelas disebut paragraf...",
                    "options": {"A": "Deduktif", "B": "Induktif", "C": "Campuran", "D": "Ineratif", "E": "Deskriptif"},
                    "answer": "D",
                    "solution": "Paragraf ineratif memiliki kalimat utama di bagian tengah, diawali kalimat penjelas dan diakhiri kalimat penjelas lanjutan."
                },
                {
                    "num": 16,
                    "topic": "Rangkuman Teks",
                    "question": "Rangkuman yang baik dari sebuah teks panjang harus memenuhi kriteria...",
                    "options": {
                        "A": "Memasukkan pendapat pribadi pembaca sebanyak mungkin",
                        "B": "Mengutip seluruh kalimat pertama dari setiap paragraf tanpa diubah",
                        "C": "Memuat ide-ide pokok seluruh paragraf secara ringkas, akurat, dan runtut",
                        "D": "Menghilangkan data angka karena dianggap tidak penting",
                        "E": "Lebih panjang dari teks aslinya agar lebih jelas"
                    },
                    "answer": "C",
                    "solution": "Rangkuman merangkum gagasan-gagasan pokok seluruh wacana dengan bahasa ringkas tanpa distorsi makna."
                },
                {
                    "num": 17,
                    "topic": "Prediksi Kejadian Berdasarkan Teks",
                    "question": "'Curah hujan di hulu sungai terpantau sangat tinggi selama 3 hari berturut-turut, sementara pintu air hilir mengalami pendangkalan parah akibat tumpukan sampah.' Kemungkinan yang paling logis terjadi adalah...",
                    "options": {
                        "A": "Air sungai mengalir lebih deras ke laut tanpa hambatan",
                        "B": "Kawasan pemukiman di sekitar hilir sungai berisiko tinggi terendam banjir",
                        "C": "Harga air bersih di hulu sungai melonjak drastis",
                        "D": "Warga di hilir sungai beralih profesi menjadi nelayan",
                        "E": "Tumpukan sampah akan hanyut dengan sendirinya ke waduk"
                    },
                    "answer": "B",
                    "solution": "Debit air tinggi dari hulu ditambah sumbatan pendangkalan di hilir secara logis memicu luapan air/banjir ke pemukiman."
                },
                {
                    "num": 18,
                    "topic": "Identifikasi Fakta Numerik",
                    "question": "Pernyataan numerik yang benar berdasarkan teks berita 'Sebanyak 120 dari 150 peserta dinyatakan lulus sertifikasi' adalah...",
                    "options": {
                        "A": "Tingkat kelulusan peserta mencapai 75%",
                        "B": "Tingkat kelulusan peserta mencapai 80%",
                        "C": "Sebanyak 40 peserta dinyatakan tidak lulus",
                        "D": "Semua peserta mendapatkan sertifikat kompetensi",
                        "E": "Hanya 50 peserta yang mengikuti ujian"
                    },
                    "answer": "B",
                    "solution": "120 / 150 = 4 / 5 = 80%. Maka persentase kelulusan tepat 80%."
                },
                {
                    "num": 19,
                    "topic": "Menentukan Kata Rujukan",
                    "question": "'Pemerintah meluncurkan program beasiswa talenta digital. *Program ini* diharapkan mampu mencetak jutaan tenaga IT terampil.' Kata '*Program ini*' merujuk pada...",
                    "options": {
                        "A": "Pemerintah pusat",
                        "B": "Beasiswa talenta digital",
                        "C": "Tenaga IT terampil",
                        "D": "Pencetakan jutaan lulusan",
                        "E": "Sertifikasi kejuruan"
                    },
                    "answer": "B",
                    "solution": "Frasa demonstratif 'Program ini' mengacu pada 'program beasiswa talenta digital' di kalimat sebelumnya."
                },
                {
                    "num": 20,
                    "topic": "Sikap Penulis Teks Berita",
                    "question": "Jika seorang jurnalis hanya menyajikan data jumlah korban, waktu peristiwa, dan keterangan resmi pihak kepolisian tanpa menyisipkan kata sifat menghakimi, sikap penulis dapat dikategorikan sebagai...",
                    "options": {"A": "Subjektif", "B": "Netral dan objektif", "C": "Sinonim", "D": "Provokatif", "E": "Pesimistis"},
                    "answer": "B",
                    "solution": "Pemberitaan yang berbasis fakta empiris dan kutipan berimbang tanpa opini personal mencerminkan sikap objektif dan netral."
                }
            ]
        },
        {
            "id": "refleksi_evaluasi_kritis",
            "title": "Refleksi & Evaluasi Kritis Wacana",
            "description": "Fakta vs Opini vs Asumsi Implisit, Bias Penulis, Logical Fallacies, Penarikan Simpulan Silogisme",
            "questions": [
                {
                    "num": 1,
                    "topic": "Logical Fallacy Ad Hominem",
                    "question": "'Pendapat ahli tata kota tersebut mengenai solusi macet tidak perlu didengar karena ia sendiri belum pernah tinggal di Jakarta.' Kalimat tersebut mengandung kesalahan berpikir (*logical fallacy*) jenis...",
                    "options": {"A": "Ad Hominem", "B": "False Dilemma", "C": "Strawman", "D": "Bandwagon", "E": "Post Hoc Ergo Propter Hoc"},
                    "answer": "A",
                    "solution": "Argumen menyerang latar belakang atau pribadi orangnya, bukan membantah substansi isi gagasan/solusi tata kota yang diajukan."
                },
                {
                    "num": 2,
                    "topic": "Penalaran Silogisme Kategorial",
                    "question": "Premis Mayor: Semua siswa jurusan RPL wajib menguasai konsep pemrograman terstruktur.\nPremis Minor: Budi adalah siswa jurusan RPL.\nKesimpulan yang sah dan mengikat adalah...",
                    "options": {
                        "A": "Budi mungkin menguasai konsep pemrograman terstruktur",
                        "B": "Budi wajib menguasai konsep pemrograman terstruktur",
                        "C": "Budi telah lulus sertifikasi Junior Web Developer",
                        "D": "Semua yang menguasai pemrograman terstruktur adalah Budi",
                        "E": "Sebagian siswa RPL seperti Budi menyukai pemrograman"
                    },
                    "answer": "B",
                    "solution": "Silogisme standar (Semua A adalah B; C adalah A ==> C adalah B). Budi wajib menguasai konsep pemrograman terstruktur."
                },
                {
                    "num": 3,
                    "topic": "Modus Tollens Logika",
                    "question": "Premis 1: Jika server aplikasi berjalan normal, pengguna dapat mengakses basis data.\nPremis 2: Pengguna tidak dapat mengakses basis data.\nKesimpulan yang sah menurut kaidah penarikan Modus Tollens adalah...",
                    "options": {
                        "A": "Server aplikasi berjalan normal",
                        "B": "Server aplikasi tidak berjalan normal",
                        "C": "Pengguna lupa kata sandi login",
                        "D": "Basis data mengalami serangan virus",
                        "E": "Aplikasi harus diinstal ulang"
                    },
                    "answer": "B",
                    "solution": "Modus Tollens: p -> q, ~q ==> ~p. Kesimpulannya adalah server aplikasi tidak berjalan normal."
                },
                {
                    "num": 4,
                    "topic": "Deteksi Asumsi Implisit",
                    "question": "'Karena dia memenangkan medali emas di olimpiade matematika, ia pasti akan sangat mudah lulus ujian masuk fakultas kedokteran.' Asumsi implisit yang mendasari pernyataan tersebut adalah...",
                    "options": {
                        "A": "Semua medali emas bernilai sama",
                        "B": "Kemampuan matematika olimpiade berbanding lurus dengan kelulusan seleksi kedokteran",
                        "C": "Fakultas kedokteran hanya menguji materi matematika",
                        "D": "Orang tua anak tersebut adalah seorang dokter",
                        "E": "Ujian fakultas kedokteran tidak memerlukan persiapan belajar"
                    },
                    "answer": "B",
                    "solution": "Pernyataan mengasumsikan secara tidak langsung bahwa penguasaan olimpiade matematika menjamin kemudahan lulus di tes kedokteran."
                },
                {
                    "num": 5,
                    "topic": "Bias Penulis dalam Tajuk Rencana",
                    "question": "Dalam sebuah tajuk rencana, penulis menggunakan diksi 'kebijakan setengah hati', 'langkah ceroboh', dan 'mengabaikan penderitaan rakyat'. Nada dan bias penulis dalam teks tersebut adalah...",
                    "options": {"A": "Mendukung dan memuji", "B": "Kritis dan mengecam", "C": "Netral dan apatis", "D": "Humoris dan sarkastik", "E": "Optimistis"},
                    "answer": "B",
                    "solution": "Diksi bermuatan negatif (*setengah hati, ceroboh, mengabaikan*) menunjukkan keberpihakan kritis dan kecaman terhadap kebijakan."
                },
                {
                    "num": 6,
                    "topic": "False Dilemma Fallacy",
                    "question": "'Jika kamu tidak mendukung pembangunan jalan tol baru ini, berarti kamu ingin daerah kita tetap tertinggal selamanya.' Kesalahan penalaran kalimat di atas adalah...",
                    "options": {
                        "A": "Mengasumsikan hanya ada dua opsi ekstrem (Dilema Palsu / False Dilemma)",
                        "B": "Menyerang fisik lawan bicara",
                        "C": "Mengulang kesimpulan pada premis (Circular Reasoning)",
                        "D": "Menyimpulkan dari sampel yang terlalu kecil",
                        "E": "Menggunakan analogi palsu"
                    },
                    "answer": "A",
                    "solution": "Pernyataan menyederhanakan masalah kompleks menjadi hanya dua pilihan ekstrem: mendukung tol ATAU ingin daerah tertinggal."
                },
                {
                    "num": 7,
                    "topic": "Validitas Bukti Pendukung",
                    "question": "Klaim ilmiah: 'Konsumsi gula berlebih memicu diabetes tipe 2.' Bukti pendukung yang PALING VALID untuk memperkuat klaim tersebut adalah...",
                    "options": {
                        "A": "Cerita seorang tetangga yang gemar minum teh manis",
                        "B": "Hasil studi klinis komprehensif dari jurnal kesehatan internasional terindeks",
                        "C": "Unggahan video viral di media sosial TikTok",
                        "D": "Pendapat seorang pedagang gula pasir di pasar",
                        "E": "Komentar anonim di forum diskusi daring"
                    },
                    "answer": "B",
                    "solution": "Bukti ilmiah paling valid berasal dari penelitian klinis yang dipublikasikan di jurnal peer-reviewed terakreditasi."
                },
                {
                    "num": 8,
                    "topic": "Generalisasi yang Tergesa-gesa",
                    "question": "'Dua programmer yang saya temui kemarin sangat pendiam. Jadi, semua programmer di dunia pasti berkepribadian introvert.' Kesalahan berpikir ini disebut...",
                    "options": {
                        "A": "Hasty Generalization (Generalisasi Tergesa-gesa)",
                        "B": "Slippery Slope",
                        "C": "Appeal to Emotion",
                        "D": "Red Herring",
                        "E": "Equivocation"
                    },
                    "answer": "A",
                    "solution": "Menarik kesimpulan universal tentang seluruh populasi programmer hanya dari sampel 2 orang yang sangat terbatas."
                },
                {
                    "num": 9,
                    "topic": "Kekuatan Argumen Komparatif",
                    "question": "Penulis membandingkan efisiensi energi kendaraan listrik dengan kendaraan berbahan bakar fosil. Agar perbandingannya berimbang (*fair comparison*), parameter yang wajib dicantumkan adalah...",
                    "options": {
                        "A": "Warna cat mobil dari masing-masing jenis kendaraan",
                        "B": "Total emisi siklus hidup (*well-to-wheel*) dan biaya energi per kilometer",
                        "C": "Nama selebritas yang mengendarai mobil listrik",
                        "D": "Jumlah tempat cuci mobil di perkotaan",
                        "E": "Selera musik pengendara di jalan"
                    },
                    "answer": "B",
                    "solution": "Perbandingan energi yang objektif wajib mengukur seluruh siklus hidup emisi dan biaya konsumsi riil per satuan jarak."
                },
                {
                    "num": 10,
                    "topic": "Penalaran Sebab-Akibat Korelasi Palsu",
                    "question": "'Setiap kali tim sepak bola itu mengenakan jersey merah, hari selalu hujan. Jadi jersey merah mendatangkan hujan.' Kekeliruan logika ini dikenal sebagai...",
                    "options": {
                        "A": "Post Hoc Ergo Propter Hoc (Korelasi dianggap Kausalitas)",
                        "B": "Ad Misericordiam",
                        "C": "Argumentum ad Baculum",
                        "D": "Petitio Principii",
                        "E": "Strawman fallacy"
                    },
                    "answer": "A",
                    "solution": "Menganggap urutan waktu kejadian yang kebetulan beriringan sebagai hubungan sebab-akibat langsung tanpa dasar ilmiah."
                },
                {
                    "num": 11,
                    "topic": "Evaluasi Kredibilitas Sumber Berita",
                    "question": "Ciri-ciri artikel berita hoaks atau tidak kredibel yang patut diwaspadai pembaca kritis adalah...",
                    "options": {
                        "A": "Mencantumkan nama jurnalis dan tanggal liputan jelas",
                        "B": "Menggunakan judul provokatif berlebihan (*clickbait*) dan mencatut nama instansi tanpa tautan verifikasi",
                        "C": "Memuat kutipan narasumber dari dua pihak yang berbeda",
                        "D": "Menggunakan domain situs berakhiran resmi (.go.id atau .ac.id)",
                        "E": "Tata bahasa rapi dan sesuai kaidah EYD"
                    },
                    "answer": "B",
                    "solution": "Judul sensasional, manipulasi emosi pembaca, dan ketiadaan sumber asli merupakan indikasi kuat disinformasi/hoaks."
                },
                {
                    "num": 12,
                    "topic": "Inferensi Logis Silogisme Disjungtif",
                    "question": "Premis 1: Proyek website ini akan diselesaikan menggunakan framework Laravel atau Django.\nPremis 2: Tim pengembang memutuskan tidak menggunakan Django.\nKesimpulan yang sah adalah...",
                    "options": {
                        "A": "Proyek website ini diselesaikan menggunakan framework Laravel",
                        "B": "Proyek website dibatalkan pengerjaannya",
                        "C": "Tim pengembang beralih ke WordPress",
                        "D": "Django lebih bagus dari Laravel",
                        "E": "Kedua framework tetap dipakai bersamaan"
                    },
                    "answer": "A",
                    "solution": "Silogisme Disjungtif: p ∨ q, ~q ==> p. Maka proyek diselesaikan dengan Laravel."
                },
                {
                    "num": 13,
                    "topic": "Analisis Argumen Pro-Kontra",
                    "question": "Dalam debat tentang 'Penggunaan Kecerdasan Buatan di Lingkungan Sekolah', pihak kontra menyatakan kekhawatiran terbesar adalah...",
                    "options": {
                        "A": "Meningkatnya literasi teknologi guru dan murid",
                        "B": "Penurunan kemampuan berpikir kritis dan ketergantungan pada jawaban instan tanpa proses refleksi",
                        "C": "Pengurangan biaya pembelian buku cetak tahunan",
                        "D": "Mempercepat waktu pengerjaan tugas proyek sekolah",
                        "E": "Kemudahan akses bahan ajar interaktif global"
                    },
                    "answer": "B",
                    "solution": "Argumen kontra menyoroti dampak negatif penurunan daya kognitif kritis dan ketergantungan instan."
                },
                {
                    "num": 14,
                    "topic": "Menemukan Kelemahan Argumen",
                    "question": "'Kebijakan larangan kendaraan pribadi di jalan protokol pasti sukses karena diberlakukan mulai hari Senin depan.' Kelemahan mendasar dari kalimat ini adalah...",
                    "options": {
                        "A": "Hari Senin adalah awal pekan",
                        "B": "Waktu pelaksanaan (hari Senin) sama sekali bukan jaminan keberhasilan efektivitas suatu kebijakan transportasi",
                        "C": "Jalan protokol memiliki banyak gedung perkantoran",
                        "D": "Kendaraan pribadi membayar pajak tahunan",
                        "E": "Angkutan umum masih beroperasi"
                    },
                    "answer": "B",
                    "solution": "Menghubungkan hari mulai berlakunya aturan dengan jaminan kesuksesan kebijakan adalah penalaran non-sequitur (tidak nyambung)."
                },
                {
                    "num": 15,
                    "topic": "Mendeteksi Fakta Terselubung",
                    "question": "'Meskipun penjualan mobil konvensional menurun 15%, laba bersih pabrikan tetap tumbuh berkat kenaikan margin unit SUV mewah.' Fakta yang benar adalah...",
                    "options": {
                        "A": "Pabrikan mengalami kerugian total tahun ini",
                        "B": "Penjualan mobil konvensional mengalami kenaikan 15%",
                        "C": "Margin dari unit SUV mewah berhasil menopang pertumbuhan laba bersih pabrikan",
                        "D": "Mobil listrik menjadi penyumbang laba terbesar",
                        "E": "Pabrik menghentikan seluruh lini produksi SUV"
                    },
                    "answer": "C",
                    "solution": "Tersurat jelas bahwa kenaikan margin unit SUV mewah menjadi faktor penyelamat tumbuhnya laba bersih meski volume turun."
                },
                {
                    "num": 16,
                    "topic": "Appeal to Authority Fallacy",
                    "question": "'Produk vitamin ini pasti bisa menyembuhkan penyakit kanker karena diiklankan oleh pemain sepak bola terkenal.' Kesalahan logika pada klaim ini adalah...",
                    "options": {
                        "A": "Pemain sepak bola bukanlah otoritas medis yang kompeten dalam terapi kanker (Appeal to Inappropriate Authority)",
                        "B": "Vitamin tidak memiliki rasa manis",
                        "C": "Kanker disebabkan oleh mutasi genetik",
                        "D": "Pemain sepak bola harus berolahraga setiap hari",
                        "E": "Harga vitamin terlalu mahal"
                    },
                    "answer": "A",
                    "solution": "Menjadikan atlet sepak bola sebagai rujukan kebenaran medis tentang penyembuhan kanker adalah Appeal to False Authority."
                },
                {
                    "num": 17,
                    "topic": "Slippery Slope Fallacy",
                    "question": "'Jika kamu terlambat bangun tidur 5 menit hari ini, kamu akan ketinggalan bus, terlambat masuk kerja, dipecat bos, jatuh miskin, dan hidup di jalanan.' Rantai argumen berlebihan ini disebut...",
                    "options": {
                        "A": "Slippery Slope Fallacy",
                        "B": "Ad Populum",
                        "C": "Strawman",
                        "D": "Tu Quoque",
                        "E": "Circular Reasoning"
                    },
                    "answer": "A",
                    "solution": "Mengasumsikan suatu tindakan kecil pasti memicu rentetan bencana ekstrem tanpa bukti kausalitas yang realistis."
                },
                {
                    "num": 18,
                    "topic": "Penalaran Induktif Analogi",
                    "question": "'Sebagaimana sebuah kapal membutuhkan nahkoda berpengalaman untuk menembus badai lautan, sebuah perusahaan rintisan membutuhkan CEO yang tangguh untuk melewati krisis ekonomi.' Jenis argumen ini adalah...",
                    "options": {
                        "A": "Penalaran deduktif silogistik",
                        "B": "Penalaran induktif berbasis analogi",
                        "C": "Pernyataan faktual empiris",
                        "D": "Kekeliruan berpikir ad hominem",
                        "E": "Generalisasi statistik"
                    },
                    "answer": "B",
                    "solution": "Mengambil kesamaan pola/sifat antara dua situasi berbeda (kapal-nahkoda vs startup-CEO) untuk memperkuat argumen kepemimpinan."
                },
                {
                    "num": 19,
                    "topic": "Menilai Relevansi Bukti",
                    "question": "Topik bahasan: 'Efektivitas Kurikulum Merdeka terhadap Kemandirian Belajar Siswa SMK.' Data yang PALING RELEVAN untuk dicantumkan adalah...",
                    "options": {
                        "A": "Warna seragam sekolah di berbagai provinsi",
                        "B": "Peningkatan skor portofolio projek nyata dan inisiatif pemecahan masalah mandiri siswa SMK",
                        "C": "Daftar menu makanan di kantin sekolah",
                        "D": "Luas halaman parkir sepeda motor guru",
                        "E": "Jadwal pertandingan futsal antar-SMK"
                    },
                    "answer": "B",
                    "solution": "Data projek nyata dan inisiatif pemecahan masalah langsung mengukur variabel 'kemandirian belajar siswa SMK'."
                },
                {
                    "num": 20,
                    "topic": "Simpulan Entimem",
                    "question": "'Budi harus mengikuti uji kompetensi kejuruan karena ia adalah siswa tingkat akhir SMK.' Bentuk premis mayor yang dihilangkan (entimem) pada kalimat di atas adalah...",
                    "options": {
                        "A": "Semua siswa tingkat akhir SMK harus mengikuti uji kompetensi kejuruan",
                        "B": "Budi sangat mahir membuat aplikasi web",
                        "C": "Uji kompetensi diselenggarakan oleh BNSP",
                        "D": "Tidak ada siswa SMK yang gagal ujian",
                        "E": "Siswa SMK menyukai ujian praktik"
                    },
                    "answer": "A",
                    "solution": "Entimem adalah silogisme yang premis mayornya tidak diucapkan secara eksplisit: 'Semua siswa tingkat akhir SMK wajib uji kompetensi'."
                }
            ]
        },
        {
            "id": "teks_sastra_fiksi",
            "title": "Keterampilan Membaca Teks Sastra / Fiksi",
            "description": "Unsur Intrinsik Cerpen & Prosa, Karakterisasi Tokoh, Makna Simbolik & Majas, Pesan Moral & Nilai Kehidupan",
            "questions": [
                {
                    "num": 1,
                    "topic": "Karakterisasi Tokoh Dramatik",
                    "question": "Bacalah kutipan cerpen berikut!\n'Setiap kali bel istirahat berbunyi, Ardi tidak pernah beranjak dari bangkunya. Tangannya yang kasar dengan teliti menyalin kembali catatan temannya yang tertinggal, sementara kotak bekal berisi singkong rebus di samping mejanya tetap tertutup rapi hingga teman sebangkunya mengajaknya makan bersama.'\n\nWatak tokoh Ardi yang tergambar dalam kutipan di atas adalah...",
                    "options": {
                        "A": "Sombong dan penyendiri",
                        "B": "Tekun, sederhana, dan tidak merepotkan orang lain",
                        "C": "Penakut dan ragu-ragu",
                        "D": "Boros dan acuh tak acuh",
                        "E": "Cepat putus asa"
                    },
                    "answer": "B",
                    "solution": "Penggambaran perilaku menyalin catatan dengan teliti (tekun) dan membawa bekal singkong rebus sederhana (sederhana/mandiri) mencerminkan ketekunan dan kesahajaan."
                },
                {
                    "num": 2,
                    "topic": "Latar Suasana Cerita",
                    "question": "'Angin malam berdesir dingin menyusup lewat celah jendela kayu yang lapuk. Di kejauhan, lolongan anjing liar bersahut-sahutan dengan gemeretak dahan pohon randu yang saling bergesekan. Lampu minyak di sudut meja tua itu bergoyang redup, nyaris padam.'\n\nLatar suasana yang tercipta dalam kutipan tersebut adalah...",
                    "options": {"A": "Gembira dan santai", "B": "Mencekam dan sunyi", "C": "Semarak dan ramai", "D": "Damai dan tenteram", "E": "Marah dan penuh dendam"},
                    "answer": "B",
                    "solution": "Diksi *angin dingin, jendela lapuk, lolongan anjing, pohon bergesekan, lampu redup nyaris padam* menciptakan suasana mencekam dan sunyi."
                },
                {
                    "num": 3,
                    "topic": "Sudut Pandang Pengarang",
                    "question": "'Aku menatap layar laptop itu dengan nanar. Baris-baris kode yang kuketik selama tiga hari lenyap tanpa jejak akibat lonjakan listrik padam yang tiba-tiba. Tanganku gemetar ketika mencoba me-restart sistem.'\n\nSudut pandang (*point of view*) yang digunakan dalam kutipan di atas adalah...",
                    "options": {
                        "A": "Sudut pandang orang pertama pelaku utama",
                        "B": "Sudut pandang orang pertama pelaku sampingan",
                        "C": "Sudut pandang orang ketiga serbatahu",
                        "D": "Sudut pandang orang ketiga pengamat",
                        "E": "Sudut pandang campuran"
                    },
                    "answer": "A",
                    "solution": "Penggunaan kata ganti 'Aku' yang menceritakan pengalaman emosi dan tindakannya sendiri sebagai tokoh pusat cerita menandakan sudut pandang orang pertama pelaku utama."
                },
                {
                    "num": 4,
                    "topic": "Majas Metafora",
                    "question": "Kalimat berikut yang mengandung MAJAS METAFORA adalah...",
                    "options": {
                        "A": "Daun kelapa melambai-lambai di tepi pantai",
                        "B": "Buku adalah jendela dunia yang membuka wawasan kita",
                        "C": "Suaranya sangat menggelegar membelah angkasa",
                        "D": "Mampirlah ke gubuk kami yang sederhana ini",
                        "E": "Wajahnya pucat bagaikan bulan kesiangan"
                    },
                    "answer": "B",
                    "solution": "Metafora membandingkan dua hal secara langsung tanpa kata pembanding (*buku adalah jendela dunia*). Opsi A adalah personifikasi, C hiperbola, D litotes, E asosiasi/simile."
                },
                {
                    "num": 5,
                    "topic": "Majas Personifikasi",
                    "question": "Kalimat yang menggunakan MAJAS PERSONIFIKASI adalah...",
                    "options": {
                        "A": "Hujan deras mengguyur kota Jakarta sejak pagi",
                        "B": "Pena itu menari-nari di atas kertas putih menumpahkan keluh kesahnya",
                        "C": "Dia bekerja membanting tulang demi menafkahi keluarganya",
                        "D": "Keringatnya menganak sungai setelah berlari maraton",
                        "E": "Pak RT adalah tangan kanan kepala desa"
                    },
                    "answer": "B",
                    "solution": "Personifikasi memberikan sifat/perilaku manusia (*menari-nari, menumpahkan keluh kesah*) kepada benda mati (*pena*)."
                },
                {
                    "num": 6,
                    "topic": "Nilai Moral dalam Cerpen",
                    "question": "'Meski Pak Salim tahu dompet tebal yang ditemukannya di pinggir jalan itu berisi uang puluhan juta rupiah yang sanggup melunasi seluruh hutangnya, ia memilih mengayuh sepedanya sejauh lima kilometer menuju kantor polisi terdekat untuk menyerahkannya.'\n\nNilai kehidupan yang paling dominan dalam kutipan tersebut adalah...",
                    "options": {"A": "Nilai estetika", "B": "Nilai moral/kejujuran", "C": "Nilai politik", "D": "Nilai budaya", "E": "Nilai religi ibadah"},
                    "answer": "B",
                    "solution": "Tindakan Pak Salim mengembalikan uang temuan meski dirinya sedang kesulitan merupakan manifestasi nilai moral integritas dan kejujuran."
                },
                {
                    "num": 7,
                    "topic": "Tahapan Alur Klimaks",
                    "question": "Tahapan alur dalam cerita pendek ketika konflik mencapai puncak ketegangan tertinggi dan menentukan nasib tokoh disebut...",
                    "options": {"A": "Orientasi", "B": "Komplikasi", "C": "Klimaks", "D": "Resolusi", "E": "Koda"},
                    "answer": "C",
                    "solution": "Klimaks adalah titik puncak ketegangan (turning point) dalam perkembangan alur cerita."
                },
                {
                    "num": 8,
                    "topic": "Amanat Tersirat Cerita",
                    "question": "Bacalah kembali kutipan cerpen berikut!\n'Meski Pak Salim tahu dompet tebal yang ditemukannya di pinggir jalan itu berisi uang puluhan juta rupiah yang sanggup melunasi seluruh hutangnya, ia memilih mengayuh sepedanya sejauh lima kilometer menuju kantor polisi terdekat untuk menyerahkannya.'\n\nPesan moral (amanat) yang dapat dipetik dari kutipan tersebut adalah...",
                    "options": {
                        "A": "Jangan bersepeda di jalan raya yang sepi",
                        "B": "Kejujuran dan integritas diri harus dijaga di atas godaan materi dan kesulitan pribadi",
                        "C": "Jangan membawa uang tunai terlalu banyak di dompet",
                        "D": "Semua masalah keuangan dapat diselesaikan di kantor polisi",
                        "E": "Hutang tidak perlu dibayar jika kita miskin"
                    },
                    "answer": "B",
                    "solution": "Amanat adalah pesan luhur universal yang mengajak pembaca menjunjung tinggi nilai kejujuran walau dalam situasi terdesak."
                },
                {
                    "num": 9,
                    "topic": "Majas Ironi",
                    "question": "Kalimat sindiran halus yang menggunakan MAJAS IRONI adalah...",
                    "options": {
                        "A": "Bagus sekali nilaimu, sampai-sampai rapor ini penuh dengan tinta merah!",
                        "B": "Dasar orang malas, otak udang tidak tahu diri!",
                        "C": "Saya hanya orang bodoh yang tidak tahu apa-apa",
                        "D": "Suaramu merdu seperti suara burung merpati",
                        "E": "Tolong kecilkan musikmu yang memekakkan telinga"
                    },
                    "answer": "A",
                    "solution": "Ironi menyatakan kebalikan dari fakta yang sebenarnya secara halus (*'Bagus sekali nilaimu...'* padahal rapornya merah)."
                },
                {
                    "num": 10,
                    "topic": "Nilai Sosial dalam Cerpen",
                    "question": "'Warga kampung bergotong royong membersihkan puing-puing rumah Mak Siti yang roboh diterjang angin kencang. Kaum ibu menyiapkan dapur umum, sementara para pemuda mengangkut kayu balok.'\n\nNilai yang menonjol adalah...",
                    "options": {"A": "Nilai agama", "B": "Nilai sosial (kebersamaan dan tolong-menolong)", "C": "Nilai ekonomi bisnis", "D": "Nilai patriotisme", "E": "Nilai sains teknologi"},
                    "answer": "B",
                    "solution": "Interaksi gotong royong dan tolong-menolong antarwarga mencerminkan nilai sosial kemasyarakatan."
                },
                {
                    "num": 11,
                    "topic": "Konflik Batin Tokoh",
                    "question": "Kutipan cerpen: 'Di dalam hatinya berkecamuk perang hebat: apakah ia harus membocorkan kecurangan sahabat karibnya demi keadilan, atau menutup mata demi menjaga persahabatan mereka yang telah terjalin sepuluh tahun.'\n\nJenis konflik yang dialami tokoh adalah...",
                    "options": {"A": "Konflik fisik", "B": "Konflik batin (internal)", "C": "Konflik sosial antar-kelompok", "D": "Konflik alamiah", "E": "Konflik ideologi negara"},
                    "answer": "B",
                    "solution": "Pertentangan antara dua pilihan moral di dalam pikiran/hati nurani tokoh sendiri merupakan konflik batin (*internal conflict*)."
                },
                {
                    "num": 12,
                    "topic": "Makna Simbolik Lambang",
                    "question": "Dalam puisi atau karya sastra, lambang 'merpati putih' secara konvensional melambangkan...",
                    "options": {"A": "Keserakahan dan amarah", "B": "Kedamaian dan kesucian", "C": "Kekayaan dan kemewahan", "D": "Kematian dan kedukaan", "E": "Kekuatan militer"},
                    "answer": "B",
                    "solution": "Merpati putih dalam semiotika sastra melambangkan perdamaian, ketulusan, dan kesucian."
                },
                {
                    "num": 13,
                    "topic": "Majas Hiperbola",
                    "question": "Kalimat yang menggunakan MAJAS HIPERBOLA adalah...",
                    "options": {
                        "A": "Hatinya hancur berkeping-keping dan tangisannya membanjiri seisi ruangan mendengar kabar duka itu",
                        "B": "Matahari tersenyum menyapa pagi",
                        "C": "Ia membelikan adiknya sebuah buku baru",
                        "D": "Rumahnya terletak di ujung jalan ini",
                        "E": "Dia adalah anak emas di keluarganya"
                    },
                    "answer": "A",
                    "solution": "Hiperbola melebih-lebihkan kenyataan secara ekstrem (*'tangisannya membanjiri seisi ruangan'*)."
                },
                {
                    "num": 14,
                    "topic": "Watak Tokoh Antagonis",
                    "question": "Tokoh dalam cerita yang berperan sebagai penentang tokoh utama dan menjadi sumber timbulnya konflik disebut tokoh...",
                    "options": {"A": "Protagonis", "B": "Antagonis", "C": "Tritagonis", "D": "Figuran", "E": "Narator"},
                    "answer": "B",
                    "solution": "Antagonis adalah karakter penentang tokoh utama (protagonis)."
                },
                {
                    "num": 15,
                    "topic": "Nilai Budaya dalam Prosa",
                    "question": "'Upacara Rambu Solo di Toraja dilaksanakan dengan penyembelihan kerbau belang sebagai tanda penghormatan terakhir mengantarkan arwah leluhur menuju alam Puya.' Nilai yang terkandung dalam kutipan adalah...",
                    "options": {"A": "Nilai estetika barat", "B": "Nilai budaya / tradisi adat istiadat", "C": "Nilai ekonomi pasar modal", "D": "Nilai politik praktis", "E": "Nilai ilmu pengetahuan alam"},
                    "answer": "B",
                    "solution": "Tradisi pemakaman Rambu Solo dan adat Toraja merepresentasikan nilai budaya adiluhung lokal."
                },
                {
                    "num": 16,
                    "topic": "Penokohan Metode Analitik",
                    "question": "Penokohan metode analitik (langsung) ditunjukkan oleh kalimat...",
                    "options": {
                        "A": "Rudi adalah pemuda yang sangat dermawan, rendah hati, dan gemar menolong siapa saja tanpa pamrih",
                        "B": "'Ambil saja uang ini untuk berobat ibumu,' kata Rudi sambil tersenyum tulus",
                        "C": "Semua tetangga selalu memuji kebaikan tutur kata pemuda itu",
                        "D": "Rudi melangkah pelan menghindari genangan air agar tidak memercik ke pejalan kaki lain",
                        "E": "Wajahnya memancarkan ketenangan seorang pertapa"
                    },
                    "answer": "A",
                    "solution": "Pengarang mendeskripsikan watak tokoh secara langsung menggunakan kata sifat (*dermawan, rendah hati*), bukan lewat dialog atau tindakan."
                },
                {
                    "num": 17,
                    "topic": "Peribahasa Kontekstual",
                    "question": "'Setelah sukses menjadi pengusaha di ibu kota, Dani tidak pernah lagi menghubungi ibunya di kampung yang telah bersusah payah membiayai kuliahnya.' Peribahasa yang tepat untuk menggambarkan Dani adalah...",
                    "options": {
                        "A": "Bagai air di daun talas",
                        "B": "Kacang lupa pada kulitnya",
                        "C": "Air beriak tanda tak dalam",
                        "D": "Tong kosong nyaring bunyinya",
                        "E": "Ada udang di balik batu"
                    },
                    "answer": "B",
                    "solution": "Kacang lupa pada kulitnya bermakna orang yang lupa akan asal-usulnya atau orang yang telah berjasa menolongnya setelah meraih kesuksesan."
                },
                {
                    "num": 18,
                    "topic": "Ungkapan Idiomatik",
                    "question": "'Kasus sengketa tanah warisan itu akhirnya dibawa ke **meja hijau**.' Makna ungkapan **meja hijau** adalah...",
                    "options": {"A": "Meja makan", "B": "Pengadilan", "C": "Kantor kelurahan", "D": "Lelang umum", "E": "Balai desa"},
                    "answer": "B",
                    "solution": "Meja hijau adalah idiom baku dalam bahasa Indonesia yang bermakna pengadilan."
                },
                {
                    "num": 19,
                    "topic": "Kaitan Cerita dengan Realitas",
                    "question": "Kaitan peristiwa dalam cerpen seorang anak buruh tani yang gigih belajar hingga meraih beasiswa ke luar negeri dengan kehidupan nyata saat ini adalah...",
                    "options": {
                        "A": "Keterbatasan ekonomi bukan penghalang untuk meraih prestasi akademik jika diiringi tekad dan kerja keras",
                        "B": "Semua anak petani wajib melanjutkan kuliah ke luar negeri",
                        "C": "Beasiswa hanya disediakan bagi keluarga buruh tani",
                        "D": "Belajar di dalam negeri tidak memberikan jaminan masa depan",
                        "E": "Pekerjaan buruh tani sudah tidak diminati generasi muda"
                    },
                    "answer": "A",
                    "solution": "Pesan relevan dalam kehidupan nyata adalah kegigihan dan dedikasi mampu mengatasi hambatan status ekonomi."
                },
                {
                    "num": 20,
                    "topic": "Penyelesaian Alur (Resolusi)",
                    "question": "Kutipan cerpen: 'Akhirnya kesalahpahaman antara kedua bersaudara itu mencair setelah surat wasiat mendiang ayah mereka dibacakan oleh notaris dengan sejelas-jelasnya.' Kutipan tersebut berada pada bagian alur...",
                    "options": {"A": "Abstraksi", "B": "Orientasi pengenalan", "C": "Komplikasi", "D": "Resolusi (penyelesaian)", "E": "Evaluasi"},
                    "answer": "D",
                    "solution": "Tahap di mana konflik mulai mereda dan masalah menemukan jalan keluar/solusi disebut resolusi."
                }
            ]
        },
        {
            "id": "kalimat_efektif_struktur",
            "title": "Tata Kalimat & Kaidah Kalimat Efektif",
            "description": "Pola Struktur SPOK, Kalimat Inversi, 5 Syarat Kalimat Efektif, Konjungsi Antarklausa vs Antarkalimat",
            "questions": [
                {
                    "num": 1,
                    "topic": "Analisis Pola Kalimat",
                    "question": "Pola kalimat 'Siswa kelas XII RPL sedang merancang aplikasi manajemen absensi berbasis web di laboratorium komputer' adalah...",
                    "options": {
                        "A": "S - P - O - K",
                        "B": "S - P - Pel - K",
                        "C": "S - P - K",
                        "D": "K - S - P - O",
                        "E": "S - P - O - Pel"
                    },
                    "answer": "A",
                    "solution": "S: Siswa kelas XII RPL; P: sedang merancang; O: aplikasi manajemen absensi berbasis web; K: di laboratorium komputer. Polanya S-P-O-K."
                },
                {
                    "num": 2,
                    "topic": "Kalimat Efektif Kehematan (Pleonasme)",
                    "question": "Kalimat berikut yang TIDAK EFEKTIF karena mengandung pemborosan kata (pleonasme) adalah...",
                    "options": {
                        "A": "Para peserta seminar telah memasuki ruangan",
                        "B": "Para hadirin sekalian dimohon untuk segera berdiri",
                        "C": "Rapat kerja itu berlangsung selama dua jam",
                        "D": "Dokumen tersebut harus ditandatangani oleh kepala dinas",
                        "E": "Siswa berprestasi itu mendapatkan beasiswa penuh"
                    },
                    "answer": "B",
                    "solution": "'Para hadirin sekalian': 'hadirin' sudah bermakna jamak (semua yang hadir), digabung dengan 'para' dan 'sekalian' menyebabkan pleonasme ganda. Seharusnya cukup: 'Hadirin dimohon...'."
                },
                {
                    "num": 3,
                    "topic": "Keparalelan Bentuk Imbuhan",
                    "question": "Perhatikan kalimat tidak efektif: 'Kegiatan bakti sosial itu meliputi pengumpulan pakaian bekas, penyaluran obat-obatan, dan membagikan sembako.' Perbaikan kalimat agar memiliki keparalelan bentuk adalah...",
                    "options": {
                        "A": "Kegiatan bakti sosial itu meliputi mengumpulkan pakaian bekas, menyalurkan obat-obatan, dan pembagian sembako",
                        "B": "Kegiatan bakti sosial itu meliputi pengumpulan pakaian bekas, penyaluran obat-obatan, dan pembagian sembako",
                        "C": "Kegiatan bakti sosial itu meliputi dikumpulkannya pakaian bekas, disalurkan obat-obatan, dan membagikan sembako",
                        "D": "Kegiatan bakti sosial itu meliputi pakaian bekas dikumpulkan, obat disalurkan, dan pembagian sembako",
                        "E": "Kegiatan bakti sosial itu meliputi mengumpulkan pakaian, penyaluran obat, dan dibagikan sembako"
                    },
                    "answer": "B",
                    "solution": "Bentuk nomina berimbuhan pe-an (*pengumpulan, penyaluran*) harus disejajarkan dengan bentuk pe-an pula: *pembagian sembako* (bukan verba *membagikan*)."
                },
                {
                    "num": 4,
                    "topic": "Kalimat Kehilangan Subjek",
                    "question": "Kalimat berikut yang TIDAK memiliki subjek (kalimat rancu) adalah...",
                    "options": {
                        "A": "Dalam rapat dewan guru memutuskan jadwal ujian tengah semester",
                        "B": "Rapat dewan guru memutuskan jadwal ujian tengah semester",
                        "C": "Dewan guru memutuskan jadwal ujian dalam rapat kemarin",
                        "D": "Jadwal ujian tengah semester diputuskan dalam rapat dewan guru",
                        "E": "Dalam rapat kemarin, dewan guru memutuskan jadwal ujian"
                    },
                    "answer": "A",
                    "solution": "Pada kalimat A, kata depan 'Dalam' mengawali frasa sehingga menjadikannya Keterangan tempat/keadaan. Akibatnya kalimat tersebut tidak memiliki Subjek yang memicu tindakan P 'memutuskan'."
                },
                {
                    "num": 5,
                    "topic": "Kelogisan Makna Kalimat",
                    "question": "Kalimat berikut yang TIDAK LOGIS menurut kaidah nalar bahasa Indonesia adalah...",
                    "options": {
                        "A": "Untuk mempersingkat waktu, acara selanjutnya akan segera dimulai",
                        "B": "Kepada bapak kepala sekolah, waktu dan tempat kami persilakan",
                        "C": "Pencuri sepeda motor itu berhasil ditangkap oleh pihak kepolisian",
                        "D": "Mayat korban pembunuhan itu ditemukan di dasar jurang",
                        "E": "Peserta yang terlambat tidak diperkenankan memasuki ruangan ujian"
                    },
                    "answer": "B",
                    "solution": "'Waktu dan tempat kami persilakan' tidak logis, karena waktu dan tempat tidak dapat dipersilakan (benda mati abstrak). Yang dipersilakan adalah orangnya: 'Bapak Kepala Sekolah kami persilakan'."
                },
                {
                    "num": 6,
                    "topic": "Membedakan Objek dan Pelengkap",
                    "question": "Pada kalimat 'Negara Indonesia berlandaskan hukum yang adil', frasa 'hukum yang adil' menduduki fungsi...",
                    "options": {"A": "Subjek", "B": "Predikat", "C": "Objek", "D": "Pelengkap", "E": "Keterangan"},
                    "answer": "D",
                    "solution": "Verba berawalan ber- (*berlandaskan*) adalah verba intransitif. Unsur setelahnya tidak dapat dipasifkan (*'Hukum yang adil dilandaskan oleh Negara Indonesia'* -> rancu/salah), sehingga menduduki fungsi Pelengkap."
                },
                {
                    "num": 7,
                    "topic": "Konjungsi Korelatif Baku",
                    "question": "Pasangan konjungsi korelatif yang BAKU menurut PUEBI/EYD V adalah...",
                    "options": {
                        "A": "bukan hanya ... melainkan juga ...",
                        "B": "tidak hanya ... tetapi juga ...",
                        "C": "antara ... dengan ...",
                        "D": "baik ... ataupun ...",
                        "E": "walaupun ... tetapi ..."
                    },
                    "answer": "B",
                    "solution": "Pasangan konjungsi korelatif baku: *tidak hanya ... tetapi juga ...* dan *bukan ... melainkan ...*. (Pasangan 'antara ... dan ...', 'baik ... maupun ...')."
                },
                {
                    "num": 8,
                    "topic": "Kalimat Inversi",
                    "question": "Kalimat berikut yang merupakan KALIMAT INVERSI (Predikat mendahului Subjek) adalah...",
                    "options": {
                        "A": "Bunga mawar itu mekar dengan indahnya di taman",
                        "B": "Telah gugur seorang pahlawan bangsa di medan pertempuran",
                        "C": "Kami sedang belajar giat menghadapi ujian",
                        "D": "Ayah membaca koran di beranda rumah",
                        "E": "Matahari bersinar sangat terik hari ini"
                    },
                    "answer": "B",
                    "solution": "P: Telah gugur; S: seorang pahlawan bangsa; K: di medan pertempuran. Predikat diletakkan di depan Subjek untuk memberikan penegasan (inversi)."
                },
                {
                    "num": 9,
                    "topic": "Kesepadanan Struktur",
                    "question": "Kalimat yang memenuhi syarat KESEPADANAN STRUKTUR adalah...",
                    "options": {
                        "A": "Meskipun hujan lebat tetapi pertandingan sepak bola tetap dilanjutkan",
                        "B": "Meskipun hujan lebat, pertandingan sepak bola tetap dilanjutkan",
                        "C": "Karena sakit kepala sehingga ia tidak masuk sekolah hari ini",
                        "D": "Bagi semua siswa yang membawa HP harus dimatikan",
                        "E": "Tentang masalah itu kami belum membicarakan secara tuntas"
                    },
                    "answer": "B",
                    "solution": "Kalimat A menggabungkan konjungsi subordinatif *meskipun* dan konjungsi koordinatif *tetapi* dalam satu kalimat majemuk bertingkat (ganda). Kalimat B benar karena hanya ada satu konjungsi subordinatif."
                },
                {
                    "num": 10,
                    "topic": "Konjungsi Antarkalimat",
                    "question": "Penggunaan konjungsi antarkalimat yang TEPAT adalah...",
                    "options": {
                        "A": "Dia sangat cerdas. Sehingga ia selalu juara kelas.",
                        "B": "Dia sangat cerdas. Oleh karena itu, ia selalu meraih peringkat pertama.",
                        "C": "Dia sangat cerdas. Namun tidak sombong kepada temannya.",
                        "D": "Dia sangat cerdas. Sedangkan saudaranya pendiam.",
                        "E": "Dia sangat cerdas. Karena selalu belajar setiap malam."
                    },
                    "answer": "B",
                    "solution": "'Oleh karena itu' adalah konjungsi antarkalimat resmi dan wajib diikuti tanda koma (,). Konjungsi *sehingga, sedangkan, karena* adalah konjungsi intrakalimat yang tidak boleh diletakkan di awal kalimat mandiri."
                },
                {
                    "num": 11,
                    "topic": "Perbaikan Kalimat Rancu",
                    "question": "Perhatikan kalimat: 'Mengenai usulan renovasi gedung sekolah sudah disetujui oleh kepala dinas.' Kalimat tersebut menjadi efektif jika...",
                    "options": {
                        "A": "Kata 'mengenai' dihilangkan",
                        "B": "Kata 'sudah' diganti 'telah'",
                        "C": "Kata 'oleh' dihilangkan",
                        "D": "Kata 'disetujui' diganti 'menyetujui'",
                        "E": "Tanda titik diganti tanda seru"
                    },
                    "answer": "A",
                    "solution": "Menghilangkan kata depan 'Mengenai' menjadikan 'Usulan renovasi gedung sekolah' sebagai Subjek yang sah: 'Usulan renovasi gedung sekolah sudah disetujui oleh kepala dinas.'"
                },
                {
                    "num": 12,
                    "topic": "Kalimat Pasif Baku",
                    "question": "Bentuk pasif yang BAKU dari kalimat aktif 'Saya sudah menyelesaikan tugas itu kemarin' adalah...",
                    "options": {
                        "A": "Tugas itu sudah diselesaikan oleh saya kemarin",
                        "B": "Tugas itu sudah saya selesaikan kemarin",
                        "C": "Tugas itu telah diselesaikan kemarin oleh saya",
                        "D": "Tugas itu saya sudah selesaikan kemarin",
                        "E": "Kemarin tugas itu sudah diselesaikan saya"
                    },
                    "answer": "B",
                    "solution": "Untuk pelaku kata ganti orang pertama (*saya, aku, kami*), bentuk pasif persona yang baku adalah O + [aspek] + Pronoun + Verba dasar: 'Tugas itu sudah saya selesaikan kemarin'."
                },
                {
                    "num": 13,
                    "topic": "Kalimat Majemuk Setara",
                    "question": "Di antara kalimat berikut, yang merupakan KALIMAT MAJEMUK SETARA adalah...",
                    "options": {
                        "A": "Ibu sedang memasak di dapur ketika paman datang berkunjung",
                        "B": "Roni belajar matematika dengan tekun agar memperoleh nilai sempurna",
                        "C": "Adik suka menggambar pemandangan, sedangkan kakak lebih menyukai musik klasik",
                        "D": "Meskipun cuaca sangat dingin, para petani tetap berangkat ke sawah",
                        "E": "Jika hari ini tidak hujan, kami akan berolahraga di lapangan"
                    },
                    "answer": "C",
                    "solution": "Konjungsi koordinatif *sedangkan* menghubungkan dua klausa setara yang menyatakan pertentangan."
                },
                {
                    "num": 14,
                    "topic": "Frasa Ambigu (Bermakna Ganda)",
                    "question": "Frasa yang BERMAKNA GANDA (ambigu) dalam kalimat adalah...",
                    "options": {
                        "A": "Mobil baru itu diparkir di garasi",
                        "B": "Sumbangan pakaian bekas telah dikirim kemarin",
                        "C": "Istri dokter yang ramah itu menyapa warga kampung",
                        "D": "Kucing hitam itu tidur di atas sofa",
                        "E": "Gedung perpustakaan kota dibuka setiap hari kerja"
                    },
                    "answer": "C",
                    "solution": "'Istri dokter yang ramah itu' ambigu: apakah yang ramah adalah istrinya, ataukah dokternya?"
                },
                {
                    "num": 15,
                    "topic": "Ketegasan dalam Kalimat Efektif",
                    "question": "Menempatkan kata kunci yang dipentingkan di awal kalimat untuk memberikan penegasan makna disebut teknik...",
                    "options": {"A": "Pleonasme", "B": "Repetisi", "C": "Penonjolan (Fokus Kalimat)", "D": "Elipsis", "E": "Eufemisme"},
                    "answer": "C",
                    "solution": "Penonjolan dilakukan dengan memajukan gagasan utama ke posisi awal kalimat untuk menarik atensi pembaca."
                },
                {
                    "num": 16,
                    "topic": "Kata Tugas yang Mubazir",
                    "question": "Kalimat yang menggunakan kata tugas secara TEPAT tanpa pemborosan adalah...",
                    "options": {
                        "A": "Tujuan daripada penelitian ini adalah untuk mengetahui penyebab banjir",
                        "B": "Tujuan penelitian ini adalah mengetahui penyebab banjir",
                        "C": "Tujuan dari pada penelitian ini adalah untuk mengetahui daripada penyebab banjir",
                        "D": "Adalah tujuan penelitian ini guna untuk mengetahui banjir",
                        "E": "Tujuan daripada penelitian yakni untuk mengetahui penyebab banjir"
                    },
                    "answer": "B",
                    "solution": "Kata 'daripada' hanya digunakan untuk perbandingan. Kalimat B paling lugas dan efektif: 'Tujuan penelitian ini adalah mengetahui penyebab banjir.'"
                },
                {
                    "num": 17,
                    "topic": "Kalimat Majemuk Bertingkat Anak Kalimat Keterangan Waktu",
                    "question": "Anak kalimat yang berfungsi sebagai keterangan waktu ditunjukkan oleh kalimat...",
                    "options": {
                        "A": "Dia menangis karena kehilangan kucing kesayangannya",
                        "B": "Ayah baru saja tiba di rumah ketika petir menyambar dengan keras",
                        "C": "Rumah yang bercat hijau itu adalah milik paman saya",
                        "D": "Pemerintah membangun waduk agar sawah petani tidak kekeringan",
                        "E": "Ia berbicara seolah-olah dirinya mengetahui segalanya"
                    },
                    "answer": "B",
                    "solution": "Klausa 'ketika petir menyambar dengan keras' diawali konjungsi temporal *ketika*, berfungsi sebagai keterangan waktu."
                },
                {
                    "num": 18,
                    "topic": "Kesalahan Kontaminasi Kalimat",
                    "question": "Bentuk rancu 'mengesampingkan' vs 'mengesampingkan' atau 'berulang-ulang kali' merupakan contoh gejala bahasa yang disebut...",
                    "options": {"A": "Kontaminasi (Perancuan Bentuk)", "B": "Hiperkorek", "C": "Integrasi", "D": "Asimilasi", "E": "Akronim"},
                    "answer": "A",
                    "solution": "Kontaminasi adalah perancuan dua bentuk yang masing-masing benar menjadi satu bentuk gabungan yang salah (contoh: *berulang kali* + *berulang-ulang* dirancukan menjadi *berulang-ulang kali*)."
                },
                {
                    "num": 19,
                    "topic": "Kalimat Efektif Kehematan Subjek",
                    "question": "Perhatikan kalimat majemuk: 'Karena Budi sakit demam, maka Budi tidak dapat menghadiri acara pelantikan ketua OSIS.' Perbaikan kalimat tersebut agar efektif adalah...",
                    "options": {
                        "A": "Karena sakit demam, Budi tidak dapat menghadiri acara pelantikan ketua OSIS",
                        "B": "Karena Budi sakit demam, maka tidak dapat menghadiri acara",
                        "C": "Budi sakit demam maka Budi tidak hadir pelantikan",
                        "D": "Walaupun Budi sakit demam, Budi tidak hadir",
                        "E": "Karena Budi sakit demam, Budi tidak dapat hadir"
                    },
                    "answer": "A",
                    "solution": "Subjek yang sama pada anak kalimat dan induk kalimat cukup ditulis satu kali pada induk kalimat, serta hilangkan kata 'maka'."
                },
                {
                    "num": 20,
                    "topic": "Kecermatan Pilihan Kata (Diksi)",
                    "question": "Kalimat dengan pilihan diksi yang TEPAT dan CERMAT adalah...",
                    "options": {
                        "A": "Pencuri itu berhasil meloloskan diri dari kepungan polisi",
                        "B": "Polisi berhasil menangkap pencuri yang berusaha melarikan diri",
                        "C": "Pencuri itu sukses mencuri sepeda motor di tempat parkir",
                        "D": "Banjir bandang itu berhasil menenggelamkan ratusan rumah warga",
                        "E": "Gunung meletus berhasil mengeluarkan awan panas"
                    },
                    "answer": "B",
                    "solution": "Kata 'berhasil' berkonotasi positif (pencapaian yang diharapkan). Tidak tepat jika 'pencuri berhasil mencuri' atau 'banjir berhasil menenggelamkan'. Yang tepat adalah aparat kepolisian yang berhasil menangkap pelanggar hukum."
                }
            ]
        },
        {
            "id": "eyd_v_ejaan",
            "title": "Pedoman Ejaan Bahasa Indonesia (EYD V / PUEBI)",
            "description": "Penulisan Huruf Kapital & Miring, Tanda Baca Koma/Titik Dua/Petik, Bentuk Terikat & Peluluhan Fonem KTSP",
            "questions": [
                {
                    "num": 1,
                    "topic": "Penulisan Huruf Kapital Nama Geografi",
                    "question": "Penulisan huruf kapital yang BENAR menurut EYD V adalah...",
                    "options": {
                        "A": "Kami berenang di danau Toba kemarin",
                        "B": "Kami berenang di Danau Toba kemarin",
                        "C": "Kami berenang di danau toba kemarin",
                        "D": "Kami membeli garam Inggris di apotek",
                        "E": "Bibi membuat rujak dengan gula Jawa"
                    },
                    "answer": "B",
                    "solution": "Huruf kapital digunakan untuk nama geografi spesifik yang diikuti nama diri: *Danau Toba, Sungai Musi, Selat Sunda*. Huruf kecil digunakan untuk nama jenis yang bukan asal geografi: *garam inggris, gula jawa, jeruk bali, kunci inggris*."
                },
                {
                    "num": 2,
                    "topic": "Penulisan Huruf Miring",
                    "question": "Penggunaan huruf miring yang TEPAT dalam teks cetak adalah...",
                    "options": {
                        "A": "Majalah *Tempo* diterbitkan setiap pekan",
                        "B": "Ia sedang membaca novel *Laskar Pelangi* karya Andrea Hirata",
                        "C": "Istilah *software engineering* diterjemahkan menjadi rekayasa perangkat lunak",
                        "D": "Semua jawaban A, B, dan C benar",
                        "E": "Hanya B yang benar"
                    },
                    "answer": "D",
                    "solution": "Huruf miring digunakan untuk: (1) judul buku, majalah, dan surat kabar yang dikutip dalam teks; (2) kata atau ungkapan bahasa asing atau bahasa daerah yang belum diserap ke dalam bahasa Indonesia."
                },
                {
                    "num": 3,
                    "topic": "Penggunaan Tanda Koma Anak Kalimat",
                    "question": "Penggunaan tanda koma (,) yang BENAR menurut EYD V adalah...",
                    "options": {
                        "A": "Saya ingin membeli laptop baru, tetapi tabungan saya belum mencukupi",
                        "B": "Jika hari ini tidak hujan, kami akan berkemah di kaki bukit",
                        "C": "Ibu membeli apel, jeruk, dan mangga di pasar buah",
                        "D": "Oleh karena itu, kita harus mematuhi rambu-rambu lalu lintas",
                        "E": "Semua jawaban A, B, C, dan D benar"
                    },
                    "answer": "E",
                    "solution": "Semua contoh memenuhi kaidah: (A) koma sebelum konjungsi pertentangan *tetapi*; (B) koma memisahkan anak kalimat yang mendahului induk kalimat; (C) koma perincian 3 unsur termasuk sebelum *dan*; (D) koma setelah konjungsi antarkalimat."
                },
                {
                    "num": 4,
                    "topic": "Kesalahan Tanda Koma Induk Mendahului Anak",
                    "question": "Penggunaan tanda koma yang SALAH (tidak sesuai EYD V) adalah...",
                    "options": {
                        "A": "Dia tidak masuk sekolah, karena sedang menderita flu berat",
                        "B": "Karena sedang menderita flu berat, dia tidak masuk sekolah",
                        "C": "Meskipun lelah, ia tetap menyelesaikan tugasnya",
                        "D": "Ayah mencuci mobil, sedangkan adik menyapu teras rumah",
                        "E": "Wah, indah sekali pemandangan lembah ini!"
                    },
                    "answer": "A",
                    "solution": "Jika induk kalimat mendahului anak kalimat dengan konjungsi subordinatif *karena*, TIDAK BOLEH menggunakan tanda koma: 'Dia tidak masuk sekolah karena sedang menderita flu berat'."
                },
                {
                    "num": 5,
                    "topic": "Penulisan Bentuk Terikat",
                    "question": "Penulisan bentuk terikat yang BENAR menurut EYD V adalah...",
                    "options": {
                        "A": "pasca panen",
                        "B": "antar kota",
                        "C": "pascasarjana",
                        "D": "sub sektor",
                        "E": "tuna wisma"
                    },
                    "answer": "C",
                    "solution": "Bentuk terikat (*pasca-, antar-, sub-, tuna-, pra-, non-*) ditulis serangkai dengan kata yang mengikutinya: *pascasarjana, antarkota, subsektor, tunawisma, pramusim*."
                },
                {
                    "num": 6,
                    "topic": "Bentuk Terikat Diikuti Kata Huruf Kapital",
                    "question": "Penulisan bentuk terikat 'non' atau 'pan' yang diikuti kata berhuruf kapital menggunakan...",
                    "options": {
                        "A": "Spasi (non Indonesia)",
                        "B": "Tanda hubung strip (non-Indonesia)",
                        "C": "Digabung langsung (nonIndonesia)",
                        "D": "Tanda kurung (non(Indonesia))",
                        "E": "Huruf miring (non *Indonesia*)"
                    },
                    "answer": "B",
                    "solution": "Jika bentuk terikat diikuti kata yang diawali huruf kapital, digunakan tanda hubung (-): *non-Indonesia, pan-Asia, anti-Amerika*."
                },
                {
                    "num": 7,
                    "topic": "Peluluhan Fonem KTSP",
                    "question": "Kata berimbuhan *meN-* yang BENAR sesuai kaidah peluluhan fonem KTSP adalah...",
                    "options": {
                        "A": "Mempesona (kata dasar: pesona)",
                        "B": "Memesona (kata dasar: pesona)",
                        "C": "Mempengaruhi (kata dasar: pengaruh)",
                        "D": "Menterjemahkan (kata dasar: terjemah)",
                        "E": "Mensukseskan (kata dasar: sukses)"
                    },
                    "answer": "B",
                    "solution": "Huruf K, T, S, P yang diikuti huruf vokal luluh saat diberi awalan meN-: *pesona* -> *memesona*, *pengaruh* -> *memengaruhi*, *terjemah* -> *menerjemahkan*, *sukses* -> *menyukseskan*."
                },
                {
                    "num": 8,
                    "topic": "Pengecualian Gugus Konsonan KTSP",
                    "question": "Peluluhan fonem K, T, S, P TIDAK berlaku jika kata dasar diawali gugus konsonan (konsonan ganda). Kata yang BENAR adalah...",
                    "options": {
                        "A": "Mengkristal (bukan mengistal)",
                        "B": "Memprogram (bukan memorogram)",
                        "C": "Mentransfer (bukan meneransfer)",
                        "D": "Menskors (bukan menyekors)",
                        "E": "Semua jawaban A, B, C, dan D benar"
                    },
                    "answer": "E",
                    "solution": "Gugus konsonan (*kr-, pr-, tr-, sk-*) tidak luluh saat diberi awalan meN-: *mengkristal, memprogram, mentransfer, menskors*."
                },
                {
                    "num": 9,
                    "topic": "Penulisan Partikel Pun",
                    "question": "Penulisan partikel *pun* yang BENAR menurut EYD V adalah...",
                    "options": {
                        "A": "Meski pun hari hujan, ia tetap berangkat",
                        "B": "Meskipun hari hujan, ia tetap berangkat",
                        "C": "Siapa pun yang datang harus lapor satpam",
                        "D": "Jawaban B dan C benar",
                        "E": "Hanya A yang benar"
                    },
                    "answer": "D",
                    "solution": "Partikel *pun* yang ditulis serangkai ada 12 bentuk klise (termasuk *meskipun, walaupun, adapun, bagaimanapun, maupun*). Sedangkan partikel *pun* yang bermakna 'juga' atau 'saja' ditulis terpisah (*siapa pun, satu kali pun*). Maka B dan C benar."
                },
                {
                    "num": 10,
                    "topic": "Tanda Titik Dua (:)",
                    "question": "Penggunaan tanda titik dua (:) yang TEPAT adalah...",
                    "options": {
                        "A": "Ibu membeli: gula, garam, dan beras",
                        "B": "Kita memerlukan perabot rumah tangga: kursi, meja, dan lemari",
                        "C": "Ketua: Ahmad, Sekretaris: Siti, Bendahara: Budi",
                        "D": "Jawaban B dan C benar",
                        "E": "Hanya A yang benar"
                    },
                    "answer": "D",
                    "solution": "Tanda titik dua digunakan pada akhir pernyataan lengkap yang diikuti rincian (B) atau setelah kata/ungkapan yang memerlukan pemerian (C). Pada A salah karena didahului predikat 'membeli' tanpa frasa pengantar rincian."
                },
                {
                    "num": 11,
                    "topic": "Penulisan Gabungan Kata Awalan dan Akhiran",
                    "question": "Penulisan gabungan kata yang mendapat awalan dan akhiran sekaligus yang BENAR adalah...",
                    "options": {
                        "A": "mempertanggung jawabkan",
                        "B": "mempertanggungjawabkan",
                        "C": "mempertanggung-jawabkan",
                        "D": "mempertanggung jawab kan",
                        "E": "memper tanggungjawabkan"
                    },
                    "answer": "B",
                    "solution": "Jika gabungan kata mendapat awalan dan akhiran sekaligus (konfiks), penulisannya wajib serangkai: *mempertanggungjawabkan, menandatangani, menyebarluaskan*."
                },
                {
                    "num": 12,
                    "topic": "Penulisan Gelar Akademik",
                    "question": "Penulisan nama dan gelar akademik yang TEPAT menurut EYD V adalah...",
                    "options": {
                        "A": "Dr. Ir. Bagas Pratama, S.Kom., M.T.",
                        "B": "Dr, Ir, Bagas Pratama S.Kom, M.T",
                        "C": "Dr. Ir. Bagas Pratama. S.Kom. M.T.",
                        "D": "Dr Ir Bagas Pratama, SKom, MT",
                        "E": "Doktor Insinyur Bagas Pratama SKom MT"
                    },
                    "answer": "A",
                    "solution": "Gelar di depan nama disingkat dengan tanda titik (*Dr. Ir.*). Antara nama dan gelar belakang dipisahkan koma, dan antargelar dipisahkan koma: *Bagas Pratama, S.Kom., M.T.*."
                },
                {
                    "num": 13,
                    "topic": "Penulisan Singkatan Resmi",
                    "question": "Penulisan singkatan tiga huruf atau lebih yang diikuti tanda titik yang BENAR adalah...",
                    "options": {
                        "A": "dll. (dan lain-lain)",
                        "B": "dsb. (dan sebagainya)",
                        "C": "dst. (dan seterusnya)",
                        "D": "hlm. (halaman)",
                        "E": "Semua jawaban benar"
                    },
                    "answer": "E",
                    "solution": "Singkatan umum yang terdiri atas tiga huruf atau lebih diakhiri dengan satu tanda titik: *dll., dsb., dst., hlm., sda., yth.*."
                },
                {
                    "num": 14,
                    "topic": "Penulisan Angka dan Bilangan",
                    "question": "Penulisan angka dan bilangan yang BENAR menurut EYD V adalah...",
                    "options": {
                        "A": "30 orang siswa mengikuti seleksi olimpiade di aula",
                        "B": "Sebanyak 30 orang siswa mengikuti seleksi olimpiade di aula",
                        "C": "Tiga puluh orang siswa mengikuti seleksi olimpiade di aula",
                        "D": "Jawaban B dan C benar",
                        "E": "Hanya A yang benar"
                    },
                    "answer": "D",
                    "solution": "Angka tidak boleh diletakkan pada awal kalimat. Untuk mengatasinya, ubah kalimatnya dengan kata pengantar (B) atau tuliskan bilangan tersebut dengan huruf (C). Maka B dan C benar."
                },
                {
                    "num": 15,
                    "topic": "Penulisan Kata Depan 'di' vs Imbuhan 'di-'",
                    "question": "Penulisan kata yang TEPAT adalah...",
                    "options": {
                        "A": "di rumah (kata depan) dan dimakan (imbuhan)",
                        "B": "dirumah (kata depan) dan di makan (imbuhan)",
                        "C": "di-rumah dan di-makan",
                        "D": "dirumah dan dimakan",
                        "E": "di rumah dan di makan"
                    },
                    "answer": "A",
                    "solution": "Kata depan 'di' penunjuk tempat ditulis terpisah (*di rumah, di sekolah*). Imbuhan 'di-' pembentuk verba pasif ditulis serangkai (*dimakan, ditulis, dikerjakan*)."
                },
                {
                    "num": 16,
                    "topic": "Penulisan Kata Serapan Baku",
                    "question": "Kelompok kata serapan yang SEMUANYA BAKU adalah...",
                    "options": {
                        "A": "Apotik, sistim, analisa, jaman",
                        "B": "Apotek, sistem, analisis, zaman",
                        "C": "Apotik, sistem, analisa, zaman",
                        "D": "Apotek, sistim, analisis, jaman",
                        "E": "Apotik, sistim, analisis, zaman"
                    },
                    "answer": "B",
                    "solution": "Bentuk baku menurut KBBI dan EYD V: *apotek* (bukan apotik), *sistem* (bukan sistim), *analisis* (bukan analisa), *zaman* (bukan jaman)."
                },
                {
                    "num": 17,
                    "topic": "Tanda Hubung pada Pengulangan",
                    "question": "Penulisan bentuk ulang kata yang BENAR adalah...",
                    "options": {
                        "A": "anak-anak",
                        "B": "buku²",
                        "C": "anak2",
                        "D": "kupu kupu",
                        "E": "ber-ulang ulang"
                    },
                    "answer": "A",
                    "solution": "Bentuk ulang ditulis secara lengkap dengan menggunakan tanda hubung (-). Angka dua (²) tidak diakui dalam penulisan bahasa Indonesia baku."
                },
                {
                    "num": 18,
                    "topic": "Tanda Titik Koma (;)",
                    "question": "Tanda titik koma (;) dapat digunakan untuk...",
                    "options": {
                        "A": "Mengakhiri kalimat tanya",
                        "B": "Menggantikan kata penghubung untuk memisahkan kalimat setara di dalam kalimat majemuk",
                        "C": "Memisahkan anak kalimat dari induk kalimat",
                        "D": "Menandai kutipan langsung",
                        "E": "Menyatakan nilai uang"
                    },
                    "answer": "B",
                    "solution": "Tanda titik koma berfungsi sebagai pengganti konjungsi setara: 'Hari sudah larut malam; tugas pemrograman belum selesai'."
                },
                {
                    "num": 19,
                    "topic": "Tanda Petik Ganda (\"...\")",
                    "question": "Penggunaan tanda petik ganda yang BENAR adalah...",
                    "options": {
                        "A": "Ibu berpesan, \"Jangan pulang terlalu larut malam.\"",
                        "B": "Sajak \"Aku\" karya Chairil Anwar sangat terkenal.",
                        "C": "Ia memakai celana \"cutbrai\" model tahun 1970-an.",
                        "D": "Semua jawaban A, B, dan C benar",
                        "E": "Hanya A yang benar"
                    },
                    "answer": "D",
                    "solution": "Tanda petik dipakai untuk petikan langsung (A), judul puisi/artikel (B), dan istilah yang memiliki arti khusus (C)."
                },
                {
                    "num": 20,
                    "topic": "Penulisan Kata Maha Esa",
                    "question": "Penulisan kata ganti Tuhan yang BENAR menurut EYD V adalah...",
                    "options": {
                        "A": "Tuhan Yang Maha Esa dan Tuhan Yang Mahakuasa",
                        "B": "Tuhan Yang Mahaesa dan Tuhan Yang Maha Kuasa",
                        "C": "Tuhan yang maha esa dan Tuhan yang mahakuasa",
                        "D": "Tuhan Yang Maha-Esa dan Tuhan Yang Maha-Kuasa",
                        "E": "Tuhan yang Maha Esa dan Tuhan yang Maha Kuasa"
                    },
                    "answer": "A",
                    "solution": "Kata 'Maha' ditulis terpisah jika diikuti kata 'Esa' (*Tuhan Yang Maha Esa*). Untuk kata dasar lain selain Esa, ditulis serangkai: *Tuhan Yang Mahakuasa, Mahapengasih, Mahabesar*."
                }
            ]
        },
        {
            "id": "keterpaduan_paragraf",
            "title": "Keterpaduan Paragraf & Wacana",
            "description": "Kohesi Leksikal/Gramatikal, Koherensi Gagasan, Deteksi Kalimat Sumbang, Mengurutkan Kalimat Acak & Melengkapi Teks Rumpang",
            "questions": [
                {
                    "num": 1,
                    "topic": "Deteksi Kalimat Sumbang",
                    "question": "Perhatikan paragraf berikut:\n(1) Pembelajaran daring selama masa pandemi mendorong akselerasi transformasi digital di sekolah.\n(2) Guru dan siswa dituntut untuk terbiasa menggunakan platform konferensi video dan Learning Management System (LMS).\n(3) Harga kuota internet yang ditawarkan operator telekomunikasi sangat bervariasi di pasaran.\n(4) Keterampilan baru dalam mengelola kelas digital ini tetap menjadi modal berharga pascapandemi.\n\nKalimat sumbang yang merusak kepaduan paragraf tersebut adalah kalimat nomor...",
                    "options": {"A": "(1)", "B": "(2)", "C": "(3)", "D": "(4)", "E": "Tidak ada"},
                    "answer": "C",
                    "solution": "Kalimat (3) membahas persaingan harga kuota operator komersial, melenceng dari topik adaptasi keterampilan digital guru dan murid."
                },
                {
                    "num": 2,
                    "topic": "Kohesi Leksikal Repetisi",
                    "question": "'Air bersih merupakan kebutuhan mutlak bagi kehidupan manusia. Tanpa air bersih yang memadai, sanitasi lingkungan akan memburuk dan memicu berbagai wabah penyakit.' Peranti kohesi leksikal yang digunakan pada kedua kalimat di atas adalah...",
                    "options": {"A": "Substitusi", "B": "Repetisi (pengulangan kata 'air bersih')", "C": "Elipsis", "D": "Antonim", "E": "Konjungsi subordinatif"},
                    "answer": "B",
                    "solution": "Pengulangan frasa kunci 'air bersih' mengikat kedua kalimat secara leksikal."
                },
                {
                    "num": 3,
                    "topic": "Mengurutkan Kalimat Acak Prosedur",
                    "question": "Urutkan langkah acak instalasi framework Laravel berikut:\n(1) Jalankan perintah `composer create-project laravel/laravel nama-proyek` di terminal.\n(2) Pastikan PHP dan Composer telah terinstal di komputer Anda.\n(3) Masuk ke direktori proyek dengan perintah `cd nama-proyek`.\n(4) Jalankan server lokal dengan perintah `php artisan serve`.\n\nUrutan prosedur yang logis dan runtut adalah...",
                    "options": {"A": "(2)-(1)-(3)-(4)", "B": "(1)-(2)-(3)-(4)", "C": "(2)-(3)-(1)-(4)", "D": "(1)-(3)-(2)-(4)", "E": "(3)-(2)-(1)-(4)"},
                    "answer": "A",
                    "solution": "Langkah awal: verifikasi prasyarat PHP/Composer (2), lalu instalasi project via composer (1), masuk direktori (3), dan jalankan local server (4)."
                },
                {
                    "num": 4,
                    "topic": "Melengkapi Paragraf Rumpang",
                    "question": "'Tingkat penetrasi internet di Indonesia telah mencapai lebih dari 75 persen. [...]. Oleh karena itu, edukasi literasi digital mengenai keamanan data pribadi dan pencegahan penipuan online menjadi sangat mendesak untuk digencarkan.'\n\nKalimat yang paling tepat untuk melengkapi bagian rumpang adalah...",
                    "options": {
                        "A": "Masyarakat kini lebih gemar berbelanja di pasar tradisional dibanding toko online",
                        "B": "Namun demikian, tingginya akses internet tersebut belum diimbangi dengan kesadaran keamanan siber yang memadai",
                        "C": "Harga perangkat komputer semakin hari semakin terjangkau bagi pelajar",
                        "D": "Operator seluler membangun menara BTS baru di daerah terpencil",
                        "E": "Pemerintah berencana menaikkan tarif pajak pertambahan nilai pulsa"
                    },
                    "answer": "B",
                    "solution": "Kalimat B menjembatani tingginya akses (75%) dengan simpulan perlunya edukasi keamanan data pada kalimat berikutnya (koherensi logis)."
                },
                {
                    "num": 5,
                    "topic": "Kohesi Gramatikal Referensi",
                    "question": "'Presiden meresmikan bendungan serbaguna di Jawa Tengah kemarin. **Beliau** berharap infrastruktur pengairan ini mampu meningkatkan hasil panen petani lokal.' Kata **Beliau** merupakan peranti kohesi gramatikal berupa...",
                    "options": {"A": "Referensi personal (Pengacuan persona)", "B": "Elipsis", "C": "Konjungsi koordinatif", "D": "Repetisi sinonim", "E": "Asosiasi"},
                    "answer": "A",
                    "solution": "'Beliau' adalah kata ganti orang ketiga tunggal yang mengacu pada Presiden (referensi personal)."
                },
                {
                    "num": 6,
                    "topic": "Koherensi Sebab-Akibat",
                    "question": "'Petani di desa itu mengalami gagal panen total [...] serangan hama wereng cokelat yang tidak terkendali.' Konjungsi sebab yang tepat untuk menghubungkan kedua klausa tersebut adalah...",
                    "options": {"A": "sehingga", "B": "akibat", "C": "karena", "D": "walaupun", "E": "bahkan"},
                    "answer": "B",
                    "solution": "Diikuti frasa nomina 'serangan hama wereng...', kata penghubung yang paling tepat adalah 'akibat' (atau 'disebabkan oleh')."
                },
                {
                    "num": 7,
                    "topic": "Kalimat Penutup Paragraf",
                    "question": "Sebuah paragraf memaparkan bahaya polusi plastik di lautan bagi ekosistem terumbu karang dan rantai makanan manusia. Kalimat penutup yang persuasif dan padu adalah...",
                    "options": {
                        "A": "Plastik terbuat dari polimer minyak bumi yang sukar terurai",
                        "B": "Oleh sebab itu, pengurangan penggunaan plastik sekali pakai harus menjadi komitmen bersama demi menyelamatkan masa depan bumi",
                        "C": "Harga kantong kresek di minimarket kini dihargai dua ratus rupiah",
                        "D": "Ikan paus merupakan mamalia laut terbesar di dunia",
                        "E": "Banyak turis asing yang berkunjung ke pantai Bali"
                    },
                    "answer": "B",
                    "solution": "Kalimat penutup menyimpulkan urgensi dan mengajak tindakan solutif yang selaras dengan seluruh isi paragraf."
                },
                {
                    "num": 8,
                    "topic": "Deteksi Kalimat Tidak Logis dalam Wacana",
                    "question": "Dalam sebuah artikel kesehatan: 'Banyak orang beranggapan bahwa mandi malam dapat menyebabkan rematik. Namun, para ahli reumatologi menegaskan bahwa rematik disebabkan oleh gangguan autoimun, bukan suhu air dingin.' Hubungan kedua kalimat tersebut menyatakan...",
                    "options": {"A": "Pertentangan koreksi atas mitos masyarakat", "B": "Sebab akibat searah", "C": "Penambahan informasi sejenis", "D": "Rincian contoh kasus", "E": "Kesimpulan akhir"},
                    "answer": "A",
                    "solution": "Kalimat kedua membantah dan meluruskan mitos/persepsi keliru yang dikemukakan pada kalimat pertama."
                },
                {
                    "num": 9,
                    "topic": "Mengurutkan Kalimat Narasi Acak",
                    "question": "Urutkan kalimat acak berikut:\n(1) Suara sirine pemadam kebakaran memecah keheningan dini hari itu.\n(2) Warga berhamburan keluar rumah dengan panik menyelamatkan barang berharga.\n(3) Sebuah kios kelontong di sudut pasar tiba-tiba mengeluarkan asap tebal.\n(4) Petugas bergerak cepat menyemprotkan air hingga api berhasil dipadamkan dua jam kemudian.\n\nUrutan kronologis cerita yang benar adalah...",
                    "options": {"A": "(3)-(2)-(1)-(4)", "B": "(1)-(3)-(2)-(4)", "C": "(3)-(1)-(2)-(4)", "D": "(2)-(3)-(1)-(4)", "E": "(1)-(2)-(3)-(4)"},
                    "answer": "A",
                    "solution": "Peristiwa bermula dari munculnya asap di kios (3), kepanikan warga (2), kedatangan mobil pemadam dengan sirine (1), dan pemadaman api hingga tuntas (4)."
                },
                {
                    "num": 10,
                    "topic": "Elipsis (Pelesapan)",
                    "question": "'Budi menyukai pemrograman backend, sedangkan Doni [...] pemrograman frontend.' Bagian rumpang yang dilesapkan (elipsis) adalah...",
                    "options": {"A": "menyukai", "B": "menolak", "C": "belajar", "D": "bekerja", "E": "membuat"},
                    "answer": "A",
                    "solution": "Elipsis menghilangkan predikat 'menyukai' yang sudah ada di klausa pertama agar kalimat lebih hemat dan padu."
                },
                {
                    "num": 11,
                    "topic": "Penempatan Konjungsi Antarparagraf",
                    "question": "Konjungsi yang lazim diletakkan di awal paragraf baru untuk menyatakan sudut pandang yang berlawanan dari paragraf sebelumnya adalah...",
                    "options": {"A": "Di samping itu,", "B": "Sebaliknya,", "C": "Dengan demikian,", "D": "Sebagai contoh,", "E": "Tambahan lagi,"},
                    "answer": "B",
                    "solution": "'Sebaliknya,' berfungsi menghubungkan dua paragraf yang memiliki muatan kontras/berkebalikan."
                },
                {
                    "num": 12,
                    "topic": "Kepaduan Makna Tematik",
                    "question": "Sebuah esai bertema 'Perkembangan Kendaraan Otonom'. Subtopik yang TIDAK SESUAI dimasukkan ke dalam esai ini adalah...",
                    "options": {
                        "A": "Algoritma Computer Vision dan sensor LiDAR",
                        "B": "Kerangka regulasi hukum pertanggungjawaban kecelakaan mobil pintar",
                        "C": "Sejarah penemuan mesin uap pada era Revolusi Industri 1.0",
                        "D": "Uji coba keselamatan jalan raya untuk taksi tanpa sopir",
                        "E": "Tantangan konektivitas jaringan 5G berkecepatan tinggi"
                    },
                    "answer": "C",
                    "solution": "Sejarah mesin uap abad ke-18 terlalu jauh dari fokus teknologi modern kendaraan otonom cerdas."
                },
                {
                    "num": 13,
                    "topic": "Transisi Tambahan",
                    "question": "'Selain memberikan beasiswa biaya kuliah penuh, yayasan tersebut [...] menyediakan fasilitas asrama dan laptop gratis bagi mahasiswa penerima manfaat.' Konjungsi yang tepat adalah...",
                    "options": {"A": "tetapi", "B": "juga", "C": "melainkan", "D": "sehingga", "E": "padahal"},
                    "answer": "B",
                    "solution": "Frasa transisi pasangan dari 'Selain...' adalah '... juga'."
                },
                {
                    "num": 14,
                    "topic": "Pemisahan Paragraf yang Terlalu Panjang",
                    "question": "Sebuah paragraf memuat 15 kalimat yang membahas definisi energi terbarukan, lalu di tengah-tengah berpindah membahas kritik terhadap subsidi BBM fosil. Tindakan perbaikan yang tepat adalah...",
                    "options": {
                        "A": "Membiarkannya tetap satu paragraf panjang",
                        "B": "Memecah teks menjadi dua paragraf berbeda pada titik peralihan topik bahasan",
                        "C": "Menghapus seluruh kalimat tentang energi terbarukan",
                        "D": "Menggabungkannya dengan paragraf kesimpulan",
                        "E": "Mengubah kalimat menjadi butir-butir angka"
                    },
                    "answer": "B",
                    "solution": "Satu paragraf hanya boleh memiliki satu ide pokok. Jika topik berpindah ke bahasan subsidi BBM, harus dibuat paragraf baru."
                },
                {
                    "num": 15,
                    "topic": "Kohesi Demonstratif Rujukan Ruang",
                    "question": "'Laboratorium komputer SMKN 6 Tangsel dilengkapi fasilitas mutakhir. Di [...] para siswa mengasah keterampilan rekayasa perangkat lunak.' Kata rujukan ruang yang tepat adalah...",
                    "options": {"A": "sini / sanalah", "B": "mereka", "C": "itu", "D": "demikian", "E": "beliau"},
                    "answer": "A",
                    "solution": "Rujukan ruang menggunakan demonstratif 'sana / situ / sini'."
                },
                {
                    "num": 16,
                    "topic": "Konsistensi Sudut Pandang Penulisan",
                    "question": "Kelemahan sebuah tulisan esai yang pada paragraf pertama menggunakan kata 'penulis', lalu pada paragraf kedua tiba-tiba menggunakan kata 'aku' dan 'gue' adalah melanggar prinsip...",
                    "options": {
                        "A": "Konsistensi sudut pandang dan laras bahasa ilmiah",
                        "B": "Kaidah tanda koma",
                        "C": "Panjang kalimat",
                        "D": "Pemilihan tema",
                        "E": "Kecepatan membaca"
                    },
                    "answer": "A",
                    "solution": "Laras bahasa teks akademis/formal menuntut konsistensi kata ganti dan nada penulisan dari awal hingga akhir."
                },
                {
                    "num": 17,
                    "topic": "Menentukan Hubungan Logis Antarkalimat",
                    "question": "Kalimat 1: 'Pemerintah memperluas jaringan serat optik hingga pelosok desa.'\nKalimat 2: 'Masyarakat pedesaan kini dapat mengakses layanan perbankan digital dan pendidikan daring.'\nHubungan semantis antara kalimat 1 dan kalimat 2 adalah...",
                    "options": {"A": "Sebab - Akibat", "B": "Pertentangan", "C": "Syarat", "D": "Tujuan", "E": "Perbandingan"},
                    "answer": "A",
                    "solution": "Kalimat 1 menjadi sebab (perluasan serat optik), kalimat 2 adalah dampak/akibat positif yang timbul."
                },
                {
                    "num": 18,
                    "topic": "Kalimat Pembuka Paragraf",
                    "question": "Kalimat pembuka yang PALING BAIK untuk memulai paragraf tentang 'Pentingnya Tidur Cukup bagi Konsentrasi Belajar Remaja' adalah...",
                    "options": {
                        "A": "Tidur merupakan kebutuhan biologis esensial yang memengaruhi fungsi kognitif dan konsentrasi belajar otak manusia",
                        "B": "Bantal yang empuk dijual dengan diskon besar di toko furnitur",
                        "C": "Malam hari adalah waktu setelah matahari terbenam",
                        "D": "Banyak alarm jam beker yang berbunyi sangat nyaring di pagi hari",
                        "E": "Kopi mengandung kafein yang tinggi"
                    },
                    "answer": "A",
                    "solution": "Kalimat A langsung mengantarkan topik sentral hubungan tidur biologis dengan fungsi kognitif/konsentrasi."
                },
                {
                    "num": 19,
                    "topic": "Identifikasi Kata Kunci (Keywords)",
                    "question": "Dalam paragraf bertema 'Keamanan Siber di Era Komputasi Awan', kata kunci yang wajib muncul secara konsisten untuk menjaga kepaduan adalah...",
                    "options": {
                        "A": "Enkripsi, data, kerentanan, cloud security",
                        "B": "Kabel, monitor, keyboard, meja",
                        "C": "Pasar, saham, dividen, laba",
                        "D": "Padi, pupuk, traktor, panen",
                        "E": "Cuaca, awan mendung, hujan lebat"
                    },
                    "answer": "A",
                    "solution": "Terminologi teknis *enkripsi, data, kerentanan, cloud security* mengikat tema keamanan siber secara tematik."
                },
                {
                    "num": 20,
                    "topic": "Prinsip Keutuhan Paragraf",
                    "question": "Sebuah paragraf dikatakan memiliki KEUTUHAN (unity) jika...",
                    "options": {
                        "A": "Memiliki minimal 500 kata dalam satu paragraf",
                        "B": "Seluruh kalimat penjelas secara kompak hanya mengembangkan satu gagasan utama tanpa ada gagasan menyimpang",
                        "C": "Menggunakan sebanyak mungkin istilah bahasa asing",
                        "D": "Semua kalimat berbentuk kalimat tanya",
                        "E": "Disertai grafik berwarna-warni"
                    },
                    "answer": "B",
                    "solution": "Prinsip keutuhan (*unity*) terpenuhi manakala seluruh kalimat dalam paragraf berfokus mendukung satu ide pokok utama."
                }
            ]
        }
    ]
}
