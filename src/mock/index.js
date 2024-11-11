import { createServer } from "miragejs";
import { API_BASE_URL } from "configs/AppConfig";

import { signInUserData } from "./data/authData";

import { authFakeApi } from "./fakeApi";

export default function mockServer({ environment = "test" }) {
  //this simulates api responses
  return createServer({
    environment,
    seeds(server) {
      server.db.loadData({
        signInUserData,
      });
    },
  });
}
