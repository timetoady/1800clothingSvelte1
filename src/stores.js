//Will store data for app
import { readable } from "svelte/store";
import costumes from '../public/assets/costumes.json';



export const costumeList = readable(costumes);