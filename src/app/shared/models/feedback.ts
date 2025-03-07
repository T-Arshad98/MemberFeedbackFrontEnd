export interface Feedback {
    id?: number;
    title: string;
    message: string;
    rating: number;
    isApproved?: boolean;
    submittedAt?: string;
}