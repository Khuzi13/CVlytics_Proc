# import joblib
# from .pdf_pipeline import extract_text_from_pdf, clean_text
# from .parse import ats_parse_rate
# from .jd_matcher import job_match_score
# from .breakdown_scores import detailed_breakdown
# from .ai_suggestions import ai_suggestions
# import os

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# model = joblib.load(os.path.join(BASE_DIR, "ats_xgb_model.pkl"))
# vectorizer = joblib.load(os.path.join(BASE_DIR, "vectorizer.pkl"))

# def generate_full_ats_report(pdf_path, job_description=None):
#     raw = extract_text_from_pdf(pdf_path)
#     cleaned = clean_text(raw)

#     parse_rate = round(ats_parse_rate(raw), 2)
#     vector = vectorizer.transform([cleaned])
#     ats_score = round(float(model.predict(vector)[0]), 2)
#     suggestions = ai_suggestions(raw, parse_rate)

#     if job_description:
#         jd_match = round(job_match_score(pdf_path, job_description), 2)
#         breakdown = detailed_breakdown(raw, job_description)
#         overall = round(0.40*ats_score + 0.20*parse_rate + 0.40*jd_match, 2)
#     else:
#         jd_match = None
#         breakdown = detailed_breakdown(raw, "")
#         overall = round(0.60*ats_score + 0.40*parse_rate, 2)

#     return {
#         "ATS_Score": ats_score,
#         "Parse_Rate": parse_rate,
#         "JD_Match": jd_match,
#         "Overall_Score": overall,
#         "Breakdown": breakdown,
#         "AI_Suggestions": suggestions
#     }


import joblib
import os
from .pdf_pipeline import extract_text_from_pdf, clean_text
from .parse import ats_parse_rate
from .jd_matcher import job_match_score
from .breakdown_scores import detailed_breakdown
from .ai_suggestions import ai_suggestions

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "ats_xgb_model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "vectorizer.pkl"))


def generate_full_ats_report_from_file(uploaded_file, job_description=None):
    # 1️⃣ Extract text directly from memory PDF
    raw_text = extract_text_from_pdf(uploaded_file)
    cleaned_text = clean_text(raw_text)

    if not cleaned_text:
        raise ValueError("PDF text could not be extracted")

    # 2️⃣ Scores
    parse_rate = round(ats_parse_rate(raw_text), 2)
    vector = vectorizer.transform([cleaned_text])
    ats_score = round(float(model.predict(vector)[0]), 2)

    suggestions = ai_suggestions(raw_text, parse_rate)

    if job_description:
        jd_match = round(job_match_score(cleaned_text, job_description), 2)
        breakdown = detailed_breakdown(raw_text, job_description)
        overall = round(0.40*ats_score + 0.20*parse_rate + 0.40*jd_match, 2)
    else:                   
        jd_match = None
        breakdown = detailed_breakdown(raw_text, "")
        overall = round(0.60*ats_score + 0.40*parse_rate, 2)

    return {
        "clean_text": cleaned_text,
        "ATS_Score": ats_score,
        "Parse_Rate": parse_rate,
        "JD_Match": jd_match,
        "Overall_Score": overall,
        "Breakdown": breakdown,
        "AI_Suggestions": suggestions
    }
                                        