export interface objectClass {
    Region:string;
    State: string;
    PlantCode: string;
    MaterialNo: string;
    MaterialDescription: string;
    value: number;
    Price: number;
    InventoryValue: number;
    Demand30Days:number;
    Demand60Days: number;
    Demand90Days:number;
    AnnualDemand: number;
    ExcessQty30Days: number;
    ExcessQty60Days: number;
    ExcessQty90Days: number
    ExcessValue30Days: number
    ExcessValue60Days: number;
    ExcessValue90Days: number;
    ObsoleteQty: number;
    ObsoleteValue:number;
}
