import { Component } from '@angular/core';

interface Message {
  username: string;
  text: string;
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  messages: Message[] = [];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ username: 'You', text: this.newMessage });
      this.newMessage = '';
    }
  }
}
