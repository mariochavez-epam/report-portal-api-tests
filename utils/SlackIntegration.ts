import axios from 'axios';

export class SlackIntegration {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  // Send a basic message using Slack Webhook
  async sendMessage(text: string) {
    const messageData = {
      text
    };

    try {
      const response = await axios.post(this.webhookUrl, messageData, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      console.error("Error sending message to Slack:", error);
      throw error;
    }
  }

  // Optionally, send a message with additional attachments
  async sendAttachment(text: string, attachments: Array<Record<string, any>>) {
    const messageData = {
      text,
      attachments
    };

    try {
      const response = await axios.post(this.webhookUrl, messageData, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      console.error("Error sending attachment to Slack:", error);
      throw error;
    }
  }
}
