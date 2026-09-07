import 'package:flutter/material.dart';
import '../models/mastery_status.dart';
import '../models/subject.dart';
import '../models/topic.dart';
import '../models/checklist_item.dart';
import '../local/hive_service.dart';
import '../../core/constants/app_constants.dart';

/// Repository for subjects and topics
class SubjectRepository {
  /// Get all subjects
  List<Subject> getAllSubjects() {
    var subjects = HiveService.getAllSubjects();

    // If empty, initialize with default subjects
    if (subjects.isEmpty) {
      _initializeSubjects();
      subjects = HiveService.getAllSubjects();
    }

    return subjects;
  }

  /// Get subject by ID
  Subject? getSubject(String id) {
    return HiveService.getSubject(id);
  }

  /// Get topics by subject
  List<Topic> getTopicsBySubject(String subjectId) {
    return HiveService.getTopicsBySubject(subjectId);
  }

  /// Get root topics (no parent) for a subject
  List<Topic> getRootTopics(String subjectId) {
    final topics = HiveService.getTopicsBySubject(subjectId);
    return topics.where((t) => t.parentId == null).toList()
      ..sort((a, b) => a.order.compareTo(b.order));
  }

  /// Get child topics
  List<Topic> getChildTopics(String parentId) {
    return HiveService.getTopicsByParent(parentId)
      ..sort((a, b) => a.order.compareTo(b.order));
  }

  /// Get topic by ID
  Topic? getTopic(String id) {
    return HiveService.getTopic(id);
  }

  /// Save topic
  Future<void> saveTopic(Topic topic) async {
    await HiveService.saveTopic(topic);
  }

  /// Update topic status
  Future<void> updateTopicStatus(String topicId, Topic updatedTopic) async {
    await HiveService.saveTopic(updatedTopic);
  }

  /// Toggle checklist item
  Future<void> toggleChecklistItem(String topicId, String itemId) async {
    final topic = HiveService.getTopic(topicId);
    if (topic != null) {
      final item = topic.checklist.firstWhere((c) => c.id == itemId);
      item.toggle();
      topic.updateStatusFromChecklist();
      await HiveService.saveTopic(topic);
    }
  }

  /// Mark topic as mastered
  Future<void> markAsMastered(String topicId) async {
    final topic = HiveService.getTopic(topicId);
    if (topic != null) {
      topic.markAsMastered();
      await HiveService.saveTopic(topic);
    }
  }

  /// Reset topic progress
  Future<void> resetTopicProgress(String topicId) async {
    final topic = HiveService.getTopic(topicId);
    if (topic != null) {
      topic.resetProgress();
      await HiveService.saveTopic(topic);
    }
  }

  /// Add custom checklist item
  Future<void> addChecklistItem(String topicId, String title) async {
    final topic = HiveService.getTopic(topicId);
    if (topic != null) {
      topic.addChecklistItem(title);
      await HiveService.saveTopic(topic);
    }
  }

  /// Initialize default subjects and topics
  Future<void> _initializeSubjects() async {
    // Create subjects
    final subjects = [
      Subject(
        id: AppConstants.subjectMatematikaOSN,
        name: 'Matematika OSN',
        icon: '📐',
        description: 'Matematika Olimpade Sains Nasional',
        color: const Color(0xFF4ADE80),
        order: 0,
      ),
      Subject(
        id: AppConstants.subjectTKAMatematika,
        name: 'TKA Matematika',
        icon: '📊',
        description: 'Tes Kemampuan Akademik Matematika',
        color: const Color(0xFF60A5FA),
        order: 1,
      ),
      Subject(
        id: AppConstants.subjectBahasaIndonesia,
        name: 'Bahasa Indonesia',
        icon: '📝',
        description: 'Bahasa dan Sastra Indonesia',
        color: const Color(0xFFFBBF24),
        order: 2,
      ),
      Subject(
        id: AppConstants.subjectBahasaInggris,
        name: 'Bahasa Inggris',
        icon: '🌐',
        description: 'English Language',
        color: const Color(0xFFF472B6),
        order: 3,
      ),
      Subject(
        id: AppConstants.subjectSerkom,
        name: 'Serkom Laravel',
        icon: '💻',
        description: 'Sertifikasi Kompetensi Laravel/RPL',
        color: const Color(0xFFA78BFA),
        order: 4,
      ),
    ];

    await HiveService.saveSubjects(subjects);

    // Create topics for each subject
    final topics = <Topic>[];
    var topicOrder = 0;

    // ==========================================
    // MATEMATIKA OSN TOPICS
    // ==========================================
    final osnSubject = subjects[0];

    // Aljabar Branch
    final aljabar = Topic(
      id: '${osnSubject.id}_aljabar',
      subjectId: osnSubject.id,
      title: 'Aljabar',
      description: 'Persamaan, pertidaksamaan, fungsi, barisan dan deret',
      isLeaf: false,
      order: topicOrder++,
    );
    topics.add(aljabar);

    // Aljabar children
    final aljabarChildren = [
      Topic(
        id: '${osnSubject.id}_aljabar_persamaan',
        subjectId: osnSubject.id,
        parentId: aljabar.id,
        title: 'Persamaan & Pertidaksamaan',
        description: 'Linear, Kuadrat, Polinomial, AM-GM, Cauchy',
        isLeaf: false,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_persamaan_linear',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_persamaan',
        title: 'Persamaan Linear',
        description: 'Persamaan linear satu dan dua variabel',
        checklist: _createDefaultChecklist('Persamaan Linear'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_persamaan_kuadrat',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_persamaan',
        title: 'Persamaan Kuadrat',
        description: 'Akar-akar persamaan kuadrat, diskriminan, rumus ABC',
        checklist: _createDefaultChecklist('Persamaan Kuadrat'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_persamaan_polinomial',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_persamaan',
        title: 'Polinomial',
        description: 'Teorema sisa, teorema faktor, pembagian polinomial',
        checklist: _createDefaultChecklist('Polinomial'),
        isLeaf: true,
        order: 2,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_pertidaksamaan',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_persamaan',
        title: 'Pertidaksamaan',
        description: 'AM-GM, Cauchy-Schwarz, Holder, Jensen',
        checklist: _createDefaultChecklist('Pertidaksamaan'),
        isLeaf: true,
        order: 3,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_sistem',
        subjectId: osnSubject.id,
        parentId: aljabar.id,
        title: 'Sistem Persamaan',
        description: 'Sistem persamaan linear dan non-linear',
        isLeaf: false,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_sistem_linear',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_sistem',
        title: 'Sistem Persamaan Linear',
        description: 'Eliminasi, substitusi, determinan matriks',
        checklist: _createDefaultChecklist('SPL'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_sistem_nonlinear',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_sistem',
        title: 'Sistem Persamaan Non-Linear',
        description: 'Substitusi, eliminasi untuk persamaan non-linear',
        checklist: _createDefaultChecklist('SPL Non-Linear'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_barisan',
        subjectId: osnSubject.id,
        parentId: aljabar.id,
        title: 'Barisan & Deret',
        description: 'Aritmatika, geometri, Fibonacci, deret khusus',
        isLeaf: false,
        order: 2,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_barisan_aritmatika',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_barisan',
        title: 'Barisan Aritmatika',
        description: 'Suku ke-n, jumlah n suku pertama',
        checklist: _createDefaultChecklist('Barisan Aritmatika'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_barisan_geometri',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_barisan',
        title: 'Barisan Geometri',
        description: 'Suku ke-n, rasio, jumlah deret geometri',
        checklist: _createDefaultChecklist('Barisan Geometri'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_barisan_fibonacci',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_barisan',
        title: 'Barisan Fibonacci',
        description: 'Definisi, sifat-sifat, rumus Binet',
        checklist: _createDefaultChecklist('Fibonacci'),
        isLeaf: true,
        order: 2,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_fungsi',
        subjectId: osnSubject.id,
        parentId: aljabar.id,
        title: 'Fungsi',
        description: 'Domain, range, invers, komposisi',
        isLeaf: false,
        order: 3,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_fungsi_domain',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_fungsi',
        title: 'Domain & Range',
        description: 'Domain dan range fungsi',
        checklist: _createDefaultChecklist('Domain & Range'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_fungsi_invers',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_fungsi',
        title: 'Fungsi Invers',
        description: 'Mencari invers dan sifat-sifatnya',
        checklist: _createDefaultChecklist('Fungsi Invers'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_aljabar_fungsi_komposisi',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_aljabar_fungsi',
        title: 'Komposisi Fungsi',
        description: 'f(g(x)), sifat komposisi',
        checklist: _createDefaultChecklist('Komposisi Fungsi'),
        isLeaf: true,
        order: 2,
      ),
    ];
    topics.addAll(aljabarChildren);

    // Analisis/Kalkulus Branch
    final analisis = Topic(
      id: '${osnSubject.id}_analisis',
      subjectId: osnSubject.id,
      title: 'Analisis/Kalkulus',
      description: 'Limit, turunan, integral',
      isLeaf: false,
      order: topicOrder++,
    );
    topics.add(analisis);

    final analisisChildren = [
      Topic(
        id: '${osnSubject.id}_analisis_limit',
        subjectId: osnSubject.id,
        parentId: analisis.id,
        title: 'Limit',
        description: 'Limit fungsi, limit tak hingga',
        checklist: _createDefaultChecklist('Limit'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_analisis_turunan',
        subjectId: osnSubject.id,
        parentId: analisis.id,
        title: 'Turunan',
        description: 'Aturan rantai, turunan implisit, turunan tinggi',
        isLeaf: false,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_analisis_turunan_dasar',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_analisis_turunan',
        title: 'Turunan Dasar',
        description: 'Aturan pangkat, jumlah, hasil kali',
        checklist: _createDefaultChecklist('Turunan Dasar'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_analisis_turunan_rantai',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_analisis_turunan',
        title: 'Aturan Rantai',
        description: 'Turunan fungsi komposisi',
        checklist: _createDefaultChecklist('Aturan Rantai'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_analisis_integral',
        subjectId: osnSubject.id,
        parentId: analisis.id,
        title: 'Integral',
        description: 'Integral tentu, tak tentu, parsial, substitusi',
        isLeaf: false,
        order: 2,
      ),
      Topic(
        id: '${osnSubject.id}_analisis_integral_taktentu',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_analisis_integral',
        title: 'Integral Tak Tentu',
        description: 'Anti-turunan, konstanta integrasi',
        checklist: _createDefaultChecklist('Integral Tak Tentu'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_analisis_integral_tentu',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_analisis_integral',
        title: 'Integral Tentu',
        description: 'Teorema fundamental kalkulus',
        checklist: _createDefaultChecklist('Integral Tentu'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_analisis_integral_parsial',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_analisis_integral',
        title: 'Integral Parsial & Substitusi',
        description: 'Teknik integrasi lanjut',
        checklist: _createDefaultChecklist('Integral Parsial'),
        isLeaf: true,
        order: 2,
      ),
      Topic(
        id: '${osnSubject.id}_analisis_aplikasi',
        subjectId: osnSubject.id,
        parentId: analisis.id,
        title: 'Aplikasi Kalkulus',
        description: 'Optimasi, laju perubahan',
        checklist: _createDefaultChecklist('Aplikasi Kalkulus'),
        isLeaf: true,
        order: 3,
      ),
    ];
    topics.addAll(analisisChildren);

    // Geometri Branch
    final geometri = Topic(
      id: '${osnSubject.id}_geometri',
      subjectId: osnSubject.id,
      title: 'Geometri',
      description: 'Segitiga, lingkaran, trigonometri, geometri analitik',
      isLeaf: false,
      order: topicOrder++,
    );
    topics.add(geometri);

    final geometriChildren = [
      Topic(
        id: '${osnSubject.id}_geometri_segitiga',
        subjectId: osnSubject.id,
        parentId: geometri.id,
        title: 'Segitiga',
        description: 'Kongruensi, kesebangunan, teorema Ceva & Menelaus',
        isLeaf: false,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_segitiga_dasar',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_geometri_segitiga',
        title: 'Kongruensi & Kesebangunan',
        description: 'Syarat kongruen dan sebangun',
        checklist: _createDefaultChecklist('Kongruensi'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_segitiga_ceva',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_geometri_segitiga',
        title: 'Teorema Ceva & Menelaus',
        description: 'Teorema penting dalam segitiga',
        checklist: _createDefaultChecklist('Ceva & Menelaus'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_lingkaran',
        subjectId: osnSubject.id,
        parentId: geometri.id,
        title: 'Lingkaran',
        description: 'Sudut pusat, keliling, power of a point, inversi',
        isLeaf: false,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_lingkaran_dasar',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_geometri_lingkaran',
        title: 'Sifat Lingkaran',
        description: 'Sudut pusat, keliling, tali busur',
        checklist: _createDefaultChecklist('Sifat Lingkaran'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_lingkaran_power',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_geometri_lingkaran',
        title: 'Power of a Point',
        description: 'Teorema power of a point',
        checklist: _createDefaultChecklist('Power of a Point'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_trigono',
        subjectId: osnSubject.id,
        parentId: geometri.id,
        title: 'Trigonometri',
        description: 'Identitas, persamaan, aplikasi geometri',
        isLeaf: false,
        order: 2,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_trigono_identitas',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_geometri_trigono',
        title: 'Identitas Trigonometri',
        description: 'Identitas dasar dan pembuktian',
        checklist: _createDefaultChecklist('Identitas Trigonometri'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_trigono_persamaan',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_geometri_trigono',
        title: 'Persamaan Trigonometri',
        description: 'Menyelesaikan persamaan trigonometri',
        checklist: _createDefaultChecklist('Persamaan Trigonometri'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_analitik',
        subjectId: osnSubject.id,
        parentId: geometri.id,
        title: 'Geometri Analitik',
        description: 'Garis, parabola, elips, hiperbola, transformasi',
        isLeaf: false,
        order: 3,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_analitik_garis',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_geometri_analitik',
        title: 'Garis & Parabola',
        description: 'Persamaan garis, jarak titik ke garis, parabola',
        checklist: _createDefaultChecklist('Garis & Parabola'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_geometri_analitik_konis',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_geometri_analitik',
        title: 'Irisan Kerucut',
        description: 'Elips, hiperbola, dan sifat-sifatnya',
        checklist: _createDefaultChecklist('Irisan Kerucut'),
        isLeaf: true,
        order: 1,
      ),
    ];
    topics.addAll(geometriChildren);

    // Teori Bilangan Branch
    final teoriBilangan = Topic(
      id: '${osnSubject.id}_teori_bilangan',
      subjectId: osnSubject.id,
      title: 'Teori Bilangan',
      description: 'Bilangan bulat, keterbagian, modulo, fungsi number theoretic',
      isLeaf: false,
      order: topicOrder++,
    );
    topics.add(teoriBilangan);

    final tbChildren = [
      Topic(
        id: '${osnSubject.id}_teori_bilangan_dasar',
        subjectId: osnSubject.id,
        parentId: teoriBilangan.id,
        title: 'Bilangan Bulat',
        description: 'Pembagian, sisa, FPB, KPK, bilangan prima',
        checklist: _createDefaultChecklist('Bilangan Bulat'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_teori_bilangan_keterbagian',
        subjectId: osnSubject.id,
        parentId: teoriBilangan.id,
        title: 'Keterbagian',
        description: 'Sifat-sifat keterbagian, uji keterbagian',
        checklist: _createDefaultChecklist('Keterbagian'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_teori_bilangan_modulo',
        subjectId: osnSubject.id,
        parentId: teoriBilangan.id,
        title: 'Modulo & Kongruensi',
        description: 'Kongruensi, persamaan Diophantine',
        isLeaf: false,
        order: 2,
      ),
      Topic(
        id: '${osnSubject.id}_teori_bilangan_modulo_dasar',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_teori_bilangan_modulo',
        title: 'Kongruensi',
        description: 'Sifat-sifat kongruensi modulo',
        checklist: _createDefaultChecklist('Kongruensi'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_teori_bilangan_modulo_diophantine',
        subjectId: osnSubject.id,
        parentId: '${osnSubject.id}_teori_bilangan_modulo',
        title: 'Persamaan Diophantine',
        description: 'ax + by = c, teorema existence',
        checklist: _createDefaultChecklist('Diophantine'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_teori_bilangan_fungsi',
        subjectId: osnSubject.id,
        parentId: teoriBilangan.id,
        title: 'Fungsi Number Theoretic',
        description: 'Phi Euler, Tau, Sigma, multiplicative functions',
        checklist: _createDefaultChecklist('Fungsi Number Theoretic'),
        isLeaf: true,
        order: 3,
      ),
    ];
    topics.addAll(tbChildren);

    // Kombinatorika Branch
    final kombinatorika = Topic(
      id: '${osnSubject.id}_kombinatorika',
      subjectId: osnSubject.id,
      title: 'Kombinatorika',
      description: 'Pencacahan, pigeonhole, binomial, recurrence, graf',
      isLeaf: false,
      order: topicOrder++,
    );
    topics.add(kombinatorika);

    final kombChildren = [
      Topic(
        id: '${osnSubject.id}_kombinatorika_pencacahan',
        subjectId: osnSubject.id,
        parentId: kombinatorika.id,
        title: 'Prinsip Pencacahan',
        description: 'Aturan penjumlahan, perkalian, permutasi, kombinasi',
        checklist: _createDefaultChecklist('Pencacahan'),
        isLeaf: true,
        order: 0,
      ),
      Topic(
        id: '${osnSubject.id}_kombinatorika_pigeonhole',
        subjectId: osnSubject.id,
        parentId: kombinatorika.id,
        title: 'Prinsip Pigeonhole',
        description: 'Prinsip pigeonhole dan variasi',
        checklist: _createDefaultChecklist('Pigeonhole'),
        isLeaf: true,
        order: 1,
      ),
      Topic(
        id: '${osnSubject.id}_kombinatorika_binomial',
        subjectId: osnSubject.id,
        parentId: kombinatorika.id,
        title: 'Binomial & Multinomial',
        description: 'Teorema binomial, koefisien binomial',
        checklist: _createDefaultChecklist('Binomial'),
        isLeaf: true,
        order: 2,
      ),
      Topic(
        id: '${osnSubject.id}_kombinatorika_recurrence',
        subjectId: osnSubject.id,
        parentId: kombinatorika.id,
        title: 'Relasi Rekurensi',
        description: 'Menyelesaikan relasi rekurensi',
        checklist: _createDefaultChecklist('Rekurensi'),
        isLeaf: true,
        order: 3,
      ),
      Topic(
        id: '${osnSubject.id}_kombinatorika_graf',
        subjectId: osnSubject.id,
        parentId: kombinatorika.id,
        title: 'Teori Graf (Dasar)',
        description: 'Graf, lintasan, sirkit, Euler, Hamilton',
        checklist: _createDefaultChecklist('Teori Graf'),
        isLeaf: true,
        order: 4,
      ),
    ];
    topics.addAll(kombChildren);

    await HiveService.saveTopics(topics);

    // Update subject topic counts
    await _updateSubjectCounts();
  }

  /// Create default checklist items
  List<ChecklistItem> _createDefaultChecklist(String topicName) {
    return AppConstants.defaultChecklistItems.map((item) {
      return ChecklistItem(
        id: '${topicName.toLowerCase().replaceAll(' ', '_')}_${item.hashCode}',
        title: item,
      );
    }).toList();
  }

  /// Update subject counts based on topics
  Future<void> _updateSubjectCounts() async {
    final subjects = HiveService.getAllSubjects();
    final allTopics = HiveService.getAllTopics();

    for (final subject in subjects) {
      final subjectTopics = allTopics.where((t) => t.subjectId == subject.id);
      final leafTopics = subjectTopics.where((t) => t.isLeaf);
      final branches = subjectTopics.where((t) => !t.isLeaf && t.parentId == null);

      int completedLeaf = 0;
      int completedBranches = 0;

      for (final topic in leafTopics) {
        if (topic.status == MasteryStatus.mastered) {
          completedLeaf++;
        }
      }

      for (final branch in branches) {
        final branchTopics = subjectTopics.where((t) => t.parentId == branch.id && t.isLeaf);
        if (branchTopics.every((t) => t.status == MasteryStatus.mastered)) {
          completedBranches++;
        }
      }

      final updatedSubject = subject.copyWith(
        totalTopics: leafTopics.length,
        completedTopics: completedLeaf,
        totalBranches: branches.length,
        completedBranches: completedBranches,
      );

      await HiveService.saveSubject(updatedSubject);
    }
  }

  /// Refresh subject counts
  Future<void> refreshSubjectCounts() async {
    await _updateSubjectCounts();
  }

  /// Generate AI prompt for topic
  String generateAiPrompt(String topicTitle, {String? competitionName}) {
    if (competitionName != null) {
      return AppConstants.aiPromptCompetitionTemplate
          .replaceAll('{COMPETITION_NAME}', competitionName)
          .replaceAll('{TOPIC_NAME}', topicTitle);
    }
    return AppConstants.aiPromptTemplate.replaceAll('{TOPIC_NAME}', topicTitle);
  }
}
