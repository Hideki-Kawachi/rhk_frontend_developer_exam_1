import React, { useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { BsChevronCompactDown, BsChevronCompactRight } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { CgAttachment } from "react-icons/cg";
import Tags from "./tags";

function EmailCard({
	id,
	date,
	senderName,
	senderEmail,
	tags,
	subject,
	content,
	setSelectedEmail,
	selectedEmail,
}) {
	const [expandCard, setExpandCard] = useState(false);
	const dateParts = date.split(" ");
	const nameParts = senderName.split(" ");
	const tagParts = tags.split(",");
	const sentDate = new Date(date);
	const [attachments, setAttachments] = useState(
		Math.floor(Math.random() * (7 - 0)) + 0
	);
	const day = getDay();

	function getDay() {
		let dayNum = sentDate.getDay();
		if (dayNum === 0) {
			return "Sun";
		} else if (dayNum === 1) {
			return "Mon";
		} else if (dayNum === 2) {
			return "Tues";
		} else if (dayNum === 3) {
			return "Wed";
		} else if (dayNum === 4) {
			return "Thurs";
		} else if (dayNum === 5) {
			return "Fri";
		} else if (dayNum === 6) {
			return "Sat";
		} else {
			return "Error";
		}
	}

	function getDate() {
		let dateNum = sentDate.getMonth();
		let fullMonth = "";
		if (dateNum === 0) {
			fullMonth = "January";
		} else if (dateNum === 1) {
			fullMonth = "February";
		} else if (dateNum === 2) {
			fullMonth = "March";
		} else if (dateNum === 3) {
			fullMonth = "April";
		} else if (dateNum === 4) {
			fullMonth = "May";
		} else if (dateNum === 5) {
			fullMonth = "June";
		} else if (dateNum === 6) {
			fullMonth = "July";
		} else if (dateNum === 7) {
			fullMonth = "August";
		} else if (dateNum === 8) {
			fullMonth = "September";
		} else if (dateNum === 9) {
			fullMonth = "October";
		} else if (dateNum === 10) {
			fullMonth = "November";
		} else if (dateNum === 11) {
			fullMonth = "December";
		} else {
			return "Error";
		}
		return fullMonth + " " + sentDate.getDate() + ", " + sentDate.getFullYear();
	}

	function updateSelectedEmails(isSelected) {
		if (isSelected) {
			setSelectedEmail((current) => [...current, id]);
		} else {
			let temp = selectedEmail.filter((emailID) => {
				return emailID !== id;
			});
			setSelectedEmail(temp);
		}
	}

	return (
		<div className="p-5 border-2 border-gray-200 rounded-xl">
			<div className="flex items-center gap-4 align-middle">
				<RxDragHandleDots2 size={20} color="#6B7280"></RxDragHandleDots2>
				<input
					type="checkbox"
					className="w-5 h-5 cursor-pointer"
					onClick={(e) => updateSelectedEmails(e.target.checked)}
				></input>
				<div className="h-5 aspect-square bg-green-600 rounded-[50%]"></div>
				<div className="flex flex-col items-center justify-center p-1 border-2 border-gray-200 rounded-md bg-gray-50 aspect-square h-14">
					<span className="text-lg font-bold text-gray-600">
						{dateParts[1].slice(0, -1)}
					</span>
					<span className="text-gray-500 font-semibold text-xs top-[-5px] relative">
						{dateParts[0]}
					</span>
				</div>
				<div
					className="flex items-center justify-between w-full cursor-pointer"
					onClick={() => setExpandCard(!expandCard)}
				>
					<div className="flex items-center gap-4 align-middle">
						<div className="h-10 aspect-square rounded-[50%] bg-gray-500 flex items-center justify-center font-bold text-white">
							{nameParts[0].charAt(0)}
							{nameParts[nameParts.length - 1].charAt(0)}
						</div>
						<div className="flex flex-col ">
							<span className="text-xl font-bold text-gray-600">{subject}</span>
							<div className="flex items-center gap-1 text-gray-400">
								<span className="font-semibold text-gray-500">
									{senderName}
								</span>
								<span className="">
									{"<"}
									{senderEmail}
									{">"}
								</span>
								<span>{getDate()} at 4:04pm</span>
								{attachments > 0 ? (
									<>
										<span className="text-gray-200">|</span>
										<CgAttachment color="#38BDF8"></CgAttachment>
										<span className="text-sky-400">{attachments}</span>
									</>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center gap-4">
						{expandCard ? (
							<></>
						) : (
							<div className="flex flex-wrap justify-end gap-1 w-28">
								{tagParts.length > 2 ? (
									<>
										<Tags tag={tagParts[0]}></Tags>
										<Tags tag={tagParts[1]}></Tags>
										<span className="p-1 text-xs font-extrabold border-2 rounded bg-sky-50 text-sky-400 border-sky-400">
											{tagParts.length - 2}+
										</span>
									</>
								) : (
									<>
										{tagParts.map((tag) => (
											<Tags key={tag} tag={tag}></Tags>
										))}
									</>
								)}
							</div>
						)}
						<div className="flex items-center justify-center p-1 text-xs text-yellow-400 rounded bg-yellow-50">
							<BiTime color="#FACC14" size={20}></BiTime>
							<span> 3 min</span>
						</div>
						{expandCard ? (
							<BsChevronCompactDown size={25}></BsChevronCompactDown>
						) : (
							<BsChevronCompactRight size={25}></BsChevronCompactRight>
						)}
					</div>
				</div>
			</div>
			{expandCard ? (
				<div className="flex flex-col gap-2 py-5 m-2 mt-5 border-t-2">
					<div className="flex justify-between w-full">
						<div className="flex flex-col">
							<span className="font-bold text-gray-600">{senderName}</span>
							<span className="text-gray-400">{date} at 4:04pm</span>
						</div>
						<div className="flex flex-wrap max-w-lg gap-2 h-min">
							{tagParts.map((tag) => (
								<Tags key={tag} tag={tag}></Tags>
							))}
						</div>
					</div>
					<p className="text-gray-800">{content}</p>
					<div className="flex flex-col mt-5 text-gray-800">
						<span>------Forwarded message------</span>
						<span>
							From: <b>{senderName}</b>
							{" <"}
							<a href={senderEmail} className="font-semibold text-blue-500">
								{senderEmail}
							</a>
							{">"}
						</span>
						<span>
							Date: {day}, {date} at 4:04pm
						</span>
						<span>Subject: {subject}</span>
						<span>
							To: Isabel Bowen {"<"}
							<a
								href="sbtest.isabel@gmail.com"
								className="font-semibold text-blue-500"
							>
								sbtest.isabel@gmail.com
							</a>
							{">"}
						</span>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default EmailCard;
