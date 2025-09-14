function RecentCreation({ prompt, type, date }) {
  //this must be in utils cause its helper function and
  // we may use it in another place
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
      <div>
        <p className="">{prompt}</p>
        <p className="text-sm text-gray-400 mt-1">
          {type} - {formattedDate}
        </p>
      </div>
      <span className="text-sm font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded-full px-3 py-1">
        {type}
      </span>
    </div>
  );
}

export default RecentCreation;
