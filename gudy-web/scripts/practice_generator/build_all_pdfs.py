# -*- coding: utf-8 -*-
"""
Master PDF Generator for Gudy Practice Question Banks
Converts all 29 subcategory question banks across 5 subjects into standalone,
publication-grade examination PDF bundles using Chrome headless.
"""

import os
import sys
import html
import json
import shutil
import pathlib
import subprocess

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from data_osn import OSN_DATA
from data_tka_mtk import TKA_MTK_DATA
from data_indo import BAHASA_INDONESIA_DATA
from data_inggris import BAHASA_INGGRIS_DATA
from data_serkom import SERKOM_DATA

ALL_SUBJECTS = [
    OSN_DATA,
    TKA_MTK_DATA,
    BAHASA_INDONESIA_DATA,
    BAHASA_INGGRIS_DATA,
    SERKOM_DATA
]

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BROWSER_EXE = EDGE_PATH if os.path.exists(EDGE_PATH) else CHROME_PATH
PUBLIC_DEST = pathlib.Path(r"D:\Bari\Study Tracker App\gudy-web\public\practice")
BANK_DEST = pathlib.Path(r"D:\Bari\Study Tracker App\gudy-web\practice_bank")
SUPERSCRIPT_MAP = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
    'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ',
    'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
    'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ',
    'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ',
    'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
    'A': 'ᴬ', 'B': 'ᴮ', 'D': 'ᴰ', 'E': 'ᴱ', 'G': 'ᴳ',
    'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ',
    'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'R': 'ᴿ',
    'T': 'ᵀ', 'U': 'ᵁ', 'W': 'ᵂ',
    '⁰': '⁰', '¹': '¹', '²': '²', '³': '³', '⁴': '⁴',
    '⁵': '⁵', '⁶': '⁶', '⁷': '⁷', '⁸': '⁸', '⁹': '⁹',
    '⁺': '⁺', '⁻': '⁻', '/': 'ᐟ'
}

def to_superscript(s):
    import re
    clean = re.sub(r'\s+', '', s)
    return ''.join(SUPERSCRIPT_MAP.get(c, c) for c in clean)

def format_math_text(text):
    if not text:
        return text
    import re
    text = re.sub(r'\^\(([^)]+)\)', lambda m: to_superscript(m.group(1)), text)
    text = re.sub(r'\^\{([^}]+)\}', lambda m: to_superscript(m.group(1)), text)
    text = re.sub(r'\^([0-9a-zA-Z\+\-]+)', lambda m: to_superscript(m.group(1)), text)
    return text

TEMP_HTML_DIR = pathlib.Path(r"C:\Users\barih\generate_practice_bundle\temp_html")
TEMP_HTML_DIR.mkdir(parents=True, exist_ok=True)

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>{title} — Paket Latihan Soal & Ujian Mandiri</title>
<style>
  @page {{
    size: A4;
    margin: 18mm 15mm 18mm 15mm;
  }}
  *, *:before, *:after {{
    box-sizing: border-box;
  }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1f2937;
    background: #ffffff;
    line-height: 1.5;
    font-size: 13px;
    margin: 0;
    padding: 0;
  }}
  .exam-header {{
    border-bottom: 3px double #d97757;
    padding-bottom: 14px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }}
  .brand-logo {{
    font-size: 24px;
    font-weight: 800;
    color: #d97757;
    letter-spacing: -0.5px;
  }}
  .brand-tagline {{
    font-size: 11px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 1px;
  }}
  .exam-badge {{
    display: inline-block;
    background: #fef3c7;
    color: #92400e;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 9999px;
    margin-bottom: 6px;
    border: 1px solid #fde68a;
  }}
  .exam-meta-table {{
    font-size: 11.5px;
    border-collapse: collapse;
    margin-top: 6px;
  }}
  .exam-meta-table td {{
    padding: 2px 8px 2px 0;
    color: #4b5563;
  }}
  .exam-meta-table td strong {{
    color: #111827;
  }}
  .section-title {{
    font-size: 16px;
    font-weight: 800;
    color: #111827;
    border-left: 4px solid #d97757;
    padding-left: 10px;
    margin: 28px 0 16px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}
  .instructions-box {{
    background: #fdfaf6;
    border: 1px solid #f3e8dd;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 22px;
    font-size: 12px;
    color: #4a382c;
  }}
  .instructions-box ol {{
    margin: 6px 0 0 0;
    padding-left: 20px;
  }}
  .instructions-box li {{
    margin-bottom: 3px;
  }}
  .question-card {{
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 16px;
    page-break-inside: avoid;
  }}
  .question-card.alt-bg {{
    background: #fcfcfc;
  }}
  .question-head {{
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }}
  .question-number {{
    font-weight: 800;
    color: #d97757;
    font-size: 13.5px;
  }}
  .topic-tag {{
    font-size: 10.5px;
    color: #6b7280;
    background: #f3f4f6;
    padding: 2px 8px;
    border-radius: 6px;
    font-weight: 600;
  }}
  .question-text {{
    font-size: 13px;
    color: #1f2937;
    margin-bottom: 10px;
    white-space: pre-line;
  }}
  .options-grid {{
    display: grid;
    grid-template-columns: 1fr;
    gap: 6px;
    margin-top: 8px;
  }}
  .option-item {{
    display: flex;
    align-items: flex-start;
    padding: 5px 8px;
    border-radius: 6px;
    background: #f9fafb;
    border: 1px solid #f3f4f6;
    font-size: 12.5px;
  }}
  .option-label {{
    font-weight: 700;
    color: #4b5563;
    width: 24px;
    flex-shrink: 0;
  }}
  .option-content {{
    color: #374151;
  }}
  .page-break {{
    page-break-before: always;
  }}
  .answer-table {{
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 12px;
  }}
  .answer-table th, .answer-table td {{
    border: 1px solid #d1d5db;
    padding: 6px 10px;
    text-align: center;
  }}
  .answer-table th {{
    background: #f3f4f6;
    color: #111827;
    font-weight: 700;
  }}
  .answer-table td.correct-col {{
    font-weight: 800;
    color: #d97757;
    background: #fdf2f0;
  }}
  .solution-card {{
    background: #fdfaf7;
    border-left: 3px solid #d97757;
    border-radius: 0 8px 8px 0;
    padding: 10px 14px;
    margin-bottom: 12px;
    page-break-inside: avoid;
    font-size: 12px;
  }}
  .solution-card strong.sol-title {{
    color: #9a3412;
    display: block;
    margin-bottom: 4px;
    font-size: 12.5px;
  }}
  .solution-card p {{
    margin: 0;
    color: #374151;
    white-space: pre-line;
  }}
  .footer-note {{
    margin-top: 30px;
    border-top: 1px solid #e5e7eb;
    padding-top: 12px;
    text-align: center;
    font-size: 11px;
    color: #9ca3af;
  }}
</style>
</head>
<body>

  <!-- HEADER -->
  <div class="exam-header">
    <div>
      <div class="brand-logo">Gudy Examination Series</div>
      <div class="brand-tagline">Map Your Mastery. Master Your Goals.</div>
      <div style="margin-top: 10px;">
        <span class="exam-badge">{subject_name}</span>
        <h2 style="margin: 4px 0 0 0; font-size: 18px; color: #111827;">{subcat_title}</h2>
        <p style="margin: 2px 0 0 0; font-size: 12px; color: #6b7280;">{subcat_desc}</p>
      </div>
    </div>
    <div style="text-align: right;">
      <table class="exam-meta-table">
        <tr><td><strong>Kode Paket:</strong></td><td>{exam_code}</td></tr>
        <tr><td><strong>Jumlah Soal:</strong></td><td>{question_count} Butir Pilihan Ganda</td></tr>
        <tr><td><strong>Alokasi Waktu:</strong></td><td>{duration_minutes} Menit</td></tr>
        <tr><td><strong>Target Nilai:</strong></td><td><strong>100 / Sempurna</strong></td></tr>
      </table>
    </div>
  </div>

  <!-- INSTRUCTIONS -->
  <div class="instructions-box">
    <strong>Petunjuk Pengerjaan Ujian Mandiri:</strong>
    <ol>
      <li>Kerjakan seluruh butir soal secara mandiri tanpa membuka buku catatan atau bantuan mesin pencari untuk mengukur pemahaman murni Anda.</li>
      <li>Pilihlah satu jawaban yang paling tepat (A, B, C, D, atau E) untuk setiap butir soal.</li>
      <li>Perhatikan alokasi waktu ujian ({duration_minutes} menit) untuk melatih kecepatan membaca dan ketepatan kalkulasi.</li>
      <li>Setelah selesai, periksalah lembar jawaban Anda dengan <em>Kunci Jawaban & Lembar Pembahasan Lengkap</em> yang terletak di halaman akhir dokumen ini.</li>
    </ol>
  </div>

  <!-- BAGIAN 1: SOAL UJIAN -->
  <div class="section-title">Bagian 1: Naskah Soal Pilihan Ganda</div>

  {questions_html}

  <!-- PAGE BREAK FOR ANSWER KEY -->
  <div class="page-break"></div>

  <!-- BAGIAN 2: KUNCI JAWABAN & PEMBAHASAN -->
  <div class="section-title">Bagian 2: Kunci Jawaban & Pembahasan Lengkap</div>

  <table class="answer-table">
    <thead>
      <tr>
        <th>No</th><th>Topik / Pokok Bahasan</th><th>Kunci</th>
        <th>No</th><th>Topik / Pokok Bahasan</th><th>Kunci</th>
      </tr>
    </thead>
    <tbody>
      {answers_table_rows}
    </tbody>
  </table>

  <div style="margin-top: 24px;">
    <h3 style="font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 12px;">Lembar Pembahasan Langkah per Langkah:</h3>
    {solutions_html}
  </div>

  <div class="footer-note">
    Dokumen Paket Ujian Gudy Study Tracker App &bull; Hak Cipta Dilindungi &bull; Disusun untuk Persiapan Prestasi Akademik & Kejuruan Tingkat Nasional
  </div>

</body>
</html>
"""


def build_exam_html(subject, subcat):
    questions = subcat["questions"]
    q_count = len(questions)
    duration = 45 if q_count <= 15 else 60
    exam_code = f"GDY-{subject['subject_id'][:3].upper()}-{subcat['id'][:4].upper()}-100"

    # Render questions
    q_blocks = []
    for i, q in enumerate(questions):
        options_html = "".join([
            f'<div class="option-item"><span class="option-label">{opt}.</span><span class="option-content">{html.escape(format_math_text(str(text)))}</span></div>'
            for opt, text in q["options"].items()
        ])
        alt_class = " alt-bg" if i % 2 == 1 else ""
        escaped_q = html.escape(format_math_text(str(q['question']))).replace('\n', '<br>')
        escaped_topic = html.escape(str(q['topic']))
        q_blocks.append(f"""
        <div class="question-card{alt_class}">
          <div class="question-head">
            <span class="question-number">Soal #{q['num']}</span>
            <span class="topic-tag">{escaped_topic}</span>
          </div>
          <div class="question-text">{escaped_q}</div>
          <div class="options-grid">{options_html}</div>
        </div>
        """)
    questions_html = "\n".join(q_blocks)

    # Render answers table (2 columns)
    rows = []
    half = (q_count + 1) // 2
    for r in range(half):
        q1 = questions[r]
        t1 = html.escape(str(q1['topic']))
        col1 = f"<td><strong>{q1['num']}</strong></td><td style='text-align:left;'>{t1}</td><td class='correct-col'>{q1['answer']}</td>"
        if r + half < q_count:
            q2 = questions[r + half]
            t2 = html.escape(str(q2['topic']))
            col2 = f"<td><strong>{q2['num']}</strong></td><td style='text-align:left;'>{t2}</td><td class='correct-col'>{q2['answer']}</td>"
        else:
            col2 = "<td>-</td><td>-</td><td>-</td>"
        rows.append(f"<tr>{col1}{col2}</tr>")
    answers_table_rows = "\n".join(rows)

    # Render solutions
    sol_blocks = []
    for q in questions:
        sol_title = html.escape(f"Pembahasan Soal #{q['num']} [{q['topic']}] — Kunci Jawaban: ({q['answer']})")
        sol_p = html.escape(format_math_text(str(q['solution']))).replace('\n', '<br>')
        sol_blocks.append(f"""
        <div class="solution-card">
          <strong class="sol-title">{sol_title}</strong>
          <p>{sol_p}</p>
        </div>
        """)
    solutions_html = "\n".join(sol_blocks)

    return HTML_TEMPLATE.format(
        title=f"{subject['subject_name']} — {subcat['title']}",
        subject_name=subject["subject_name"],
        subcat_title=subcat["title"],
        subcat_desc=subcat["description"],
        exam_code=exam_code,
        question_count=q_count,
        duration_minutes=duration,
        questions_html=questions_html,
        answers_table_rows=answers_table_rows,
        solutions_html=solutions_html
    )


def main():
    print("=== STARTING BUNDLE GENERATION FOR 29 EXAM BANKS ===")

    manifest_data = []

    for subject in ALL_SUBJECTS:
        s_id = subject["subject_id"]
        s_name = subject["subject_name"]
        print(f"\nProcessing Subject: {s_name} ({s_id})...")

        # Create target directories
        pub_subj_dir = PUBLIC_DEST / s_id
        bank_subj_dir = BANK_DEST / s_id
        pub_subj_dir.mkdir(parents=True, exist_ok=True)
        bank_subj_dir.mkdir(parents=True, exist_ok=True)

        for subcat in subject["subcategories"]:
            sc_id = subcat["id"]
            sc_title = subcat["title"]
            pdf_filename = f"{sc_id}.pdf"
            pub_pdf_path = pub_subj_dir / pdf_filename
            bank_pdf_path = bank_subj_dir / pdf_filename

            # Check if already generated
            if pub_pdf_path.exists() and pub_pdf_path.stat().st_size > 10000:
                if not bank_pdf_path.exists():
                    shutil.copy2(pub_pdf_path, bank_pdf_path)
                print(f"  [EXISTS] Skipping {pdf_filename} ({len(subcat['questions'])} soal)")
                manifest_data.append({
                    "subject_id": s_id,
                    "subject_name": s_name,
                    "subcategory_id": sc_id,
                    "title": sc_title,
                    "description": subcat["description"],
                    "question_count": len(subcat["questions"]),
                    "pdf_url": f"/practice/{s_id}/{pdf_filename}",
                    "file_path": str(pub_pdf_path)
                })
                continue

            # 1. Generate HTML
            html_content = build_exam_html(subject, subcat)
            temp_html_path = TEMP_HTML_DIR / f"{s_id}_{sc_id}.html"
            temp_html_path.write_text(html_content, encoding="utf-8")

            # 2. Run Headless Browser to PDF
            cmd = [
                BROWSER_EXE,
                "--headless",
                "--disable-gpu",
                "--no-pdf-header-footer",
                f"--print-to-pdf={pub_pdf_path.resolve()}",
                str(temp_html_path.resolve())
            ]

            try:
                res = subprocess.run(cmd, capture_output=True, text=True, timeout=25)
            except subprocess.TimeoutExpired:
                print(f"  [TIMEOUT] Process timed out on {pdf_filename}")
                res = subprocess.CompletedProcess(cmd, 1)
            if res.returncode == 0 and pub_pdf_path.exists():
                size_kb = pub_pdf_path.stat().st_size / 1024
                # Copy to bank
                shutil.copy2(pub_pdf_path, bank_pdf_path)
                print(f"  [OK] Generated {pdf_filename} ({len(subcat['questions'])} soal, {size_kb:.1f} KB)")
            else:
                print(f"  [FAIL] Failed generating {pdf_filename}: {res.stderr}")

            # Collect for manifest
            manifest_data.append({
                "subject_id": s_id,
                "subject_name": s_name,
                "subcategory_id": sc_id,
                "title": sc_title,
                "description": subcat["description"],
                "question_count": len(subcat["questions"]),
                "pdf_url": f"/practice/{s_id}/{pdf_filename}",
                "file_path": str(pub_pdf_path)
            })

    # Save Manifest JSON
    manifest_path = PUBLIC_DEST / "manifest.json"
    manifest_path.write_text(json.dumps(manifest_data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n[SUCCESS] Manifest written to {manifest_path} (Total {len(manifest_data)} exam banks)")

    # Also save as typescript/json in src/lib
    ts_data_path = pathlib.Path(r"D:\Bari\Study Tracker App\gudy-web\src\lib\practice-manifest.ts")
    ts_content = f"// Auto-generated practice exam manifest\nexport const PRACTICE_EXAMS = {json.dumps(manifest_data, indent=2, ensure_ascii=False)} as const;\n"
    ts_data_path.write_text(ts_content, encoding="utf-8")
    print(f"[SUCCESS] TypeScript data written to {ts_data_path}")

    # Clean temp dir
    shutil.rmtree(TEMP_HTML_DIR, ignore_errors=True)
    print("=== GENERATION COMPLETE ===")


if __name__ == "__main__":
    main()
