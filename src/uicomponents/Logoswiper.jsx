import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function LogoSwipper() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSponsors = async () => {
    try {
      const response = await axios.get(
        "https://jobify-web-api.onrender.com/api/v1/sponsors/sponsors"
      );
      setData(response.data.sponsors);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen overflow-hidden">
        <Skeleton />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Marquee gradient={false} speed={50}>
        {data.map((sponsor) => (
          <div
            key={sponsor._id}
            className="flex items-center justify-center w-32 h-32 p-5 mx-4 bg-white shadow-lg rounded-lg">
            <img
              src={`https://jobify-web-api.onrender.com/${sponsor.logo}`}
              alt={sponsor.name}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
