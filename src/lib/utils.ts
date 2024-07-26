import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const CONTRACT_ADDR = "0x8dc440cec65486a348b00c621aad3ae48f3be9b9cc0bc9988777a642389eed";