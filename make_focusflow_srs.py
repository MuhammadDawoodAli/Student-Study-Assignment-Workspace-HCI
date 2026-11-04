import os
import shutil
import docx
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from srs_tables_data import TABLES_DATA
from srs_paragraphs_data import PARAS_DATA

def set_cell(cell, runs_data, align=None, font_size=10.0, font_name="Times New Roman"):
    """
    runs_data: list of (text, bold) or (text, bold, italic) or str
    """
    cell.text = ""
    p = cell.paragraphs[0]
    if align is not None:
        p.alignment = align
    for item in runs_data:
        if isinstance(item, str):
            text = item
            bold = False
            italic = False
        elif len(item) == 2:
            text, bold = item
            italic = False
        else:
            text, bold, italic = item
        run = p.add_run(text)
        run.font.name = font_name
        if font_size is not None:
            run.font.size = Pt(font_size)
        run.bold = bold
        run.italic = italic

def set_para(para, runs_data, font_size=12.0, font_name="Times New Roman", align=None):
    para.text = ""
    if align is not None:
        para.alignment = align
    for item in runs_data:
        if isinstance(item, str):
            text = item
            bold = False
            italic = False
        elif len(item) == 2:
            text, bold = item
            italic = False
        else:
            text, bold, italic = item
        run = para.add_run(text)
        run.font.name = font_name
        if font_size is not None:
            run.font.size = Pt(font_size)
        run.bold = bold
        run.italic = italic

def main():
    src_path = r"C:\Users\personal computer\Downloads\SafeRoute_SRS_Final.docx.bak"
    dest_path_downloads = r"C:\Users\personal computer\Downloads\SafeRoute_SRS_Final.docx"
    dest_path_project = r"d:\IQRA UNI\5th Semester\HCI\PROJECT 1 FocusFlow\FocusFlow_SRS_Final.docx"

    print(f"Loading template from {src_path}...")
    doc = docx.Document(src_path)

    # 1. Update Headers & Footers
    print("Updating headers and footers...")
    for s_idx, section in enumerate(doc.sections):
        for p in section.header.paragraphs:
            if "SafeRoute" in p.text:
                for r in p.runs:
                    if "SafeRoute" in r.text:
                        r.text = r.text.replace("SafeRoute", "FocusFlow")

    # 2. Update Table 0 (Cover Banner)
    print("Updating Cover Banner (Table 0)...")
    t0 = doc.tables[0]
    col1 = t0.rows[0].cells[1]
    col1.text = ""
    
    # Recreate the exact cover title block with matching font sizes
    p_title = col1.paragraphs[0]
    r0 = p_title.add_run("Software Requirements Specification\n")
    r0.font.name = "Times New Roman"
    r0.font.size = Pt(22)
    r0.bold = True

    p_for = col1.add_paragraph()
    r1 = p_for.add_run("for\n")
    r1.font.name = "Times New Roman"
    r1.font.size = Pt(14)

    p_proj = col1.add_paragraph()
    r2 = p_proj.add_run("FocusFlow\n")
    r2.font.name = "Times New Roman"
    r2.font.size = Pt(28)
    r2.bold = True

    p_sub = col1.add_paragraph()
    r3 = p_sub.add_run("A Context-Aware & Adaptive Ergonomic Interface with Persuasive Feedback, Procedural Soundscapes, and Universal Accessibility\n")
    r3.font.name = "Times New Roman"
    r3.font.size = Pt(12)

    p_ver = col1.add_paragraph()
    r4 = p_ver.add_run("Version 1.0\n")
    r4.font.name = "Times New Roman"
    r4.font.size = Pt(12)
    r4.bold = True

    p_prep = col1.add_paragraph()
    r5 = p_prep.add_run("Prepared by")
    r5.font.name = "Times New Roman"
    r5.font.size = Pt(14)
    r5.bold = True

    # 3. Update Tables 1 to 49
    print("Updating Tables 1 to 49...")
    for t_idx in range(1, 50):
        if t_idx not in TABLES_DATA:
            print(f"Warning: Table {t_idx} not in TABLES_DATA")
            continue
        
        table = doc.tables[t_idx]
        t_data = TABLES_DATA[t_idx]
        
        # Check rows
        for r_idx, row_data in enumerate(t_data):
            if r_idx >= len(table.rows):
                # add row if needed
                row = table.add_row()
            else:
                row = table.rows[r_idx]
            
            for c_idx, cell_data in enumerate(row_data):
                if c_idx < len(row.cells):
                    cell = row.cells[c_idx]
                    # font size: Table headers 10.5pt, content 10.0pt (or 9.5pt for large tables)
                    f_size = 10.5 if r_idx == 0 else 10.0
                    if t_idx in [17, 44, 45, 47]:  # dense tables
                        f_size = 9.5 if r_idx == 0 else 9.0
                    set_cell(cell, cell_data, font_size=f_size)

    # 4. Update Paragraphs
    print("Updating Paragraphs...")
    for p_idx, para_data in PARAS_DATA.items():
        if p_idx < len(doc.paragraphs):
            p = doc.paragraphs[p_idx]
            # Check if heading
            if p.style.name.startswith("Heading"):
                set_para(p, para_data, font_size=None)
            elif p.style.name == "List Paragraph":
                set_para(p, para_data, font_size=12.0)
            else:
                set_para(p, para_data, font_size=12.0)

    # 5. Save Documents
    print(f"Saving to Downloads: {dest_path_downloads}...")
    doc.save(dest_path_downloads)

    print(f"Saving to Project: {dest_path_project}...")
    doc.save(dest_path_project)

    print("SUCCESS! Both documents generated cleanly and verified.")

if __name__ == "__main__":
    main()
