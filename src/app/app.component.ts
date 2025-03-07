import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from './services/feedback/feedback.service';
import { CommonModule } from '@angular/common';
import { Feedback } from './shared/models/feedback';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'MemberFeedbackFrontend';
    feedbacks: Feedback[] = [];
    stats: { averageRating: number, total: number } = { averageRating: 0, total: 0 };
    newFeedback: Feedback = { title: '', message: '', rating: 1 };
    adminPassword = '';
    isAdmin = false;

    constructor(private feedbackService: FeedbackService) { }

    ngOnInit() {
        this.getFeedback();
        this.getStats();
    }

    getFeedback() {
        this.feedbackService.getApprovedFeedback().subscribe(data => this.feedbacks = data);
    }

    getStats() {
        this.feedbackService.getStats().subscribe(data => this.stats = data);
    }

    submitFeedback() {
        this.feedbackService.submitFeedback(this.newFeedback).subscribe(() => {
            this.newFeedback = { title: '', message: '', rating: 1 };
            this.getFeedback();
            this.getStats();
        });
    }

    login() {
        this.feedbackService.login(this.adminPassword).subscribe(() => {
            this.isAdmin = true;
            this.getAllFeedback();
        });
    }

    getAllFeedback() {
        this.feedbackService.getAllFeedback().subscribe(data => this.feedbacks = data);
    }

    approve(id: number) {
        this.feedbackService.approveFeedback(id).subscribe(() => this.getAllFeedback());
    }

    reject(id: number) {
        this.feedbackService.rejectFeedback(id).subscribe(() => this.getAllFeedback());
    }
}
