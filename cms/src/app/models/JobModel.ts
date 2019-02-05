export interface JobModel {
        ref: string;
        date: string;
        time: string;
        location: string;
        location_lat?: string;
        location_lng?: any;
        status: string;
        status_ref: string;
        type?: string;
        type_ref?: string;
        name: string;
        surname: string;
    }

