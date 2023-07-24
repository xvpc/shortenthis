import React, { useEffect, useState } from 'react'

// Nextjs
import Image from 'next/image';
import Link from 'next/link';

// Fetch
import axios from 'axios';

// Bootstrap
import { Spinner, Form, Button } from 'react-bootstrap';

// Url Validation
import { isWebUri } from 'valid-url';

// Qrcode
import QRCode from 'qrcode';

// Lib
import FormatDate from '@/lib/FormatDate';

// Icons
import { FcApproval, FcElectronics, FcFlashOn, FcLink, FcMultipleDevices } from "react-icons/fc";

export default function Home({ DA_SECRET }) {
    const url = typeof window !== 'undefined' && window.location.host + '/';
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [postLoading, setPostLoading] = useState('')
    const [postData, setPostData] = useState()
    const [qrCode, setQrCode] = useState('')
    const [qrCodeError, setQrCodeError] = useState()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(value){
            if(isWebUri(value)) {
                setError('')
                try{
                    setPostLoading(true)
                    const fetchUrl = process.env.NEXT_PUBLIC_API_URL + `/add?link=${value}` + `&secrets=${DA_SECRET}`

                    const req = await axios.get(fetchUrl)
                    setPostData(req.data)
                    // QRCode
                    QRCode.toDataURL(url + req.data.id, {
                        width: 1080,
                        margin: 2,
                    }, (err, url) => {
                        if(err){
                            setQrCodeError(err)
                            return
                        }
                        setQrCode(url)
                        // console.log(url)
                    })
                    setPostLoading(false)
                    console.log('done')
                }catch(err){
                    setPostLoading(false)
                    console.log(err?.message)
                    if(err?.response?.status === 429){
                        setError('Too Many Requests, Try again later.')
                    }else{
                        setError(err?.message)
                    }
                }
            }else{
                setError('Not A valid URL!')
            }
        }
    }
    

    // 
    return (
        <div className='container-fluid d-flex flex-column justify-content-between align-items-center gap-5'>
            <div>
                <h1 className='text-info fw-bold'>ShortenThis</h1>
            </div>
            <div className='defaultTransition container px-0 d-flex flex-column justify-content-between align-items-center gap-4'>
                <Form onSubmit={handleSubmit} style={{maxWidth: '600px'}} className='container d-flex flex-column justify-content-center align-items-center gap-2'>
                    <h5 className='text-center w-75'>Paste the URL to be Shortened</h5>
                    <Form.Group style={{height: '45px'}} className="w-100 d-flex flex-row justify-content-center align-items-center">
                        <Form.Control className='h-100 w-100 shadow-none rounded-0' value={value} onChange={(e) => setValue(String(e.target.value).toLowerCase())} type="url" placeholder="Enter Url" />
                        <Button disabled={postLoading ? true : false}  className='h-100 rounded-0 text-nowrap' variant="info" type="submit">
                            Shorten URL
                        </Button>
                    </Form.Group>
                    {error && !postLoading ? <p style={{fontSize: '12px'}} className='text-danger'>{error}</p> : void(0)}
                </Form>
                <div className='defaultTransition d-flex flex-column justify-content-center align-items-center gap-2'>
                    {
                    postLoading && !error ? <Spinner animation="border" variant="secondary" /> : 
                    postData &&
                    <div style={{}} className='d-flex flex-row flex-wrap justify-content-center algin-items-center gap-2'>
                        <div className='defaultTransition h-50 shadow border border-secondary border-opacity-25 rounded-1 py-4 px-3 d-flex flex-column justify-content-between align-items-center gap-4'>
                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                <div className='d-flex flex-row flex-wrap justify-content-center align-items-center gap-1'>
                                    <Form.Control disabled className='url-text p-0 m-0 p-1 w-auto rounded-0' value={url + postData.id} type="text" placeholder="User URL" />
                                    <button onClick={() => {
                                        const copyButton = document.querySelector('.copy-button')
                                        navigator.clipboard.writeText(document.querySelector('.url-text').value)
                                        copyButton.classList.add('btn-success')
                                        copyButton.textContent = 'Copied'
                                    }} type="button" className="copy-button btn btn-primary rounded-1">Copy</button>
                                </div>
                                <div className='align-self-start text-secondary fw-light'>
                                    Original URL: <Link href={postData.originalLink || 'https://google.com'} target='_blank'>{postData.originalLink || '??'}</Link>
                                </div>
                                <div className='align-self-start text-secondary fw-light'>
                                    Dashboard: <Link href={`/board/${postData.id}`} target='_blank'>{url + `board/${postData.id}`}</Link>
                                </div>
                            </div>
                            <span style={{fontSize: '12px'}} className='align-self-start text-secondary fw-light'>
                                Created at: {FormatDate(postData.createdAt)}
                            </span>
                        </div>  
                        <div className='defaultTransition shadow border border-secondary border-opacity-25 p-3 rounded-1 p-4 d-flex flex-column justify-content-center align-items-center gap-3'>
                            <h3 className='text-secondary fw-bold'>QRCode</h3>
                            {qrCode && !qrCodeError ? 
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
            
            <div className='defaultTransition container-fluid px-0 d-flex flex-column justify-content-center align-items-center gap-3'>
                <div style={{maxWidth: '900px'}} className='shadow p-4 d-flex flex-column justify-content-center align-items-start'>
                    <h5 className='fw-bold fs-5 p-0 m-0'>Simple and fast URL shortener!</h5>
                    <p style={{fontSize: '14px'}} className='m-0 p-0'>
                        ShortenThis allows you to shorten long links from&nbsp;
                        <Link href={'https://facebook.com'} target='_blank'>Facebook</Link> ,
                        <Link href={'https://instagram.com'} target='_blank'>Instagram</Link> ,
                        <Link href={'https://youtube.com'} target='_blank'>Youtube</Link> ,
                        <Link href={'https://tiktok.com'} target='_blank'>Tiktok</Link> ,
                        <Link href={'https://twitter.com'} target='_blank'>Twitter</Link> ,
                        and other sites.
                    </p>
                    <p style={{fontSize: '14px'}} className='m-0 p-0'>
                        Just copy and paste the link you want to shorten and press the button. 
                    </p>
                    <p style={{fontSize: '14px'}} className='m-0 p-0'>
                        And then you will have A shorten URL for your own and A QRCode for it, So anyone you share it with can access it anywhere and anytime.
                    </p>
                </div>
            </div>

            <div style={{maxWidth: '1200px'}} className='defaultTransition container px-0 d-flex justify-content-center align-items-center gap-3'>
                <div className='info-container d-flex flex-row flex-wrap justify-content-center align-items-center gap-3'>
                    <div style={{maxWidth: '200px'}} className='text-center p-2 d-flex flex-column justify-content-center align-items-center gap-2'>
                        <FcFlashOn style={{fontSize: '60px'}} />
                        <h5 className='fw-bold p-0 m-0'>Easy</h5>
                        <p style={{fontSize: '12px'}} className='p-0 m-0 text-secondary'>
                            Short URL is easy and fast, just enter you link and it will be shorten.
                        </p>
                    </div>
                    <div style={{maxWidth: '200px'}} className='text-center p-2 d-flex flex-column justify-content-center align-items-center gap-2'>
                        <FcLink style={{fontSize: '60px'}} />
                        <h5 className='fw-bold p-0 m-0'>Links</h5>
                        <p style={{fontSize: '12px'}} className='p-0 m-0 text-secondary'>
                            Use any links, no matter what size, ShortenThis always shortens.
                        </p>
                    </div>
                    <div style={{maxWidth: '200px'}} className='text-center p-2 d-flex flex-column justify-content-center align-items-center gap-2'>
                        <FcApproval style={{fontSize: '60px'}} />
                        <h5 className='fw-bold p-0 m-0'>Secure</h5>
                        <p style={{fontSize: '12px'}} className='p-0 m-0 text-secondary'>
                            Our service have HTTPS protocol and data encryption so It&#39;s all safe.
                        </p>
                    </div>
                    <div style={{maxWidth: '200px'}} className='text-center p-2 d-flex flex-column justify-content-center align-items-center gap-2'>
                        <FcMultipleDevices style={{fontSize: '60px'}} />
                        <h5 className='fw-bold p-0 m-0'>Devices</h5>
                        <p style={{fontSize: '12px'}} className='p-0 m-0 text-secondary'>
                            ShortenThis works on all devices including smartphones, tablets, and desktop.
                        </p>
                    </div>
                    <div style={{maxWidth: '200px'}} className='text-center p-2 d-flex flex-column justify-content-center align-items-center gap-2'>
                        <FcElectronics style={{fontSize: '60px'}} />
                        <h5 className='fw-bold p-0 m-0'>Safe</h5>
                        <p style={{fontSize: '12px'}} className='p-0 m-0 text-secondary'>
                            All links that try to disseminate spam, viruses and malware are deleted.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
