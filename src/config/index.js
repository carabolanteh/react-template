import Fonselp from "./226/226";
import Empujar from "./633/633";
import Ada from "./3221/3221";
import ArgentinaLibreDeCoronavirus from "./4194/4194";
import Naves from "./176/176";
import VamosAZoomar from "./4161/4161";
import Baufest from "./22/22";
import CivicHouse from "./2241/2241";
import Bisblick from "./3885/3885";
import Idex from "./2614/2614";
import Mediapila from "./1284/1284";
import Caritas from "./2387/2387";
import PactoEmprendedor from "./4193/4193";
import Globant from "./71/71";
import AnimalKarma from "./5838/5838";
import ManosAbiertas from "./343";
import PontenciarSolidario from "./3403";
import ArgentinaNarrada from "./492";
import MadreEmprededora from "./3766";
import MovimientoNuevaGeneracion from "./5878";
import Priar from "./1505/1505";
import FundacionDeLio from "./5848/5848";
import AfricaDream from "./5948/5948";

import GrupoSupervielle from "./5933/5933";
import GrupoMexico from "./2621/2621";

const config = () => {
  const entityConfig = process.env.REACT_APP_ID_ENTITY;

  const base = Fonselp;

  switch (entityConfig) {
    case "226":
      return base;
    case "633":
      return { ...base, ...Empujar };
    case "4194":
      return { ...base, ...ArgentinaLibreDeCoronavirus };
    case "3221":
      return { ...base, ...Ada };
    case "176":
      return { ...base, ...Naves };
    case "4161":
      return { ...base, ...VamosAZoomar };
    case "22":
      return { ...base, ...Baufest };
    case "2241":
      return { ...base, ...CivicHouse };
    case "3885":
      return { ...base, ...Bisblick };
    case "2614":
      return { ...base, ...Idex };
    case "1284":
      return { ...base, ...Mediapila };
    case "2387":
      return { ...base, ...Caritas };
    case "4193":
      return { ...base, ...PactoEmprendedor };
    case "71":
      return { ...base, ...Globant };
    case "5838":
      return { ...base, ...AnimalKarma };
    case "343":
      return { ...base, ...ManosAbiertas };
    case "3403":
      return { ...base, ...PontenciarSolidario };
    case "492":
      return { ...base, ...ArgentinaNarrada };
    case "3766":
      return { ...base, ...MadreEmprededora };
    case "5878":
      return { ...base, ...MovimientoNuevaGeneracion };
    case "2621":
      return { ...base, ...GrupoMexico };
    case "5933":
      return { ...base, ...GrupoSupervielle };
    case "1505":
      return { ...base, ...Priar };
    case "5848":
      return { ...base, ...FundacionDeLio };
    case "5948":
        return { ...base, ...AfricaDream };
    default:
      return base;
  }
};

export default config();
