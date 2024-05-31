export type TourFormData = {
    name: string,
    duration: number,
    maxGroupSize: number,
    difficulty: string,
    ratingsAverage: number,
    price: number,
    priceDiscount: number,
    summary: string,
    description: string,
    imageCover: File | null,
    images: File[],
    startLocation: {
      address: string
      description: string
      coordinates: [number, number]
    },
    locations: Location[],
    startDates: string[],
  }
  
  export type Location = {
    description: string,
    day: number,
    coordinates: [number, number]
  }