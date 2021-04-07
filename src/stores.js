//Will store data for app
import { readable, writable } from "svelte/store";
import costumes from '../public/assets/costumes.json';



export const costumeList = readable(costumes);
export const currentCostume = writable([])
export const dateFilters = writable([])
export const groupFilters = writable([])
export const categoryFilters = writable([])
export const classFilters = writable([])