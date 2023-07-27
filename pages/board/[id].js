import React, { useEffect, useState } from "react";

// Nextjs
import { useRouter } from "next/router";

// Fetch
import axios from "axios";

// Components
import Layout from "@/Components/Layout";
import LinkDashboard from "@/Components/LinkDashboard";


export default function LinkBoard() {
    const router = useRouter()
    const [data, setData] = useState({})

    useEffect(() => {
        (async() => {
            const id = window?.location?.pathname?.replace(/\/board\//, "").trim()

            
            if(id){
                const url = process.env.NEXT_PUBLIC_API_URL + '/get'

                try{
                    const req = await axios.get(url, {
                        params: {
                            id: id
                        }, 
                        headers: {
                            authorization: process.env.NEXT_PUBLIC_API_SECRET
                        }
                    })

                    // console.log('req from useEffect =>', req?.data)
                    if(req?.data){
                        if(req.data.error) throw new Error(req.data.error);

                        setData(req.data)
                    }
                }catch(err){
                    console.log('error message =>', err.message)
                    router.push('/404')
                }
            }else{
                router.push('/')
            }
        })()
    }, [])

    // 
    return(
        <Layout>
            <LinkDashboard data={data} />
        </Layout>
    )
}
// export async function getServerSideProps(context){
//     const { id } = context.query
//     const queryId = String(id)
//     const url = process.env.NEXT_PUBLIC_API_URL + `/get?id=${queryId}` + `&secrets=${process.env.API_SECRET}`
    
//     if(queryId){
//         try{
//             const req = await axios.get(url)
//             console.log('req from getServerSideProps =>', req.data)
//             if(req?.data){
//                 return{
//                     props: {
//                         data: req.data,
//                     }
//                 }
//             }
//         }catch(err){
//             console.log('error message =>', err.message)
//             return{
//                 notFound: true
//             }
//         }
//     }else{
//         return{
//             notFound: true
//         }
//     }
// }
