import { useQuery } from "@tanstack/react-query";
import axios from "axios";




export default function useFetch(queryKey, endPoint,userData) {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: queryKey,
        queryFn: getPosts,
        select: (data) => data.data,
        enabled: !!userData,
    })

    console.log({ data, isLoading, isError, error });

    async function getPosts() {
        const apiUrl = `${import.meta.env.VITE_BASE_URL}/${endPoint}`
        return axios.get(apiUrl, {
            headers: {
                token: localStorage.getItem("token"),
            },
        })
    }
    return {
        data, isLoading, isError, error
    }

}