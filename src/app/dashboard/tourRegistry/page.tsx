import fetchToursData, {
  deleteTour,
  insertTour,
  searchTours,
} from "@/actions/tourAction/tourActions";
import TourCRUD from "@/components/tour/TourCRUD";
import React from "react";

async function TourRegistrationForm() {
  const insertTourRecord = async (formData: FormData) => {
    "use server";
    return await insertTour(formData);
  };

  const deleteTourRecord = async (id: string) => {
    "use server";
    return await deleteTour(id);
  };

  const searchTour = async (query: string) => {
    "use server";
    return await searchTours(query);
  };

  const toursData = await fetchToursData().then((data) => data.data.data);

  return (
    <div>
      <h1 className="text-3 font-bold mb-8 flex justify-center">
        Tour Registration Forms
      </h1>
      <TourCRUD toursData={toursData} searchTour={searchTour} deleteTourRecord={deleteTourRecord} insertTourRecord={insertTourRecord}  />

      {/* <AddTourForm insertTourRecord={insertTourRecord} /> */}
    </div>
  );
}

export default TourRegistrationForm;
