import React, { useCallback, useEffect, useMemo, useState } from "react";

const TFL = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchTubeData = () => {
    fetch("https://api.tfl.gov.uk/Line/Mode/tube/status")
      .then((response) => {
        return response.json();
      })
      .then((d) => {
        const services = d.map((s) => ({
          id: d.id,
          station: s.name,
          service: s.lineStatuses[0].statusSeverityDescription,
        }));
        setData(services);
      });
  };

  useEffect(() => {
    fetchTubeData();
  }, []);

  const stationInformation = (d) => {
    console.log(d);
  };

  const filterStations = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  // groups.filter((group) => group.title.toLowerCase().includes(search.toLowerCase()))
  const filteredData = useMemo(() => {
    return data
      .filter((d) => d.station.toLowerCase().includes(filter.toLowerCase()))
      .map((d) => (
        <tr key={d.id} onClick={stationInformation(d.id)}>
          <td>{d.station}</td>
          <td>{d.service}</td>
        </tr>
      ));
  }, [data, filter]);

  return (
    <>
      <h2>TFL Updates</h2>
      <input type="text" value={filter} onChange={filterStations} />
      <table>
        <tr>
          <th>Station</th>
          <th>Status</th>
        </tr>
        {filteredData}
      </table>
    </>
  );
};

export default TFL;
