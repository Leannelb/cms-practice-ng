export enum ModalType{error,warning,success,information}

export abstract class AbstractModalComponent {
    public modalShown:boolean;
    public modalType:ModalType;
    public title:string;

    constructor() {
        this.modalShown = false;
    }

    public openModal(){
        this.modalShown = true;
    }
    
    public closeModal(){
        this.modalShown = false;
    }
}