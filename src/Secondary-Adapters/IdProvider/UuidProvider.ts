import { IdProvider } from "../../Core/gateways/IdProvider";
import { v4 } from "uuid";

export class UuidProvider implements IdProvider {
  generate() {
    return v4();
  }
}
