"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { sendCard } from "@lib/api/card";
import { useCardStore } from "@store/card-store";
import Button from "@components/button/button";
import { decryptCardId } from "@lib/utils/crypto";
import toast from "react-hot-toast";

interface SendCardResponse {
	code: string;
	message: string;
	data: {
		cardId: number;
	};
}

const CreateBack = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const type = searchParams?.get("type");
	const id = searchParams?.get("id");
	const memberId = id ? decryptCardId(id) : null;

	const [isLoading, setIsLoading] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const { selectedImage, userName, letterContent, setLetterContent, setCardId } = useCardStore();

	useEffect(() => {
		const checkScreenHeight = () => {
			setIsSmallScreen(window.innerHeight < 720);
		};

		checkScreenHeight();

		window.addEventListener("resize", checkScreenHeight);

		return () => window.removeEventListener("resize", checkScreenHeight);
	}, []);

	const handleSendCard = async () => {
		if (isLoading) return;
		if (!letterContent.trim()) {
			toast.error("편지 내용을 입력해주세요.");
			return;
		}
		if (!selectedImage) {
			toast.error("잘못된 접근입니다.");
			return;
		}
		if (!userName.trim()) {
			toast.error("잘못된 접근입니다.");
			return;
		}

		try {
			setIsLoading(true);
			const response = (await sendCard(
				letterContent,
				userName,
				null, // V2.1 수정
				selectedImage,
				memberId,
			)) as SendCardResponse;

			if (response.code === "200") {
				setCardId(response.data.cardId);
				router.push(`/create/complete?type=${type}`);
			}
		} catch (error) {
			console.error("카드 전송 중 오류 발생:", error);
			toast.error("카드 전송에 실패했습니다. 다시 시도해주세요.");
		} finally {
			setIsLoading(false);
		}
	};

	const cardSize = isSmallScreen
		? {
				wrapper: "w-[255px] h-[451px]",
				textarea: "w-[188px] h-[363px]",
		  }
		: {
				wrapper: "w-[280px] h-[495px]",
				textarea: "w-[206px] h-[398px]",
		  };

	return (
		<div className="flex flex-col items-center w-full ">
			<div className="text-white font-nexonBold text-xl mt-2">편지 작성</div>
			<div className="relative mt-4 flex justify-center">
				<div className={`relative ${cardSize.wrapper}`}>
					<Image
						src="/assets/fortune-reverse.png"
						alt="운세 카드"
						fill
					/>
					<textarea
						value={letterContent}
						onChange={(e) => setLetterContent(e.target.value)}
						className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                            ${cardSize.textarea} bg-transparent text-black 
                            resize-none font-nexonRegular text-base
                            focus:outline-none scrollbar-hide
                            overflow-y-auto [&::-webkit-scrollbar]:hidden`}
						placeholder="편지를 작성해주세요..."
						maxLength={500}
					/>
				</div>
			</div>
			<div className="w-[280px] flex justify-end mt-1">
				<div className="text-white font-nexonLight text-sm">{letterContent.length}/500자</div>
			</div>

			<div className="w-full mt-2 flex justify-center mb-8">
				<Button
					text={isLoading ? "전송 중..." : type === "normal" ? "완성하기" : "전송하기"}
					color="green"
					size="long"
					font="bold"
					shadow="green"
					onClick={handleSendCard}
					disabled={isLoading}
				/>
			</div>
		</div>
	);
};

export default CreateBack;
