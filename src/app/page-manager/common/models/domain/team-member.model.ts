export class TeamMember {
    id: string;
    name: string;
    managerId: string;
    isManager?: boolean;
    isCredited?: boolean;
    hierarchyLevel: number;
    creditPercent: number;
    teamMembers: TeamMember[] = [];
    policyCount: number = 0;
    teamPolicyCount: number = 0;
    agencyId: string;
    mgaId: string;
    weightedValue?: number = 0;
    teamWeightedValue?: number = 0;
    conferencePersonalGoal?: number = 0;
    conferenceManagerGoal?: number = 0;
    unweightedValue?: number = 0;
    teamUnweightedValue?: number = 0;
    managerWeightedValue?: number = 0;
    email: string;
}