import React, { useEffect, useState } from 'react'

// NextJs
import Image from 'next/image'
import Link from 'next/link'

// Bootstrap
import { Form, Spinner } from 'react-bootstrap'

// Qrcode
import QRCode from 'qrcode';

// Lib
import FormatDate from '@/lib/FormatDate';

export default function LinkDashboard({ data }) {
    // console.log('From UserDashboard => ', data)
    const url = typeof window !== 'undefined' && window.location.host + '/';
    const [loading, setLoading] = useState(false)
    const [qrCode, setQrCode] = useState('')
    const [qrCodeError, setQrCodeError] = useState('')


    // 
    useEffect(() => {
        const getQRCode = async() => {
            setLoading(true)
            QRCode.toDataURL(url + data.id, {
                width: 1080,
                margin: 2,
            }, (err, url) => {
                if(err){
                    setTimeout(() => { setLoading(false) }, 1000) 
                    setQrCodeError(err)
                    return
                }
                setTimeout(() => { setLoading(false) }, 1000) 
                setQrCode(url)
            })
        }
        getQRCode()
    }, [])


    // 
    return (
        <div className='container-fluid d-flex flex-column justify-content-between align-items-center gap-5'>
            <div>
                <h1 className='text-info fw-bold'>ShortenThis</h1>
            </div>
            <div className='defaultTransition d-flex flex-column justify-content-center align-items-center gap-2'>
                {data &&
                <div style={{}} className='d-flex flex-row flex-wrap justify-content-center algin-items-center gap-2'>
                    <div className='defaultTransition h-50 shadow border border-secondary border-opacity-25 rounded-1 py-4 px-3 d-flex flex-column justify-content-between align-items-center gap-4'>
                        <div className='d-flex flex-column justify-content-center align-items-center gap-4'>
                            <div className='d-flex flex-row flex-wrap justify-content-center align-items-center gap-1'>
                                <Form.Control disabled className='url-text p-0 m-0 p-1 w-auto rounded-0' value={url + data.id} type="text" placeholder="User URL" />
                                <button onClick={() => {
                                    const copyButton = document.querySelector('.copy-button')
                                    navigator.clipboard.writeText(document.querySelector('.url-text').value)
                                    copyButton.classList.add('btn-success')
                                    copyButton.textContent = 'Copied ✅'
                                }} type="button" className="copy-button btn btn-primary rounded-1">Copy</button>
                            </div>
                            <div className='align-self-start text-secondary fw-light'>
                                Original URL: <Link href={data.originalLink || 'https://google.com'} target='_blank'>{data.originalLink || '??'}</Link>
                            </div>
                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                <h5 className='p-0 m-0 text-info'>Times Clicked</h5>
                                <Form.Control disabled className='p-0 m-0 p-2 fs-4 fw-bold rounded-0 text-center' value={data.clicked} type="text" placeholder="Time Clicked" />
                            </div>
                        </div>
                        <span style={{fontSize: '12px'}} className='align-self-start text-secondary fw-light'>
                            Created at: {FormatDate(data.createdAt)}
                        </span>
                    </div>  
                    <div className='defaultTransition shadow border border-secondary border-opacity-25 p-3 rounded-1 p-4 d-flex flex-column justify-content-center align-items-center gap-3'>
                        <h3 className='text-secondary fw-bold'>QRCode</h3>
                        {loading ?
                        <Spinner animation="border" variant="secondary" />
                        :
                        qrCode && !qrCodeError ? 
                        <div className='d-flex flex-column align-items-center justify-content-between gap-2'>
                            <img style={{maxWidth: '280px', maxHeight: '280px'}} src={qrCode} width='1080' height='720' alt='QRCode Placeholder' /> 
                            <a className='btn btn-danger' href={qrCode} download='qrcode.png'>Download</a>
                        </div>
                        : <h3 className='text-danger'>Something Went Wrong!</h3>
                        }
                    </div>
                </div>
                }
            </div>
        </div>
    )
}
