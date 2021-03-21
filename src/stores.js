//Will store data for app
import { readable, writable } from "svelte/store";
import costumes from '../public/assets/costumes.json';



export const costumeList = readable(costumes);
export const currentCostume = writable([])