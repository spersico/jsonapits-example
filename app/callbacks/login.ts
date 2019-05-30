import { Operation, ResourceAttributes } from "@ebryn/jsonapi-ts";

export default async (op: Operation, user: ResourceAttributes) => {
  return op.data.attributes.email === user.email && op.data.attributes.password === user.password;
}