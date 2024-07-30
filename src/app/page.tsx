"use client";
import { PlaceBidWhiteIcon } from "@/assets/Icons";
import NFTCard from "@/components/Card";
import useListingHook from "@/components/hooks/useListing";
import { Input } from "@/components/Input";
import Layout from "@/components/Layout";
import CustomModal from "@/components/Modal";
import { CONTRACT_ADDR } from "@/lib/utils";
import {
	useAccount,
	useContractWrite,
} from "@starknet-react/core";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { cairo, RpcProvider, Uint256 } from "starknet";

export default function Home() {
	const [openListing, setOpenListing] = useState<boolean>(false);
	const [tba, setTba] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);

	const { listings, getNFTOwner } = useListingHook();



	const provider = new RpcProvider({
		nodeUrl: "https://starknet-sepolia.public.blastapi.io",
	});



	const { isConnected, address } = useAccount();
	const navigate = useRouter();

	const calls = useMemo(() => {
		let formattedAmount: Uint256 = cairo.uint256(amount);

		const tx = {
			contractAddress: CONTRACT_ADDR,
			entrypoint: "list_tba",
			provider: provider,
			calldata: [tba, formattedAmount],
		};

		const tx2 = {
			contractAddress: CONTRACT_ADDR,
			entrypoint: "list_tba",
			provider: provider,
			calldata: [tba, formattedAmount],
		};
		return [tx, tx2];
	}, [tba, amount]);

	const { writeAsync } = useContractWrite({ calls });




	const handleSubmit = () => {
		if (!isConnected && !address) {
			toast.error("Please connect your wallet");
			return;
		}

		if (!tba || amount == 0) {
			toast.error("Please fill out all fields");
			return;
		}

		try {
			const tbaOwner = getNFTOwner(tba)
			console.log(tbaOwner)
			// writeAsync();
			toast.success("TBA Listed successfully");
			setOpenListing(false);
		} catch (error) {
			console.error(error);
			toast.error("Unable to list TBA ");
		}
	};

	return (
		<Layout>
			<div className="bg-hero bg-no-repeat bg-cover my-10 rounded-xl border border-[#DCD4FF] py-10 lg:py-0 h-[400px] lg:h-[592px] w-full  flex items-center gap-40 justify-between  px-5 lg:px-[120px]">
				<div className="flex flex-col  justify-between">
					<h1 className="text-[30px] lg:text-[112px] font-satoshi text-primaryText lg:eading-[134px]">
						Bid&Sell
					</h1>
					<p className="font-satoshi font-500  text-secondaryText py-5 lg:py-10">
						Bid for and Sell your NFTs as Token Band Accounts.
					</p>
					<div className="flex gap-5">
						<button className="px-5 py-3 text-white bg-primary border border-primary rounded-lg">
							Explore
						</button>
						<button
							onClick={() => setOpenListing(true)}
							className="px-5 py-3 text-primary bg-transparent border border-primary rounded-lg"
						>
							List Account
						</button>
					</div>
				</div>
				<div className="flex-1 hidden lg:block">
					<img
						src="/hero-img.png"
						className="w-full  rounded-lg"
						alt="hero-img"
					/>
				</div>
			</div>

			<section>
				<h1 className="font-bold text-[32px] text-[#192648]">
					Latest Addition
				</h1>
				<div className="py-10">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
						{listings?.slice(0, 8).map(
							({ tba_address, seller, token_id, amount, listing_id }, i) => (
								<div key={i}>
									<NFTCard seller={seller} title={tba_address} lisiting_id={listing_id} route="/details" amount={amount}  />
								</div>
							)
						)}
					</div>
				</div>
				<button
					onClick={() => navigate.push("/marketplace")}
					className="w-full border border-primary bg-transparent text-primary rounded-lg py-2"
				>
					View All NFTs
				</button>
			</section>
			<section className="bg-hero bg-no-repeat bg-cover my-10 py-5 lg:py-0  rounded-xl border border-[#DCD4FF] lg:h-[492px] w-full  flex items-center gap-40 justify-between lg:px-[120px] px-5">
				<div>
					<h1 className="bg-gradient-to-r from-[#7873F5] via-purple-500 to-[#EC77AB] bg-clip-text text-transparent font-satoshi lg:text-[56px] font-bold lg:leading-[67px]">
						Provide Access to NFTs as Token Band Accounts
					</h1>
					<p className="py-5 text-primaryText font-satoshi ">
						Powered by <span className="underline text-primary">Starknet</span>
					</p>
					<button className="px-5 py-3 text-white bg-primary border border-primary rounded-lg">
						Submit
					</button>
				</div>
			</section>

			<section className="flex flex-col items-center justify-between py-10">
				<h1 className="lg:text-[112px] text-[40px] font-satoshi text-primaryText leading-[134px]">
					Bid&Sell
				</h1>

				<div className="flex py-5 gap-5">
					<button className="px-5 py-3 text-white bg-primary border border-primary rounded-lg">
						Explore
					</button>
					<button
						onClick={() => navigate.push("/nft")}
						className="px-5 py-3 text-primary bg-transparent border border-primary rounded-lg"
					>
						Submit
					</button>
				</div>
			</section>

			<CustomModal
				isOpen={openListing}
				onClose={() => setOpenListing(!openListing)}
				title="List Tokenbound Account"
			>
				<div className="space-y-3">
					<Input
						placeholder="TBA Address"
						onChange={(e) => setTba(e.target.value)}
					/>

					<Input
						placeholder="Amount"
						onChange={(e) => setAmount(parseInt(e.target.value))}
					/>

					<button
						onClick={handleSubmit}
						className="w-full border flex items-center justify-center gap-3 border-primary bg-primary rounded-lg py-3 text-[18px] font-bold text-white mt-5"
					>
						<PlaceBidWhiteIcon color="#fff" /> Submit
					</button>
				</div>
			</CustomModal>
		</Layout>
	);
}
