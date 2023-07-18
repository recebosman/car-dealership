"use client";
import GetCarById from "@/action/cars/GetCarById";

const Vehicle = ({ params }: any) => {
  const idNumber = parseInt(params.id);
  const { data, error, isLoading } = GetCarById({ id: idNumber });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const vehicle = data.vehicleById;
  return (
    <div>
      <h1>Vehicle</h1>
      <p>Vehicle ID: {vehicle.id}</p>
      <p>Vehicle Name: {vehicle.name}</p>
    </div>
  );
};

export default Vehicle;
