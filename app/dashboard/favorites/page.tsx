"use client";
import GetFavCar from "@/action/fav/GetFavCars";
import FavTable from "@/components/ui/FavTable";

const Favorites = () => {
  const { data, error, isLoading } = GetFavCar();

  return (
    <div className="cntr">
      <FavTable data={data?.fav} error={error} isLoading={isLoading} />
    </div>
  );
};

export default Favorites;
