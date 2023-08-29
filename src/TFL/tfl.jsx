import React, { useCallback, useEffect, useMemo, useState } from "react";

const TFL = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [station, setStation] = useState();

  const fetchTubeData = async () => {
    await fetch("https://api.tfl.gov.uk/Line/Mode/tube/status")
      .then((response) => {
        return response.json();
      })
      .then((d) => {
        const services = d.map((s) => ({
          id: s.id,
          station: s.name,
          service: s.lineStatuses[0].statusSeverityDescription,
          reason: s.lineStatuses[0].reason ?? null,
        }));
        setData(services);
      });
  };

  useEffect(() => {
    fetchTubeData();
  }, []);

  const stationInformation = useCallback((e, d) => setStation(d), []);
  const filterStations = useCallback((e) => setFilter(e.target.value), []);

  const filteredData = useMemo(() => {
    return data
      .filter((d) => d.station.toLowerCase().includes(filter.toLowerCase()))
      .map((d) => (
        <tr key={d.id} onClick={(e) => stationInformation(e, d)}>
          <td>{d.station}</td>
          <td>{d.service}</td>
        </tr>
      ));
  }, [data, filter, stationInformation]);

  return (
    <>
      <h2>TFL Updates</h2>
      <input
        type="search"
        placeholder="Search station..."
        value={filter}
        onChange={filterStations}
      />
      <table>
        <tr>
          <th>Station</th>
          <th>Status</th>
        </tr>
        {filteredData}
      </table>
      {station && (
        <div className="modal">
          <h3>{station.station}</h3>
          <p>{station.service}</p>
          <p>{station.reason}</p>
          <button onClick={(e) => setStation(null)}>Close</button>
        </div>
      )}
    </>
  );
};

export default TFL;
