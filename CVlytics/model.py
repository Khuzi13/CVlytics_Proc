from django.db import models

class ResumeText(models.Model):
    clean_text = models.TextField()
    ats_score = models.FloatField(default=0)
    parse_rate = models.FloatField(default=0)
    jd_match = models.FloatField(null=True, blank=True)
    overall_score = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Resume {self.id}"
