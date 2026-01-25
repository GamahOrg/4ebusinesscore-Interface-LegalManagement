export interface IndicatorsAttachments {
    causeStageAttachmentCount: number;
    sessionAttachmentCount: number;
    judgementGroundAttachmentCount: number;
    causeStageNoteAttachmentCount: number;
    totalAttachmentCount: number;
    attachmentSourcesCount: number;
    averageAttachmentsPerCause: number;
}

export interface IndicatorsCauseStage {
    totalCauseStages: number;
    averageStagesPerCause: number;
    attachmentsPerStage: Array<{
        causeStageId: string;
        causeStageNameAr: string;
        causeStageNameEn: string;
        causeName: string;
        attachmentCount: number;
    }>;
    notesPerStage: Array<{
        causeStageId: string;
        causeStageNameAr: string;
        causeStageNameEn: string;
        causeName: string;
        noteCount: number;
    }>;
    redirectorsPerStage: Array<{
        causeStageId: string;
        causeStageNameAr: string;
        causeStageNameEn: string;
        causeName: string;
        hasRedirector: boolean;
    }>;
}

export interface IndicatorsELibraries {
    totalLibraries: number;
    totalDownloadedFiles: number;
    arabicLibrariesCount: number;
    englishLibrariesCount: number;
}

export interface IndicatorsJudgementGround {
    totalJudgements: number;
    totalJudgementsForSession: number;
    totalJudgementAttachments: number;
    totalJudgementRequierments: number;
}

export interface IndicatorsLawyers {
    totalLawyers: number;
    internalLawyersPercentage: number;
    averageCausesPerLawyer: number;
    sessionAssignmentsCount: number;
    averageCompletedCausesPerLawyer: number;
}

export interface IndicatorsLitigants {
    totalLitigants: number;
    litigantsPerCause: Array<{
        causeId: string;
        causeName: string | null;
        litigantCount: number;
    }>;
    litigantsByIdentityType: Array<{
        identityTypeId: number;
        identityTypeNameAr: string[];
        identityTypeNameEn: string[];
        count: number;
    }>;
}

export interface IndicatorsSessionsAndSessionNotes {
    totalSessions: number;
    averageSessionsPerCause: number;
    totalSessionNotes: number;
    sessionsWithNotesPercentage: number;
    sessionsWithJudgementPercentage: number;
}

export interface IndicatorsTime {
    causeHistoriesCount: number;
    monthlyCauseCreations: Array<{
        year: number;
        month: number;
        causeCount: number;
    }>;    
}

export interface CausesCount {
    result: number; 
}

export interface CausesDuration {
    result: number; 
}