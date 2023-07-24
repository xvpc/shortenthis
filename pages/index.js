import React from "react";

// Components
import Layout from "@/Components/Layout";
import Home from "@/Components/Home";


export default function Main() {

  return(
    <Layout>
      <Home DA_SECRET={process.env.NEXT_PUBLIC_API_SECRET} />
    </Layout>
  )
}

// export async function getServerSideProps(){
//   return {
//       props: {
//         DA_SECRET: process.env.API_SECRET
//       }
//     }
// }
