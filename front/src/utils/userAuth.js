import { create } from "zustand";
import { persist } from "zustand/middleware";

const userAuthentication = create(
  persist(
    (set) => ({
      user: null,
      session: null,
      setLogin: ({ user, session }) => {
        set({ user, session });
      },
      setLogout: () => {
        set({ user: null, session: null });
      },
    }),
    {
      name: "user",
      getStorage: () => sessionStorage,
    }
  )
);
export default userAuthentication;
