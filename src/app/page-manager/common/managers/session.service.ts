import { Injectable } from "@angular/core";
import { AGENT_STATUS } from "ag-common-lib/public-api";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  public agentStatusFilter: AGENT_STATUS[] = [];

  constructor() {}
}
