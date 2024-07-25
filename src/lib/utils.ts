import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const CONTRACT_ADDR = "0x54cfc22ea64ccbc080ac89ea44d1757757133ecb710eadd59cf6dbe46928c0a";