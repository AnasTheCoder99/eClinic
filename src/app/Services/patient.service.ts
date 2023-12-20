import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../Models/patient.model';
import { map } from 'rxjs/operators'; 
import { PatientDetail } from '../Models/patientDetail.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  total: number=0;

  constructor() { 
  }

  getAllPatient(): Observable<Patient[]>{

    let patientList: Patient[] = this.getPatientBrief();
    this.total=this.patientDetail.length;

    return new Observable<Patient[]>(obs => {
      obs.next(patientList);
    });
 
    //return this.http.get<Patient[]>('/api/patients');
  }

  findPatients(filter='', sortOrder='asc',
              pageNumber=0, pageSize= 5): Observable<Patient[]>
  {
    this.total=this.patientDetail.length;
    let patient: Patient[] = this.getPatientBrief();

    let start=pageNumber * pageSize;
    let n= start+pageSize;
    let end= (n < patient.length)? n : patient.length;
    let temp= patient.slice(start , end);

    return new Observable<Patient[]>(obs=> {
        obs.next(temp);
    });

      // return this.http.get<Patient[]>('api/patients',{
      //   params: new HttpParams()
      //           .set('filter',filter)
      //           .set('sortOrder',sortOrder)
      //           .set('pageNumber',pageNumber.toString())
      //           .set('pageSize',pageSize.toString())
      //   });
  
  }

  getPatientDetails(id: number):Observable<PatientDetail>{

    return new Observable<PatientDetail>(obs=>{
        let temp= this.patientDetail.find(o=> o.patientId == id);
        obs.next(temp);
    });

    /*
      return this.http.get<Patient>('api/patients',{ params: new HttpParams().set('id', id) });

    */
    
  }

  addNewPatient(data: PatientDetail): boolean{
     
    try{

      let id: number= this.patientDetail[this.patientDetail.length-1].patientId + 1;
      data.patientId= id;

      this.patientDetail.push(data);
      return true;

    }catch(e){
      return false;
    }
      
    /*
      let result: boolean=false; 
      this.http.post<boolean>('api/patient', data).pipe(take(1)).subscribe(d =>{ result=d });
      return result;
    */
  }

  updatePatient(data: PatientDetail): boolean{
     
    try{

      let i: number = this.patientDetail.findIndex(o=> o.patientId == data.patientId);
      this.patientDetail[i]=data;

      return true;

    }catch(e){
      return false;
    }
        
  }

  getPatientBrief(): Patient[]{
    
    let patientList: Patient[]=[];

    this.patientDetail.forEach(data=> patientList.push({patientId: data.patientId,
                                                        name: data.firstName+" "+data.lastName,
                                                        contact: data.phone}));
    return patientList;                                                    
  }
  
  patientDetail: PatientDetail[]=[
    {
      patientId: 8923, firstName: 'Lukas', lastName: 'Schmidt', gender: 'Male', age: 34,
      maritalStatus: 'Single', dob: new Date(Date.parse("March 5, 1988")), religion: 'Christianity',
      phone: '004915212345678', email: 'lukas.schmidt@gmail.com', nationality: 'German', state: 'Bavaria',
      occupation: 'Mechanical Engineer', address: 'Hauptstraße 12, 80331 München', relativeName: 'Anna Schmidt', 
      relativeRelation: 'Sister', relativePhone: '004915287654321', relativeEmail: 'anna.schmidt@gmail.com', 
      relativeOccupation: 'Teacher', relativeAddress:'Schillerstraße 9, 90409 Nürnberg'
    },
    {
      patientId: 8924, firstName: 'Sophia', lastName: 'Becker', gender: 'Female', age: 28,
      maritalStatus: 'Married', dob: new Date(Date.parse("July 22, 1994")), religion: 'Atheist',
      phone: '004915723456789', email: 'sophia.becker@gmail.de', nationality: 'German', state: 'Berlin',
      occupation: 'Graphic Designer', address: 'Friedrichstraße 50, 10117 Berlin', relativeName: 'Max Becker', 
      relativeRelation: 'Husband', relativePhone: '0049 157 9876 5432', relativeEmail: 'max.becker@gmail.de', 
      relativeOccupation: 'Journalist', relativeAddress:'Alexanderplatz 4, 10178 Berlin'
    },
    {
      patientId: 8925, firstName: 'Emilia ', lastName: 'Müller', gender: 'Female', age: 45,
      maritalStatus: 'Divorced', dob: new Date(Date.parse("June 16, 1977")), religion: 'Protestant',
      phone: '004917634567890', email: 'emilia.mueller@gmail.de', nationality: 'German', state: 'Hessen',
      occupation: 'Biologist', address: 'Goethestraße 15, 60313 Frankfurt', relativeName: 'Jonas Müller', 
      relativeRelation: 'Son', relativePhone: '004917665432109', relativeEmail: ' jonas.mueller@gmail.de', 
      relativeOccupation: 'Student', relativeAddress:'Bockenheimer Landstraße 102, 60323 Frankfurt'
    },
    {
      patientId: 8926, firstName: 'Elias ', lastName: 'Wagner', gender: 'Male', age: 50,
      maritalStatus: 'Single', dob: new Date(Date.parse("September 30, 1972")), religion: 'Catholic',
      phone: '004916245678901', email: 'elias.wagner@gmail.de', nationality: 'German', state: 'Baden-Württemberg',
      occupation: 'Architect', address: 'Königstraße 70, 70173 Stuttgart', relativeName: 'Petra Wagner', 
      relativeRelation: 'Daughter', relativePhone: '004916278901234', relativeEmail: 'petra.wagner@gmail.de', 
      relativeOccupation: 'Architect', relativeAddress:'Rosensteinstraße 22, 70191 Stuttgart'
    },
    {
      patientId: 8923, firstName: 'Noah ', lastName: 'Fischer', gender: 'Male', age: 22,
      maritalStatus: 'Single', dob: new Date(Date.parse("March 5, 1988")), religion: 'Christianity',
      phone: '004915212345678', email: 'lukas.schmidt@gmail.com', nationality: 'German', state: 'Bavaria',
      occupation: 'Mechanical Engineer', address: 'Hauptstraße 12, 80331 München', relativeName: 'Anna Schmidt', 
      relativeRelation: 'Sister', relativePhone: '004915287654321', relativeEmail: 'anna.schmidt@gmail.com', 
      relativeOccupation: 'Teacher', relativeAddress:'Schillerstraße 9, 90409 Nürnberg'
    },
    {
      patientId: 8924, firstName: 'Emma ', lastName: 'Weber', gender: 'Female', age: 30,
      maritalStatus: 'Engaged', dob: new Date(Date.parse("July 22, 1994")), religion: 'Atheist',
      phone: '004915723456789', email: 'sophia.becker@gmail.de', nationality: 'German', state: 'Berlin',
      occupation: 'Graphic Designer', address: 'Friedrichstraße 50, 10117 Berlin', relativeName: 'Max Becker', 
      relativeRelation: 'Husband', relativePhone: '0049 157 9876 5432', relativeEmail: 'max.becker@gmail.de', 
      relativeOccupation: 'Journalist', relativeAddress:'Alexanderplatz 4, 10178 Berlin'
    },
    {
      patientId: 8925, firstName: 'Ben  ', lastName: 'Feilmeier', gender: 'Male', age: 38,
      maritalStatus: 'Divorced', dob: new Date(Date.parse("June 16, 1977")), religion: 'Protestant',
      phone: '004917634567890', email: 'emilia.mueller@gmail.de', nationality: 'German', state: 'Hessen',
      occupation: 'Biologist', address: 'Goethestraße 15, 60313 Frankfurt', relativeName: 'Jonas Müller', 
      relativeRelation: 'Son', relativePhone: '004917665432109', relativeEmail: ' jonas.mueller@gmail.de', 
      relativeOccupation: 'Student', relativeAddress:'Bockenheimer Landstraße 102, 60323 Frankfurt'
    },
    {
      patientId: 8926, firstName: 'Mia ', lastName: 'Hoffmann', gender: 'Male', age: 26,
      maritalStatus: 'Single', dob: new Date(Date.parse("September 30, 1972")), religion: 'Catholic',
      phone: '004916245678901', email: 'elias.wagner@gmail.de', nationality: 'American', state: 'Baden-Württemberg',
      occupation: 'Architect', address: 'Königstraße 70, 70173 Stuttgart', relativeName: 'Petra Wagner', 
      relativeRelation: 'Daughter', relativePhone: '004916278901234', relativeEmail: 'petra.wagner@gmail.de', 
      relativeOccupation: 'Architect', relativeAddress:'Rosensteinstraße 22, 70191 Stuttgart'
    },
    {
      patientId: 8925, firstName: 'Charlotte  ', lastName: 'Meyer', gender: 'Female', age: 55,
      maritalStatus: 'Divorced', dob: new Date(Date.parse("June 16, 1977")), religion: 'Protestant',
      phone: '004917634567890', email: 'emilia.mueller@gmail.de', nationality: 'German', state: 'Hessen',
      occupation: 'Biologist', address: 'Goethestraße 15, 60313 Frankfurt', relativeName: 'Jonas Müller', 
      relativeRelation: 'Son', relativePhone: '004917665432109', relativeEmail: ' jonas.mueller@gmail.de', 
      relativeOccupation: 'Student', relativeAddress:'Bockenheimer Landstraße 102, 60323 Frankfurt'
    },
    {
      patientId: 8926, firstName: 'Antonia  ', lastName: 'Lang', gender: 'Female', age: 42,
      maritalStatus: 'Single', dob: new Date(Date.parse("September 30, 1972")), religion: 'Catholic',
      phone: '004916245678901', email: 'elias.wagner@gmail.de', nationality: 'German', state: 'Baden-Württemberg',
      occupation: 'Architect', address: 'Königstraße 70, 70173 Stuttgart', relativeName: 'Petra Wagner', 
      relativeRelation: 'Daughter', relativePhone: '004916278901234', relativeEmail: 'petra.wagner@gmail.de', 
      relativeOccupation: 'Architect', relativeAddress:'Rosensteinstraße 22, 70191 Stuttgart'
    }
  ];

}
