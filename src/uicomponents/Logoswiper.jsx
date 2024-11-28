import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
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
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={8000}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper">
        {data.map((sponsor) => (
          <SwiperSlide
            key={sponsor._id}
            className="flex items-center w-full h-full p-10">
            <img
              src={`https://jobify-web-api.onrender.com/${sponsor.logo}`}
              alt={sponsor.name}
              className="object-scale-down w-32 h-32"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
