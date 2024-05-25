import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createReview(review: string, rating: number, tourId: string, userId: string) {
    try {
        const response = await fetch('http://localhost:8084/api/v1/tours/' + tourId + '/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies().get("jwt")?.value}`,
            },
            body: JSON.stringify({ review, rating, createdAt:new Date() })
        });
        if(response.status === 201) {
            revalidatePath(`/tour/${tourId}`);
            return response.json();
            
        }else {
            return null
        }
    } catch (error) {
        console.log(error);
        
    }
}