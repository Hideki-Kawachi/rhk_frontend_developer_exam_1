import React from "react";

function Tags({ tag }) {
	return (
		<span className="text-xs p-1 bg-sky-50 text-sky-400 font-semibold rounded border-2 border-sky-400">
			{tag}
		</span>
	);
}

export default Tags;
