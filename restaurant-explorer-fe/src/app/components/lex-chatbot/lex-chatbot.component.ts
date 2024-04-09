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
        accessKeyId: 'ASIAQ3EGPJQXZF3S5ZML',
        secretAccessKey: '+owmQlUlVQnfcg+kQHwWokgpHgEpdvWcuCjBTmr2',
        sessionToken: 'IQoJb3JpZ2luX2VjENj//////////wEaCXVzLXdlc3QtMiJHMEUCIEnf5wEAyDdKCaafKCqVlKQ/IX+Gk6GN8HovcxQi9ZjgAiEA1mkfChvUiWFdhl4d2IkXuRHnXcrlPIPFBtwkCo5yp5sqqQIIERAAGgwwNTgyNjQwNzk0MDciDHSzBzKzbct+nkZHSCqGAmANExub7yIj2VZweWGbvAVMeZQeKjsyj2mQz3EQq/0I80ICiUgOHGQt0QEjE9e6lN07Fya8LouU9wajeaiHpVjHaVkjRZoYMW0H5qx1/Gbk4BO0ladZMTHU+kZ92k7weaZH1GJLjR+txElojJyKeWOkPJ2cly6N1yL6F4UwcKWLYg7iHIj7NITh66lXLvknsuQUZJQSychKFly2UKVWsIE0GAMkGMO/od3lHujwCkXMiIlU3o6CuOHpKrSrSJx7MJDL3r3KLVs0xbP6nlZMlzB5HEl2RgMiTjeUmsV5IoQd+9aqkgP3qRG9dwSTLDhEy16f0bvw/+hHk0FfOidJX9IvKaimB04ws+7TsAY6nQHNKThsII0wO809tXK1CnhXJvY02DiOeq5ld32448ErUUb8TyeAJr5jveTmga13h3jyFRUgZ1jDzvQ9DKYdK+3/481sfnvdyAQgg+UyPfJBUNTyle4Uo286ghBlLNvw3UmNDitYStetsMkAt9Hu9JietXORawP2Wlu04Fk98ITXs4Djal3Mkxn9AngjIqVYmMLAIsxAv2KSg4kGpiUk'
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
