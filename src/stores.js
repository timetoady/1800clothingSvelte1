//Will store data for app
import { readable, writable } from "svelte/store";
import costumes from '../public/assets/costumes.json';



export const costumeList = writable(costumes);
export const currentCostume = writable([])