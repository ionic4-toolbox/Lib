///// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
///// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />
///// <reference path="../../../node_modules/@types/gapi.client/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.client.gmail/index.d.ts" />


import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Observer} from "rxjs/Observer";
import {GoogleApiService} from "./GoogleApiService";
import {GoogleClientService} from "./GoogleClientService";
//import Label = gapi.client.gmail.Label;
import GoogleUser = gapi.auth2.GoogleAuth;
import Message = gapi.client.gmail.Message;
import { IUser } from "../../services/user";
//import { Message } from "@angular/compiler/src/i18n/i18n_ast";

@Injectable()
export class GoogleMailService {
    
    private SESSION_STORAGE_KEY: string = 'accessToken';
    private user: GoogleUser;

    private gmailClient: any;
    private gmailLabelClient: any;
    private requestData = { userId: 'me' };

    constructor(private googleApi: GoogleApiService, private googleClient: GoogleClientService) {
    }

    public getMailClient(): Observable<any> {
        if (!this.gmailClient) {
            return this.googleClient.getClient().mergeMap(() => this.loadGapiGmail());
        }
        return Observable.of(this.gmailClient);
    }
    
    public loadGapiGmail(): Observable<any> { 
        return Observable.fromPromise(
                gapi.client.load('gmail', 'v1').then(()=>{
                    this.gmailClient = gapi.client.gmail;//gapi.client.gmail;  
                    console.info("gapi.client.gmail")
                    return gapi.client.gmail;
            },(e)=>{console.error(e);})
        );  
    }

    public getUserProfile(): Observable<IUser> {
        return Observable.fromPromise(this.gmailClient.users.getProfile(this.requestData))
        .map(this.parseResponseBody)
        .map((userData: any) => {
            console.info(JSON.stringify(userData));
            return <IUser>{
                email: userData.emailAddress,
                threadsTotal: userData.threadsTotal,
                historyId: userData.historyId,
                messagesTotal : userData.messagesTotal
            };
        });
    }

    public getMessages(query?:string): Observable<Message[]> {
        let requestData={
            'userId': 'me',
            'labelIds': ['UNREAD','INBOX'],
            'maxResults': 10,
            //'id': '15f97e78a5defb89',
            'q':query
        };
        // return Observable.fromPromise(this.gmailClient.users.messages.list(requestData))
        // .map(this.parseResponseBody)
        // .map((userData: any) => {
        //     console.info(JSON.stringify(userData));
        //     return userData.messages;
        //     // return <Message>{
        //     //     id:userData.id,
        //     //     threadId:userData.threadId,
        //     //     internalDate:userData.internalDate,

        //     //     // email: userData.emailAddress,
        //     //     // threadsTotal: userData.threadsTotal,
        //     //     // historyId: userData.historyId,
        //     //     // messagesTotal : userData.messagesTotal
        //     // };
        // });

        return Observable.create((observer: Observer<Message[]>)=>{
            let messageArray:Message[]=[];
            this.gmailClient.users.messages.list(requestData).then(
                messages => {
                    if(messages.result.resultSizeEstimate>0){
                        messages.result.messages.forEach(message => {
                            this.gmailClient.users.messages.get({
                                    'userId': 'me',
                                    'id': message.id
                                }).then((responseMessage)=>{
                                    console.info(responseMessage);
                                    messageArray.push(responseMessage) ;
                                    },(e)=>{console.error(e);
                                }).then(()=>{ observer.next(messageArray);/*observer.complete();*/})
                        });
                    }else{
                        observer.complete();
                    }   
            });

        })
        /*.map(this.parseResponseBody)
        .map((userData: any) => {
            console.info(JSON.stringify(userData));
            return userData.messages;
            // return <Message>{
            //     id:userData.id,
            //     threadId:userData.threadId,
            //     internalDate:userData.internalDate,

            //     // email: userData.emailAddress,
            //     // threadsTotal: userData.threadsTotal,
            //     // historyId: userData.historyId,
            //     // messagesTotal : userData.messagesTotal
            // };
        }).switchMap(
            messages => {
                
                return Observable.create((observer: Observer<Message[]>) => {
                    messages.forEach(message => {
                        this.gmailClient.users.messages.get({
                            'userId': 'me',
                            'id': message.id
                          }).then((responseMessage)=>{
                            
                            console.info(responseMessage)
                            return responseMessage;
                            },(e)=>{console.error(e);});
                          
                          
        
                        
                        // Observable.fromPromise(this.gmailClient.users.messages.get({
                        //     'userId': 'me',
                        //     'id': message.id
                        //   })).map(this.extractMessageData)
                        //     .do(data => console.log('getSensorsArray: ' + JSON.stringify(data)))
                        //     .catch(this.handleError);
                    });
                    
                });
            }
        );*/
    }

    parseResponseBody(data: any) {
        return JSON.parse(data.body || '{}');
    }

    private extractMessageData(message: Message):Message {
        return message;
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

}
