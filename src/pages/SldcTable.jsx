import React, { useEffect, useState } from "react";

export const SldcTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDiscom, setSelectedDiscom] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRevisionNo, setSelectedRevisionNo] = useState("");

  const revisionNo = `${selectedRevisionNo}DS${selectedDiscom}${selectedDate}`;

  // Fetch data (update to use selectedDate in the URL)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://delhisldc.org/app-api/drawl-schedule-revision?fordate=${selectedDate}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]); // Trigger fetchData whenever selectedDate changes

  useEffect(() => {
    // Set the default selectedDiscom to the first Discom option after data is fetched
    if (data.length > 0) {
      const uniqueDiscoms = Array.from(
        new Set(
          data.map((ele) => {
            const match = ele.REVISIONNO.match(/DS([A-Z]+)/);
            return match ? match[1] : null; // Extract the abbreviation or null
          })
        )
      ).filter(Boolean); // Remove null values

      if (uniqueDiscoms.length > 0) {
        setSelectedDiscom(uniqueDiscoms[0]); // Set the default selected Discom to the first one
      }
    }

    // Set selectedRevisionNo based on the fetched data (lowest revision number)
    if (data.length > 0) {
      const revisionNos = data
        .map((ele) => `${ele.REVISIONNO[0]}${ele.REVISIONNO[1]}`)
        .sort((a, b) => a.localeCompare(b)); // Sort revision numbers
      setSelectedRevisionNo(revisionNos[0]); // Set the default to the lowest revision number
    }
  }, [data]);

  // Set the default selectedDate to today's date (formatted as yyyy/mm/dd)
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
    setSelectedDate(today.split("-").join("/")); // Set it as yyyy/mm/dd
  }, []);

  const handleSelectChange = (event) => {
    setSelectedDiscom(event.target.value); // Update selected Discom
  };

  const handleDateChange = (event) => {
    const formattedDate = event.target.value.split("-").join("/"); // Format date to yyyy/mm/dd
    setSelectedDate(formattedDate);
  };

  const handleRevisionChange = (event) => {
    setSelectedRevisionNo(event.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const uniqueDiscoms = Array.from(
    new Set(
      data.map((ele) => {
        const match = ele.REVISIONNO.match(/DS([A-Z]+)/);
        return match ? match[1] : null; // Extract the abbreviation or null
      })
    )
  ).filter(Boolean); // Remove null values

  const uniqueRevisionNos = Array.from(
    new Set(data.map((ele) => `${ele.REVISIONNO[0]}${ele.REVISIONNO[1]}`))
  ).sort((a, b) => a.localeCompare(b)); // Sort the revision numbers from low to high

  return (
    <div>
      <p>Select Discom</p>
      <select value={selectedDiscom} onChange={handleSelectChange}>
        {uniqueDiscoms.map((discom, i) => (
          <option key={i} value={discom}>
            {discom}
          </option>
        ))}
      </select>
      <p className="text-white font-NBold">Selected Discom: {selectedDiscom}</p>

      <p>Select Date</p>
      <input
        type="date"
        value={selectedDate.split("/").join("-")} // Convert to yyyy-mm-dd for input field
        onChange={handleDateChange}
      />
      <p className="text-white font-NBold">Selected Date: {selectedDate}</p>

      {/* Select Revision no */}
      <p className="text-white font-NBold">Select Revision no</p>
      <select value={selectedRevisionNo} onChange={handleRevisionChange}>
        {uniqueRevisionNos.map((revisionNo, i) => (
          <option key={i} value={revisionNo}>
            {revisionNo}
          </option>
        ))}
      </select>

      {/* Revision no */}
      <p className="font-bold text-3xl text-center text-white">{revisionNo}</p>
    </div>
  );
};
