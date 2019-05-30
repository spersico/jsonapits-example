import User from "../resources/user";
import { UserProcessor, Operation, IfUserDoesNotMatches, Authorize } from "@ebryn/jsonapi-ts";

export default class MyVeryOwnUserProcessor<T extends User> extends UserProcessor<T> {

  protected async encryptPassword(op: Operation) {
    return async (op: Operation) => ({ password: op.data.attributes.password });
  }

  attributes = {
    async roles() {
      return ["user", "author", "voter"];
    }
  };

  @Authorize(IfUserDoesNotMatches("roles", ["foo"]))
  public async get(op: Operation) {
    return super.get(op);
  }
}
