import React from 'react'

// Components
import Layout from '@/Components/Layout'

// Icons
import { TbError404 } from "react-icons/tb";
import { RiEarthquakeFill } from "react-icons/ri";
import { Button } from 'react-bootstrap';

export default function NoMatch() {
    return (
        <Layout>
            <div className='container d-flex flex-column justify-content-center align-items-center gap-5'>
                <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                    <h1 className='fw-bold'>Page Not Found</h1>
                        <TbError404 style={{fontSize: '200px', filter: 'drop-shadow(30px 10px 4px black)'}} />
                        <Button onClick={() => {
                            typeof window !== 'undefined' && window.history.back()
                        }} variant="primary">Go back</Button>
                </div>

            </div>
        </Layout>
    )
}
