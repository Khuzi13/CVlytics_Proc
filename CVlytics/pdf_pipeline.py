# import re
# import pdfplumber

# def extract_text_from_pdf(pdf_path: str) -> str:
#     text = ""
#     with pdfplumber.open(pdf_path) as pdf:
#         for page in pdf.pages:
#             page_text = page.extract_text()
#             if page_text:
#                 text += "\n" + page_text
#     return text.strip()

# def clean_text(text: str) -> str:
#     text = text.lower()
#     text = re.sub(r"[^a-z0-9 ]", " ", text)
#     text = re.sub(r"\s+", " ", text)
#     return text.strip()


import re
import pdfplumber

def extract_text_from_pdf(pdf_source) -> str:
    """
    pdf_source can be:
    - file path (str)
    - InMemoryUploadedFile / file-like object
    """

    text = ""

    if hasattr(pdf_source, "read"):
        # File object (memory)
        with pdfplumber.open(pdf_source) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += "\n" + page_text
    else:
        # File path
        with pdfplumber.open(pdf_source) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += "\n" + page_text

    return text.strip()


def clean_text(text: str) -> str:
    if not text:
        return ""

    text = text.lower()
    text = re.sub(r"[^a-z0-9 ]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()
