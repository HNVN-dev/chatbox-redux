import { IdProvider } from "../../Core/gateways/IdProvider";

export class StubIdProvider implements IdProvider {
  private stubValue = "";

  StubValue(stubId: string) {
    this.stubValue = stubId;
  }

  generate() {
    return this.stubValue;
  }
}
