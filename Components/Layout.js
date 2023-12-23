import React, { useEffect, useState } from 'react'

// NextJs
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Layout({ children, noCards }) {
    const [darkTheme, setDarkTheme] = useState(false)
    useEffect(() => {
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('darkTheme')) {
                console.log('Setting dark theme')
                setDarkTheme(true)
            }else{
                setDarkTheme(false)
            }
        }
        
        const mainSection = document.querySelector('.main-section')
        const handleChangeTheme = () => {
            if(typeof window !== 'undefined'){
                if(localStorage.getItem('darkTheme')) {
                    localStorage.removeItem('darkTheme')
                    setDarkTheme(false)
                }else{
                    localStorage.setItem('darkTheme', '1')
                    setDarkTheme(true)
                }
                console.log('Changed theme!')
            }
        }
        mainSection.addEventListener('dblclick', handleChangeTheme)

        return () => {
            mainSection.removeEventListener('dblclick', handleChangeTheme)
        }
    }, [])


    return (
        <>
            <Head>
                    <title>ShortenThis</title>
                    <script async 
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2145985963089716"
                    crossorigin="anonymous">
                    </script>
                {!noCards &&
                <>
                    <meta name="title" content='ShortenThis' />
                    <meta name="description" content='ShortenThis is a simple and easy Shorten URL Website, It allows you to shorten your long Link And gives you a QRCode for it And A Dashboard to track how many people Clicked your Link.' />
                    <meta name="keywords" content='link, links, short, short link, short links, website, link website, shorten link, shorten link website, shorten website, url, short url, shorten url, website shorten url, shorten links, add, delete, api, make, dashboard, count, click, cliked, safe, direct, direct link, ad, ads, free, free shorten url website, fast, east, secure, facebook, tiktok, instagram, twitter, youtube, qrcode, create link, create qrcode, qr code, code, codeing, copy, paste, pay, github, viper, new, cool, scan, scan qrcode, size, big size, big url, long url, long link, short link' />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
                    <link rel="shortcut icon" type="image/x-icon" href='./favicon/favicon.ico' />
                    <link rel="apple-touch-icon" sizes="180x180" href='./favicon/apple-touch-icon.png' />
                    <link rel="icon" type="image/png" sizes="32x32" href='./favicon/favicon-32x32.png'/>
                    <link rel="icon" type="image/png" sizes="16x16" href='./favicon/favicon-16x16.png'/>
                </>
                }
            </Head>

            <div className={`${darkTheme ? 'bg-dark text-white' : 'bg-white text-black'} d-flex flex-column justify-content-between align-items-center min-vh-100`}>

                <main className='main-section my-auto py-4 container-fluid'>
                    {children}
                </main>

                <footer className='bg-black text-white container-fluid d-flex justify-content-center align-items-center text-center'>
                    <div style={{fontSize: '12px'}} className='container py-1 d-flex flex-row flex-wrap align-items-center justify-content-center justify-content-sm-between gap-3'>
                        
                        <p className='p-0 m-0'>
                            {/* TODO: Change */}
                            <Link style={{textDecoration: 'none'}} className='link-info' href={'http://stul.site/'}>ShortenThis</Link> © {new Date().getFullYear()}
                        </p>
                        
                        <div className='footer-credit mw-25 d-flex flex-row justify-content-center align-items-center gap-2'>
                            <p className='p-0 m-0'>Created By:<span className='ms-2 fw-bold p-0 m-0'>Viper</span></p> |
                            <Link style={{width: '25px', height: '25px'}} className='bg-dark overflow-hidden rounded-1' title='Portfolio' href='https://xvpc.dev' target='_blank'><img className='img-fluid' src={'https://i.ibb.co/9WxCSdZ/android-chrome-512x512.png'} width={512} height={512} alt='Portfolio Icon'/></Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
