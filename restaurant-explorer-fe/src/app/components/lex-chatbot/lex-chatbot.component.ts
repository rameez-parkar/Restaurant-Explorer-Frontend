import { Component } from '@angular/core';
import AWS from 'aws-sdk';

@Component({
  selector: 'app-lex-chatbot',
  templateUrl: './lex-chatbot.component.html',
  styleUrl: './lex-chatbot.component.css'
})
export class LexChatbotComponent {
  inputText: string = '';
  messages: { content: string | undefined, sender: string }[] = [];

  lexruntime: AWS.LexRuntime;

  constructor() {
    this.lexruntime = new AWS.LexRuntime({
      region: 'us-east-1',
      credentials: new AWS.Credentials({
        accessKeyId: 'ASIAQ3EGPJQX54524UMB',
        secretAccessKey: '9Am0Kj9RZuSQMnQDQJw5xWorxIbigLQzwyPPWJkt',
        sessionToken: 'IQoJb3JpZ2luX2VjEOX//////////wEaCXVzLXdlc3QtMiJHMEUCIGfB1ZMhHvqhfL1Ebvft6KM+rBGhV/c9zAOXYv2vezWmAiEA9zlTIAnfo7Hn+wzpoZk9O0IqxJOv85Pww+R94JQWvKgqqQIIHhAAGgwwNTgyNjQwNzk0MDciDCrsfFXdZ3eZn/KgKiqGAhel3VIPA2mav72pNQ2msfy2aZ0ldT8RAwGVOsEAS9wMeiTPj9Ng2wu1ET0WPsinLNWmvkzmyA+qA5N98z19gfLkXys3bbh2Yyjm8X3Cygu57ik3EzGcon5V/gletbf0v+kX8sfPA1QSTFy4fBeJKkSM9elkbStKoj0JRK2abVhH83UQP7MJcqACKTh1QIIEs8CFNyk8+aEYMvHYocPODcwt5iVlmyoJY4Hal+H6bydF7HJMh4oOqTTi69i9ysuUpwcjQiUvxfxBSOohq9dSv3CFlEfJgQ7WnvwXeqfKSC9/7RwTAiRoZF40i647pcEuZW3lNIFp4TU9kzkk6330XiNjaGffo20wz9bWsAY6nQEXF6uiZYURkxA8xwyZGnvcWNXwW8pCJIHtYZLZxAuPczR+NZamc70rg34BLcDE3zuKs0B+MLElobAt8aQ4zrc8z+KwzSj674q7VhvZw1pgMPwOoOJDhJYBvqTt1hx2lOkNDVonQQFgUBjR8HZFx2zX09PthCI68MapkAE3nCTEO6a6YaqiHP0f4WePTwjPcHjUluLj9gSwH60rVKLe'
      })
    });
  }

  async sendMessage() {
    if (!this.inputText.trim()) return;

    const newMessages = [...this.messages, { content: this.inputText, sender: 'user' }];
    this.messages = newMessages;

    const params = {
      botAlias: 'restaurantexplorer',
      botName: 'RestaurantExplorer',
      inputText: this.inputText,
      userId: "1234567"
    };

    try {
      const response = await this.lexruntime.postText(params).promise();
      const botMessage = response.message;
      const newMessagesWithBot = [...newMessages, { content: botMessage, sender: 'bot' }];
      this.messages = newMessagesWithBot;
      this.inputText = '';
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
