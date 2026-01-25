export class sessionsDtos {
    sessionId: string;
    sessionDate: string;                
    opponentName: string[];
    sessionNumber: number;

    constructor(
        sessionId: string = "",
        sessionDate: string = "",
        opponentName: string[] = [],
        sessionNumber: number = 0       
    ){
        this.sessionId = sessionId;
        this.sessionDate = sessionDate;
        this.opponentName = opponentName;
        this.sessionNumber = sessionNumber    
    }
    }