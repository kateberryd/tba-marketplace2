"use client";
import { useEffect, useMemo, useState } from "react";

import Layout from "@/components/Layout";
import { PlaceBidIcon, PlaceBidWhiteIcon } from "@/assets/Icons";
import CustomModal from "@/components/Modal";
import { Input } from "@/components/Input";
import { useParams } from "next/navigation";
import { CONTRACT_ADDR } from "@/lib/utils";
import {
	useAccount,
	useContractRead,
	useContractWrite,
} from "@starknet-react/core";
import toast from "react-hot-toast";
import { cairo, Contract, RpcProvider, Uint256 } from "starknet";
import { ABI } from "@/lib/abi";
import useBidsHooks from "@/components/hooks/useBidsHooks";
import OrbitProgress from "react-loading-indicators/OrbitProgress";
import { myProviderUrl } from "@/lib/constant";

interface TBAProps {
	seller: string;
	amount: number;
	listing_id: number;
	is_active: boolean;
	tba_address: string;
}

export default function Example() {
	const [active, setActiveTab] = useState<number>(1);
	const [bidOpen, setBidOpen] = useState<boolean>(false);
	const [acceptBid, setAcceptBid] = useState<boolean>(false);
	const { isConnected, address } = useAccount();
	const [amount, setAmount] = useState<number>(0);
	const [listing, setListing] = useState<TBAProps | null>(null);

	const params = useParams();
	const [tbaContract] = useState<Contract>(
		new Contract(
			ABI,
			CONTRACT_ADDR,
			new RpcProvider({ nodeUrl: myProviderUrl })
		)
	);

	const { listingBids, bidsIsLoading } = useBidsHooks();

	const tabs = [
		{
			id: 1,
			label: "Overview",
		},

		{
			id: 2,
			label: "Bids",
		},
	];

	const calls = useMemo(() => {
		let formattedAmount: Uint256 = cairo.uint256(9);
		let listing_id: Uint256 = cairo.uint256(params.listing_id.toString());
		const tx = {
			contractAddress: CONTRACT_ADDR,
			entrypoint: "place_bid",
			calldata: [listing_id, formattedAmount],
		};
		return [tx];
	}, [params.listing_id, amount]);

	const { writeAsync } = useContractWrite({ calls });

	const handleSubmit = () => {
		if (!isConnected && !address) {
			toast.error("Please connect your wallet");
			return;
		}

		if (amount == 0) {
			toast.error("Please amount can not be zero");
			return;
		}

		try {
			writeAsync();
			toast.success("Bid placed successfully");
			setBidOpen(false);
		} catch (error) {
			console.error(error);
			toast.error("Unable placed bid ");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const listing_id = params.listing_id;
			if (listing_id) {
				const listing = (await tbaContract.call("get_listing", [
					listing_id,
				])) as TBAProps;

				setListing(listing);
			}
		};
		fetchData().catch(console.error);
	}, [params.listing_id]);

	console.log(listing?.amount);

	return (
		<>
			<Layout>
				<main>
					<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
						<div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
							<div className="lg:col-start-3 lg:row-end-1">
								<h2 className="sr-only">Summary</h2>

								<div className="flex items-center gap-5 border-b w-full pb-5">
									<div className="w-20 h-20 ">
										<img
											className="w-full h-full rounded-2xl"
											src="/img-1.png"
											alt=""
										/>
									</div>
									<div className=" space-y-4">
										<p className="font-satoshi text-base font-normal text-primaryText">
											Current Owner
										</p>
										<p className="text-[14px] font-normal text-[#49536E] ">
											{listing?.seller
												?.toString()
												.slice(0, 8)
												.concat("...")
												.concat(listing?.seller?.toString().slice(-10))}
										</p>
									</div>
								</div>

								<div className="flex items-center rounded-lg justify-between bg-[#FAFAFB] gap-5 border-b w-full py-3 px-2 my-5">
									<div className=" flex items-center gap-2">
										<div className="w-8 h-8 ">
											<img
												className="w-full h-full rounded-2xl"
												src="/img-1.png"
												alt=""
											/>
										</div>
										<div>
											<p className="font-satoshi text-sm font-normal text-primaryText">
												Price
											</p>
											{listing != null && (
												<p className="text-[18px] font-bold text-[#49536E] ">
													{parseInt(listing.amount.toString()) / 10 ** 18} STRK
												</p>
											)}
										</div>
									</div>

									{/* <p className="text-[18px] font-bold text-[#49536E] ">$0</p> */}
								</div>

								<button
									onClick={() => setBidOpen(true)}
									className="w-full border flex items-center justify-center gap-3 border-primary rounded-lg py-3 text-[18px] font-bold text-primary mt-5"
								>
									<PlaceBidIcon /> Place Bid
								</button>
							</div>

							<div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
								<div className="flex flex-col items-center justify-center">
									<div className="w-20 h-20">
										<img
											src="/img-1.png"
											className="w-full h-full rounded-xl"
											alt="img"
										/>
									</div>

									<p className="text-primaryText  font-satoshi text-[20px] pt-4">
										{/* <strong>TBA</strong>: {data?.nft_contract_address?.toString().slice(0, 8).concat("...").concat(data?.nft_contract_address?.toString().slice(-10))} */}
									</p>

									<div className="flex items-center cursor-pointer mt-5">
										{tabs.map(({ label, id }) => (
											<div
												key={id}
												className={`px-5 py-3 ${
													active == id
														? "bg-primary rounded-md"
														: "bg-[#F5F6F7]"
												}`}
												onClick={() => setActiveTab(id)}
											>
												<p
													className={` text-sm ${
														active == id ? "text-white" : "#969799"
													}`}
												>
													{label}
												</p>
											</div>
										))}
									</div>
								</div>

								{active == 1 ? (
									<div className="py-10 space-y-5">
										<p className="text-primaryText font-bold text-[20px ] font-satoshi">
											Description
										</p>
										<p className="text-primaryText font-medium text-[16px ] font-satoshi ">
											{/* Bid for and Sell your NFTs as Token Band Accounts. */}
										</p>
										{/* <div className="div">
											<p className="text-primaryText font-bold text-[20px ] font-satoshi ">
												Details{" "}
											</p>
										</div> */}
										{/* <div className="mt-16 w-full space-y-5">
											<div className="border  py-5 border-gray-100 rounded-xl">
												<p className="px-5 font-medium text-primaryText ">
													Ethereum (ERC-721)
												</p>
											</div>

											<div className="border py-5 border-gray-100 rounded-xl">
												<div className="px-5 font-medium  text-primary ">
													Refresh Metadata
												</div>
											</div>
										</div> */}
									</div>
								) : (
									active == 2 && (
										<div className="py-10">
											<p className="text-primaryText font-bold text-[20px ] font-satoshi">
												All Bids
											</p>
											<table className="mt-5 border border-[#EEEFF2] w-full whitespace-nowrap rounded text-left text-sm leading-6">
												<colgroup>
													<col />
													<col />
												</colgroup>

												{bidsIsLoading ? (
													<div className="h-[50vh] flex items-center justify-center">
														<OrbitProgress
															color="#4A23A4"
															size="medium"
															text=""
															textColor=""
														/>
													</div>
												) : (
													listingBids != undefined &&
													listingBids.map(({ bid_id, bidder, amount }, i) => (
														<tbody>
															<tr key={i} className="border-b border-gray-100 ">
																<td className=" py-5 pl-8 pr-0 gap-3 px- flex items-center text-right align-top tabular-nums text-gray-700 ">
																	<div className="w-8 h-8">
																		<img
																			src="/address.png"
																			className="w-full h-full"
																			alt=""
																		/>
																	</div>
																	<p>
																		{" "}
																		{bidder
																			?.slice(0, 8)
																			.concat("...")
																			.concat(bidder?.slice(-10))}
																	</p>
																</td>
																<td className="py-5 font-bold  pr-5 text-right align-top tabular-nums text-gray-700 sm:table-cell">
																	{amount / 10 ** 18} STRK
																</td>
																<tr className="py-5 font-bold  pr-5 text-right align-top tabular-nums text-gray-700 sm:table-cell">
																	<button
																		onClick={() => setAcceptBid(true)}
																		className="px-3 bg-[#F7F7F7] border rounded-lg py-2"
																	>
																		<p className="font-satoshi text-xs text-[#49536E]">
																			Accept Bid
																		</p>
																	</button>
																</tr>
															</tr>
														</tbody>
													))
												)}
											</table>
										</div>
									)
								)}
							</div>

							<div className="lg:col-start-3"></div>
						</div>
					</div>

					<CustomModal
						isOpen={bidOpen}
						onClose={() => setBidOpen(!bidOpen)}
						title="Place Bid"
					>
						<div>
							<div className="flex  rounded-lg justify-between bg-[#FAFAFB] gap-5 border-b w-full py-3 px-2 my-5">
								<div className=" flex justify-start items-center gap-2">
									<div className="w-12 h-12 ">
										<img
											className="w-full h-full rounded-xl"
											src="/img-1.png"
											alt=""
										/>
									</div>
								</div>

								<div className="space-y-2">
									<p className="text-[14px] font-bold text-[#192648] ">
										{listing != null && (
											<p className="text-[18px] font-bold text-[#49536E] ">
												{parseInt(listing.amount.toString()) / 10 ** 18} STRK
											</p>
										)}
									</p>
								</div>
							</div>

							<Input
								placeholder="Amount"
								onChange={(e) => setAmount(parseInt(e.target.value))}
							/>

							<button
								onClick={handleSubmit}
								className="w-full border flex items-center justify-center gap-3 border-primary bg-primary rounded-lg py-3 text-[18px] font-bold text-white mt-5"
							>
								<PlaceBidWhiteIcon color="#fff" /> Place Bid
							</button>
						</div>
					</CustomModal>

					<CustomModal
						isOpen={acceptBid}
						onClose={() => setAcceptBid(!bidOpen)}
						title="You are about to accept a bid!"
					>
						<div className="pt-6">
							<div className="flex items-center gap-4 ">
								<div className="w-8 h-8 ">
									<img
										className="w-full h-full rounded-2xl"
										src="/hero-img.png"
										alt=""
									/>
								</div>
								<p className="font-satoshi text-base text-primaryText">
									0x2c934.............fa3f2c2.....a180
								</p>
							</div>

							<div className="flex w-full items-center rounded-lg justify-between bg-[#FAFAFB] gap-5 border-b  py-3 px-2 my-5">
								<div className=" flex items-center gap-2">
									<div className="w-8 h-8 ">
										<img
											className="w-full h-full rounded-2xl"
											src="/img-1.png"
											alt=""
										/>
									</div>
									<div>
										<p className="font-satoshi text-sm font-normal text-primaryText">
											Price
										</p>
										{listing != null && (
											<p className="text-[18px] font-bold text-[#49536E] ">
												{parseInt(listing.amount.toString()) / 10 ** 18} STRK
											</p>
										)}{" "}
									</div>
								</div>

								<p className="text-[16px] font-bold text-[#192648] ">
									$50,152.56
								</p>
							</div>

							<button className="w-full border flex items-center justify-center gap-3 border-primary bg-primary rounded-lg py-3 text-[18px] font-bold text-white mt-5">
								<PlaceBidWhiteIcon color="#fff" /> Accept Bid
							</button>
						</div>
					</CustomModal>
				</main>
			</Layout>
		</>
	);
}
