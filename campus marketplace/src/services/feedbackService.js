import apiClient from "../lib/apiClient.js";

class FeedbackService {
  // Submit feedback
  async submitFeedback(feedbackData) {
    try {
      const response = await apiClient.post("/feedback", feedbackData);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error submitting feedback:", error);
      throw error;
    }
  }

  // Get all feedback with filters (admin use case)
  async getFeedback(params = {}) {
    try {
      const { status, sortBy = 'newest', search = '' } = params;
      const response = await apiClient.get("/feedback", {
        params: { status, sortBy, search }
      });
      const data = response.data?.data || [];
      return {
        documents: data.map(fb => ({ ...fb, feedbackId: String(fb.id), $id: String(fb.id) }))
      };
    } catch (error) {
      console.error("Error fetching feedback:", error);
      throw error;
    }
  }

  // Update feedback status (mark as reviewed)
  async updateFeedbackStatus(feedbackId, status) {
    try {
      const response = await apiClient.patch(`/feedback/${feedbackId}`, { status });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error updating feedback status:", error);
      throw error;
    }
  }

  // Delete feedback
  async deleteFeedback(feedbackId) {
    try {
      const response = await apiClient.delete(`/feedback/${feedbackId}`);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error deleting feedback:", error);
      throw error;
    }
  }
}

export default new FeedbackService();
