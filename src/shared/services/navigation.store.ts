import { NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction | null = null;

export const navigationStore = {
  setNavigate: (nav: NavigateFunction) => {
    navigate = nav;
  },
  getNavigate: () => navigate,
};
