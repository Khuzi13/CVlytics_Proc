# from django.shortcuts import render
# from django.core.files.storage import FileSystemStorage
# import uuid, os
# from .predict_ats_score import generate_full_ats_report


    # path('', views.homePage),   # blank space mean first page that show on site
    # path('about-us/',views.aboutus),
    # path('service/',views.service),


from django.shortcuts import render
import uuid
from .predict_ats_score import generate_full_ats_report_from_file
from resumes.models import ResumeText

def homePage(request):
    return render(request,'index.html')

def cv_checker(request):
    return render(request,'cv_checker.html')


def result(request):
    return render(request,'result.html')

def contact_us(request):
    print(request)
    return render(request,'contact_us.html')

def recruiter(request):
    print(request)
    return render(request,'recruiter.html')

def recruiter_result(request):
    print(request)
    return render(request,'recruiter_result.html')



def upload_file(request):
    if request.method == "POST" and request.FILES.get("resume"):
        uploaded_file = request.FILES["resume"]
        job_description = request.POST.get("job_description") or None

        # 🔥 DIRECT MEMORY PROCESS
        report = generate_full_ats_report_from_file(uploaded_file, job_description)

        # 🔥 SAVE ONLY TEXT + SCORES
        # resume_obj = ResumeText.objects.create(
        #     clean_text=report["clean_text"],
        #     ats_score=report["ATS_Score"],
        #     parse_rate=report["Parse_Rate"],
        #     jd_match=report["JD_Match"],
        #     overall_score=report["Overall_Score"],
        # )

#  Always define breakdown FIRST
        breakdown = report.get("Breakdown", {})

        # Safe values
        formatting_value = breakdown.get("Formatting_Structure", 0)
        soft_skill_value = breakdown.get("Soft_Skills_Tone", 0)

        if job_description:
            hard_skill_value = breakdown.get("Hard_Skills_Match", 0)
        else:
            hard_skill_value = breakdown.get("Hard_Skills_Strength", 0)

        # Colors
        formatting_color = int(formatting_value * 10)
        soft_skill_color = int(soft_skill_value * 10)
        hard_skill_color = int(hard_skill_value * 10)

        # AI suggestions safety
        ai_list = report.get("AI_Suggestions", [])
        ai_list += [""] * (4 - len(ai_list))  # ensure 4 items

        return render(request, "result.html", {
            "ats_score": report["ATS_Score"],
            "parse_rate": report["Parse_Rate"],
            "jd_match": report["JD_Match"],
            "overall_score": report["Overall_Score"],

            "formatting_score": formatting_value,
            "formatting_score_color": formatting_color,

            "soft_skills_score": soft_skill_value,
            "soft_skills_score_color": soft_skill_color,

            "hard_skills_score": hard_skill_value,
            "hard_skills_score_color": hard_skill_color,

            "ai_suggestion_1": ai_list[0],
            "ai_suggestion_2": ai_list[1],
            "ai_suggestion_3": ai_list[2],
            "ai_suggestion_4": ai_list[3],
        })

    return render(request, "cv_checker.html")


