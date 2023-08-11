import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Flag Quiz!</title>
                <meta name="description" content="Test your knowledge of flags from different countries with this exciting flag quiz game. Learn about various flags and their significance while having fun answering challenging questions. Play now and see how well you can identify flags from around the world!" />
                <meta property="og:description" content="Test your flag knowledge with this exciting quiz game! Challenge yourself to identify flags from different countries and expand your global knowledge. Play now and see how many flags you can recognize!" />
                <meta name="twitter:description" content="Test your knowledge of flags from different countries with this exciting quiz game. Learn about various flags and their significance while having fun answering challenging questions. Play now and see how well you can identify flags from around the world!" />
                <meta name="keywords" content="flags quiz, flag trivia, country flags, identify flags, world flags, national flags, flag knowledge, quiz game, geography quiz, global trivia, educational game, test your knowledge, learning flags, fun quiz, country recognition, challenge game, flag identification, international flags, geography knowledge, world geography" />
                <link rel="icon" href="/world-icon.png" />
                <meta property="og:title" content="Flag Quiz!" />
                <meta property="og:description" content="Test your flag knowledge with this exciting quiz game! Challenge yourself to identify flags from different countries and expand your global knowledge. Play now and see how many flags you can recognize!" />
                <meta property="og:image" content="https://res.cloudinary.com/dnczjmsbt/image/upload/v1691431730/quiz-app-bg_er00py.png" />
                <meta property="og:url" content="https://flag-quiz-app-pi.vercel.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="Flag Quiz!" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}
