# -*- coding: utf-8 -*-
"""
Convert Python question bank data to JSON format
Run: python convert_to_json.py
"""

import json
import os
import re
import sys

# Add script directory to path to import data modules
script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, script_dir)

def extract_python_data(filepath):
    """Extract data from Python file by parsing it."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the DATA dictionary name
    filename = os.path.basename(filepath).replace('.py', '')
    data_name = f"{filename.upper().replace('DATA_', '')}_DATA"

    # Use exec to get the DATA dictionary
    local_vars = {}
    try:
        exec(content, local_vars)

        # Try different possible variable names
        for key in local_vars:
            if key.endswith('_DATA'):
                return local_vars[key]

        # If we can't find it by pattern, return the first dict found
        for key, value in local_vars.items():
            if isinstance(value, dict):
                return value

    except Exception as e:
        print(f"Error parsing {filepath}: {e}")
        return None

    return None

def clean_question(question_data):
    """Clean and normalize question data."""
    cleaned = question_data.copy()

    # Ensure options is a dict with string keys
    if 'options' in cleaned:
        options = cleaned['options']
        if isinstance(options, dict):
            # Convert any non-string keys to strings
            cleaned['options'] = {str(k): str(v) for k, v in options.items()}
        else:
            cleaned['options'] = {}

    # Ensure answer is a string
    if 'answer' in cleaned:
        cleaned['answer'] = str(cleaned['answer']).upper().strip()

    # Ensure num is an integer
    if 'num' in cleaned:
        cleaned['num'] = int(cleaned['num'])

    # Ensure all string fields are properly formatted
    for field in ['topic', 'question', 'solution']:
        if field in cleaned and cleaned[field]:
            cleaned[field] = str(cleaned[field]).strip()

    return cleaned

def convert_to_json():
    """Convert all Python question bank files to JSON."""

    # Base paths
    base_dir = os.path.dirname(script_dir)
    data_dir = os.path.join(base_dir, 'data')
    output_base = os.path.dirname(base_dir)  # Move up to gudy-web
    output_dir = os.path.join(output_base, 'public', 'practice', 'data')

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Python files to convert
    python_files = [
        'data_indo.py',
        'data_inggris.py',
        'data_osn.py',
        'data_tka_mtk.py',
        'data_serkom.py'
    ]

    total_converted = 0

    for py_file in python_files:
        filepath = os.path.join(script_dir, py_file)
        if not os.path.exists(filepath):
            print(f"Warning: {filepath} not found, skipping...")
            continue

        print(f"Processing {py_file}...")

        data = extract_python_data(filepath)
        if not data:
            print(f"  Error: Could not extract data from {py_file}")
            continue

        # Clean subcategories and questions
        if 'subcategories' in data:
            for subcat in data['subcategories']:
                if 'questions' in subcat:
                    subcat['questions'] = [
                        clean_question(q) for q in subcat['questions']
                    ]

        # Generate output filename
        subject_id = data.get('subject_id', py_file.replace('data_', '').replace('.py', ''))
        output_file = os.path.join(output_dir, f"{subject_id}.json")

        # Write JSON
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        # Count questions
        question_count = sum(
            len(subcat.get('questions', []))
            for subcat in data.get('subcategories', [])
        )

        print(f"  [OK] Converted {question_count} questions to {subject_id}.json")
        total_converted += question_count

    # Create combined manifest
    manifest = []
    for py_file in python_files:
        filepath = os.path.join(script_dir, py_file)
        if not os.path.exists(filepath):
            continue

        data = extract_python_data(filepath)
        if not data:
            continue

        subject_id = data.get('subject_id')
        subject_name = data.get('subject_name')

        for subcat in data.get('subcategories', []):
            manifest.append({
                'subject_id': subject_id,
                'subject_name': subject_name,
                'subcategory_id': subcat.get('id'),
                'title': subcat.get('title'),
                'description': subcat.get('description'),
                'question_count': len(subcat.get('questions', [])),
                'json_url': f'/practice/data/{subject_id}.json'
            })

    # Write manifest
    manifest_file = os.path.join(output_dir, 'manifest.json')
    with open(manifest_file, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"\n[OK] Conversion complete!")
    print(f"   Total questions: {total_converted}")
    print(f"   Output directory: {output_dir}")
    print(f"   Files created: {len(python_files)} JSON + 1 manifest")

    return total_converted

if __name__ == '__main__':
    convert_to_json()
