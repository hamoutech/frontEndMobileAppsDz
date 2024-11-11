import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

export const generateAvatar = (username) => {
  const avatar = createAvatar(initials, {
    seed: username,
    radius: 50,
    backgroundColor: [
      "00acc1",
      "5e35b1",
      "1e88e5",
      "d81b60",
      "e53935",
      "7cb342",
    ],
  }).toDataUriSync();
  return avatar;
};
