// # Libs
import { Injectable } from '@nestjs/common';

import { ILetter } from '@llove/models';
import { Shared } from '@llove/product-domain/backend';

// # Types
type FlowData<Record> = Shared.Application.Flow.Interface.FlowData<Record>;
type FlowState<FlowValueType> = Shared.Application.Flow.Interface.FlowState<FlowValueType>;
type FlowID = Shared.Application.Flow.Interface.FlowID;
type FlowRepository<FlowValueType> =
  Shared.Application.Flow.Interface.FlowRepository<FlowValueType>;
type LetterOptions = ILetter.Infrastructure.CreateLetterOptionsDto;

// # Main

@Injectable()
export class LetterGenerationFlowRepository implements FlowRepository<LetterOptions> {
  private flows: FlowData<LetterOptions> = {};

  async getFlow(flowID: FlowID): Promise<FlowState<LetterOptions>> {
    return this.flows[flowID];
  }
  async setFlow(flowID: FlowID, state: FlowState<LetterOptions>): Promise<void> {
    this.flows[flowID] = state;
  }
  async deleteFlow(flowID: FlowID): Promise<void> {
    delete this.flows[flowID];
  }

  // clean all the states
  async clear(): Promise<void> {
    this.flows = {};
  }
}
