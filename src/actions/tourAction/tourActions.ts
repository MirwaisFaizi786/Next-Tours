export default async function fetchToursData() {
    "use server";
    try {
        const response = await fetch('http://localhost:8084/api/v1/tours');
        return response.json();
        
    } catch (error) {
        console.log(error);
    }
}

export async function getTourById(id: string) {
    "use server";
    try {
        const response = await fetch(`http://localhost:8084/api/v1/tours/${id}`);
        return response.json();
        
    } catch (error) {
        console.log(error);
    }
}