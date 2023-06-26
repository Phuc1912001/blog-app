import React, { useState } from "react";

const YourComponent = () => {
  const title = "If we";
  const [showFullTitle, setShowFullTitle] = useState(false);

  const handleClickReadMore = () => {
    setShowFullTitle(true);
  };

  const handleClickHide = () => {
    setShowFullTitle(false);
  };

  const truncatedTitle = title.substring(0, 20);

  return (
    <div>
      <h1>{showFullTitle ? title : truncatedTitle}</h1>
      {!showFullTitle && title.length > 20 && (
        <button onClick={handleClickReadMore}>Read More</button>
      )}
      {showFullTitle && title.length > 20 && (
        <button onClick={handleClickHide}>Hide</button>
      )}
    </div>
  );
};

export default YourComponent;
