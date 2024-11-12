"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

import Button from "@components/button/button";
import { ISeasonDetailProps, ISeasonProps } from "@interface/components/season";
import { selectSeason, updateSeason } from "@lib/api/admin-api";

import { PlusCircle } from "@phosphor-icons/react";

const SettingDetail = () => {
	const { id } = useParams();
	const [season, setSeason] = useState<ISeasonDetailProps | null>(null);
	const [seasonData, setSeasonData] = useState<ISeasonProps>({
		name: "",
		description: "",
		started_at: "",
		ended_at: "",
		opened_at: "",
	});
	const [images, setImages] = useState<File[]>([]);
	const [previewImages, setPreviewImages] = useState<string[]>([]);

	const getSeasonDetail = async () => {
		try {
			const response = await selectSeason(Number(id));
			const data = response.data.data;
			console.log(data);
			setSeason(data);
			setSeasonData({
				name: data.name,
				description: data.description,
				started_at: data.started_at,
				ended_at: data.ended_at,
				opened_at: data.opened_at,
			});
			setPreviewImages(data.path);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (id) getSeasonDetail();
	}, [id]);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || []);
		setImages(files);
		setPreviewImages(files.map((file) => URL.createObjectURL(file))); // 미리보기 이미지 업데이트
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSeasonData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleUpdateSeason = async () => {
		try {
			await updateSeason(Number(id), images, seasonData);
			alert("시즌 정보가 수정되었습니다.");
		} catch (error) {
			console.error("시즌 정보 수정 실패:", error);
		}
	};

	return (
		<div id="setting-detail">
			<div className="w-[calc(100%-64px)] mx-auto pt-4">
				<div className="mb-4">
					<h2 className="font-nexonBold text-white mb-2">시즌 이름 설정</h2>
					<div className="flex flex-col gap-2">
						<input
							type="text"
							name="name"
							placeholder="시즌 이름을 입력하세요"
							className="font-nexonRegular text-sm p-2 rounded-lg"
							value={seasonData.name}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="mb-4">
					<h2 className="font-nexonBold text-white mb-2">시즌 안내문 설정</h2>
					<div className="flex flex-col gap-2">
						<input
							type="text"
							name="description"
							placeholder="시즌 안내문을 입력하세요"
							className="font-nexonRegular text-sm p-2 rounded-lg"
							value={seasonData.description}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="mb-4">
					<h2 className="font-nexonBold text-white mb-2">이벤트 기간 설정</h2>
					<div className="flex flex-col justify-between items-center gap-1">
						<input
							type="date"
							name="started_at"
							className="font-nexonRegular w-full text-sm p-2 border border-solid border-black rounded-lg"
							value={seasonData.started_at.slice(0, 10)}
							onChange={handleInputChange}
						/>
						<span className="text-white"> ~ </span>
						<input
							type="date"
							name="ended_at"
							className="font-nexonRegular w-full text-sm p-2 border border-solid border-black rounded-lg"
							value={seasonData.ended_at.slice(0, 10)}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="mb-4">
					<h2 className="font-nexonBold text-white mb-2">오픈일 설정</h2>
					<div>
						<input
							type="date"
							name="opened_at"
							className="font-nexonRegular w-full text-sm p-2 border border-solid border-black rounded-lg"
							value={seasonData.opened_at.slice(0, 10)}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="mb-8">
					<h2 className="font-nexonBold text-white mb-2">메인 이미지 설정 (최소 3개)</h2>
					<div className="flex gap-4">
						<label
							htmlFor="banner-image"
							className="block w-[120px] h-[212px] rounded-lg bg-white"
						>
							<PlusCircle
								size={32}
								color="black"
								weight="thin"
								className="mx-auto h-full"
							/>
						</label>
						<input
							id="banner-image"
							type="file"
							accept="image/*"
							multiple
							className="hidden"
							onChange={handleImageChange}
						/>
						{previewImages.map((imageSrc, index) => (
							<Image
								key={index}
								src={imageSrc}
								alt={`Season Image ${index + 1}`}
								width={120}
								height={212}
								className="w-[120px] h-[212px] rounded-lg bg-white object-cover"
							/>
						))}
					</div>
				</div>
				<div className="text-center mb-6">
					<Button
						text="시즌 정보 수정하기"
						color="gradient"
						size="semiLong"
						font="bold"
						shadow="gradient"
						onClick={handleUpdateSeason}
					/>
				</div>
			</div>
		</div>
	);
};

export default SettingDetail;