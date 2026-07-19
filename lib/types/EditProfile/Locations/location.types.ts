export interface Province {
    id: number;
    name: string;
  }
  
  export interface District {
    id: number;
    name: string;
    zone_id: number;
  }
  
  export type MunicipalityType = "Nagarpalika" | "Gaupalika";
  
  export interface Municipality {
    id: number;
    name: string;
    district_id: number;
    type: MunicipalityType;
  }