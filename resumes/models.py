from django.db import models

class ResumeText(models.Model):
    resume_name = models.CharField(max_length=255)
    clean_text = models.TextField()
    ats_score = models.FloatField()
    parse_rate = models.FloatField()
    jd_match = models.FloatField(null=True, blank=True)
    overall_score = models.FloatField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.resume_name
