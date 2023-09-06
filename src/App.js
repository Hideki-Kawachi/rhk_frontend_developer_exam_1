import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import EmailCard from "./components/emailCard";
import DummyData from "./dummyData.json";

function App() {
	const [emailList, setEmailList] = useState(DummyData);
	const [selectedEmail, setSelectedEmail] = useState([]);

	function checkAll(isChecked) {
		let checkboxes = document.querySelectorAll('input[type="checkbox"]');
		if (isChecked) {
			for (let checkbox of checkboxes) {
				checkbox.checked = true;
			}
			let temp = [];
			emailList.forEach((emailList) => {
				temp.push(emailList.id);
			});
			setSelectedEmail(temp);
		} else {
			for (let checkbox of checkboxes) {
				checkbox.checked = false;
			}
			setSelectedEmail([]);
		}
	}

	function deleteSelected() {
		if (selectedEmail.length > 0) {
			let temp = emailList.filter((emailList) => {
				return !selectedEmail.some((id) => id === emailList.id);
			});
			console.log("selec tis;:", selectedEmail);
			console.log("TEMP IS:", temp);
			setSelectedEmail([]);
			setEmailList(temp);
			checkAll(false);
		}
	}

	return (
		<div className="flex justify-center p-10 flex-col gap-4">
			<div className="flex justify-between w-full">
				<div className="flex gap-4 justify-center items-center">
					<input
						type="checkbox"
						className="w-5 h-5 cursor-pointer"
						onClick={(e) => checkAll(e.target.checked)}
					></input>
					<button className="flex items-center border-2 border-green-600 rounded px-3 gap-2 bg-green-100 text-green-600">
						SAVE <FaSave></FaSave>
					</button>
					<button className="flex items-center border-2 border-gray-600 rounded px-3 gap-2 bg-gray-100 text-gray-600">
						MANAGE FILTERS <FiFilter></FiFilter>
					</button>
					<span className="border-l-2"></span>
					<button
						className="flex items-center border-2 border-red-600 rounded px-3 gap-2 bg-red-100 text-red-600"
						onClick={() => deleteSelected()}
					>
						DELETE
						<div className="bg-red-500 p-1 rounded-[50%]">
							<AiFillDelete size={10} color="#FEE2E2"></AiFillDelete>
						</div>
					</button>
				</div>
				<div className="flex text-gray-500 gap-2 items-center">
					<button>
						<GrPrevious></GrPrevious>
					</button>
					<span>50 of 150</span>
					<button>
						<GrNext></GrNext>
					</button>
				</div>
			</div>
			<hr className="w-full border-t-2"></hr>
			<div className="flex justify-between items-center">
				<p className="text-gray-400 font-semibold">Unread</p>
				<div className="bg-gray-300 rounded-[50%] aspect-square w-fit p-1 flex justify-center items-center text-white font-semibold">
					{emailList.length}
					<IoMdArrowDropdown></IoMdArrowDropdown>
				</div>
			</div>

			{emailList.map((email) => (
				<EmailCard
					key={email.id}
					id={email.id}
					date={email.date}
					senderName={email.sender_name}
					senderEmail={email.sender_email}
					tags={email.tags}
					subject={email.subject}
					content={email.content}
					setSelectedEmail={setSelectedEmail}
					selectedEmail={selectedEmail}
				></EmailCard>
			))}
		</div>
	);
}

export default App;
