export class Contact {

  toEmail: string;
  fromEmail: string;
  msgBody: string;
  subject: string;

  constructor(fromEmail: string, msgBody: string, subject: string){
    this.toEmail = "faroekh@hotmail.com"
    this.fromEmail = fromEmail
    this.msgBody = msgBody
    this.subject = subject
  }
  

}
