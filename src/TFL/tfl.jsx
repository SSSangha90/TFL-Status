import React, { useEffect, useState } from "react";

const TFL = () => {
  const [data, setData] = useState([]);

  const fetchTubeData = () => {
    fetch("https://api.tfl.gov.uk/Line/Mode/tube/status")
      .then((response) => {
        return response.json();
      })
      .then((d) => {
        const services = d.map((s) => ({
          station: s.name,
          service: s.lineStatuses[0].statusSeverityDescription,
        }));
        setData(services);
      });
  };

  useEffect(() => {
    fetchTubeData();
  }, []);

  return (
    <>
      <h2>TFL Updates</h2>
      <table>
        <tr>
          <th>Station</th>
          <th>Status</th>
        </tr>
        {data.map((d) => (
          <tr key={d.station}>
            <td>{d.station}</td>
            <td>{d.service}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default TFL;
