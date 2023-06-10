import type {AppProps} from 'next/app'
import {useState} from 'react'

//react query imports
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {ErrorBoundary} from 'react-error-boundary'
import Header from '../modules/Header'

function MyApp({Component, pageProps}: AppProps) {
  //initializing client
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({reset}) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({resetErrorBoundary}) => (
                <div>
                  There was an error!
                  <button onClick={() => resetErrorBoundary()}>
                    Try again
                  </button>
                </div>
              )}
            >
              <Hydrate state={pageProps.dehydratedState}>
                <Header />
                <Component {...pageProps} />
                <ReactQueryDevtools
                  initialIsOpen={false}
                  position='bottom-right'
                />
              </Hydrate>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
