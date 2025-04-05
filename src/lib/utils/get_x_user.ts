import { headers } from "next/headers";

export async function get_xUser(request_headers: typeof headers) {
  const userHeader = (await request_headers()).get("x-user");
  const user = JSON.parse(userHeader!);
  return user;
}
