export interface GenericResponse {
    status:number;
    message?:string | null;
    data?:Map<string,any> | null;
    //changed from     
    //data?:Array<any> | null;

}