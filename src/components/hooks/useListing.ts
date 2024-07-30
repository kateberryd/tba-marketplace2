import { ABI } from "@/lib/abi";
import { implementationAddress, registryAddress } from "@/lib/constant";
import { CONTRACT_ADDR } from "@/lib/utils";
import { useAccount, useContractRead } from "@starknet-react/core";
import {
	TokenboundClient,
	Call,
	TokenboundClientOptions,
} from "starknet-tokenbound-sdk";
import React, { useEffect, useState } from "react";

interface ListingProp {
	amount: number;
	seller: string;
	tba_address: string;
	listing_id: number;
	token_id: number;
}

const useListingHook = () => {
	const [listings, setListings] = useState<ListingProp[] | undefined>(
		undefined
	);
	const { account } = useAccount();

	const { data, isLoading, error } = useContractRead({
		functionName: "get_listings",
		args: [],
		abi: ABI,
		address: CONTRACT_ADDR,
		watch: true,
	});

	const options = {
		account: account,
		registryAddress: registryAddress,
		implementationAddress: implementationAddress,
		jsonRPC: `https://starknet-sepolia.public.blastapi.io`,
	};

	let tokenbound: any;
	if (account) {
		tokenbound = new TokenboundClient(options as TokenboundClientOptions);
	}

	const getNFTOwner = async (tbaAccount: string) => {
		return await tokenbound.getOwnerNFT(tbaAccount);
	};

	useEffect(() => {
		if (data != null && Array.isArray(data)) {
			let formattedListing = data
				.filter((listing) => listing.is_active)
				.map((listing) => ({
					amount: listing.amount.toString(),
					seller: listing.seller.toString(16),
					tba_address: listing.tba_address.toString(16),
					listing_id: listing.listing_id.toString(),
					token_id: listing.token_id,
				}));

			setListings(formattedListing);
		}
	}, [data]);

	return {
		isLoading,
		listings,
		getNFTOwner,
	};
};

export default useListingHook;
