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
        this.feedbackService.getApprovedFeedback().subscribe({
            next: (data) => {
                this.feedbacks = data;
                console.log('Fetched feedbacks:', data); // Debug
            },
            error: (err) => console.error('Error fetching feedbacks:', err)
        });
    }
    
    getStats() {
        this.feedbackService.getStats().subscribe({
            next: (data) => this.stats = data,
            error: (err) => console.error('Error fetching stats:', err)
        });
    }

    submitFeedback() {
        this.feedbackService.submitFeedback(this.newFeedback).subscribe({
            next: () => {
                this.newFeedback = { title: '', message: '', rating: 1 };
                this.getFeedback(); // Refresh after submit
                this.getStats();
            },
            error: (err) => console.error('Error submitting feedback:', err)
        });
    }
    
    login() {
        this.feedbackService.login(this.adminPassword).subscribe({
            next: () => {
                this.isAdmin = true;
                this.getAllFeedback();
            },
            error: (err) => console.error('Login failed:', err)
        });
    }

    getAllFeedback() {
        this.feedbackService.getAllFeedback().subscribe({
            next: (data) => {
                this.feedbacks = data;
                console.log('Fetched all feedbacks:', data); // Debug
            },
            error: (err) => console.error('Error fetching all feedbacks:', err)
        });
    }

    approve(id: number) {
        this.feedbackService.approveFeedback(id).subscribe({
            next: () => this.getAllFeedback(), // Refresh after approve
            error: (err) => console.error('Error approving feedback:', err)
        });
    }

    reject(id: number) {
        this.feedbackService.rejectFeedback(id).subscribe({
            next: () => this.getAllFeedback(), // Refresh after reject
            error: (err) => console.error('Error rejecting feedback:', err)
        });
    }
}
