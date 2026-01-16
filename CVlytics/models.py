from django.db import models

class ResumeData(models.Model):
    report_id = models.CharField(max_length=50, unique=True)
    resume_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class ReportData(models.Model):
    report_id = models.CharField(max_length=50, unique=True)
    ats_score = models.FloatField()
    jd_match = models.FloatField()
    overall_score = models.FloatField()
    breakdown = models.JSONField()
    ai_suggestions = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
