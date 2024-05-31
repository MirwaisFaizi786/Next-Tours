
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function fetchToursData() {
    "use server";
    try {
        const response = await fetch('http://localhost:8084/api/v1/tours', {
            cache: 'no-store'
        });

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

export async function insertTour(file: FormData) {
    "use server";


    try {
        let headersList = {
            "Accept": "*/*",
            "Authorization": `Bearer ${cookies().get("jwt")?.value}`
        }

        let response = await fetch("http://localhost:8084/api/v1/tours", {
            method: "POST",
            body: file,
            headers: headersList
        });

        let data = await response.json();
        console.log("data form tour insert =================================", data);
        revalidatePath("/tourRegistry");
        return data;

    } catch (error) {
        console.log(error);
    }
}


export async function deleteTour(id: string) {
    "use server";

    try {
        const response = await fetch(`http://localhost:8084/api/v1/tours/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies().get("jwt")?.value}`,
            },
        });

        revalidatePath("/tourRegistry");
    } catch (error) {
        console.log(error);
    }
}


export async function searchTours(search: string) {
    "use server";
    try {
        let response = await fetch("http://localhost:8084/api/v1/tours/searchForTour?name=" + search + "", {
            method: "GET",
        });
        let data = await response.json();
        // console.log("data form tour search =================================", data.data.tours);

        return data.data.tours;
    } catch (error) {
        console.log(error);
    }
}