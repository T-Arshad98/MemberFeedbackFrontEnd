import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../../shared/models/feedback';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
    private apiUrl = 'https://feedbackplan-baeegndnfdbpc4hz.canadacentral-01.azurewebsites.net/api/feedback';

    constructor(private http: HttpClient) { }

    getApprovedFeedback(): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(this.apiUrl);
    }

    getStats(): Observable<{ averageRating: number, total: number }> {
        return this.http.get<{ averageRating: number, total: number }>(`${this.apiUrl}/stats`);
    }

    submitFeedback(feedback: Feedback): Observable<Feedback> {
        return this.http.post<Feedback>(this.apiUrl, feedback);
    }

    login(password: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.apiUrl}/admin/login`, JSON.stringify(password), { 
            headers, 
            withCredentials: true 
        });
    }

    getAllFeedback(): Observable<Feedback[]> {
        return this.http.get<Feedback[]>(`${this.apiUrl}/admin`, { withCredentials: true });
    }

    approveFeedback(id: number): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/admin/approve/${id}`, null, { withCredentials: true });
    }

    rejectFeedback(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/admin/reject/${id}`, { withCredentials: true });
    }
}