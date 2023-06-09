import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface EventData{
  title: string,
  date: string,
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private eventData: EventData[] = [];
  public eventData$ = new Subject<EventData[]>()

  addEventData(eventData: EventData){
    const twoDaysInMs = 2 * 23 * 60 * 60 * 1000;
    const today = new Date();
    today.setHours(today.getHours() - 4); // adjust UTC conversion for eventdate
    const eventDate = new Date(eventData.date);
    let diff = eventDate.getTime() - today.getTime();
    if(diff > 0 && diff <= twoDaysInMs){
      this.eventData.push(eventData);
    }
    else if(diff > -82800000 && diff < twoDaysInMs){ // Adjust for UTC conversion
      this.eventData.push(eventData);
    }
    this.eventData$.next(this.eventData)
  }

  removeLastEventData(){
    if(this.eventData.length != 0){
      this.eventData.pop();
    }
    this.eventData$.next(this.eventData)
  }

  removeEventData(eventData: EventData){
    for(let i = 0; i < this.eventData.length; i++){
      let cur = this.eventData.at(i);
      if(cur?.title == eventData.title && cur.date == eventData.date){
        this.eventData.splice(i,1);
        break;
      }
    }
    this.eventData$.next(this.eventData)
  } 

  removePastDue(): boolean{
    const today = new Date();
    for(let event of this.eventData){
      const [year, month, day] = event.date.split('-');
      const eventDate = new Date(Number(year), Number(month), Number(day));
      if(eventDate < today){
        this.removeEventData(event);
        return true;
      }
    }
    this.eventData$.next(this.eventData)
    return false;
  }

  clearEventData(){
    this.eventData.splice(0, this.eventData.length);
    this.eventData$.next(this.eventData)
  }

  getEventData(){
    return this.eventData;
  }

  getEventDataLen(){
    return this.eventData.length;
  }
}
