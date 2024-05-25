"use server";
import { cookies } from "next/headers";

export async function getLogin(formData: FormData) {

    try {
        const response = await fetch('http://localhost:8084/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": formData.get('email'),
                "password": formData.get('password')
            }),
        })

       
       
        if (response.status === 200) {
            const data = await response.json().then((data) => data);
            cookies().set("jwt", data.token, {
                httpOnly: true,
            })

            return {
                status: 200,
                data: data
            }
        }
       
    } catch (error) {
        console.log(error);

    }
}



export async function getUpdatePassword(currentPassword: string, newPassword: string, confirmPassword: string) {

    try {
        const response = await fetch('http://localhost:8084/api/v1/users/updatePassword', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies().get("jwt")?.value}`,
            },
            body: JSON.stringify({
                "passwordCurrent": currentPassword,
                "password": newPassword,
                "passwordConfirm": confirmPassword
            }),
        })

        const data = await response.json();
        console.log(" data Update Password=============================", data);

        const token: string = data.token;
        console.log(" =================== response Update Password:::", token);

        cookies().set("jwt", token, {
            httpOnly: true,
        })

        return response

    } catch (error) {
        console.log(error);

    }
}


export async function signUpAction(formData: FormData) {

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    console.log("currentPassword, newPassword, confirmPassword", name, email, password, confirmPassword);

    try {
        const response = await fetch('http://localhost:8084/api/v1/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
                "passwordConfirm": confirmPassword
            }),
        })

        const data = await response.json();
        console.log("new sign up data =============================", data);

        const token: string = data.token;
        console.log(" =================== response new Sign Up:::", token);

        cookies().set("jwt", token, {
            httpOnly: true,
        })

    } catch (error) {
        console.log(error);

    }
}



export async function getLoginUserDetails() {
    try {
        const response = await fetch(`http://localhost:8084/api/v1/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies().get("jwt")?.value}`,
            },
        });
        if(response.status === 200) {
            return response.json();
        }else {
            return null
        }
    } catch (error) {
        console.log(error);
        
    }
}


export async function getSession() {
    return cookies().get("jwt")?.value;
}


export async function logout() {
    cookies().delete("jwt");
}