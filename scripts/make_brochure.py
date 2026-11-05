"""Splits the iYouth Store brochure PDF (two landscape sheets, each holding two pages) into four WebP pages.

Usage: python scripts/make_brochure.py "<path to iYouth Brochur Design.pdf>"
Needs PyMuPDF (fitz) and Pillow. Output: public/media/brochure/page-1.webp ... page-4.webp

Booklet order: sheet 1 = [back cover (page 4) | front cover (page 1)], sheet 2 = [page 2 | page 3].
"""
import io
import pathlib
import sys

import fitz
from PIL import Image

DPI = 120  # about 1020 x 1320 px per page: sharp on a 2x screen at the size the book opens to
QUALITY = 80

pdf = sys.argv[1] if len(sys.argv) > 1 else sys.exit("Pass the brochure PDF path.")
out = pathlib.Path("public/media/brochure")
out.mkdir(parents=True, exist_ok=True)

doc = fitz.open(pdf)
assert doc.page_count == 2, f"expected 2 sheets, found {doc.page_count}"
order = {(0, "left"): 4, (0, "right"): 1, (1, "left"): 2, (1, "right"): 3}

for sheet_index, sheet in enumerate(doc):
    img = Image.open(io.BytesIO(sheet.get_pixmap(dpi=DPI).tobytes("png"))).convert("RGB")
    half = img.width // 2
    for side, box in (("left", (0, 0, half, img.height)), ("right", (half, 0, img.width, img.height))):
        page = order[(sheet_index, side)]
        target = out / f"page-{page}.webp"
        img.crop(box).save(target, "WEBP", quality=QUALITY, method=6)
        print(target, img.crop(box).size)
