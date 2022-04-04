import React, { useEffect, useState } from "react";
import RailsApiClient from "../services/rails-api-client";

interface Props {
  apiClient: RailsApiClient;
}

const RailsApiView: React.FC<Props> = ({ apiClient }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const responses = [apiClient.getPublic(), apiClient.getPrivate()];

    Promise.all(responses).then(([publicRes, privateRes]) => {
      setData({
        publicRes,
        privateRes,
      });
    });
  }, []);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default RailsApiView;
