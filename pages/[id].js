import React, { useEffect, useState } from "react";

// Nextjs
import { useRouter } from "next/router";

// Fetch
import axios from "axios";

// Components
import Layout from "@/Components/Layout";

export default function RedirectingPage() {
    const router = useRouter()
    const [count, setCount] = useState(7)
    const [data, setData] = useState({})
    const [error, setError] = useState('')


    useEffect(() => {
        (async() => {
            const id = window?.location?.pathname?.replace(/\//, "").trim()

            if(id){
                const url = process.env.NEXT_PUBLIC_API_URL + `/get?id=${id}` + `&secrets=${process.env.NEXT_PUBLIC_API_SECRET}`

                try{
                    const req = await axios.get(url)

                    // console.log('req from useEffect =>', req?.data)
                    if(req?.data){
                        if(req.data.error) throw new Error(req.data.error);

                        setData(req.data)
                        if(req.data.originalLink){
                            router.replace(req.data.originalLink)
                        }else{
                            setError('Something went wrong!')
                        }
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

    useEffect(() => {
        let interval;
        interval = setInterval(() => {
            setCount(prev => prev - 1)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])


    return(
        <Layout noCards>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                {!error ? 
                <>
                    <h1 className="fw-bolder">Redirecting</h1>
                    <span className="fw-bold fs-5">{count >= 0 ? count : '...'}</span>
                </> : 
                <p className='p-0 m-0 text-danger'>{error}</p>
                }
                <div className="d-flex flex-row text-center gap-2 text-primary"><span className="fw-bold text-black">Link is:</span> {data?.originalLink || 'none giving'}</div>
            </div>
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
